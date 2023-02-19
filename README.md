# typed-mqtt

A typesafe wrapper around MQTT-clients.<br/>

- Describe the valid paths and their respective types of data.
- Dynamic paths with wildcards are supported
- Get type-errors if invalid paths are being subscribed to or data sent to.
- Get type-errors if incorrect data is sent to a valid path.

## Quick start

Use it:

```tsx
import TypedMqtt from 'typed-mqtt'

const mqtt = new TypedMqtt<{
  "/path/*/path": number;
}>();

mqtt.connect({ protocol: "ws" | "wss", url: "url_to_your_broker", port: 44 });

// no type-error
mqtt.send("/path/1/path", 0)
mqtt.send("/path/2/path", 0)
mqtt.subscribe("/path/1/path", (arg) => {})

// type-error: incorrect path
mqtt.send("/poth/1/path", 0)
// type-error: incorrect value-type
mqtt.send("/path/1/path", "test")

// type-error: incorrect path
mqtt.subscribe("/poth/1/path", (arg) => {})

mqtt.subscribe("/path/1/path", (arg) => {
  // type-error: incorrect value-type
  // 'split' does not exist on type 'number'
  arg.split('/')
})
```

## TODO

This repo is currently a wrapper around `react_native_mqtt` which I was using in a react-native project. `react_native_mqtt` has no typescript-support and pollutes the global namespace in order for it to work. This makes testing this library impossible.

I currently will not develop this library further, but might come back to it if I ever need to use MQTT again. In that case I will either make my own wrapper around `Paho`, like `react_native_mqtt`, or build a `TypedMqtt`-factory in which you can pass in any `MQTT`-implementation and it returns a `TypedMqtt`.