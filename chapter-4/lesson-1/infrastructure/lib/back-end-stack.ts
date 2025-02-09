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

        // Step 1: Create an IAM role for App Runner
        const accessRole = new iam.Role(this, 'AppRunnerAccessRole', {
            assumedBy: new iam.ServicePrincipal('build.apprunner.amazonaws.com'),
        });

        // Step 2: Grant the role permissions to pull images from ECR
        accessRole.addToPolicy(new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            actions: [
                'ecr:GetDownloadUrlForLayer',
                'ecr:BatchGetImage',
                'ecr:GetAuthorizationToken', // Required for authentication
                'ecr:BatchCheckLayerAvailability',
            ],
            resources: ['*'], // Grant access to all ECR repositories
        }));

        // Step 3: Create an ECR repository
        const ecrRepository = new ecr.Repository(this, 'SpringCryptoAppRepository', {
            repositoryName: 'spring-crypto-app',
            removalPolicy: cdk.RemovalPolicy.DESTROY,
        });

        // Step 4: Build the Docker image
        const imageAsset = new ecrAssets.DockerImageAsset(this, 'SpringCryptoAppImage', {
            directory: '../back-end', // Path to the directory containing the Dockerfile
            platform: Platform.LINUX_AMD64,
        });

        // Step 5: Grant the IAM role access to the ECR repository
        ecrRepository.grantPull(accessRole);

        // Step 6: Create an App Runner service
        const appRunnerService = new apprunner.CfnService(this, 'SpringCryptoAppRunnerService', {
            serviceName: 'spring-crypto-app-runner',
            sourceConfiguration: {
                authenticationConfiguration: {
                    accessRoleArn: accessRole.roleArn, // Use the IAM role ARN
                },
                imageRepository: {
                    imageIdentifier: imageAsset.imageUri, // Docker image URI
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

        // Step 7: Output the App Runner service URL
        new cdk.CfnOutput(this, 'AppRunnerServiceUrl', {
            value: `https://${appRunnerService.attrServiceUrl}`,
        });
    }
}
