import pb from "./pb";
import type { SurveyType } from "@/utils/serialiseSurvey";

const surveys = pb.collection("surveys");
const options = pb.collection("options");
const questions = pb.collection("questions");

const createQuestion = (surveyId: string, ques: string, opts: string[]) =>
	questions
		.create({
			survey: surveyId,
			text: ques,
		})
		.then((q) =>
			Promise.all(
				opts.map((opt) => options.create({ question: q.id, text: opt })),
			),
		);

const createSurvey = async (surveyData: SurveyType) => {
	const surveyResp = await surveys.create({
		title: surveyData.title,
		description: surveyData.description,
	});
	await Promise.all(
		surveyData.questions.map((q) =>
			createQuestion(surveyResp.id, q, surveyData.options[q]),
		),
	);
	return surveyResp;
};

export { createSurvey };
