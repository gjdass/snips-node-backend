__Work in progress__

# snips-node-handlers-api

[![Build Status](https://travis-ci.org/gjdass/snips-node-handlers-api.svg?branch=master)](https://travis-ci.org/gjdass/snips-node-handlers-api)

## Just a start
The aim is to build a full featured and easy to code/understand API to work with [Snips.ai](https://snips.ai), an open source and __privacy compliant__ voice recognition system (everything happens locally).

## Quick start

```bash
$ npm install # to install all dependencies
$ npm run build # to build one time the app
$ npm run watch # to watch changes and recompile the app at each change
$ npm start # to run the app and restart it when 'watch' recompile it (nodemon)
$ node dist/index.js # to run the app (won't restart when a change occurs)
```

## What you need

* A Raspberry-pi, or a Linux machine, with raspbian/debian on it
* To install snips on it (see their doc, maybe i'll write some here one day)
* An AWS account (free one) to use Polly text-to-speech
* Clone this repo
* Start to have fun

See [the wiki](https://github.com/gjdass/snips-node-handlers-api/wiki) for more informations.

## Links

* [Getting Started with Amazon Polly using Node.js](https://medium.com/@anaptfox/getting-started-with-amazon-polly-using-node-js-345e84dbd23d)