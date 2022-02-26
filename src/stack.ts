import { Duration, RemovalPolicy, Stack, StackProps, region_info } from "aws-cdk-lib";
import { OriginAccessIdentity } from "aws-cdk-lib/aws-cloudfront";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

import { CfnRecordSet } from 'aws-cdk-lib/aws-route53'


interface Props extends StackProps {
    hostedZoneId: string,
    domainName: string,
    // includeOptInRegions
    regions?: string[]
    ttl?: string
}

export class NearestRegionStack extends Stack {
    constructor(scope: Construct, id: string, props: Props) {
        super(scope, id, props);
        (
            props.regions ||
            (region_info.RegionInfo.regions
                .filter(r => r.partition === 'aws' && r.name !== 'eu-south-2' /** not launched yet as of jan 2022 */)
                .map(r => r.name))
        ).forEach(region => {
            new CfnRecordSet(this, `MyCfnRecordSet${region}`, {
                name: props.domainName,
                type: 'TXT',
                hostedZoneId: props.hostedZoneId,
                region: region,
                resourceRecords: [`"${region}"`],
                setIdentifier: region,
                ttl: props.ttl || Duration.hours(1).toSeconds().toString(),
            })
        });
    }
}

