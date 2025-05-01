/_
Title: How to set up your own ngrok
Description: in this blog post explain how to set up your own custom self-hosted port tunneling server
Author: IIpho3nix
Date: 2025-05-01
Read-time: 25 min
_/

# How to set up your own ngrok

so, you apparently need a self-hosted tunneling server, eh? then you've come to the right place!

in this blog post i'll show you how to set up your own custom self-hosted port tunneling server using [bore](https://github.com/ekzhang/bore)

Things you are going to need are:

- a linux server with a port range of your choice allowed through your firewall
- a computer (ideally, probably can use a actual potato too if it can run ssh)
- 25 minutes of patience

so let's get started!

## Step 1: Install bore

you should install the right version of bore for your cpu architecture into a directory of your choice in your server.

```bash
cd (your path to bore)
wget https://github.com/ekzhang/bore/releases/download/v0.5.3/bore-v0.5.3-x86_64-unknown-linux-musl.tar.gz
tar -xzvf bore-v0.5.3-x86_64-unknown-linux-musl.tar.gz
rm -rf bore-v0.5.3-x86_64-unknown-linux-musl.tar.gz
```

## Step 2: Configuring bore

next, we will configure bore for our server, you can see the options you can use using `bore server --help`

```text
Runs the remote proxy server

Usage: bore server [OPTIONS]

Options:
      --min-port <MIN_PORT>          Minimum accepted TCP port number [env: BORE_MIN_PORT=] [default: 1024]
      --max-port <MAX_PORT>          Maximum accepted TCP port number [env: BORE_MAX_PORT=] [default: 65535]
  -s, --secret <SECRET>              Optional secret for authentication [env: BORE_SECRET]
      --bind-addr <BIND_ADDR>        IP address to bind to, clients must reach this [default: 0.0.0.0]
      --bind-tunnels <BIND_TUNNELS>  IP address where tunnels will listen on, defaults to --bind-addr
  -h, --help                         Print help
```

first of all, lets generate a secret for our server (you can generate this in any way you like, doesn't have to be 32 characters either, but i recommend not making it too short):

```bash
tr -dc 'A-Za-z0-9_@#$%^&*()_+!~`=-{}|[]:;,.<>?/' </dev/urandom | head -c 32; echo "" > ./server.secret
```

dont forget to save your secret, you will need it later!

then, we will create a bash script to start bore (./start-bore.sh) (you should modify the port ranges to your liking, but remember, it is required for port 7835 to be exposed on your firewall so bore can communicate):

```bash
#!/bin/bash
SECRET=$(cat (your path to bore)/server.secret)
(your path to bore)/bore server -s "$SECRET" --min-port 1024 --max-port 65535
```

## Set our installation of bore to start at boot using systemd

now, we will create a systemd service file for bore (/etc/systemd/system/bore.service) then add the following lines to the file:

```ini
[Unit]
Description=Bore Tunnel Server
After=network.target

[Service]
Type=simple
ExecStart=(your path to bore)/start-bore.sh
Restart=on-failure
RestartSec=5
WorkingDirectory=(your path to bore)
User=(your username)
Environment=BORE_SECRET_FILE=(your path to bore)/server.secret

[Install]
WantedBy=multi-user.target
```

now, lets enable the service and start it:

```bash
sudo systemctl enable bore.service
sudo systemctl start bore.service
```

now lets see if it works:

```bash
sudo systemctl status bore.service
```

if everything went well, it should say "bore.service - Active: active (running)".

## Step 3: Connecting to bore

now, on your local machine, after installing bore, you should be able to connect to it using the following command:

```bash
bore local -t (your server ip) -s (your server secret you saved earlier) (port you want to expose on your local machine) -p (port you want to use on your server, you can omit the -p flag if you want to use a random port)
```

and that's it! you got yourself a self-hosted port tunneling server!

dont forget to star [bore](https://github.com/ekzhang/bore) if you liked it on github, for this awesome tool!
