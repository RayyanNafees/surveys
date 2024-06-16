export const divideArray3 = <T>(array: Array<T>, subLength = 3, fill = false) =>
	Array.from({
		length: Math.ceil(array.length / subLength),
	}).map((_, n) => array.slice(n * subLength, (n + 1) * subLength));

export const range = (n: number) => Array.from({ length: n }, (_, i) => i);
