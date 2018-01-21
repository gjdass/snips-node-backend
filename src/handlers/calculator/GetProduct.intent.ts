import { CalculatorHelper } from './Calculator.helper';
import { BaseIntent } from '../Base.intent';

export class GetProductIntent extends BaseIntent {
    
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
        const res = result[0] * result[1];
        this._logger.info("Result is %s", res);
        this._speaker.Speak("Result is " + res);
    }
}