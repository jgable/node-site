Deploying
===

Here are some general notes about my current setup/deploy process:

### Server Setup

**TODO**: Make this an ansible playbook

- Install latest updates; `sudo apt-get install && sudo apt-get update`
- Create a new 'web' user
- Install node from source as 'web' user with prefix=~/local

```
echo 'export PATH=$HOME/local/bin:$PATH' >> ~/.bashrc
. ~/.bashrc
mkdir ~/local
mkdir ~/node-latest-install
cd ~/node-latest-install
curl http://nodejs.org/dist/node-latest.tar.gz | tar xz --strip-components=1
./configure --prefix=~/local
make install # ok, fine, this step probably takes more than 30 seconds...
```

- Install build tools
    - `npm install grunt-cli bower -g`
- Clone down the site into /home/web/code/node-site and install dependencies
    - `npm install && bower install`
- Create a new /etc/init.d/nodesite script for the naught service daemon based on the init.d.conf.example
    - `sudo service nodesite start`
- Create a new /etc/nginx/sites-enabled/nodesite config from nginx.conf.example
    - `sudo service nginx reload`

### Updating/Deploying Changes

Currently, the update playbook can pull the latest code and reload the naught daemon.

- `ansible-playbook -i server/deploy/hosts server/deploy/update.yml`