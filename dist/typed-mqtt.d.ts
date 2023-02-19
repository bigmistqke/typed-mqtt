// Generated by dts-bundle-generator v7.2.0

/**
 * TODO: find replacement for `react_native_mqtt`
 *
 *    `react_native_mqtt` does not have proper typescript-support
 *    and works by polluting the global namespace with `Paho`
 *
 */
export type MapParts<Part> = Part extends "*" ? string : Part;
export type Parts<Path> = Path extends `${infer PartA}/${infer PartB}` ? [
	MapParts<PartA>,
	"/",
	...Parts<PartB>
] : [
	Path
];
export type ParseKeysObject<T extends Record<string, unknown>> = {
	[K in keyof T]: [
		Parts<K>,
		T[K]
	];
} & {};
export type PickKeysByValueType<T, PathParts extends unknown[]> = {
	[K in keyof T]: T[K] extends [
		infer Path extends string[],
		infer Value extends unknown
	] ? PathParts extends Path ? Value : never : never;
}[keyof T];
export type FindPath<T, Path> = PickKeysByValueType<T, Parts<Path>>;
declare class _TypedMqtt<T extends {}, U extends {}> {
	private connection_data?;
	private offline_messages;
	private subscriptions;
	isConnected: boolean;
	client?: any;
	constructor();
	connect: ({ protocol, url, port, }: {
		protocol?: string | undefined;
		url: string;
		port: number;
	}) => Promise<boolean>;
	reconnect: () => any;
	disconnect: () => any;
	private storeMessage;
	send: <Path extends string, Result extends FindPath<U, Path>>(topic: Path & (Result extends never ? never : Path), data: Result) => void;
	subscribe: <Path extends string, Result extends FindPath<U, Path>>(topic: Path & (Result extends never ? never : Path), callback: Result extends never ? never : (value: Result) => void) => void;
	unsubscribe: <Path extends string, Result extends FindPath<U, Path>>(topic: Path & (Result extends never ? never : Path)) => void;
}
export default class TypedMqtt<T extends {}> extends _TypedMqtt<T, ParseKeysObject<T>> {
	constructor();
}

export {};
