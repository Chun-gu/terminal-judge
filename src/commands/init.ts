import { input, select } from "@inquirer/prompts";
import { Command } from "commander";

import { conf } from "@/config";

export const init = new Command()
	.name("init")
	.description("terminal-judge를 초기화하며 기본적인 설정을 합니다.")
	.action(initialize);

// const config = new Config();

async function initialize() {
	const { username, language } = conf.getAll();

	const answer = await select({
		message: "무엇을 설정할까요?",
		choices: [
			{ name: `사용자 이름 (현재: ${username})`, value: "username" },
			{ name: `언어 (현재: ${language})`, value: "language" },
			{ name: "종료", value: "" },
		],
	});

	switch (answer) {
		case "username":
			await setUsername();
			break;
		case "language":
			await setLanguage();
			break;
		default:
			process.exit(0);
	}

	await initialize();
}

async function setUsername() {
	const username = await input({ message: "사용자 이름을 입력하세요." });
	conf.set("username", username);
}

async function setLanguage() {
	const language = await select({
		message: "기본 언어를 선택하세요.",
		choices: [
			{ name: "Javascript", value: "js" },
			{ name: "Typescript", value: "ts" },
		],
	});

	conf.set("language", language);
}
