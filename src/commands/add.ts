/* eslint-disable @typescript-eslint/no-unused-vars */
import { access, mkdir, writeFile } from "node:fs/promises";
import { dirname, join as joinPath } from "node:path";
import { cwd } from "node:process";

import { select } from "@inquirer/prompts";
import { Command } from "commander";
import { Parser } from "htmlparser2";
import { parse } from "node-html-parser";

import { conf } from "@/config";
import { API_URL, LEVELS, SEPARATOR } from "@/constants";
import { fullHtmlString, htmlString } from "@/htmlString";

import type {
	ProblemMetadata,
	ProblemMetadataResponse,
	Testcase,
} from "@/types";

const { source, username, language, path } = conf.getAll();
const brand = conf.get("source");
const name = "이춘구";
const lang = "ts";

export const add = new Command()
	.name("add")
	.description("문제를 추가합니다.")
	.argument("<id>", "문제 번호")
	.option("-l, --lang <lang>", "사용할 언어 설정")
	.action(addProblem);

async function addProblem(id: number) {
	// 메타데이터 파일 경로
	const metadataFilePath = joinPath(cwd(), "metadata", brand, `${id}.json`);
	// 이미 있는지 확인
	const isMetadataFilePresent = await access(metadataFilePath)
		.then(() => true)
		.catch(() => false);

	// 있다면 갱신할 건지 묻기
	if (isMetadataFilePresent) {
		await select({
			message: `${id}번 문제의 메타데이터가 이미 존재합니다. 갱신할까요?`,
			choices: [
				{ name: "네", value: true },
				{ name: "아니요", value: false },
			],
		}).then((answer) => {
			if (answer === false) {
				console.log("취소되었습니다.");
				process.exit(0);
			}
		});
	}

	// 갱신 또는 생성 시작
	// 1. 문제 메타데이터 파일 생성 (metadata/BOJ/9012.json)
	// 2. 문제 템플릿 파일 생성 (problems/BOJ/stack/s4/9012/이춘구.ts)
	// 3. 테스트케이스 파일 생성 (testcases/BOJ/9012.json)

	// 1. 문제 메타데이터 파일 생성 (metadata/BOJ/9012.json)
	// 1-1. 문제 메타데이터 fetch
	const metadata = await getMetadata(id);
	const { tags, level } = metadata;

	// 1-2. 메타데이터 파일 생성
	await createFile(metadataFilePath, JSON.stringify(metadata, null, 2));

	// 2. 템플릿 파일 생성 (problems/BOJ/stack/s4/9012/이춘구.ts)
	// 2-1. 태그가 복수면 하나 선택하도록 물어보기
	let tag = tags.join("");

	if (1 < tags.length) {
		tag = await select({
			message: "폴더명으로 사용할 태그를 선택하세요.",
			choices: tags.map((tag) => ({ name: tag, value: tag })),
		});
	}

	// 템플릿 파일 경로
	const templateFilePath = joinPath(
		cwd(),
		"problems",
		brand,
		tag,
		level,
		id.toString(),
		`${name}.${lang}`,
	);

	// 템플릿 파일 생성
	await createFile(templateFilePath, template(metadata, lang));

	// 3. 테스트케이스 파일 생성 (testcases/BOJ/9012.json)
	// 문제의 데이터 fetch 하기
	const problemPageString = await getProblemPageString(id);
	const dom = parse(problemPageString);

	const constraintSelector = "#problem-info tbody td:nth-child(-n+2)";
	const testcaseSelector = ".sampledata";
	const selectors = [constraintSelector, testcaseSelector].join(", ");

	const [time, memory, ...testcases] = dom
		.querySelectorAll(selectors)
		.map((el) => el.textContent.trim());

	console.log({ time, memory, testcases });

	const constraint = {
		time: time?.split(" ")[0],
		memory: memory?.split(" ")[0],
	};

	// const testCases = extractTestCases(problemPageString);
	const testcasesContent = testcases
		.map(
			(testcase, i) =>
				(i % 2 === 0 ? SEPARATOR.tc(i) : SEPARATOR.io) + testcase,
		)
		.join("")
		.trim();

	const testcaseFilePath = joinPath(cwd(), "testcases", brand, `${id}.txt`);

	// 테스트케이스 파일 생성
	await createFile(testcaseFilePath, testcasesContent);
}

/**
 * 문제의 메타 데이터를 반환한다.
 * @param id 문제 번호
 * @returns 문제 메타데이터
 */
async function getMetadata(id: number) {
	try {
		const response = await fetch(API_URL.solved_ac.problem(id));

		if (!response.ok) throw new Error();

		const data = (await response.json()) as ProblemMetadataResponse;
		const metadata = refineMetadata(data);

		return metadata;
	} catch (_) {
		throw new Error("문제의 메타 데이터를 가져오는 데 실패했습니다.");
	}
}

function refineMetadata(metadata: ProblemMetadataResponse) {
	const id = metadata.problemId;
	const tags = metadata.tags.map((tag) => tag.key);
	const title = metadata.titleKo;
	const level = LEVELS[metadata.level] ?? LEVELS[0];

	return { id, title, level, tags };
}

/**
 * 번호가 `id`인 문제의 페이지의 HTML을 문자열로 반환한다.
 * @param id 문제 번호
 * @returns HTML 문자열
 */
async function getProblemPageString(id: number) {
	// const response = await fetch(API_URL.boj.problem(id), {
	// 	headers: {
	// 		accept:
	// 			"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
	// 		"accept-language": "ko-KR,ko;q=0.9",
	// 		"sec-ch-ua":
	// 			'"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
	// 		"sec-ch-ua-mobile": "?0",
	// 		"sec-ch-ua-platform": '"Windows"',
	// 		"sec-fetch-dest": "document",
	// 		"sec-fetch-mode": "navigate",
	// 		"sec-fetch-site": "none",
	// 		"sec-fetch-user": "?1",
	// 		"upgrade-insecure-requests": "1",
	// 	},
	// 	referrerPolicy: "strict-origin-when-cross-origin",
	// 	body: null,
	// 	method: "GET",
	// 	mode: "cors",
	// 	credentials: "omit",
	// });

	// if (!response.ok) throw new Error("문제를 가져오는 데 실패했습니다.");

	// const problemPageString = await response.text();

	// return problemPageString;
	return fullHtmlString;
}

/**
 * HTML 문자열을 파싱해 테스트 케이스를 추출한다.
 * @param problemPageString HTML 문자열
 * @returns 테스트 케이스 배열
 */
function extractTestCases(problemPageString: string) {
	let constraintIndicator = 0;
	let problemBodyIndicator = 0;
	let sampleDataIndicator = 0;

	// const constraint: { time?: number; memory?: number } = {};
	let testCase: Testcase = {};
	const testCases: Array<Testcase> = [];

	const problemBodyParser = new Parser(
		{
			onopentag(name, attribute) {
				if (0 < problemBodyIndicator) problemBodyIndicator += 1;
				if (0 < sampleDataIndicator) sampleDataIndicator += 1;
				if (0 < constraintIndicator) constraintIndicator += 1;

				if (attribute.id === "problem-body") {
					problemBodyIndicator += 1;
					// console.log("문제 바디 열림");
				} else if (attribute.class === "sampledata") {
					sampleDataIndicator += 1;
					// console.log("테케 예제 열림");
				}
				// console.log({ problemBodyIndicator, sampleDataIndicator });
			},

			ontext(text) {
				// 샘플 데이터 표시기가 1이면 현재 샘플 데이터 태그 내부이므로
				if (sampleDataIndicator === 1) {
					// 테스트 케이스 객체의 input, output 중 비어있는 것을 채운다.
					// console.log({ testCase: text });
					const line = text.replaceAll("\r\n", "\n");
					if (!testCase["input"]) testCase["input"] = line;
					else if (!testCase["output"]) testCase["output"] = line;
					// console.log({ testCase });
				}
			},

			onclosetag() {
				// TODO: indicator가 0 미만일 때의 에러 처리

				// 문제 바디 표시기가 0보다 크면 -1
				if (0 < problemBodyIndicator) {
					problemBodyIndicator -= 1;
					// -1 해서 0이 됐다면 문제 바디 태그의 닫는 태그이므로
					if (problemBodyIndicator === 0) {
						// console.log("문제 바디 닫힘", { name });
						// 파싱 완료
						// console.log("파싱 완료");
						problemBodyParser.end();
					}
				}
				// 샘플 데이터 표시기가 0보다 크면 -1
				if (0 < sampleDataIndicator) {
					sampleDataIndicator -= 1;
					// -1 해서 0이 됐다면 샘플 데이터 태그의 닫는 태그이므로
					if (sampleDataIndicator === 0) {
						// console.log("테케 예제 닫힘");
						// 테스트 케이스의 출력값까지 저장했으면 배열에 담고 초기화
						// console.log({ testCase });
						if (testCase["output"]) {
							testCases.push(testCase);
							// console.log({ testCases });
							testCase = { input: "", output: "" };
						}
					}
				}

				// console.log({ problemBodyIndicator, sampleDataIndicator });
			},
		},
		{ recognizeSelfClosing: true },
	);

	problemBodyParser.write(problemPageString);
	problemBodyParser.end();

	return testCases;
}

function template(metadata: ProblemMetadata, lang: string) {
	const { id, title, level, tags } = metadata;
	const shouldTyped = lang === "ts";

	return `/*
 * #${id} - ${title}
 * - 레벨: ${level}
 * - 태그: ${tags.join(", ")}
 * - 제한: 1000 ms / 128 MB
 * - 링크: https://www.acmicpc.net/problem/${id}
 * - 문제
 * <문제를 간략히 요약해 주세요.>
 */

let input = "";

require("readline")
	.createInterface({
		input: process.stdin,
		output: process.stdout,
	})
	.on("line", (line${shouldTyped && ": string"}) => {
		input += \`\${line}\\n\`;
	})
	.on("close", () => {
		const answer = solution(input.trim());
		console.log(answer);
		process.exit();
	});

function solution(input${shouldTyped && ": string"}) {
	let answer = "";

	// 여기에 구현하세요.

	return answer;
}
`;
}

async function createFile(filePath: string, content: string) {
	await mkdir(dirname(filePath), { recursive: true });
	await writeFile(filePath, content);
}
