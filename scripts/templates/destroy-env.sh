# Variables
VPC_ID=$(grep 'VPC_ID' ${OUTPUT_DIR}aws.variables.txt | cut -d '=' -f 2)
SUBNET1=$(grep 'SUBNET1' ${OUTPUT_DIR}aws.variables.txt | cut -d '=' -f 2)
SUBNET2=$(grep 'SUBNET2' ${OUTPUT_DIR}aws.variables.txt | cut -d '=' -f 2)
SECURITY_GROUP_ID=$(grep 'SECURITY_GROUP_ID' ${OUTPUT_DIR}aws.variables.txt | cut -d '=' -f 2)
INTERNET_GATEWAY_ID=$(grep 'INTERNET_GATEWAY_ID' ${OUTPUT_DIR}aws.variables.txt | cut -d '=' -f 2)
TARGET_GROUP_ARN=$(grep 'TARGET_GROUP_ARN' ${OUTPUT_DIR}aws.variables.txt | cut -d '=' -f 2)
EC2_INSTANCE_IDS=$(grep 'EC2_INSTANCE_IDS' ${OUTPUT_DIR}aws.variables.txt | cut -d '=' -f 2)
LOAD_BALANCER_ARN=$(grep 'LOAD_BALANCER_ARN' ${OUTPUT_DIR}aws.variables.txt | cut -d '=' -f 2)

# Destroy EC2 Instances
echo "Deleting EC2 Instances..."
aws --output json ec2 terminate-instances --instance-ids ${EC2_INSTANCE_IDS} && \
  echo "EC2 Instances: ${EC2_INSTANCE_IDS} deleting..."

echo "Waiting for EC2 Instances to be deleted..."
aws --output json ec2 wait instance-terminated \
  --instance-ids ${EC2_INSTANCE_IDS} && \
  echo "EC2 Instances: ${EC2_INSTANCE_IDS} deleted"

# Destroy S3_BUCKET_RAW_IMAGE 
echo "Deleting Raw Image s3 bucket..."
aws s3 rb s3://${S3_BUCKET_RAW_IMAGE} --force && \
  echo "Bucket: ${S3_BUCKET_RAW_IMAGE} deleted"

# Destroy S3_BUCKET_POST_IMAGE 
echo "Deleting Post Image s3 bucket..."
aws s3 rb s3://${S3_BUCKET_POST_IMAGE} --force && \
  echo "Bucket: ${S3_BUCKET_POST_IMAGE} deleted"

# Destroy RDS database
echo "Deleting DB Instance..."
aws --output json rds delete-db-instance \
  --db-instance-identifier ${RDS_DB_NAME} \
  --skip-final-snapshot

# Wait for DB Instance to be Deleted
echo "Waiting for DB Instance to be deleted..."
aws --output json rds wait db-instance-deleted \
  --db-instance-identifier ${RDS_DB_NAME} && \
  echo "RDS: ${RDS_DB_NAME} deleted"

# Deregister Targets from Group
IP_ADDRESS1="$(grep 'EC2_IP_ADDRESSES' ${OUTPUT_DIR}aws.variables.txt | cut -d '=' -f 2 | cut -d ' ' -f 1) "
IP_ADDRESS2="$(grep 'EC2_IP_ADDRESSES' ${OUTPUT_DIR}aws.variables.txt | cut -d '=' -f 2 | cut -d ' ' -f 2)"
echo "Deregistering Targets..."
aws elbv2 deregister-targets \
    --target-group-arn ${TARGET_GROUP_ARN} \
    --targets "Id=${IP_ADDRESS1},Port=80" "Id=${IP_ADDRESS2,Port=80}"

# Delete Targets deregistered
echo "Waiting for Targets to deregister..."
aws elbv2 wait target-deregistered \
  --target-group-arn ${TARGET_GROUP_ARN} \
  --targets "Id=${IP_ADDRESS1},Port=80" "Id=${IP_ADDRESS2,Port=80}" && \
  echo "Target group: ${TARGET_GROUP_ARN} deleted"

# Destroy ELB load balancer
echo "Deleting ELB load balancer..."
aws elbv2 delete-load-balancer \
  --load-balancer-arn ${LOAD_BALANCER_ARN} 

echo "Waiting for ELB load balancer to be deleted..."
aws --output json elbv2 wait load-balancers-deleted \
--load-balancer-arns ${LOAD_BALANCER_ARN} && \
  echo "ELB: ${ELB_NAME} deleted"

# Delete DB Subnet Group
echo "Deleting DB Subnet Group..."
aws --output json rds delete-db-subnet-group \
  --db-subnet-group-name ${RDS_SUBNET_NAME}

# Delete Target Group
echo "Deleting Target Group..."
aws --output json elbv2 delete-target-group \
  --target-group-arn ${TARGET_GROUP_ARN} && \
  echo "Target Group: ${TARGET_GROUP_ARN} deleted"

echo "Making sure dependencies are deleted..."
sleep 100s

# Delete Subnets
echo "Deleting Subnet 1..."
aws ec2 delete-subnet \
  --subnet-id ${SUBNET1} && \
  echo "Subnet: ${SUBNET1} deleted"

echo "Deleting Subnet 2..."
aws ec2 delete-subnet \
  --subnet-id ${SUBNET2} && \
  echo "Subnet: ${SUBNET2} deleted"

echo "Making sure subnets are deleted..."
sleep 30s

# Detach Internet Gatway
echo "Detaching Internet Gateway..."
aws ec2 detach-internet-gateway \
  --internet-gateway-id ${INTERNET_GATEWAY_ID} \
  --vpc-id ${VPC_ID} && \
  echo "Internet Gateway: ${INTERNET_GATEWAY_ID} detached"

# Delete Internet Gateway
echo "Deleting Internet Gateway..."
aws ec2 delete-internet-gateway \
  --internet-gateway-id ${INTERNET_GATEWAY_ID} && \
  echo "Internet Gateway ${INTERNET_GATEWAY_ID} deleted"

# Delete Security Group
echo "Deleting Security Group..."
aws ec2 delete-security-group \
  --group-id ${SECURITY_GROUP_ID} && \
  echo "Security Group: ${SECURITY_GROUP_ID} deleted"

# Delete VPC
echo "Deleting VPC"
aws ec2 delete-vpc \
  --vpc-id ${VPC_ID} && \
  echo "VPC ${VPC_ID} deleted"
