import { exec } from "node:child_process";
import { platform } from "node:os";

import { Command } from "commander";

import { API_URL, COMMAND } from "@/constants";

export const open = new Command()
	.command("open")
	.argument("<id>")
	.action(openProblemPage);

function openProblemPage(id: number) {
	if (!id) {
		console.error("문제 번호를 입력해 주세요.");
		process.exit(1);
	}

	const osPlatform = platform() as Extract<NodeJS.Platform, "win32" | "darwin">;

	const command = COMMAND[osPlatform];
	const url = API_URL.boj.problem(id);

	exec(`${command} ${url}`);
}
