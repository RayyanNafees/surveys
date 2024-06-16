import pb from "./pb";
// import {array, object, parse, string, type InferOutput} from 'valibot'

export const fetchSurvey = async (surveyId: string) => {
	return await pb.collection("surveys").getOne(surveyId, {expand: 'questions_via_survey.options_via_question'});
};

export const fetchQuestions = async(surveyId: string) => {
  return await pb.collection('questions').getList(1,30, {filter: `survey.id="${surveyId}"`})
}

export const fetchOptions = async (questionId: string) => {
  return await pb.collection('options').getList(1,10, {filter: `question.id="${questionId}"`});
}