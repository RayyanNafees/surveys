import { useState } from "preact/hooks";
import "./style.css";
import { divideArray3 } from "../../utils/array";
/*
<script>
      // window.onload = function () {
      //   window.onbeforeunload = function () {
      //     console.log("Before unload");
      //     alert("Are you sure you want to leave?");
      //   };
      // };
      const search = document.querySelector("input[type='search']");

      const headers = document.querySelectorAll("article header");

      search.oninput = (e) => {
        const searchedSurvey = e.target.value;
        if (searchedSurvey === "")
          return headers.forEach((header) =>
            header.parentElement.classList.remove("invisible")
          );

        const fileredSurveys = headers.forEach((header) => {
          // console.log(header)
          const isInSearch = header.innerHTML
            .toLowerCase()
            .includes(searchedSurvey.toLowerCase());
          if (!isInSearch) {
            header.parentElement.classList.add("invisible");
          }
        });
      };
    </script>
*/

type Survey = {
	id: string;
	title: string;
	description: string;
};

const surveys: Survey[] = [
	{
		id: crypto.randomUUID(),
		title: "Apple iPhone",
		description: "Best Apple iPhone?",
	},
	{
		id: crypto.randomUUID(),
		title: "Dell Laptops",
		description: "Best Dell Laptops?",
	},
	{
		id: crypto.randomUUID(),
		title: "Cricketer",
		description: "Best player?",
	},
	{
		id: crypto.randomUUID(),
		title: "Colgate",
		description: "Best Type of Product?",
	},
	{
		id: crypto.randomUUID(),
		title: "Adidas",
		description: "Best Type of Adidas' Product?",
	},
	{
		id: crypto.randomUUID(),
		title: "Disney Streaming Service",
		description: "Best Disney streaming service?",
	},
	{
		id: crypto.randomUUID(),
		title: "Sony Headphones",
		description: "Best Type of Sony Headphones?",
	},
	{
		id: crypto.randomUUID(),
		title: "Toyota",
		description: "Best Toyota Car?",
	},
	{
		id: crypto.randomUUID(),
		title: "Gaming Console",
		description: "Your favorite Gaming Console?",
	},
	{
		id: crypto.randomUUID(),
		title: "Porn Site",
		description: "Your favorite Porn Sites?",
	},
];

const perRow = 3;

const newSurveys: Survey[][] = divideArray3(surveys);

console.log(newSurveys);

export function Home() {
	const [search, setSearch] = useState<string[]>([]);
	return (
		<>
			<input
				type="search"
				id="search"
				data-search
				placeholder="Search or survey topics"
				onInput={(e) => {
					const searched = e.currentTarget.value.toLocaleLowerCase();
					if (!searched) return setSearch([]);
					const inSearch = surveys.filter((survey) =>
						survey.title.toLowerCase().includes(searched),
					);
					setSearch(inSearch.map((survey) => survey.id));
				}}
			/>

			<div>
				{newSurveys.map((surveyArr) => (
					<div key={crypto.randomUUID()} class="grid">
						{surveyArr.map((surveyItem) => (
							<>
								<div key={surveyItem?.id}>
									<article
										hidden={search.length && !search.includes(surveyItem?.id)}
									>
										<header>{surveyItem.title}</header>
										<ul>
											<li>{surveyItem.description}</li>
										</ul>
										<footer>
											<a role="button" href="apple.html">
												Take Survey
											</a>
										</footer>
									</article>
								</div>
								{/* adds extra empty divs to fill in the space */}
								{surveyArr.length < 3 &&
									Array.from({ length: 3 - surveyArr.length }).map(() => (
										<div key={crypto.randomUUID()} />
									))}
							</>
						))}
					</div>
				))}
			</div>
		</>
	);
}