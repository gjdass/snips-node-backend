import * as AWS from 'aws-sdk';
import * as Speaker from 'speaker';
import * as Stream from 'stream';
import * as Log4js from 'log4js';
import { ISpeaker } from '../interfaces/ISpeaker';

export class AwsSpeaker implements ISpeaker {

    private _speaker: Log4js.Logger;
    
    constructor() {
        this._speaker = Log4js.getLogger();
    }

    public Speak(toSay: string): void {
        this._speaker.debug("Speaker called with : \"%s\"", toSay);
        let params = {
            'Text': toSay,
            'OutputFormat': 'pcm',
            'VoiceId': 'Joanna'
        };
        // Create an Polly client
        const Polly = new AWS.Polly({
            signatureVersion: 'v4',
            region: 'eu-west-3'
        });
        // Create the Speaker instance
        const Player = new Speaker({
            channels: 1,
            bitDepth: 16,
            sampleRate: 16000
        });
        Polly.synthesizeSpeech(params, (err, data) => {
            if (err) {
                console.log(err.code);
            } else if (data) {
                if (data.AudioStream instanceof Buffer) {
                    // Initiate the source
                    var bufferStream = new Stream.PassThrough();
                    // convert AudioStream into a readable stream
                    bufferStream.end(data.AudioStream);
                    // Pipe into Player
                    bufferStream.pipe(Player);
                }
            }
        });
    }
    
}