#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { NearestRegionStack } from '../src/stack';

// provide your own values here
const domainName = 'nearest-region.aws.basededge.dev' 
const hostedZoneId = 'Z0630705FUHFQKZXUICG'

const app = new cdk.App()

new NearestRegionStack(app, 'AllRegionsStack', {
  domainName, 
  hostedZoneId
})

new NearestRegionStack(app, 'DefaultRegionsStack', {
    domainName:'nearest-default-region.aws.basededge.dev' , 
    hostedZoneId,
    regions:[
        "us-east-1" ,
        "us-east-2",
        "us-west-1",
        "us-west-2",
        "ap-south-1",
        "ap-northeast-2",
        "ap-southeast-1",
        "ap-southeast-2",
        "ap-northeast-1",
        "ca-central-1",
        "eu-central-1",
        "eu-west-1",
        "eu-west-2",
        "eu-west-3" ,                              
        "eu-north-1",
        "sa-east-1",
    ]
  })
