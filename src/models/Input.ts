import * as Lodash from 'lodash';
export class Input {
    public Subject: string;
    public Action: string;

    constructor(topic: string) {
        this.Subject = this.GetSubject(topic);
        this.Action = this.GetAction(topic);
    }

    private GetSubject(topic: string): string {
        var split = Lodash.split(topic, "/");
        if (split.length < 3)
            throw new Error("Intent topic " + topic + " is not a 3 parts topic");
        return split[1];
    }

    private GetAction(topic: string): string {
        var split = Lodash.split(topic, "/");
        if (split.length < 3)
            throw new Error("Intent topic " + topic + " is not a 3 parts topic");
        return split[2];
    }
}