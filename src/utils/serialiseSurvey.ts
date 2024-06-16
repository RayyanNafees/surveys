import { object, string, array, parse, type InferOutput } from "valibot";

const surveySchema = object({
	title: string(),
	description: string(),
	questions: array(string()),
	options: array(array(string())),
});

export type SurveyType = InferOutput<typeof surveySchema>;

export const serializes = (data: FormData): SurveyType => {
	const title = data.get("title") as string;
	const description = data.get("description") as string;
	// const image = data.get('avatar')
	const options = [];
	const questions = [];

	data.forEach((val, key) => {
		if (key.startsWith("Q-")) {
			const ques_test = key.match(/^Q-(\d+)$/);
			const opt_test = key.match(/^Q-(\d+):O-(\d+)$/);
			if (ques_test) {
				const [_, qIndex] = ques_test;
				questions[+qIndex] = val;
			} else if (opt_test) {
				const [_, qIndex, oIndex] = opt_test;
				if (!options[+qIndex]) {
					options[+qIndex] = [];
				}
				if (!options[+qIndex][+oIndex]) {
					options[+qIndex][+oIndex] = val;
				}
			}
		}
	});
	console.log("to parse", {
		title,
		description,
		questions,
		options,
	});
	return parse(surveySchema, {
		title,
		description,
		questions,
		options,
	});
};
