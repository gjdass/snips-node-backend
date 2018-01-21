import { GetSumIntent } from './GetSum.intent';
import { ISnipsIntent } from './../../interfaces/ISnipsIntent';
import * as Log4js from 'log4js';
import { ISnipsHandler } from '../../interfaces/ISnipsHandler';
import { GetProductIntent } from './GetProduct.intent';
import { GetQuotientIntent } from './GetQuotient.intent';
import { GetDifferenceIntent } from './GetDifference.intent';

export class CalculatorHandler implements ISnipsHandler {

    private _intents: { [intentName: string]: ISnipsIntent } = {
        "mika:GetProduct": new GetProductIntent(),
        "mika:GetQuotient": new GetQuotientIntent(),
        "mika:GetDifference": new GetDifferenceIntent(),
        "mika:GetSum": new GetSumIntent()
    };
    private _logger: Log4js.Logger;

    constructor() {
        this._logger = Log4js.getLogger();
    }

    public Activate(intentName: string, payload: any): void {
        const intentObj = this._intents[intentName];
        if (!intentObj)
        {
            this._logger.warn("Intent [%s] does not exist in Handler [%s]", intentName, typeof(this))
            return;
        }
        intentObj.Init(payload);
        intentObj.Play();
    }

    public Contains(intentName: string): boolean {
        return this._intents[intentName] !== undefined && this._intents[intentName] !== null;
    }

}