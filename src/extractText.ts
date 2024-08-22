/* eslint-disable @typescript-eslint/no-unused-vars */

// import { find, findAll } from "domutils";

import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

import {
	DomUtils,
	ElementType,
	Handler,
	parseDocument,
	Parser,
} from "htmlparser2";
import { parse } from "node-html-parser";

import { API_URL } from "@/constants";
import {
	fullHtmlString,
	htmlString,
	infoHtmlString,
	testcaseHtmlString,
} from "@/htmlString";

// type TagInterface = {
// 	name: string;
// 	attribute?: { [key: string]: string };
// 	childTag?: TagInterface;
// };

// class Tag implements TagInterface {
// 	name;
// 	attribute;
// 	childTag;

// 	constructor({ name, attribute, childTag }: TagInterface) {
// 		this.name = name;
// 		this.attribute = attribute;
// 		this.childTag = childTag;
// 	}

// 	parentOf(tag: TagInterface) {
// 		this.childTag = tag;
// 	}
// }

// const rootTag = new Tag({ name: "div", attribute: { class: "" } });
// const tableTag = new Tag({ name: "table", attribute: { class: "" } });
// rootTag.parentOf(tableTag);

// type Tag = {
// 	name: string;
// 	attribute?: { [key: string]: string };
// 	children?: Array<Tag>;
// 	depth: number;
// };

// class TagImpl {}

// 선택자를 태그들의 배열로 구성하는 건 어떨까?
// 배열을 순회하며 depth를 증가시키거나
// depth 배열을 따로 만들어서 인덱스를 사용하면 좀 더 효율적일까?
// class Selector {
// 	tags: Array<Tag> = [];
// 	depths: Array<Tag["depth"]> = [];

// 	constructor({ from }: { from: Tag }) {
// 		this.tags.push(from);
// 	}

// 	child(tag: Tag) {
// 		this.tags.push(tag);
// 		this.depths.push(tag.depth);
// 		this.leaf()?.children?.push(tag);

// 		return this;
// 	}

// 	leaf() {
// 		return this.tags[this.tags.length - 1];
// 	}

// 	traverse(currentTag: Tag) {
// 		for (const tag of this.tags) {
// 			if (0 < tag.depth) {
// 				tag.depth += 1;
// 				continue;
// 			} else if (this.compareTags(tag, currentTag)) {
// 				tag.depth += 1;
// 			} else return;
// 		}
// 	}

// 	compareTags(
// 		refTag: Tag,
// 		targetTag: Pick<Tag, "name" | "attribute">,
// 	): boolean {
// 		// // 태그 이름 비교
// 		// if (refTag.name !== targetTag.name) return false;

// 		// // 속성 키 추출
// 		// const attributes1 = Object.keys(refTag.attributes);
// 		// const attributes2 = Object.keys(targetTag.attributes);

// 		// // 속성 갯수
// 		// if (
// 		// 	attributes1.length !== attributes2.length ||
// 		// 	!attributes1.every((key) => targetTag.attributes[key])
// 		// ) {
// 		// 	return false;
// 		// }

// 		// // Check if attribute values are different
// 		// for (const key of attributes1) {
// 		// 	if (refTag.attributes[key] !== targetTag.attributes[key]) {
// 		// 		return false;
// 		// 	}
// 		// }

// 		// If all checks pass, return true
// 		return true;
// 	}
// }

// const testcase: Tag = {
// 	name: "pre",
// 	attribute: { class: "sampledata" },
// 	depth: 0,
// };

// class Tag {
// 	name: string;
// 	children?: Tag[];

// 	constructor({ name, children = [] }: Tag) {
// 		this.name = name;
// 		this.children = children;
// 		this.children = [];
// 	}

// child(tag: Tag) {
// 	this.children?.push(tag);

// 	return this;
// }
// }

// class Selector extends Tag {
// 	constructor(parent: Tag) {
// 		super(parent);
// 	}

// 	child(tag: Tag) {
// 		this.children?.push(tag);

// 		return this;
// 	}

// 	get last() {
// 		function findLastChild(tag: Tag) {
// 			if (tag.children?.length === 0) return tag;

// 			return findLastChild(tag!.children[tag!.children!.length - 1]);
// 		}

// 		return findLastChild(this);
// 	}
// }

// const timeSelector = new Selector();
// const tableTag = new Tag({ name: "table" });
// const trTag = new Tag({ name: "tr" });
// const tdTag = new Tag({ name: "td" });

// timeSelector.child(tableTag).child(trTag).child(tdTag);
// const time: Tag = {
// 	name: "tbody",
// 	depth: 0,
// 	children: [{ name: "tr", depth: 0, children: [{ name: "td", depth: 0 }] }],
// };

// const tags = [time];

// const depths = [0, 0, 0, 0, 0];
// getTextValues(tags, htmlString);
// getTextValues(tags, infoHtmlString);
// getTextValues(tags, testcaseHtmlString);

// const handler = new DomHandler(undefined, {
// 	withStartIndices: true,
// 	withEndIndices: true,
// });
// handler.onopentag = onOpenTag;
// // handler.onclosetag = onCloseTag;
// new Parser(handler, { recognizeSelfClosing: true }).end(testcaseHtmlString);
// async function getProblemPageString(id: number) {
// 	// const response = await fetch(API_URL.boj.problem(id), {
// 	// 	method: "GET",
// 	// 	body: null,
// 	// });
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

// 	if (!response.ok) throw new Error("문제를 가져오는 데 실패했습니다.");

// 	const problemPageString = await response.text();

// 	return problemPageString;
// }

// const fullHtmlString = await getProblemPageString(9012);

// createFile(
// 	"src/full-html-string.json",
// 	JSON.stringify({ full: fullHtmlString }, null, 2),
// );

// async function createFile(filePath: string, content: string) {
// 	await mkdir(dirname(filePath), { recursive: true });
// 	await writeFile(filePath, content);
// }

// const dom = parseDocument(fullHtmlString, { recognizeSelfClosing: true });
console.time("test");
const dom = parse(fullHtmlString);
const [time, memory, ...testcases] = dom
	.querySelectorAll("#problem-info > tbody td:nth-child(-n+2), .sampledata")
	.map((el) => el.textContent.trim());
console.timeEnd("test");
console.log({ time, memory, testcases });
// ?.textContent.trim();
// const memory = dom
// 	.querySelector("table#problem-info tbody td:nth-child(2)")
// 	?.textContent.trim();
// console.log({ time, memory });

const constraints: string[] = [];

type TestFn = Parameters<typeof DomUtils.find>[0];

type AnyNode = Parameters<TestFn>[0];

type Element = Extract<
	AnyNode,
	{
		name: string;
		attribs: {
			[name: string]: string;
		};
		type:
			| typeof ElementType.Tag
			| typeof ElementType.Script
			| typeof ElementType.Style;
	}
>;

function isElement(elem: AnyNode): elem is Element {
	const { Tag, Script, Style } = ElementType;

	return [Tag, Script, Style].includes(elem.type);
}

// type ChildNode = (typeof dom.children)[number];

type Selector = Pick<Element, "name" | "attribs">;

const tableSelector: Selector = {
	name: "table",
	attribs: { id: "problem-info", class: "table" },
};

const testcaseSelector: Selector = {
	name: "pre",
	attribs: { class: "sampledata" },
};

// const depth = 0;

// const results: Element[] = [];

// const foundNode = findElement(testcaseSelector, dom.children);
// console.log(results);
// if (foundNode) {
// 	console.log(foundNode);
// }

// function nameOrData(node: ChildNode) {
// 	if (node.type === "tag") return node.name;
// 	else if (node.type === "text") return node.data;
// }

// function findElement(
// 	selector: Selector,
// 	nodes: Array<ChildNode>,
// ): Element[] | undefined {
// 	console.log(
// 		"함수 시작, ",
// 		"자식 수: ",
// 		nodes.length,
// 		", 자식",
// 		nodes.map((node) => nameOrData(node)),
// 	);

// 	for (const node of nodes) {
// 		console.log("루프 시작, ", nameOrData(node), ", 요소?", isElement(node));

// 		if (!isElement(node)) continue;

// 		const {
// 			name,
// 			attribs: { id = "", class: className = "" },
// 		} = node;

// 		console.log(name, id, className);
// 		// console.log("isMatching", isMatching(selector, node));

// 		if (isMatching(selector, node)) {
// 			console.log("루프 종료: 일치 O", name, id, className);
// 			results.push(node);
// 			if (results.length === 2) return results;
// 		} else {
// 			console.log("루프 종료: 일치 X", name, id, className);
// 			const result = findElement(selector, node.children);

// 			if (result) results.push(...result);
// 			if (results.length === 2) return results;
// 		}
// 	}
// 	console.log("함수 종료");
// }

// DomUtils.find(
// 	(elem) => {
// 		if (!isElement(elem)) return false;

// 		const {
// 			name: tagName,
// 			attribs: { id: id, class: className },
// 		} = elem;
// 		if (tagName === "table" && id === "problem-info" && className === "table") {
// 			console.log(elem.parent);

// 			const constraintsNodes = DomUtils.find(
// 				(elem) => {
// 					if (!isElement(elem)) return false;
// 					if (elem.name === "td") return true;

// 					return false;
// 				},
// 				elem.children,
// 				true,
// 				2,
// 			);

// 			constraintsNodes.forEach((node) => {
// 				const constraint = DomUtils.textContent(node).trim();
// 				constraints.push(constraint);
// 			});
// 		}

// 		return false;
// 	},
// 	dom.children,
// 	true,
// 	0,
// );

// console.log(constraints);

// function getTextValues(tags: Array<Tag>, htmlString: string) {
// 	// const handler: Partial<Handler> = {
// 	// 	onopentag: onOpenTag,
// 	// 	ontext: onText,
// 	// 	onclosetag: onCloseTag,
// 	// };
// 	// let startIndex=0;
// 	const parser = new Parser(
// 		{
// 			onopentag(name, attribs) {},
// 			onclosetag(name) {},
// 		},
// 		{ recognizeSelfClosing: true },
// 	);

// 	parser.write(htmlString);
// 	parser.end();
// }

// function onOpenTag(name: Tag["name"], attribute: Tag["attribute"]) {
// 	// depths = depths.map((d) => d + 1);
// 	console.log("===태그 오픈===");
// 	console.log({ name, attribute });

/*
 * tags의 tag를 순회한다.
 * 		1: tag의 di가 0보다 크면 해당 태그 내부를 탐색 중이라는 뜻이므로
 * 				di를 1 증가시킨다
 * 				c가 있으면
 * 						c를 순회한다
 * 								1로 돌아가 반복한다
 * 		di가 0이면
 * 				n,a가 일치하면
 * 						di를 1 증가시킨다
 */
// const currentTag = { name, attribute };

// for (const tag of tags) {
// 	traverse(tag);
// }

// function traverse(tag: Tag) {
// 	console.log({ tag: JSON.stringify(tag) });
// 	const matchTag = isMatching(tag, currentTag);
// 	const isInsideTag = 0 < tag.depth;

// 	if (!matchTag && !isInsideTag) return;
// 	if (matchTag && !isInsideTag) {
// 		tag.depth += 1;

// 		return;
// 	}
// 	if (matchTag && isInsideTag) tag.depth += 1;
// 	if (!matchTag && isInsideTag) {
// 		tag.depth += 1;
// 		if (tag.children) {
// 			for (const child of tag.children) {
// 				traverse(child);
// 			}
// 		}
// 	}
// 	if (tag.depth === 0) {
// 		if (isMatching(tag, currentTag)) {
// 			tag.depth += 1;
// 		} else {
// 		}
// 	}
// 	if (0 < tag.depth) {
// 		console.log({ tag: JSON.stringify(tag) });
// 		tag.depth += 1;
// 		tag.children?.forEach((tag) => {
// 			traverse(tag);
// 		});
// 	} else if (isMatching(tag, currentTag)) {
// 		tag.depth += 1;
// 		console.log("일치", tag);
// 	} else return;
// }
// }

// function onText(text: string) {
// 	console.log("=== 텍스트 ===");
// 	console.log(text);
// 	for (const tag of tags) {
// 		console.log(JSON.stringify(tag));
// 	}
// 	// 맨끝 태그의 depth가 1이면 찾던 태그임

// 	// for (const tag of tags) {
// 	// 	if (tag.depth === 1) {
// 	// 		const value = text.replaceAll("\r\n", "\n");
// 	// 		// console.log("값", value);
// 	// 	}
// 	// }
// 	// console.log("text", { text });
// }

// function onCloseTag(name: string) {
// 	for (const tag of tags) {
// 		deDepth(tag);
// 	}

// 	function deDepth(tag: Tag) {
// 		if (0 < tag.depth) tag.depth -= 1;

// 		if (tag.children) {
// 			for (const child of tag.children) {
// 				deDepth(child);
// 			}
// 		}
// 	}
// 	// function traverse(tag: Tag) {
// 	// 	if (0 < tag.depth) {
// 	// 		console.log("close", { name });
// 	// 		tag.depth -= 1;
// 	// 		tag.children?.forEach(traverse);
// 	// 	} else if (isMatching(tag, { name })) {
// 	// 		tag.depth += 1;
// 	// 		console.log("일치", tag);
// 	// 	} else return;
// 	// }

// 	console.log("===태그 클로즈===");
// 	// depths = depths.map((d) => d - 1);
// 	console.log({ name });
// }

/**
 * 찾고자 하는 태그인 `refTag`와 `targetTag`가 일치하는지 검사한다.
 * @param refTag 비교의 기준이 되는 태그
 * @param targetTag 일치하는지 비교할 태그
 * @returns `refTag`와 `targetTag`의 일치 여부
 */
function isMatching(
	refTag: Selector,
	targetTag: Pick<Element, "name" | "attribs">,
) {
	// 태그 이름 비교
	if (refTag.name !== targetTag.name) return false;

	// refTag에 정의된 속성이 target 태그에 전부 있는 지 비교
	if (refTag.attribs && targetTag.attribs) {
		const refAttribute = refTag.attribs;
		const targetAttribute = targetTag.attribs;

		const refAttributeKeys = Object.keys(refAttribute);

		const isMatchAttributes = refAttributeKeys.every(
			(key) => targetAttribute[key] === refAttribute[key],
		);

		if (!isMatchAttributes) return false;
	}

	return true;
}
