# typed-mqtt

A typesafe wrapper around `MQTT`-clients.<br/>

- Describe the valid paths and their respective types of data.
- Dynamic paths with wildcards `*` are supported
- JSON-serialisation and -parsing done behind the screens
- Typesafe:
  - Get type-errors when invalid paths are being subscribed to.
  - Get type-errors when data is send to invalid paths.
  - Get type-errors when invalid data is sent to a valid path.

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

// type-error: invalid path
// Argument of type 'string' is not assignable to parameter of type 'never'.
mqtt.send("/poth/1/path", 0)
// type-error: invalid value-type
// Argument of type 'number' is not assignable to parameter of type 'string'
mqtt.send("/path/1/path", "test")

// type-error: invalid path
// Argument of type 'string' is not assignable to parameter of type 'never'.
mqtt.subscribe("/poth/1/path", (arg) => {})

mqtt.subscribe("/path/1/path", (arg) => {
  // type-error: invalid value-type
  // 'split' does not exist on type 'number'
  arg.split('/')
})
```

Overlapping paths creates a union of types.

```tsx
import TypedMqtt from 'typed-mqtt'

const mqtt = new TypedMqtt<{
  "/path/*/path": number;
  "/path/a/path": string;
}>();

// no type-error
mqtt.send("/path/a/path", "a")
mqtt.send("/path/random/path", 0)

// no type-error: 'a' is also valid to `*`
mqtt.send("/path/a/path", 0)

// type-error: `/path/*/path` only accepts `number`
// Argument of type 'string' is not assignable to parameter of type 'number'
mqtt.send("/path/random/path", "a")

mqtt.subscribe("/path/a/path", (arg) => {
  // type-error: `/path/a/path` fits `/path/a/path` and `/path/*/path`, so the type of arg is `string` | `number`
  // 'split' does not exist on type 'number'
  arg.split('/')
})

mqtt.subscribe("/path/random/path", (arg) => {
  // no type-error: `/path/random/path` only fits `/path/*/path`, so the type of arg is `number`
  arg * 2
})
```

## TODO

This repo is currently a wrapper around `react_native_mqtt` which I was using in a react-native project. `react_native_mqtt` has no typescript-support and pollutes the global namespace in order for it to work. This makes testing this library impossible. 

For now I will not develop this library further (was mostly a little typescript-exercise), but might come back to it if I ever need to use `MQTT` again. In that case I will either make my own wrapper around `Paho`, like `react_native_mqtt`, or build a `TypedMqtt`-factory that accepts any `MQTT`-implementation and returns a `TypedMqtt`.

In case I would continue developing I would move away from setting generics directly and instead use `zod` to describe the schema and do validation. I would also consider adding something like `superjson` to allow for more types of data to be serialized.
