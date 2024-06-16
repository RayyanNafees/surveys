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
	const [search, setSearch] = useState<string>();
	return (
		<>
			<input
				type="search"
				id="search"
				data-search
				placeholder="Search or survey topics"
				value={search}
				onChange={(e) => setSearch(e.currentTarget.value)}
			/>

			<div>
				{newSurveys.map((surveyArr) => (
					<div key={crypto.randomUUID()} class="grid">
						{surveyArr.map((surveyItem) => (
							<div key={surveyItem?.id}>
								<article hidden={search && !search.includes(surveyItem?.id)}>
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
						))}
					</div>
				))}
				{/* <div class="grid">
					<article>
						<header>Apple iPhone</header>
						<ul>
							<li>Best Apple iPhone?</li>
						</ul>
						<footer>
							<a role="button" href="apple.html">
								Take Survey
							</a>
						</footer>
					</article>
					<article>
						<header>Dell Laptops</header>
						<ul>
							<li>Best Dell Laptop?</li>
						</ul>
						<footer>
							<a role="button" href="dell.html">
								Take Survey
							</a>
						</footer>
					</article>
					<article>
						<header>Cricketer</header>
						<ul>
							<li>Best player?</li>
						</ul>
						<footer>
							<a role="button" href="cricket.html">
								Take Survey
							</a>
						</footer>
					</article>
				</div>
				<div class="grid">
					<article>
						<header>Colgate</header>
						<ul>
							<li>Best Type of Product?</li>
						</ul>
						<footer>
							<a role="button" href="colgate.html">
								Take Survey
							</a>
						</footer>
					</article>
					<article>
						<header>Adidas</header>
						<ul>
							<li>Best Type of Adidas' Product?</li>
						</ul>
						<footer>
							<a role="button" href="adidas.html">
								Take Survey
							</a>
						</footer>
					</article>
					<article>
						<header>Disney Streaming Service</header>
						<ul>
							<li>Best Disney streaming service?</li>
						</ul>
						<footer>
							<a role="button" href="disney.html">
								Take Survey
							</a>
						</footer>
					</article>
				</div>
				<div class="grid">
					<div>
						<article>
							<header>Sony Headphones</header>
							<ul>
								<li>Best Type of Sony's Headphones?</li>
							</ul>
							<footer>
								<a role="button" href="sony.html">
									Take Survey
								</a>
							</footer>
						</article>
					</div>

					<article>
						<header>Toyota</header>
						<ul>
							<li>Best Toyota Car?</li>
						</ul>
						<footer>
							<a role="button" href="toyota.html">
								Take Survey
							</a>
						</footer>
					</article>
					<article>
						<header>Gaming Console</header>
						<ul>
							<li>Your favorite Gaming Console?</li>
						</ul>
						<footer>
							<a role="button" href="gaming.html">
								Take Survey
							</a>
						</footer>
					</article>
				</div> */}
			</div>
		</>
	);
}
