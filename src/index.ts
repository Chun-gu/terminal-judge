#!/usr/bin/env node

import { add, open } from "@/commands";

const [command, problemId] = process.argv.slice(2);

if (command === "open") {
	open(Number(problemId));
} else if (command === "add") {
	add(Number(problemId));
}
