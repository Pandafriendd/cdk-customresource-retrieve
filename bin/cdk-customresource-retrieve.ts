#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkCustomresourceRetrieveStack } from '../lib/cdk-customresource-retrieve-stack';

const app = new cdk.App();
new CdkCustomresourceRetrieveStack(app, 'CdkCustomresourceRetrieveStack');
