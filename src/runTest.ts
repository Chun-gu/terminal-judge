// import { execFile } from "node:child_process";
// import { readFileSync } from "node:fs";

// import type { Testcase, TestResult } from "@/types.ts";

// const testCasesFile = readFileSync("testCases/9012.json", "utf-8");
// const testCases = JSON.parse(testCasesFile) as Testcase[];

// runTests()
// 	.then((results) => {
// 		console.log("결과: ", results);
// 	})
// 	.catch((error) => {
// 		console.error("Error running tests:", error);
// 	});

// async function runTests() {
// 	const testResults: Array<TestResult> = [];

// 	const testPromises = testCases.map(async (testCase, index) => {
// 		console.log(`Running test ${index + 1}...`);

// 		const startTime = performance.now();
// 		const testResult = {};

// 		try {
// 			const result = await runTest(testCase);
// 			const endTime = performance.now();
// 			const spentTime = endTime - startTime;

// 			// console.log(
// 			// 	`Test ${index + 1} result: ${
// 			// 		result.output === result.expected ? "PASS" : "FAIL"
// 			// 	} in ${spentTime} ms`,
// 			// );

// 			// return result;
// 			testResults.push({ ...result, spentTime });
// 		} catch (error) {
// 			console.error(`Test ${index + 1} failed with error:`, error);

// 			// return { output: "ERROR", expected: "ERROR" };
// 			testResults.push({ output: "ERROR", expected: "ERROR" });
// 		} finally {
// 			testResults.push(testResult);
// 		}
// 	});

// 	await Promise.all(testPromises);

// 	console.log("테스트 종료");

// 	return testResults;
// }

// async function runTest(testCase: Testcase): Promise<TestResult> {
// 	return new Promise((resolve, reject) => {
// 		const childProcess = execFile(
// 			"node",
// 			["stack/BOJ/s4/9012/이춘구.cjs"],
// 			(error, stdout) => {
// 				if (error) return reject(error);
// 				else resolve({ output: stdout });
// 			},
// 		);

// 		childProcess.stdin?.write(testCase.input);
// 		childProcess.stdin?.end();
// 	});
// }
