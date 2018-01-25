import { BaseHandler } from '../Base.handler';
import { FlipACoinIntent } from './FlipACoin.intent';
import { RollADieIntent } from './RollADie.intent';

export class VariousHandler extends BaseHandler {

    constructor() {
        super();
        this._intents = {
            "FlipACoin": new FlipACoinIntent(),
            "RollADie": new RollADieIntent()
        };
    }

}