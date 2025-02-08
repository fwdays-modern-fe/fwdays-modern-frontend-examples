import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as ecrAssets from 'aws-cdk-lib/aws-ecr-assets';
import { Platform } from 'aws-cdk-lib/aws-ecr-assets';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as apprunner from 'aws-cdk-lib/aws-apprunner';

export class BackEndStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // IAM role for App Runner
        const accessRole = new iam.Role(this, 'AppRunnerAccessRole', {
            assumedBy: new iam.ServicePrincipal('build.apprunner.amazonaws.com'),
        });
        accessRole.applyRemovalPolicy(cdk.RemovalPolicy.DESTROY);

        // ECR repository for the Docker image
        const ecrRepository = new ecr.Repository(this, 'SpringCryptoAppRepository', {
            repositoryName: 'spring-crypto-app',
            removalPolicy: cdk.RemovalPolicy.DESTROY,
        });

        // Build the Docker image
        const imageAsset = new ecrAssets.DockerImageAsset(this, 'SpringCryptoAppImage', {
            directory: '../back-end', // Path to the directory containing the Dockerfile
            platform: Platform.LINUX_AMD64,
        });

        // Grant App Runner access to pull the image from ECR
        ecrRepository.addToResourcePolicy(new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            actions: [
                'ecr:BatchCheckLayerAvailability',
                'ecr:GetDownloadUrlForLayer',
                'ecr:BatchGetImage',
            ],
            principals: [accessRole],
        }));

        // Create an App Runner service
        const appRunnerService = new apprunner.CfnService(this, 'SpringCryptoAppRunnerService', {
            serviceName: 'spring-crypto-app-runner',
            sourceConfiguration: {
                authenticationConfiguration: {
                    accessRoleArn: accessRole.roleArn,
                },
                imageRepository: {
                    imageIdentifier: imageAsset.imageUri,
                    imageRepositoryType: 'ECR',
                    imageConfiguration: {
                        port: '8080', // Port exposed by the Spring Boot app
                    },
                },
            },
            instanceConfiguration: {
                cpu: '1 vCPU',
                memory: '2 GB',
            },
        });

        // Output the App Runner service URL
        new cdk.CfnOutput(this, 'AppRunnerServiceUrl', {
            value: `https://${appRunnerService.attrServiceUrl}`,
        });
    }
}
