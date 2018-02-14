import * as Mqtt from "mqtt";
import * as Log4js from "log4js";
import * as Lodash from "lodash";
import { MqttClient } from "mqtt";
import { MessageBalancer } from "./MessageBalancer";
import { TopicHelper } from './helpers/Topic.helper';
import { Input } from "./models/Input";
import { SoundsPlayer } from './SoundsPlayer';

export class MqttConnector {

    private _logger: Log4js.Logger;
    private _client: MqttClient;
    private _address: string;
    private _messageBalancer: MessageBalancer;
    private _speaker: SoundsPlayer;

    constructor() {
        this._logger = Log4js.getLogger();
        this._messageBalancer = new MessageBalancer();
        this._speaker = new SoundsPlayer();
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
            // this is spamming the bus and we don't care
            if (Lodash.endsWith(topic, "audioFrame")) return;

            // for each message from Snips, we try to split the topic in order
            // to understand what to to next
            const input = new Input(topic);

            // just to log every topic we pass on
            this._logger.debug(topic);

            // now we take action regarding what kind of message we got
            switch(input.Subject) {
                case "intent":
                    // this is the user demands
                    this._messageBalancer.Balance(input.Action, JSON.parse(payload));
                    break;
                case "asr":
                    // this is telling us user is having interactions with the microphone
                    this._speaker.Play(input.Action);
                    break;
            }
        });
    }
}