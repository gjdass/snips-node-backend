import { ISnipsHandler } from "../interfaces/ISnipsHandler";
import * as Log4js from "log4js";
import { ISnipsIntent } from "../interfaces/ISnipsIntent";

export abstract class BaseHandler implements ISnipsHandler {

    protected _intents: { [intentName: string]: ISnipsIntent } = {};
    protected _logger: Log4js.Logger;

    constructor() {
        this._logger = Log4js.getLogger();
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
    };

    public Contains(intentName: string): boolean {
        return this._intents[intentName] !== undefined && this._intents[intentName] !== null;
    }
    
}