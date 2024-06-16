import {
	LocationProvider,
	Router,
	Route,
	hydrate,
	prerender as ssr,
} from "preact-iso";

import { Header } from "./components/Header.jsx";
import { Home } from "./pages/Home/index.jsx";
import { Create } from "./pages/Create/index.jsx";
import { Take } from "./pages/Take/index.jsx";
import { NotFound } from "./pages/_404.jsx";
import '@picocss/pico'
import 'virtual:uno.css'

// App.tsx

export function App() {
	return (

		<LocationProvider>
			<main class="container">
				<Header />
				<hr/>
				<Router>
					<Route path="/" component={Home} />
					<Route path="/create" component={Create} />
					<Route path="/take/:surveyId" component={Take} />
					<Route default component={NotFound} />
				</Router>
			</main>
		</LocationProvider>
	);
}

if (typeof window !== "undefined") {
	hydrate(<App />, document.getElementById("app"));
}

export async function prerender(data) {
	return await ssr(<App {...data} />);
}
