import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import { ViewerProtocolPolicy } from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import * as iam from "aws-cdk-lib/aws-iam";
import * as ecrAssets from "aws-cdk-lib/aws-ecr-assets";
import { Platform } from "aws-cdk-lib/aws-ecr-assets";
import * as codebuild from 'aws-cdk-lib/aws-codebuild';

export class InfrastructureStack extends cdk.Stack {
    private imageAsset: ecrAssets.DockerImageAsset;
    private accessRole: iam.Role;

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // Setup for static website hosting
        const websiteBucket = new s3.Bucket(this, "CryptoWebsiteBucket", {
            websiteIndexDocument: "index.html",
            websiteErrorDocument: "404.html",
            publicReadAccess: true,
            blockPublicAccess: new s3.BlockPublicAccess({
                blockPublicPolicy: false
            })
        });

        const distribution = new cloudfront.Distribution(this, 'CryptoDistribution', {
            defaultBehavior: {
                origin: new origins.S3Origin(websiteBucket, {
                    originPath: '/'
                }),
                viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS
            },
            defaultRootObject: 'index.html'
        });

        new BucketDeployment(this, "CryptoBucketDeployment", {
            sources: [Source.asset("../front-end/dist")],
            destinationBucket: websiteBucket,
            distribution,
            distributionPaths: ["/*"]
        });

        this.createAccessRole()
        this.buildAsset();
    }

    private createAccessRole() {
        this.accessRole = new iam.Role(this, "AppRunnerAccessRole", {
            assumedBy: new iam.ServicePrincipal("build.apprunner.amazonaws.com"),
        });
        this.accessRole.applyRemovalPolicy(cdk.RemovalPolicy.DESTROY);
    }

    private buildAsset() {
        this.imageAsset = new ecrAssets.DockerImageAsset(
            this,
            "SpringCryptoAppImage",
            {
                directory: "../back-end",
                platform: Platform.LINUX_AMD64,
            }
        );

        this.imageAsset.repository.grantPull(this.accessRole);

        const buildProject = new codebuild.Project(this, 'BuildDockerImage', {
            environment: {
                buildImage: codebuild.LinuxBuildImage.AMAZON_LINUX_2_5,
                privileged: true,
            },
            environmentVariables: {
                'AWS_ACCOUNT_ID': {value: cdk.Stack.of(this).account},
                'AWS_REGION': {value: cdk.Stack.of(this).region},
                'REPOSITORY_URI': {value: this.imageAsset.repository.repositoryUri}
            },
            buildSpec: codebuild.BuildSpec.fromObject({
                version: '0.2',
                phases: {
                    pre_build: {
                        commands: [
                            'echo Logging in to Amazon ECR...',
                            'aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com'
                        ]
                    },
                    build: {
                        commands: [
                            'echo Build started on `date`',
                            'docker build -t $REPOSITORY_URI:latest -f back-end/Dockerfile back-end',
                            'docker push $REPOSITORY_URI:latest'
                        ]
                    }
                }
            }),
            role: new iam.Role(this, 'CodeBuildRole', {
                assumedBy: new iam.ServicePrincipal('codebuild.amazonaws.com'),
                managedPolicies: [
                    iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonEC2ContainerRegistryFullAccess')
                ]
            })
        });
    }
}
