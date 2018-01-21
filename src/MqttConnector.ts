import * as Mqtt from "mqtt";
import * as Log4js from "log4js";
import * as Lodash from "lodash";
import { MqttClient } from "mqtt";
import { MessageBalancer } from "./MessageBalancer";
import { TopicHelper } from './helpers/Topic.helper';

export class MqttConnector {

    private _logger: Log4js.Logger;
    private _client: MqttClient;
    private _address: string;
    private _messageBalancer: MessageBalancer;

    constructor() {
        this._logger = Log4js.getLogger();
        this._messageBalancer = new MessageBalancer();
    }

    public Connect(address: string): void {
        this._address = address;
        this._client = Mqtt.connect("mqtt://" + address);
        this.SetCallbacks();
    }

    public Disconnect(): void {
        this._client.end()
    }

    private SetCallbacks(): void {
        this._logger.info("Setting mqtt callbacks ...");
        // when the connection will be etablished
        this._client.on("connect", () => {
            this._logger.info("Mqtt connected to %s", this._address);
            this._client.subscribe("#");
        });
        // when the connection will be dropped
        this._client.on("offline", () => {
            this._logger.info("Mqtt disconnected from %s", this._address);
        });
        // when we receive a message on the queue
        this._client.on("message", (topic: string, payload: any) => {
            // for each message from Snips, we gonna pass here once
            const subject = TopicHelper.GetSubjectName(topic);
            // we skip every message but intent
            if (subject !== "intent") return;
            const intentName = TopicHelper.GetIntentName(topic);
            this._logger.debug(topic);
            if (!intentName) {
                this._logger.warn("No intent can be extract from the request, SKIPPING");
                return;
            }
            this._logger.info("Received intent=%s", intentName);
            this._messageBalancer.Balance(intentName, JSON.parse(payload));
        });
    }

    private GetSubjectFromTopic(topic: string): string {
        const names = Lodash.split(topic, "/");
        if (!names[1]) return null;
        return names[1];
    }
}