import { MqttConnector } from './MqttConnector';
import * as Log4js from "log4js";
import * as Mqtt from "mqtt";
import * as Config from "config";

export class App {

    private _logger: Log4js.Logger;
    private _name: string;
    private _snipsIp: string;
    private _mqttConnector: MqttConnector;

    constructor(name: string) {
        this._logger = Log4js.getLogger();
        this._name = name;
        this._snipsIp = Config.get("snips.address") as string;
        this._mqttConnector = new MqttConnector();
    }

    public Start() {
        this._logger.info("Starting application [%s] ...", this._name);
        this._mqttConnector.Connect(this._snipsIp);
    }

    
    public Stop() {
        this._logger.info("Stopping applications [%s] ...", this._name);
        this._mqttConnector.Disconnect();
    }
    
}