import { ISnipsIntent } from './../../interfaces/ISnipsIntent';
import { GetProductIntent } from './GetProduct.intent';
import { GetQuotientIntent } from './GetQuotient.intent';
import { GetDifferenceIntent } from './GetDifference.intent';
import { GetSumIntent } from './GetSum.intent';
import { BaseHandler } from '../Base.handler';

export class CalculatorHandler extends BaseHandler {

    constructor() {
        super();
        this._intents = {
            "GetProduct": new GetProductIntent(),
            "GetQuotient": new GetQuotientIntent(),
            "GetDifference": new GetDifferenceIntent(),
            "GetSum": new GetSumIntent()
        };
    }

}