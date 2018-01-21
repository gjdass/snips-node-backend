import {AwsSpeaker} from '../speakers/Aws.speaker';
import { ISnipsIntent } from "../interfaces/ISnipsIntent";
import * as Log4js from 'log4js';

export abstract class BaseIntent implements ISnipsIntent {

    protected _logger: Log4js.Logger;
    protected _payload: any;
    protected _speaker: AwsSpeaker;

    constructor() {
        this._logger = Log4js.getLogger();
        this._speaker = new AwsSpeaker();
    }

    abstract Init(payload: string): void;

    abstract Play(): void;
    
}