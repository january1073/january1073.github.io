function toggleTheme() {
	const currentTheme = document.body.dataset.theme;
	const newTheme = currentTheme === "" ? "dark" : "";
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
	}, 100);
}

function setupAccordion(headerId, bodyId) {
    const accordionHeader = document.getElementById(headerId);
    const accordionBody = document.getElementById(bodyId);

    if (!accordionHeader || !accordionBody) {
        console.warn(`Accordion elements not found for headerId: ${headerId}, bodyId: ${bodyId}`);
        return;
    }

    accordionHeader.addEventListener('click', () => {
        const headerRect = accordionHeader.getBoundingClientRect();
        const isHeaderVisible = (
            headerRect.top >= 0 &&
            headerRect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        );

        if (!accordionBody.classList.contains('visible')) {
            accordionBody.style.display = 'block';
            accordionBody.style.opacity = '0';
            accordionBody.style.transform = 'translateY(-5px)';

            void accordionBody.offsetHeight;

            accordionBody.style.transition = 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out';
            accordionBody.style.opacity = '1';
            accordionBody.style.transform = 'translateY(0)';

            accordionBody.classList.add('visible');
            accordionHeader.classList.add('active');

            if (!isHeaderVisible) {
                setTimeout(() => {
                    accordionHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setTimeout(() => window.scrollBy(0, -20), 500);
                }, 100);
            }
        } else {
            accordionBody.classList.add('fade-out');

            setTimeout(() => {
                accordionBody.style.display = 'none';
                accordionBody.classList.remove('visible');
                accordionBody.classList.remove('fade-out');
                accordionHeader.classList.remove('active');

                accordionBody.style.opacity = '0';
                accordionBody.style.transform = 'translateY(-5px)';
            }, 400);

            if (!isHeaderVisible) {
                setTimeout(() => {
                    accordionHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setTimeout(() => window.scrollBy(0, -20), 500);
                }, 100);
            }
        }
    });
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
			}, 1000);
		});
	}

    const themeToggle = document.querySelector(".theme-toggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", toggleTheme);
    } else {
        console.warn("Theme toggle button not found.");
    }

    const backgroundAudio = document.getElementById('backgroundAudio');
    const audioToggle = document.getElementById('audioToggle');
    const audioIcon = audioToggle ? audioToggle.querySelector('.audio-on-icon') : null;


    if (audioToggle && backgroundAudio && audioIcon) {
        if (backgroundAudio.paused) {
            audioToggle.classList.add('audio-off-state');
        } else {
            audioToggle.classList.remove('audio-off-state');
        }

        audioToggle.classList.add('pulsing');
        setTimeout(() => {
            audioToggle.classList.remove('pulsing');
        }, 2000);

        audioToggle.addEventListener('click', () => {
            if (backgroundAudio.paused) {
                backgroundAudio.play().then(() => {
                    audioToggle.classList.remove('audio-off-state');
                    audioToggle.classList.remove('pulsing');
                }).catch(error => {
                    console.error("Audio playback failed:", error);
                });
            } else {
                backgroundAudio.pause();
                audioToggle.classList.add('audio-off-state');
            }
        });
    } else {
        console.warn("Audio elements not found or SVG icon missing.");
    }

    setupAccordion('accordionHeader', 'accordionBody');
    setupAccordion('projectsAccordionHeader', 'projectsAccordionBody');
    setupAccordion('ctfsAccordionHeader', 'ctfsAccordionBody');
    setupAccordion('seriesAccordionHeader', 'seriesAccordionBody');
    setupAccordion('publicationsAccordionHeader', 'publicationsAccordionBody');

    const readmeSection = document.getElementById('readme-section');
    if (readmeSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    readmeSection.classList.add('visible-on-scroll');
                    readmeSection.classList.remove('hidden-on-load');
                    observer.unobserve(readmeSection);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(readmeSection);
    } else {
        console.warn("Element with ID 'readme-section' not found.");
    }


    fetch('https://api.github.com/repos/january1073/january1073.github.io/commits/main')
        .then(r => r.json())
        .then(data => {
            const lastCommit = new Date(data.commit.committer.date);
            const lastUpdatedElement = document.getElementById('last-updated');
            if (lastUpdatedElement) {
                lastUpdatedElement.textContent = lastCommit.toISOString().split('T')[0];
            } else {
                console.warn("Element with ID 'last-updated' not found.");
            }
        })
        .catch(error => console.error('Error fetching last commit:', error));
});
