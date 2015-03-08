#This is the background-demon.

PacketServer / udpServer runs by default on port 12345.

RestServer / httpServer runs by default on port 12340.

#How to install.

1. Install NodeJS(https://nodejs.org/download/)
2. Then do: `npm install nshare-demon`
3. Start the demon: `node nshare-demon.js`

#Run nshare-demon.js as background-demon with PM2.

1. `npm install -g pm2`
2. `pm2 start nshare-demon.js`


#How to use the nshare-demon.js rest API.

1. (GET) [URL]:12340/packets -> get all packet send to this nshare client.
	
2. (POST) [URL]:12340/clear -> Delete all packet send to this nshare client.

3. (POST) [URL]:12340 with key and value(fromip, url) -> new create a new packet.

#Other related apps.

[nshare-chrome-extension](https://chrome.google.com/webstore/detail/nshare/lecapbjobhaloanokngngalcngdpklcf)

[nshare-on-android](https://play.google.com/store/apps/details?id=com.voidcode.nshare)


