import type { LEVELS } from "@/constants";

export type TestResult =
	| { isAccepted: true; spentTime: number }
	| { isAccepted: false; expected: string; output: string }
	| { isAccepted: false; error: string };

export type Level = (typeof LEVELS)[number];

export type ProblemMetadata = {
	id: number;
	title: string;
	level: Level;
	tags: Array<string>;
	// constraints: Array<number>;
};

export type Problem = {
	id: number;
	title: string;
	level: Level;
	constraints: {
		time: number;
		memory: number;
	};
	description: string;
	input: string;
	output: string;
	testcases: Array<Testcase>;
	tags: Array<string>;
};

export type Testcase = { input?: string; output?: string };

export type ProblemMetadataResponse = {
	problemId: number;
	titleKo: string;
	titles: Array<{
		language: string;
		languageDisplayName: string;
		title: string;
		isOriginal: boolean;
	}>;
	isSolvable: boolean;
	isPartial: boolean;
	acceptedUserCount: number;
	level: number;
	votedUserCount: number;
	sprout: boolean;
	givesNoRating: boolean;
	isLevelLocked: boolean;
	averageTries: number;
	official: boolean;
	tags: Array<{
		key: string;
		isMeta: number;
		bojTagId: number;
		problemCount: number;
		displayNames: Array<{ language: string; name: string; short: string }>;
		aliases: Array<{ alias: string }>;
	}>;
	metadata: object;
};
