fetch('https://api.github.com/repos/january1073/january1073.github.io/commits/main')
    .then(r => r.json())
    .then(data => {
        const lastCommit = new Date(data.commit.committer.date);
        document.getElementById('last-updated').textContent =
            lastCommit.toISOString().split('T')[0];
    });

function toggleTheme() {
    const currentTheme = document.body.dataset.theme;
    const newTheme = currentTheme === "dark" ? "" : "dark";
    document.body.dataset.theme = newTheme;
    localStorage.setItem("theme", newTheme);
}

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.body.dataset.theme = savedTheme;
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
