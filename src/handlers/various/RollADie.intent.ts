import { BaseIntent } from "../Base.intent";
import Http from "axios";
import { ThreadHelper } from "../../helpers/Thread.helper";

export class RollADieIntent extends BaseIntent {

    Init(payload: string): void {
        this._payload = payload;
    }

    Play(): void {
        var nb = Math.floor((Math.random() * 6) + 1);
        this._speaker.Speak("Ok");
        ThreadHelper.Sleep(1000).then(() => {
            this._speaker.Speak(nb.toString());
        });
    }
    
}