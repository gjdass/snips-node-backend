import { VariousHandler } from './handlers/various/Various.handler';
import { WikipediaHandler } from './handlers/wikipedia/Wikipedia.handler';
import { CalculatorHandler } from './handlers/calculator/Calculator.handler';
import * as Lodash from 'lodash';
import * as Log4js from 'log4js';
import { ISnipsHandler } from './interfaces/ISnipsHandler';

export class MessageBalancer {

    private _logger: Log4js.Logger;
    private _handlers: { [bundleName: string]: ISnipsHandler } = {
        "gjdass:Calculator": new CalculatorHandler(),
        "gjdass:Wikipedia": new WikipediaHandler(),
        "gjdass:Various": new VariousHandler()
    };

    constructor() {
        this._logger = Log4js.getLogger();
    }

    public Balance(intentName: string, payload: any): void {
        // at this point, intentName is like : <snips-user>:<handler>-<intent>
        const handlerName = this.GetHandlerName(intentName);
        const smallIntentName = this.GetIntentName(intentName);
        if (!this._handlers[handlerName])
        {
            this._logger.error("No handler found for %s", intentName);
            return;
        }
        if (!smallIntentName)
        {
            this._logger.error("No small intent name found in %s", intentName);
            return;
        }
        this._handlers[handlerName].Activate(smallIntentName, payload);
    }

    private GetHandlerName(intentName: string): string {
        const names = Lodash.split(intentName, "-");
        // there should be 2 parts, the left for the handler, the right for the intent
        if (names.length != 2)
            return;
        return names[0];
    }

    private GetIntentName(intentName: string): string {
        const names = Lodash.split(intentName, "-");
        // there should be 2 parts, the left for the handler, the right for the intent
        if (names.length != 2)
            return;
        return names[1];
    }

}