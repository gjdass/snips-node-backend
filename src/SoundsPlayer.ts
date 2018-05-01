import * as fs from 'fs';
import * as path from 'path';
import * as Lame from 'lame';
import * as Speaker from 'speaker';

export class SoundsPlayer {

    // open sound
    private _openSoundPath = path.join(__dirname, '..', 'sounds', 'open.mp3');
    private _closeSoundPath = path.join(__dirname, '..', 'sounds', 'close.mp3');
    private _openSoundStream: fs.ReadStream;

    constructor() {
    }

    public Play(type: string) {
        const player = new Speaker();
        const decoder = Lame.Decoder();
        switch(type) {
            case 'startListening':
                this._openSoundStream = fs.createReadStream(this._openSoundPath);
                this._openSoundStream.pipe(decoder).pipe(player);
                break;
            case 'textCaptured':
                this._openSoundStream = fs.createReadStream(this._closeSoundPath);
                this._openSoundStream.pipe(decoder).pipe(player);
                break;
        }
    }
}