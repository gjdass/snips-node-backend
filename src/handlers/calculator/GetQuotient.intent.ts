import * as Log4js from 'log4js';
import { ISnipsIntent } from '../../interfaces/ISnipsIntent';
import { AwsSpeaker } from '../../speakers/Aws.speaker';
import { CalculatorHelper } from './Calculator.helper';

export class GetQuotientIntent implements ISnipsIntent {

    private _logger: Log4js.Logger;
    private _payload: any;
    private _speaker: AwsSpeaker;
    
    constructor() {
        this._logger = Log4js.getLogger();
        this._speaker = new AwsSpeaker();
    }

    public Init(payload: any): void {
        this._payload = payload;
    }

    public Play(): void {
        let result: number[];
        try {
            result = CalculatorHelper.Get2Numbers(this._payload);
        } catch(e) {
            this._speaker.Speak(e.message);
            return;
        }
        const res = result[0] / result[1];
        this._logger.info("Result is %s", res);
        this._speaker.Speak("Result is " + res);
    }
}