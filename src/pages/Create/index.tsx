import { useState } from "react";
import { range } from "../../utils/array";
import { createSurvey } from "@/lib/createSurvey";
import { serializes } from "@/utils/serialiseSurvey";


export function Create() {
	const [ques, setQues] = useState(0);

	const [loading, setLoading] = useState(false);
	return (
		<main>
			<hgroup>
				<h2>Create your Survey</h2>
			</hgroup>
			<form
				onSubmit={async (e) => {
					e.preventDefault();

					setLoading(true)

					const form = new FormData(e.currentTarget);
					console.log('form data', Object.fromEntries(form.entries()))

					const surveyData = serializes(form);
					console.log('parsed Data' ,surveyData)

					await createSurvey(surveyData).catch(e=> setLoading(false));

					setLoading(false)
					alert("Survey created successfully");
					window.location.href = "/";
				}}
			>

				{/* <label>Survey Logo</label>
				<input
					type="file"
					accept={"image/*"}
					name="avatar"
					placeholder="avatar"
				/> */}
				<input name="title" placeholder="Survey Title" />

				<input name="description" placeholder="Survey Description" />
				<ol>
					{range(ques).map((qIndex) => (
						<li key={`question${qIndex}`}>
							<Question qIndex={qIndex} />
						</li>
					))}
				</ol>
				<button
					type="button"
					class="secondary"
					onClick={() => setQues(ques + 1)}
				>
					Add Question
				</button>
				<button type="submit" class="primary" aria-busy={loading}>
					Submit Survey
				</button>
			</form>
		</main>
	);
}

const Question: React.FC<{ qIndex: number }> = ({ qIndex }) => {
	const [options, setOptions] = useState(0);
	return (
		<article>
			<header>
				<input placeholder={`Question ${qIndex + 1}`} name={`Q-${qIndex}`} />
			</header>
			<ol>
				{range(options).map((oIndex) => (
					<li key={`option${oIndex}`}>
						<Option oIndex={oIndex} qIndex={qIndex} />
					</li>
				))}
			</ol>
			<footer>
				<button
					type="button"
					class="outline"
					onClick={() => setOptions(options + 1)}
				>
					Add Option
				</button>
			</footer>
		</article>
	);
};

const Option = ({ qIndex, oIndex }) => (
	<input
		name={`Q-${qIndex}:O-${oIndex}`}
		placeholder={`Option ${oIndex + 1}`}
	/>
);
