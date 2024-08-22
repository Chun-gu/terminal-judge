import ConfImpl from "conf";

import type { Schema } from "conf";

type ValueSchema = Exclude<Schema<Record<string, unknown>>[number], boolean>;

type ValueSchemaType = NonNullable<ValueSchema["type"]>;

type ConfSchema = Record<string, ValueSchema>;

type TypeMapping<T extends "string"> = {
	string: string;
}[T];

const schema = {
	source: {
		type: "string",
		default: "BOJ",
	},
	username: {
		type: "string",
		default: "",
	},
	language: {
		type: "string",
		enum: ["js", "ts"],
		default: "js",
	},
	path: {
		type: "string",
		default: "source/tag/level/id/username.language",
	},
} as const;

// type Schema = typeof schema;

// export const config = new Conf({
// 	projectName: "terminal-judge",
// 	schema,
// });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class Conf<T extends Record<string, any>> {
	private readonly config: ConfImpl<T>;

	constructor(schema: T) {
		this.config = new ConfImpl<T>({
			projectName: "terminal-judge",
			schema,
		});
	}

	get<Key extends keyof T>(key: Key): TypeMapping<T[Key]["type"]> {
		return this.config.get(key);
	}

	getAll<Key extends keyof T>(): {
		[key in keyof T]: TypeMapping<T[Key]["type"]>;
	} {
		return this.config.store;
	}

	set<Key extends keyof T>(key: Key, value?: TypeMapping<T[Key]["type"]>) {
		this.config.set(key, value);
	}

	delete<Key extends keyof T>(key: Key) {
		this.config.delete(key);
	}

	reset() {
		this.config.clear();
	}
}

// type asdf = (typeof schema)[keyof schema];

export const conf = new Conf(schema);
const a = conf.get("source");
const all = conf.getAll();
conf.set("language");
