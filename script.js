console.log(`
  _________________________
 < Can you find the flags? >
  -------------------------
         \\
          \\
                                     .::!!!!!!!:.
      .!!!!!:.                      .:!!!!!!!!!!!!
      ~~~~!!!!!!.               .:!!!!!!!!!UWWW$$
          :$NWX!!:          .:!!!!!!XUWW$$$$$P
          $$$##WX!:      <!!!!UW$$"  $$$$#
          $$$  $$UX   :!!UW$$$$$   4$$$*
          ^$$B  $$     $$$$$$   d$R"
            "*$bd$$     '*$$$$$$o+#"
                 """"          """""""

`);

const _0x4f2a = ['RkxBR3tK', 'NFY0U0NS', 'MVBUX04x', 'TkpBXzMw', 'M30='];
const _debug = {
    mode: false,
    level: 0,
    trace: function() { return this.mode && this.level > 2; }
};

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

function _assembleSecretData() {
    try {
        if (typeof window !== 'undefined' && window.location) {
            const parts = [
                atob(_0x4f2a[0]),
                atob(_0x4f2a[1]),
                atob(_0x4f2a[2]),
                atob(_0x4f2a[3]),
                atob(_0x4f2a[4])
            ];
            return parts.join('');
        }
    } catch(e) {
        return null;
    }
    return null;
}

window.revealHiddenFlag = function() {
    const hiddenData = _assembleSecretData();
    if (hiddenData) {
        console.log('%c🚩 FLAG FOUND!', 'color: #ff6b6b; font-size: 16px; font-weight: bold;');
        console.log('%c' + hiddenData, 'color: #4ecdc4; font-size: 14px; background: #2c3e50; padding: 5px;');
        return hiddenData;
    }
    return 'No flag found';
};

setTimeout(() => {
    if (_debug.trace()) {
        const secretFlag = _assembleSecretData();
        console.group('%cDebugging Info', 'color: #666; font-size: 12px;');
        console.log('Secret data assembled:', secretFlag);
        console.groupEnd();
    }
}, 5000);

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

window.help = function() {
    console.log('%cAvailable commands:', 'font-weight: bold;');
    console.log('help() - Show this help');
    console.log('about() - About this site');
    console.log('Three flags are hidden in the code of this website. There might be hidden functions...');
};

window.about = function() {
    console.log('%cPortfolio by january1073', 'color: #21a5e3; font-weight: bold;');
    console.log('Built with HTML, CSS, vanilla JS, and lots of coffee.');
    console.log('Looking for flags? Keep digging...');
};

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

    const scrollToTopButton = document.getElementById('scrollToTop');
    if (scrollToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopButton.classList.add('visible');
            } else {
                scrollToTopButton.classList.remove('visible');
            }
        });

        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

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

    console.log('%cHint: Try typing help() in the console 🔍', 'color: #888; font-style: italic;');
});
