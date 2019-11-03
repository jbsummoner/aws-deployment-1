# AWS Deployment using AWS CLI

## Table of Contents

- [AWS Deployment using AWS CLI](#aws-deployment-using-aws-cli)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
    - [Folder structure](#folder-structure)
    - [File description](#file-description)
    - [AWS Infrastructure created](#aws-infrastructure-created)
  - [Pre-deployment](#pre-deployment)
  - [Deploy infrastructure and application](#deploy-infrastructure-and-application)
  - [Destroy infrastructure and application](#destroy-infrastructure-and-application)

## Description

The repo has scripts to a Node.js image processing web application connected to a MYSQL AWS RDS, and two s3 buckets.  
The application is deployed on to two AWS EC2 Ubuntu instances behind a Internet Gateway, AWS virtual private cloud, two subnets, and a Elastic Load Balancer utilizing two subnets.

### Folder structure

midterm  
├── README.md  
├── scripts  
│ ├── run.sh  
│ └── templates  
│ ├── create-env.sh  
│ ├── destroy-env.sh  
│ └── install-app-env.sh  
└── web-app

### File description

- `run.sh` gets user input and provide the variables to each template file.
- `create-env.sh` create aws infrastructure.
- `install-app-env.sh` clones repo and start node app.
- `destroy-env.sh1` destroys the previously created AWS infrastructure.

### AWS Infrastructure created

- 1 internet gateway
- 1 VPC
- 2 Subnets
- 1 Security group
- 2 s3 buckers
- 1 DB subnet
- 1 RDS MYSQL instances
- 1 Target group
- 1 ELB application load balancer
- 2 EC2 instances

## Pre-deployment

- Must have awscli properly setup.
- Need a EC2 instance keypair.
- Need a EC2 instance profile for AWS EC2 service with at least S3 and RDS full privileges.
- Line endings for shell scripts must be LF.
- Keypair must exist in region you choose.

Note: Github deployment key is preseeded in AMI image w/ git, nodes, and aws installed.

## Deploy infrastructure and application

- Must be linux/Unix environment
- Run `run.sh` script
- Load Balance DNS name is returned at the end of the script, will take a couple seconds to propagate.

## Destroy infrastructure and application

- Run `destroy.sh` script
