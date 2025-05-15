function toggleTheme() {
	const currentTheme = document.body.dataset.theme;
	const newTheme = currentTheme === "dark" ? "" : "dark";
	document.body.dataset.theme = newTheme;
	localStorage.setItem("theme", newTheme);
	updateVideoBackground(newTheme);
}

function updateVideoBackground(theme) {
	const bgVideoContainer = document.querySelector(".video-background");
	const bgVideo = document.getElementById("bgVideo");

	if (!bgVideoContainer || !bgVideo) return;

	bgVideoContainer.style.display = "block";

	bgVideo.style.opacity = "0";

	void bgVideo.offsetWidth;

	bgVideo.style.transition = "opacity 30s linear";

	setTimeout(() => {
		bgVideo.style.opacity = theme === "dark" ? "0.1" : "0.05";
		console.log("Video fade-in transition applied");
	}, 100);
}

document.addEventListener("DOMContentLoaded", () => {
	const savedTheme = localStorage.getItem("theme");
	document.body.dataset.theme = savedTheme ? savedTheme : "";

	const bgVideoContainer = document.querySelector(".video-background");
	const bgVideo = document.getElementById("bgVideo");

	if (bgVideoContainer && bgVideo) {
		bgVideoContainer.style.display = "block";
		bgVideo.style.visibility = "visible";
		bgVideo.style.opacity = "0";

		bgVideo.playbackRate = 0.75;

		window.addEventListener('load', () => {
			bgVideo.style.transition = "opacity 10s linear";

			setTimeout(() => {
				bgVideo.style.opacity = savedTheme === "dark" ? "0.1" : "0.05";
				console.log("Starting video fade-in (10s)");
			}, 1000);
		});
	}
});

document.querySelector(".theme-toggle").addEventListener("click", toggleTheme);

const accordionHeader = document.getElementById('accordionHeader');
const accordionBody = document.getElementById('accordionBody');

accordionHeader.addEventListener('click', () => {
	const headerRect = accordionHeader.getBoundingClientRect();
	const isHeaderVisible = (
		headerRect.top >= 0 &&
		headerRect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
	);

	if (!accordionBody.classList.contains('visible')) {
		accordionBody.style.opacity = 0;
		accordionBody.style.display = 'block';

		setTimeout(() => {
			accordionBody.style.transition = 'opacity 1s ease-in-out';
			accordionBody.style.opacity = 1;
		}, 10);

		accordionBody.classList.add('visible');
		accordionHeader.classList.add('active');

		if (!isHeaderVisible) {
			setTimeout(() => {
				accordionHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
				setTimeout(() => window.scrollBy(0, -20), 500);
			}, 100);
		}
	} else {
		accordionBody.style.transition = 'opacity 1s ease-in-out';
		accordionBody.style.opacity = 0;

		setTimeout(() => {
			accordionBody.style.display = 'none';
			accordionBody.classList.remove('visible');
		}, 1000);

		accordionHeader.classList.remove('active');

		if (!isHeaderVisible) {
			setTimeout(() => {
				accordionHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
				setTimeout(() => window.scrollBy(0, -20), 500);
			}, 100);
		}
	}
});

fetch('https://api.github.com/repos/january1073/january1073.github.io/commits/main')
	.then(r => r.json())
	.then(data => {
		const lastCommit = new Date(data.commit.committer.date);
		document.getElementById('last-updated').textContent = lastCommit.toISOString().split('T')[0];
	});
