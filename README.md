#nshare-demon.js

A background demon for the nshare project.

This can receive packets from other nshare-apps.

#How to install.

1. Install NodeJS(https://nodejs.org/download/)
2. Then do: `npm install nshare-demon -g`

#Start it.

Ubuntu.
3.cd `/usr/local/lib/node_modules/nshare-demon && sudo npm start`

Then you are DONE.. :)


Now to can try the [nshare-chrome-extension](https://chrome.google.com/webstore/detail/nshare/lecapbjobhaloanokngngalcngdpklcf)

#How to use the nshare-demon.js rest API.

RestServer / httpServer runs by default on port 12340.

(GET) [URL]:12340/packets -> get all packet send to this nshare client.
	
(POST) [URL]:12340/clear -> Delete all packet send to this nshare client.

(POST) [URL]:12340 with key and value(fromip, url) -> new create a new packet.


#Other related apps.

[nshare-chrome-extension](https://chrome.google.com/webstore/detail/nshare/lecapbjobhaloanokngngalcngdpklcf)

[nshare-on-android](https://play.google.com/store/apps/details?id=com.voidcode.nshare)