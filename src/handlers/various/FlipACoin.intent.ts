import { ThreadHelper } from './../../helpers/Thread.helper';
import { BaseIntent } from "../Base.intent";
import Http from "axios";

export class FlipACoinIntent extends BaseIntent {

    Init(payload: string): void {
        this._payload = payload;
    }

    Play(): void {
        var nb = Math.floor((Math.random() * 10) + 1);
        this._speaker.Speak("Ok");
        ThreadHelper.Sleep(1000).then(() => {
            this._speaker.Speak((nb % 2 > 0 ? "Heads" : "Tails"));
        });
    }
    
}