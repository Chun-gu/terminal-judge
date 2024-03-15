export const API_URL = {
	boj: {
		base: "https://www.acmicpc.net",
		problem: (id: number) => `${API_URL.boj.base}/problem/${id}`,
	},
};

export const PLATFORM = {
	win: "win32",
	mac: "darwin",
} as const;

export const COMMAND = {
	[PLATFORM.win]: "start",
	[PLATFORM.mac]: "open",
} as const;
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
