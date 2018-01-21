import { App } from "./App";
import * as Config from "config";
import * as Log4js from "log4js";

// get some config values
var appName = Config.get("applicationName") as string;
var log4js = Config.get("log4js.enabled") as boolean;
if (log4js) {
    // set the logger
    Log4js.configure("./config/log4js/" + Config.get("log4js.profile") as string + ".json");
}

var app = new App(appName);

// start the application
app.Start();
