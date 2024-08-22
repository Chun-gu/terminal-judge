// import { Command } from "commander";

// export const config = new Command()
// 	.name("config")
// 	.description("설정값을 조정합니다")
// 	.argument("<>", "문제 번호")
// 	.action(configure);

// async function configure() {}
import Conf from "conf";

// import type { Schema } from "conf";

const schema = {
	foo: {
		type: "number",
		maximum: 100,
		minimum: 1,
		default: 50,
	},
	bar: {
		type: "string",
		format: "url",
	},
};

// type ConfSchema = Schema<typeof schema>;

// const conf = new Conf({
// 	projectName: "foo",
// 	schema,
// });

// const foo = conf.get("foo");
//=> 50

// conf.set("foo", "1");
// [Error: Config schema violation: `foo` should be number]

type Ctor = NonNullable<ConstructorParameters<typeof Conf>[number]>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
class Config<T extends Record<string, any>> {
	private readonly config;

	constructor(option: T) {
		this.config = new Conf(option);
	}

	get<Key extends keyof T>(key: Key) {
		return this.config.get(key);
	}

	// getAll<Key extends keyof T>(): {
	// 	[key in keyof T["schema"]]: T["schema"][Key]["type"];
	// } {
	// 	return this.store;
	// }

	// set<Key extends keyof T["schema"]>(
	// 	key: Key,
	// 	value?: T["schema"][Key]["type"],
	// ) {
	// 	this.set(key, value);
	// }

	// delete<Key extends keyof T["schema"]>(key: Key) {
	// 	this.delete(key);
	// }

	// reset() {
	// 	this.clear();
	// }
}

const config = new Conf({
	projectName: "terminal-judge",
	schema,
});

const bar = config.get("bar");
