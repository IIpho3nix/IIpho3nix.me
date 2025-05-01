/_
Title: Trapping brute force attacks with endlessh
Description: lets set up a endlessh tarpit to make brute force attacks wait for a absurdly long time to get no results
Author: IIpho3nix
Date: 2025-05-01
Read-time: 20 min
_/

# Trapping brute force attacks with endlessh

## what exactly is a tarpit?

A tarpit is basically a server that purposefully delays and sends garbage data back to a client. this traps poorly-coded brute force attacks for a long time, and prevents them from actually bothering a real server.

## why have a tarpit?

do you like wasting time of others? yes? thats what a tarpit is for!

## setting up endlessh

this guide assumes you already have your sshd set up in a non-standart (not listening on port 22) port, if you don't, go ahead and do that first.

first we will compile [endlessh](https://github.com/skeeto/endlessh) from source:

for my case for debian, you need libc6-dev, so lets go get that:

```bash
sudo apt-get install libc6-dev
```

now lets compile endlessh:

```bash
git clone https://github.com/skeeto/endlessh.git
cd endlessh
make
```

then lets move the binary to /usr/local/bin:

```bash
sudo mv endlessh /usr/local/bin/endlessh
```

then, we will need to set up a systemd service file for endlessh, conveniently, endlessh has one already, but we will need to modify it to work in debian:

heres the default service file:

```ini
[Unit]
Description=Endlessh SSH Tarpit
Documentation=man:endlessh(1)
Requires=network-online.target

[Service]
Type=simple
Restart=always
RestartSec=30sec
ExecStart=/usr/local/bin/endlessh
KillSignal=SIGTERM

# Stop trying to restart the service if it restarts too many times in a row
StartLimitInterval=5min
StartLimitBurst=4

StandardOutput=journal
StandardError=journal
StandardInput=null

PrivateTmp=true
PrivateDevices=true
ProtectSystem=full
ProtectHome=true
InaccessiblePaths=/run /var

## If you want Endlessh to bind on ports < 1024
## 1) run: 
##     setcap 'cap_net_bind_service=+ep' /usr/local/bin/endlessh
## 2) uncomment following line
#AmbientCapabilities=CAP_NET_BIND_SERVICE
## 3) comment following line
PrivateUsers=true

NoNewPrivileges=true
ConfigurationDirectory=endlessh
ProtectKernelTunables=true
ProtectKernelModules=true
ProtectControlGroups=true
MemoryDenyWriteExecute=true

[Install]
WantedBy=multi-user.target
```

and heres our modified one to work in debian:

```ini
[Unit]
Description=Endlessh SSH Tarpit
Documentation=man:endlessh(1)
Requires=network-online.target

[Service]
Type=simple
Restart=always
RestartSec=30sec
ExecStart=/usr/local/bin/endlessh
KillSignal=SIGTERM

# Stop trying to restart the service if it restarts too many times in a row
StartLimitInterval=5min
StartLimitBurst=4

StandardOutput=journal
StandardError=journal
StandardInput=null

PrivateTmp=true
PrivateDevices=true
ProtectSystem=full
ProtectHome=true
InaccessiblePaths=/var

## If you want Endlessh to bind on ports < 1024
## 1) run:
##     setcap 'cap_net_bind_service=+ep' /usr/local/bin/endlessh
## 2) uncomment following line
AmbientCapabilities=CAP_NET_BIND_SERVICE
## 3) comment following line
#PrivateUsers=true

NoNewPrivileges=true
ConfigurationDirectory=endlessh
ProtectKernelTunables=true
ProtectKernelModules=true
ProtectControlGroups=true
MemoryDenyWriteExecute=true

[Install]
WantedBy=multi-user.target
```

lets move the modified service file to /etc/systemd/system/endlessh.service:

```bash
sudo mv endlessh.service /etc/systemd/system/endlessh.service
```

then we will grant endlessh permission to bind on ports < 1024:

```bash
sudo setcap 'cap_net_bind_service=+ep' /usr/local/bin/endlessh
```

and then we will configure endlessh to work on port 22, in my case i also enabled logging and lowered max clients to 64:

first, lets make a config file:

```bash
mkdir -p /etc/endlessh
touch /etc/endlessh/config
```

then, open it in a editor of your choice:

```bash
sudo nvim /etc/endlessh/config
```

and configure it like so:

```text
Port 22
MaxClients 64
LogLevel 1
```

then, lets enable the service and start it:

```bash
sudo systemctl enable endlessh.service
sudo systemctl start endlessh.service
```

now lets see if it works:

```bash
sudo systemctl status endlessh.service
```

if you see "Active: active (running)" then it works!

## testing endlessh

now, lets test if endlessh works from our own machine:

```bash
ssh -vv (your server ip)
```

if it works, you will get random ssh banner data very slowly like so:

```text
debug1: kex_exchange_identification: banner line 0: qpFx)}T%&`I
debug1: kex_exchange_identification: banner line 1: n$h
debug1: kex_exchange_identification: banner line 2: *4s<ETB!{{\\tOS
debug1: kex_exchange_identification: banner line 3: g?2g)eZ$qSu\\@q$R HIbmSs)fF9
debug1: kex_exchange_identification: banner line 4: B~ee_>F'o
```

congratulations, now you can live with the satisfaction of wasting the time of brute force scripts trying to connect to your server.

you can also view the logs with:

```bash
sudo journalctl -t endlessh -r
```

thats all for now, see you next time!