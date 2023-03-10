/* eslint-disable @typescript-eslint/ban-ts-comment */
import TypedMqtt from "../src";

/**
 * testing is broken currently because of the `react_native_mqtt`-package
 */

const mqtt = new TypedMqtt<{
  "/path/*/path": string;
  "/path/a/path": number;
  "/*/path": number;
}>();

mqtt.connect({ url: "", port: 44 });

describe("mqtt.send", () => {
  it("should give type-error when static path is invalid", async () => {
    // @ts-expect-error
    mqtt.send("/path/1/1/path", 0);
  });
  it("should give type-error when incorrect type is sent", async () => {
    // @ts-expect-error
    mqtt.send("/path/1/path", 0);
  });
  it("should not give type-error when overlapping routes create union of valid types", async () => {
    mqtt.send("/path/a/path", 0);
    mqtt.send("/path/a/path", "string");
  });
  it("should not give type-error when correct type is sent", async () => {
    mqtt.send("/path/1/path", "string");
    mqtt.send("/path/a/path", 0);
  });
});

describe("mqtt.subscribe", () => {
  it("should give type-error when invalid path is subscribed", async () => {
    // @ts-expect-error
    mqtt.subscribe("/path/1/1/path", args => args);
  });
  it("should give type-error when incorrect parameter-type is assumed", async () => {
    // @ts-expect-error
    mqtt.subscribe("/path/1/path", (args: number) => args);
  });
  it("should give type-error when overlapping routes are not considered", async () => {
    mqtt.subscribe("/path/a/path", args => {
      // @ts-expect-error
      args.split("");
    });
  });
  it("should not give type-error when overlapping routes creates union of valid types", async () => {
    mqtt.subscribe("/path/a/path", (args: number | string) => args);
  });
  it("should not give type-error when correct parameter-type is assumed", async () => {
    mqtt.subscribe("/path/1/path", (args: string) => args);
    mqtt.subscribe("/path/1/path", args => args);
  });
});

describe("mqtt.unsubscribe", () => {
  it("should give type-error when invalid path is unsubscribed", async () => {
    // @ts-expect-error
    mqtt.unsubscribe("/path/1/1/path");
  });
  it("should not give type-error when valid path is unsubscribed", async () => {
    mqtt.subscribe("/path/1/path", (args: string) => args);
    mqtt.subscribe("/path/1/path", args => args);
  });
});
