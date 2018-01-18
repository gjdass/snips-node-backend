var mqtt = require('mqtt');
var voice = require('say');
// Load the SDK
const AWS = require('aws-sdk');
const Stream = require('stream');
const Speaker = require('speaker');

// Create an Polly client
const Polly = new AWS.Polly({
    signatureVersion: 'v4',
    region: 'eu-west-3'
});
// Create the Speaker instance
const Player = new Speaker({
    channels: 1,
    bitDepth: 16,
    sampleRate: 16000
});

const PiIp = "192.168.0.29:1883";

var mqtt_client = mqtt.connect('mqtt://' + PiIp);

// // Subscribe to the important messages
// mqtt_client.on('connect', function () {
//     mqtt_client.subscribe('#');
// });

// mqtt_client.on('message', function (topic, message) {
//     console.log(' -  ' + topic + ': ' + message.toString());
// });

mqtt_client.on("connect", () => {
    mqtt_client.subscribe("#");
    console.log("Connected to mqtt [" + PiIp + "] ...")
});

mqtt_client.on("message", (topic, message) => {
    if (topic.toString() === 'hermes/audioServer/default/audioFrame')
        return;
    //console.log("Intent : " + topic.toString());
    if (topic.startsWith("hermes/intent")) {
        var request = JSON.parse(message.toString());
        console.log(message.toString());
        //console.log(request.input);
        speak('You said ' + request.input);
        //voice.speak("You said " + request.input);
    }
    if (topic === "hermes/nlu/intentNotRecognized") {
        console.log(message.toString());
        speak("I didn't understand you request, sorry. Let's try again !");
    }
});

function speak(toSay) {
    let params = {
        'Text': toSay,
        'OutputFormat': 'pcm',
        'VoiceId': 'Joanna'
    };
    Polly.synthesizeSpeech(params, (err, data) => {
        if (err) {
            console.log(err.code)
        } else if (data) {
            if (data.AudioStream instanceof Buffer) {
                // Initiate the source
                var bufferStream = new Stream.PassThrough()
                // convert AudioStream into a readable stream
                bufferStream.end(data.AudioStream)
                // Pipe into Player
                bufferStream.pipe(Player)
            }
        }
    });
}