// Function to fetch date of last update from GitHub
fetch('https://api.github.com/repos/january1073/january1073.github.io/commits/main')
    .then(r => r.json())
    .then(data => {
        const lastCommit = new Date(data.commit.committer.date);
        document.getElementById('last-updated').textContent = 
            lastCommit.toISOString().split('T')[0];
    });

// Function to toggle theme
function toggleTheme() {
    const currentTheme = document.body.dataset.theme;
    const newTheme = currentTheme === "dark" ? "" : "dark";
    document.body.dataset.theme = newTheme;
    
    // Save the selected theme in localStorage
    localStorage.setItem("theme", newTheme);
}

// Apply saved theme on page load
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.body.dataset.theme = savedTheme;
    }
});

// Attach function to button
document.querySelector(".theme-toggle").addEventListener("click", toggleTheme);

// Interface
const whoareuButton = document.getElementById('whoareubutton');
const outputDiv = document.getElementById('output');

whoareuButton.addEventListener('click', function() {
  outputDiv.innerHTML = ''; // Clear previous output (if it was visible before)

  let info = "Information your browser directly sends:\n\n";

  // Browser Information (User-Agent)
  info += `User-Agent: ${navigator.userAgent}\n`;

  // Referrer (if available)
  if (document.referrer) {
    info += `Referrer: ${document.referrer}\n`;
  } else {
    info += `Referrer: (None or directly accessed)\n`;
  }

  // Language Preferences
  info += `Language: ${navigator.language}\n`;
  info += `Languages: ${navigator.languages}\n`;

  // Screen Information (basic)
  info += `Screen Width: ${screen.width}px\n`;
  info += `Screen Height: ${screen.height}px\n`;
  info += `Color Depth: ${screen.colorDepth} bits\n`;

  outputDiv.textContent = info;
  outputDiv.style.display = 'block'; // Make the output div visible
});