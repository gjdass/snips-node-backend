import { PayloadHelper } from './../helpers/Payload.helper';
import { MqttHelper } from './../helpers/Mqtt.helper';
import { ISnipsHandler } from "../interfaces/ISnipsHandler";
import * as Log4js from "log4js";
import { ISnipsIntent } from "../interfaces/ISnipsIntent";
import { MqttClient } from "mqtt";

export abstract class BaseHandler implements ISnipsHandler {

    protected _intents: { [intentName: string]: ISnipsIntent } = {};
    protected _logger: Log4js.Logger;
    protected _client: MqttClient;

    constructor() {
        this._logger = Log4js.getLogger();
        this._client = MqttHelper.GetClient();
    }

    Activate(intentName: string, payload: any): void {
        const intentObj = this._intents[intentName];
        if (!intentObj)
        {
            this._logger.warn("Intent [%s] does not exist in Handler [%s]", intentName, typeof(this))
            return;
        }
        intentObj.Init(payload);
        intentObj.Play();
        // for now, this disables the opportunity to perform some dialogs, since the session will end at the first intent
        // will work on that later, when dialogs will be handled by the API
        this._client.publish("hermes/dialogueManager/endSession", JSON.stringify(PayloadHelper.GetSessionIdObj(payload)));
    };

    public Contains(intentName: string): boolean {
        return this._intents[intentName] !== undefined && this._intents[intentName] !== null;
    }
    
}