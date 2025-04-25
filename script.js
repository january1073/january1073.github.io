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

// Attach function to toggle-icon
document.querySelector(".theme-toggle").addEventListener("click", toggleTheme);

// Interface with button
const whoareuButton = document.getElementById('whoareubutton');
const outputDiv = document.getElementById('output');

whoareuButton.addEventListener('click', function() {
  outputDiv.innerHTML = ''; // Clear previous output

  let info = "Information your browser sends:\n\n";

  // Navigator Object Properties
  info += "**Navigator Object:**\n";
  info += `User-Agent: ${navigator.userAgent}\n`;
  if (navigator.appCodeName) info += `App Code Name: ${navigator.appCodeName}\n`;
  if (navigator.appName) info += `App Name: ${navigator.appName}\n`;
  if (navigator.appVersion) info += `App Version: ${navigator.appVersion}\n`;
  if (navigator.cookieEnabled !== undefined) info += `Cookies Enabled: ${navigator.cookieEnabled}\n`;
  if (navigator.doNotTrack !== undefined) info += `Do Not Track: ${navigator.doNotTrack}\n`;
  if (navigator.geolocation) info += `Geolocation Available: true\n`;
  if (navigator.language) info += `Language: ${navigator.language}\n`;
  if (navigator.languages) info += `Languages: ${navigator.languages}\n`;
  if (navigator.onLine !== undefined) info += `Online: ${navigator.onLine}\n`;
  if (navigator.platform) info += `Platform: ${navigator.platform}\n`;
  if (navigator.product) info += `Product: ${navigator.product}\n`;
  if (navigator.productSub) info += `Product Sub: ${navigator.productSub}\n`;
  if (navigator.vendor) info += `Vendor: ${navigator.vendor}\n`;
  if (navigator.vendorSub) info += `Vendor Sub: ${navigator.vendorSub}\n`;
  if (navigator.maxTouchPoints !== undefined) info += `Max Touch Points: ${navigator.maxTouchPoints}\n`;
  if (navigator.mediaDevices) info += `Media Devices Available: true\n`;
  if (navigator.bluetooth) info += `Bluetooth Available: true\n`;
  if (navigator.credentials) info += `Credentials Management Available: true\n`;
  if (navigator.userAgentData) {
    info += `\nUser-Agent Data (Experimental):\n`;
    info += `  Brands: ${JSON.stringify(navigator.userAgentData.brands)}\n`;
    info += `  Mobile: ${navigator.userAgentData.mobile}\n`;
    info += `  Platform: ${navigator.userAgentData.platform}\n`;
  }
  if (document.referrer) {
    info += `\nReferrer: ${document.referrer}\n`;
  } else {
    info += `\nReferrer: (None or directly accessed)\n`;
  }

  info += "\n**Screen Object:**\n";
  info += `Width: ${screen.width}px\n`;
  info += `Height: ${screen.height}px\n`;
  info += `Available Width: ${screen.availWidth}px\n`;
  info += `Available Height: ${screen.availHeight}px\n`;
  info += `Color Depth: ${screen.colorDepth} bits\n`;
  info += `Pixel Depth: ${screen.pixelDepth} bits\n`;
  if (screen.orientation) info += `Orientation: ${screen.orientation.type}\n`;

  outputDiv.textContent = info;
  outputDiv.style.display = 'block'; // Make the output div visible
});