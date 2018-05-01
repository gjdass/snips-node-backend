__Work in progress__

> **Note** : the wiki and this README are pretty poor for now (in particular for installation and Google/Amazon cloud accounts to create/configure to make this thing work) and I will take time in a near future to explain a bit more what this project is made for, and how to properly install it and make it work.

# snips-node-handlers-api

[![Build Status](https://travis-ci.org/gjdass/snips-node-handlers-api.svg?branch=master)](https://travis-ci.org/gjdass/snips-node-handlers-api)

## Just a start
The aim is to build a full featured and easy to code/understand API to work with [Snips.ai](https://snips.ai), an open source and __privacy compliant__ voice recognition system (with a little bit of help from Google and Amazon just to make text-to-speech and speech-to-text).

## Quick demo
[![Video thumbnail](https://i.ytimg.com/vi/lBsEgB8Cx1g/hqdefault.jpg?sqp=-oaymwEXCPYBEIoBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLC2odg5P4hQ3QeSQm1g9n8A6CIPkQ)](https://youtu.be/lBsEgB8Cx1g)

## Quick start

```bash
$ npm install # to install all dependencies
$ npm run build # to build one time the app
$ npm run watch # to watch changes and recompile the app at each change
$ npm start # to run the app and restart it when 'watch' recompile it (nodemon)
$ node dist/index.js # to run the app (won't restart when a change occurs)
```

*May be out of date sometimes* : 

The assistant used in this project is [available here](https://cloud.gjdass.fr/index.php/s/CkPlTyrG3WXTrB9). It will be updated over time when the project will handle more and more requests.
You can also of course build your own in your snips admin console.

## What you need

* A Raspberry-pi, or a Linux machine, with raspbian/debian on it
* To install snips on it (see their doc, maybe i'll write some here one day)
* An AWS account (free one) to use Polly text-to-speech
* A Google Cloud account to replace the Snips ASR which is pretty poor in vocabulary (had trouble with a lot of requests)
* Configure snips to use Google ASR instead of Snips own ASR (see links bellow)
* Clone this repo
* Start to have fun

See [the wiki](https://github.com/gjdass/snips-node-handlers-api/wiki) for more informations.

## Links

* [Getting Started with Amazon Polly using Node.js](https://medium.com/@anaptfox/getting-started-with-amazon-polly-using-node-js-345e84dbd23d)
* [Use Google Cloud services instead of Snips ASR](https://snips.gitbook.io/documentation/advanced-configuration/asr)