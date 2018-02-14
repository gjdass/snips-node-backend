import { BaseIntent } from "../Base.intent";
import Http from "axios";

export class IntroIntent extends BaseIntent {

    Init(payload: string): void {
        this._payload = payload;
    }

    Play(): void {
        this._speaker.Speak("Reaching wikipedia");
        var encoded = encodeURIComponent(this._payload.slots[0].rawValue);
        const searchUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + encoded;
        const queryUrl = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&exsentences=3&titles=";
        Http.get(searchUrl)
            .then(res => {
                const wikiWord = encodeURIComponent(res.data[1][0]);
                this._logger.info("GET %s", queryUrl + wikiWord)
                Http.get(queryUrl + wikiWord)
                    .then(result => {
                        var pageID = Object.keys(result.data.query.pages)[0];
                        this._speaker.Speak(result.data.query.pages[pageID].extract);
                    });
            });
    }
    
}