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
    // Show with fade-in
    accordionBody.style.opacity = 0;
    accordionBody.style.display = 'block';
    
    setTimeout(() => {
      accordionBody.style.transition = 'opacity 1s ease-in-out';
      accordionBody.style.opacity = 1;
    }, 10);

    accordionBody.classList.add('visible');
    accordionHeader.classList.add('active');

    // Scroll if header not fully visible
    if (!isHeaderVisible) {
      setTimeout(() => {
        accordionHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Optional: add a little manual offset afterwards
        setTimeout(() => window.scrollBy(0, -20), 500); // tiny scroll up
      }, 100);
    }

  } else {
    // Fade out
    accordionBody.style.transition = 'opacity 1s ease-in-out';
    accordionBody.style.opacity = 0;

    setTimeout(() => {
      accordionBody.style.display = 'none';
      accordionBody.classList.remove('visible');
    }, 1000); // after fade-out

    accordionHeader.classList.remove('active');

    // Optional: when closing, scroll back up to header
    if (!isHeaderVisible) {
      setTimeout(() => {
        accordionHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => window.scrollBy(0, -20), 500); // tiny scroll up
      }, 100);
    }
  }
});

const whoareuButton = document.getElementById('whoareubutton');
const outputDiv = document.getElementById('output');
let isOutputVisible = false;

whoareuButton.addEventListener('click', function() {
  outputDiv.innerHTML = '';

  if (!isOutputVisible) {
    let info = '';
    info += "Information your browser directly sends:\n\n";

    if (navigator.userAgent) info += `User-Agent: ${navigator.userAgent}\n`;
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
      info += `\nReferrer: (none or directly accessed)\n`;
    }

    info += "\n**Screen Object:**\n";
    if (screen.width) info += `Width: ${screen.width}px\n`;
    if (screen.height) info += `Height: ${screen.height}px\n`;
    if (screen.availWidth) info += `Available Width: ${screen.availWidth}px\n`;
    if (screen.availHeight) info += `Available Height: ${screen.availHeight}px\n`;
    if (screen.colorDepth) info += `Color Depth: ${screen.colorDepth} bits\n`;
    if (screen.pixelDepth) info += `Pixel Depth: ${screen.pixelDepth} bits\n`;
    if (screen.orientation && screen.orientation.type) info += `Orientation: ${screen.orientation.type}\n`;

    // --- add blank line AFTER orientation, BEFORE information notice ---
    info += `\n`; 
    info += "// For your information only. I do not track visitors.\n";
    info += "// Surf safely and protect yourself! Learn more: https://ssd.eff.org";

    // Adding content gradually (fade-in effect)
    outputDiv.textContent = info;
    outputDiv.style.opacity = 0;
    outputDiv.style.display = 'block';

    // Trigger fade-in after a very small delay
    setTimeout(() => {
      outputDiv.style.transition = "opacity 1s ease-in-out";
      outputDiv.style.opacity = 1;
    }, 10);

    // Scroll the page to the output section
    window.scrollTo({
        top: outputDiv.offsetTop - 20, // Adjust the offset to add a little margin above
        behavior: "smooth" // Smooth scroll effect
    });

    whoareuButton.textContent = 'Hide';
    isOutputVisible = true;
  } else {
    outputDiv.style.display = 'none';
    whoareuButton.textContent = 'Check';
    isOutputVisible = false;
  }
});