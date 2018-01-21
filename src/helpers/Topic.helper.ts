import * as Lodash from 'lodash';

export class TopicHelper {

    public static GetIntentName(topic: string): string {
        const names = Lodash.split(topic, "/");
        // intent name is the last section of the topic
        return Lodash.last(names);
    }

    public static GetSubjectName(topic: string): string {
        const names = Lodash.split(topic, "/");
        // intent name is the second section of the topic
        return names[1] ? names[1] : "";
    }

}