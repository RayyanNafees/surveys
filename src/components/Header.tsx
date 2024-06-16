import { useLocation } from "preact-iso";

export function Header() {
	const { url } = useLocation();

	return (
		<nav>
			<ul>
				<li>
					<img src="./assets/LOGO.png" alt="Your Logo" />
				</li>
				<li>
					<h1>Survey Surfer</h1>
				</li>
			</ul>
			<ul>
				<li>
					<a href="/about">About Us</a>
				</li>
				<li>
					<a href="/services">Our Services</a>
				</li>
				<li>
					<a href="/contact">Contact Us</a>
				</li>
				<li>
					<a class="btn btn-primary" href="/login" role="button">
						Log In
					</a>
				</li>
			</ul>
		</nav>
	);
}
