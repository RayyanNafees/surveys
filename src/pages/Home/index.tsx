import { useCallback, useMemo, useState } from "preact/hooks";
import { divideArray3 } from "../../utils/array";

import { string, array, object, parse, type InferOutput } from "valibot";

import pb from "@/lib/pb";
import useSWR from "swr";

const remoteSurveySchema = array(
	object({
		title: string(),
		description: string(),
		id: string(),
	}),
);

type RemoteSurveyType = InferOutput<typeof remoteSurveySchema>;

const fetchSurveys = async (setSearch): Promise<RemoteSurveyType> => {
	const remoteSurveys = (await pb.collection("surveys").getList(1, 30)).items;
	const safeSurveys = parse(remoteSurveySchema, remoteSurveys);
	setSearch(safeSurveys.map((survey) => survey.id));
	return safeSurveys;
};

// let safeSurvey = [];

export function Home() {
	const [search, setSearch] = useState<string[]>([]);

	const { data, error, isLoading } = useSWR("fetch-surveys", () =>
		fetchSurveys(setSearch),
	);

	const safeSurvey = useMemo(() => data || [], [data]);
	
	const safeSurveyIds = useMemo(
		() => safeSurvey.map((survey) => survey.id),
		[safeSurvey],
	);

	const filteredSurvey = useMemo(
		() => safeSurvey.filter((survey) => search.includes(survey.id)),
		[search, safeSurvey],
	);

	const onSearch = useCallback(
		(e) => {
			const searched = e.currentTarget.value.toLocaleLowerCase();
			if (!searched) return setSearch(safeSurveyIds);
			const inSearch = safeSurvey.filter((survey) =>
				survey.title.toLowerCase().includes(searched),
			);
			setSearch(inSearch.map((survey) => survey.id));
		},
		[safeSurvey, safeSurveyIds],
	);

	const newSurvey: RemoteSurveyType[] = divideArray3(filteredSurvey);

	return (
		<>
			<input
				type="search"
				id="search"
				data-search
				placeholder="Search or survey topics"
				onInput={onSearch}
			/>
			{isLoading && <div aria-busy={true}>Loading Surveys...</div>}

			<div>
				{!isLoading && !newSurvey.length ? (
					<p>No surveys found</p>
				) : (
					newSurvey.map((surveyArr) => (
						<div key={crypto.randomUUID()} class="grid">
							{surveyArr.map((surveyItem) => (
								<>
									<div key={surveyItem?.id}>
										<article>
											<header>{surveyItem.title}</header>
											<ul>
												<li>{surveyItem.description}</li>
											</ul>
											<footer>
												<a role="button" href={`/take/${surveyItem.id}`}>
													Take Survey
												</a>
											</footer>
										</article>
									</div>
									{/* adds extra empty div to fill in the space */}
									{newSurvey.length > 3 &&
										surveyArr.length < 3 &&
										Array.from({ length: 3 - surveyArr.length }).map(() => (
											<div key={crypto.randomUUID()} />
										))}
								</>
							))}
						</div>
					))
				)}
			</div>
		</>
	);
}
