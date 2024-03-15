import { exec } from "node:child_process";
import { platform } from "node:os";

import { API_URL, COMMAND } from "@/constants";

export function openProblemPage(problemId: number) {
	const osPlatform = platform() as Extract<NodeJS.Platform, "win32" | "darwin">;

	if (!problemId) {
		console.error("문제 번호를 입력해 주세요.");
		process.exit(0);
	}

	const url = API_URL.boj.problem(Number(problemId));
	const command = COMMAND[osPlatform];

	exec(`${command} ${url}`);
}
