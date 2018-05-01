import * as Config from "config";
import * as Mqtt from "mqtt";
import { MqttClient } from "mqtt";

export class MqttHelper {

    static GetClient(address: string = ""): MqttClient {
        if (address == "")
            address = Config.get("snips.address") as string;
        return Mqtt.connect("mqtt://" + address);
    }

}