export const API_URL = {
	boj: {
		base: "https://www.acmicpc.net",
		problem: (id: number) => `${API_URL.boj.base}/problem/${id}`,
	},
	solved_ac: {
		base: "https://solved.ac/api/v3",
		problem: (id: number) =>
			`${API_URL.solved_ac.base}/problem/show?problemId=${id}`,
	},
} as const;

export const LANGUAGE_EXT = {
	javascript: "js",
	typescript: "ts",
} as const;

export const PLATFORM = {
	win: "win32",
	mac: "darwin",
} as const;

export const COMMAND = {
	[PLATFORM.win]: "start",
	[PLATFORM.mac]: "open",
} as const;

export const LEVELS = [
	"unrated",
	"b5",
	"b4",
	"b3",
	"b2",
	"b1",
	"s5",
	"s4",
	"s3",
	"s2",
	"s1",
	"g5",
	"g4",
	"g3",
	"g2",
	"g1",
	"p5",
	"p4",
	"p3",
	"p2",
	"p1",
	"d5",
	"d4",
	"d3",
	"d2",
	"d1",
	"r5",
	"r4",
	"r3",
	"r2",
	"r1",
] as const;

export const SEPARATOR = {
	tc: (i: number) => `=== Testcase ${i / 2 + 1} ===`,
	io: "--- ▲ input / ▼ output ---",
};
// export const PLATFORM = {
// 	window: "win32",
// 	mac: "darwin",
// 	aix: "aix",
// 	freebsd: "freebsd",
// 	linux: "linux",
// 	openbsd: "openbsd",
// 	sunos: "sunos",
// 	android: "android",
// } as const;

// export const COMMAND = {
// 	[PLATFORM.window]: "start",
// 	[PLATFORM.mac]: "open",
// 	[PLATFORM.aix]: "xdg-open",
// 	[PLATFORM.freebsd]: "xdg-open",
// 	[PLATFORM.linux]: "xdg-open",
// 	[PLATFORM.openbsd]: "xdg-open",
// 	[PLATFORM.sunos]: "xdg-open",
// 	[PLATFORM.android]: "am start -a android.intent.action.VIEW -d",
// } as const;
