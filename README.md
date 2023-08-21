# AWS EC2 Project 
- `deploy  app to AWS`
### Step 1 : Upload App to GitHub Release (Optional - Bonus)

1. Create a public GitHub repository for your app if you don't have one.

2. Create a new release in the repository.

3. Attach the `app.tar.gz` package you created to the release.

### Step 2: Launch EC2 Instances

1. Log in to your AWS Management Console.

2. Create an Amazon Machine Image (AMI) of your current EC2 instance 
3. Launch an EC2 instance using the AMI you created, ensuring that your app is installed and configured on this instance.

### Step 3: Configure Auto Scaling Group

1. Create an Auto Scaling Group using the AWS Management Console.
- Choose your AMI as the launch template.
- Configure desired and maximum instance counts.


2. Create an Application Load Balancer (ALB)
- Configure the ALB to listen on the appropriate port (80) and forward traffic to your instances.

### Step 4: Configure systemd and put it in USER DATA 

1. Connect to your EC2 instance using SSH. usin scrip 
- **THE SCRIPT .SH :**
- 
```
#!/bin/bash
set -e

sudo apt update
sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

sudo apt install nodejs curl -y

cd /home/ubuntu
git clone https://github.com/jafar-sweity/Bookmanagement_NodeJs.git app
cd Book\ managment/
cd app && npm install
npm run build

sudo mv ./infrastructure/app.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable app.service
sudo reboot
```

2. Create a systemd service unit file for your app:
 - **THE SERVICE :**
 - 
 ```
 [Unit]
Description=Simple App Service
After=syslog.target
After=network.target

[Service]
AmbientCapabilities=CAP_NET_BIND_SERVICE
Type=simple
User=ubuntu
Group=ubuntu
WorkingDirectory=/home/ubuntu/app
ExecStart=/usr/bin/node ./dist/index.js
Restart=always
Environment=PORT=80

[Install]
WantedBy=multi-user.target
```
