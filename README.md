# TinyWebDB

AppInventor is a easy way to creating an Android app from web browser.
TinyWebDB API is a AppInventor TinyWebDB API plugin, use you WordPress as a TinyWebDB web service.

TinyWebDB Protocol:

|    Action        |URL                      |Post Parameters  |Response                          |
|------------------|-------------------------|-----------------|----------------------------------|
|    Get Value     |{ServiceURL}/getvalue    |tag              |JSON: ["VALUE","{tag}", {value}]  |
|    Store A Value |{ServiceURL}/storeavalue |tag,value        |JSON: ["STORED", "{tag}", {value}]|


## Getting Started

### Get tags

import requests
result = requests.get("https://tinywebdb-js.glitch.me/tags")
data = result.json()
data

### Get tag

import requests
result = requests.get("https://tinywebdb-js.glitch.me/getvalue?tag=analog-60b72c")
data = result.json()
data

## Post

import requests
result = requests.post("https://tinywebdb-js.glitch.me/storeavalue", params={"Tag":"analog-111111", "Value":"chen"})
result.json()
