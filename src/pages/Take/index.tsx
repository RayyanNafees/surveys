import { fetchOptions, fetchQuestions, fetchSurvey } from "@/lib/fetchSurvey";
import { useRoute } from "preact-iso";
import useSWR from "swr";

export function Take() {
	const {
		params: { surveyId },
	} = useRoute();
	const { data, error, isLoading } = useSWR(`fetch-survey/${surveyId}`, () =>
		fetchSurvey(surveyId),
	);

	return (
		<main>
			{isLoading && <div aria-busy={true}>Loading Survey...</div>}
			{error ? (
				<div>{error.message}</div>
			) : (
				<>
					<hgroup>
						<h2>{data?.title}</h2>
						<h3>{data?.description}</h3>
					</hgroup>
					<QuestionsForm surveyId={surveyId} />
				</>
			)}
		</main>
	);
}

const QuestionsForm = ({ surveyId }) => {
	const { data, error, isLoading } = useSWR(`fetch-questions/${surveyId}`, () =>
		fetchQuestions(surveyId),
	);

	return (
		<form>
			{error && <p>{error.message}</p>}
			{!isLoading &&
				data.items.map((q) => (
					<Options quesId={q.id} quesText={q.text} key={q.id} />
				))}
			<input type="submit" value="Submit Answers" />
		</form>
	);
};

const Options = ({ quesId, quesText }) => {
	const { data, error, isLoading } = useSWR(`fetch-options/${quesId}`, () =>
		fetchOptions(quesId),
	);

	return (
		<article>
			<header aria-busy={isLoading}>
				<h3>{quesText}</h3>
			</header>
			{!(error || isLoading) &&
				data.items.map((o) => (
					<p key={o.id}>
						<input type="radio" name={`o-${quesId}`} />
						{o.text}
					</p>
				))}
			{error && <footer>{error.message}</footer>}
		</article>
	);
};
