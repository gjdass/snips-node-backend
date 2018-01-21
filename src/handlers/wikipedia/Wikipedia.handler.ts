import { BaseHandler } from '../Base.handler';
import { IntroIntent } from './Intro.intent';

export class WikipediaHandler extends BaseHandler {

    constructor() {
        super();
        this._intents = {
            "Intro": new IntroIntent()
        };
    }

}