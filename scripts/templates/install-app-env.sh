# Environment vars
cat <<EOT >> /etc/environment
S3_BUCKET_RAW_IMAGE="$S3_BUCKET_RAW_IMAGE"
S3_BUCKET_POST_IMAGE="$S3_BUCKET_POST_IMAGE"
RDS_USERNAME=$RDS_USERNAME
RDS_DB_NAME="$RDS_DB_NAME"
RDS_DB_PASSWORD="$RDS_DB_PASSWORD"
RDS_PORT="$RDS_PORT"
EOT

# Installl applications
sudo apt-get install libcap2-bin
sudo setcap cap_net_bind_service=+ep /usr/local/bin/node

cat <<EOT > ~/.ssh/config
Host github.com
User git
Port 22
Hostname github.com
IdentityFile /home/ubuntu/.ssh/aws-midterm-project.pem
TCPKeepAlive yes
IdentitiesOnly yes
StrictHostKeyChecking no
EOT

cat <<EOT > /home/ubuntu/.ssh/config
Host github.com
User git
Port 22
Hostname github.com
IdentityFile /home/ubuntu/.ssh/aws-midterm-project.pem
TCPKeepAlive yes
IdentitiesOnly yes
StrictHostKeyChecking no
EOT