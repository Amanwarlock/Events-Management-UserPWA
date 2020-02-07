#!/bin/bash
pm2 delete all
#exec fuser -n tcp -k 4200 && fuser -n tcp -k 4300

while fuser -n tcp -k 4200; do
    sleep 2
done


echo "Starting User PWA Portal Angular App ..................."
pm2 start /home/ubuntu/work/user-pwa/pm2Files/dev.yaml --only userpwa
sleep 2


exec pm2 log


# chmod a+x startup.sh

# backend - 3000
# AdminPortal - 4200
# UserPortal - 5000