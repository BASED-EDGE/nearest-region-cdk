# nearest-region-cdk
## What
A sample CDK stack showing how to create a TXT  DNS record on Route53 to return the nearest AWS region to the caller (either excluding or including opt-in regions)

## Why
- provide a sane default for clientside apps (for when users dont provide a region themselves)
- when you need to manually redirect requests between your region stacks
- ???

## live example
```
dig -t TXT nearest-default-region.aws.basededge.dev
dig -t TXT nearest-region.aws.basededge.dev
```