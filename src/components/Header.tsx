import { useLocation } from "preact-iso";
import logo from "../assets/logo.png";

export function Header() {
	// const { url } = useLocation();

	return (
		<nav>
			<ul class='flex-end'>
				<li>
					<img src={logo} alt="Your Logo"  width="80"/>
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
					<a class="btn btn-primary" href="/create" role="button">
						Create Survey
					</a>
				</li>
			</ul>
		</nav>
	);
}
