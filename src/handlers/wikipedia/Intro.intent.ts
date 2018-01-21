import { BaseIntent } from "../Base.intent";
import Http from "axios";

export class IntroIntent extends BaseIntent {

    Init(payload: string): void {
        this._payload = payload;
    }

    Play(): void {
        this._speaker.Speak("Reaching wikipedia");
        var encoded = encodeURIComponent(this._payload.slots[0].rawValue);
        const url = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&exsentences=3&titles=" + encoded;
        const promise = Http.get(url);
        promise.then(res => {
            var pageID = Object.keys(res.data.query.pages)[0];
            this._speaker.Speak(res.data.query.pages[pageID].extract);
        });
    }
    
}