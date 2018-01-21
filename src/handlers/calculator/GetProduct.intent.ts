import * as Log4js from 'log4js';
import { ISnipsIntent } from '../../interfaces/ISnipsIntent';
import { AwsSpeaker } from '../../speakers/Aws.speaker';

export class GetProductIntent implements ISnipsIntent {

    private _logger: Log4js.Logger;
    private _payload: any;
    
    constructor() {
        this._logger = Log4js.getLogger();
    }

    public Init(payload: any): void {
        this._payload = payload;
    }

    public Play(): void {
        const result = this._payload.slots[0].value.value * this._payload.slots[1].value.value;
        this._logger.info("Result is %s", result);
        const speaker = new AwsSpeaker();
        speaker.Speak("Result is " + result);
    }
}