import { CalculatorHandler } from './handlers/calculator/Calculator.handler';
import * as Lodash from 'lodash';
import * as Log4js from 'log4js';
import { ISnipsHandler } from './interfaces/ISnipsHandler';

export class MessageBalancer {

    private _logger: Log4js.Logger;
    private _handlers: { [bundleName: string]: ISnipsHandler } = {
        "Calculator": new CalculatorHandler()
    };

    constructor() {
        this._logger = Log4js.getLogger();
    }

    public Balance(intentName: string, payload: any) {
        this._handlers["Calculator"].Activate(intentName, payload);
    }

}