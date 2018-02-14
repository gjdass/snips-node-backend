import { BaseIntent } from "../Base.intent";
import { ThreadHelper } from "../../helpers/Thread.helper";
import { CalculatorHelper } from "../calculator/Calculator.helper";

export class RandomLimit extends BaseIntent {

    Init(payload: string): void {
        this._payload = payload;
    }

    Play(): void {
        let result: number[];
        try {
            result = CalculatorHelper.Get2Numbers(this._payload);
        } catch(e) {
            this._speaker.Speak(e.message);
            return;
        }
        var nb = Math.floor((Math.random() * result[1]) + result[0]);
        this._speaker.Speak("Ok");
        ThreadHelper.Sleep(1000).then(() => {
            this._speaker.Speak(nb.toString());
        });
    }
    
}