import pb from "./pb";
import type { SurveyType } from "@/utils/serialiseSurvey";

const surveys = pb.collection("surveys");
const options = pb.collection("options");
const questions = pb.collection("questions");

const createQuestion = async(surveyId: string, ques: string, opts: string[]) => {
	console.log('Create Questions', surveyId, ques, opts)
	return await questions
		.create({
			survey: surveyId,
			text: ques,
		})
		.then((q) =>
			Promise.all(
				opts?.map?.((opt) => options.create({ question: q.id, text: opt })),
			),
		);
};
const createSurvey = async (surveyData: SurveyType) => {
	const surveyResp = await surveys.create({
		title: surveyData.title,
		description: surveyData.description,
	});
	await Promise.all(
		surveyData.questions.map(async(q, n) =>
			await createQuestion(surveyResp.id, q, surveyData.options[n]),
		),
	);
	return surveyResp;
};

export { createSurvey };
