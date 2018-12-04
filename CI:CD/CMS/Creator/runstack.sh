#!/bin/bash

aws cloudformation $ACTION \
    --region us-west-1 \
    --stack-name $STACK_NAME \
    --template-body file://service.yaml \
    --capabilities CAPABILITY_NAMED_IAM \
    --parameters \
    ParameterKey=CreatorImage,ParameterValue=805495149875.dkr.ecr.us-east-1.amazonaws.com/cms-creator:$(git rev-parse HEAD) \
    ParameterKey=VPC,ParameterValue=vpc-01795934d771ba8c8 \
    ParameterKey=Cluster,ParameterValue=cms-websites \
    ParameterKey=Listener,ParameterValue=arn:aws:elasticloadbalancing:us-west-1:805495149875:listener/app/cms-creator/6d814a779b10f410/d393b98e2065a3fb