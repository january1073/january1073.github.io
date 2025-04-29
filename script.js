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

const whoareuButton = document.getElementById('whoareubutton');
const outputDiv = document.getElementById('output');
let isOutputVisible = false;

whoareuButton.addEventListener('click', function() {
  if (!isOutputVisible) {
    outputDiv.innerHTML = '';
    outputDiv.style.display = 'block';
    outputDiv.style.opacity = 1;
    whoareuButton.textContent = 'Hide';
    isOutputVisible = true;

    let progress = 0;
    const startTime = Date.now();
    const duration = 5000;
    const barLength = 25;
    const spinnerFrames = ['|', '/', '-', '\\'];
    let spinnerIndex = 0;

    const progressInterval = setInterval(() => {
      progress += Math.floor(Math.random() * 8) + 2;
      if (progress > 100) progress = 100;
    
      const filledLength = Math.floor((progress / 100) * barLength);
      const emptyLength = barLength - filledLength;
      const bar = `[${'='.repeat(filledLength > 0 ? filledLength - 1 : 0)}${filledLength > 0 ? '>' : ''}${' '.repeat(emptyLength)}] ${progress}%`;
    
      const spinner = spinnerFrames[spinnerIndex % spinnerFrames.length];
      spinnerIndex++;
    
      outputDiv.textContent = `Gathering ${spinner} ${bar}`;
      outputDiv.scrollIntoView({ behavior: 'auto', block: 'end' });
    
      const elapsed = Date.now() - startTime;
      if (elapsed >= duration || progress >= 100) {
        clearInterval(progressInterval);
        setTimeout(() => {
          const fullInfo = generateInfo();
          typeText(fullInfo, outputDiv);
        }, 300);
      }
    }, 250);
  } else {
    whoareuButton.textContent = 'Check';
    isOutputVisible = false;

    outputDiv.style.transition = 'opacity 1s ease-in-out';
    outputDiv.style.opacity = 0;

    setTimeout(() => {
      outputDiv.style.display = 'none';
    }, 1000);
  }
});

function generateInfo() {
  let info = '';
  info += "// For your information only. I do not track visitors.\n\n";

  info += "=== GENERAL BROWSER INFO ===\n";
  if (navigator.userAgent) info += `User-Agent: ${navigator.userAgent}\n`;
  if (navigator.appName) info += `App Name: ${navigator.appName}\n`;
  if (navigator.appVersion) info += `App Version: ${navigator.appVersion}\n`;
  if (navigator.appCodeName) info += `App Code Name: ${navigator.appCodeName}\n`;
  if (navigator.product) info += `Product: ${navigator.product}\n`;
  if (navigator.productSub) info += `Product Sub: ${navigator.productSub}\n`;
  if (navigator.vendor) info += `Vendor: ${navigator.vendor}\n`;
  if (navigator.vendorSub) info += `Vendor Sub: ${navigator.vendorSub}\n`;
  if (navigator.platform) info += `Platform: ${navigator.platform}\n`;

  info += "\n=== PRIVACY & TRACKING ===\n";
  if (navigator.cookieEnabled !== undefined) info += `Cookies Enabled: ${navigator.cookieEnabled}\n`;
  if (navigator.doNotTrack !== undefined) info += `Do Not Track: ${navigator.doNotTrack}\n`;
  if (document.referrer) {
    info += `Referrer: ${document.referrer}\n`;
  } else {
    info += `Referrer: (none or directly accessed)\n`;
  }

  info += "\n=== LANGUAGE & LOCATION ===\n";
  if (navigator.language) info += `Language: ${navigator.language}\n`;
  if (navigator.languages) info += `Languages: ${navigator.languages.join(', ')}\n`;
  if (navigator.geolocation) info += `Geolocation Available: true\n`;

  info += "\n=== CONNECTIVITY ===\n";
  if (navigator.onLine !== undefined) info += `Online: ${navigator.onLine}\n`;

  info += "\n=== DEVICE & HARDWARE ===\n";
  if (navigator.maxTouchPoints !== undefined) info += `Max Touch Points: ${navigator.maxTouchPoints}\n`;
  if (navigator.deviceMemory) info += `Device Memory: ${navigator.deviceMemory} GB\n`;
  if (navigator.hardwareConcurrency) info += `CPU Cores: ${navigator.hardwareConcurrency}\n`;
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    info += `Touch Support: Yes\n`;
  } else {
    info += `Touch Support: No\n`;
  }

  info += "\n=== FEATURES & APIS ===\n";
  if (navigator.mediaDevices) info += `Media Devices API: Available\n`;
  if (navigator.bluetooth) info += `Bluetooth API: Available\n`;
  if (navigator.credentials) info += `Credentials Management API: Available\n`;
  if (navigator.clipboard) info += `Clipboard API: Available\n`;

  info += "\n=== DISPLAY & SCREEN ===\n";
  if (screen.width) info += `Screen Width: ${screen.width}px\n`;
  if (screen.height) info += `Screen Height: ${screen.height}px\n`;
  if (screen.availWidth) info += `Available Width: ${screen.availWidth}px\n`;
  if (screen.availHeight) info += `Available Height: ${screen.availHeight}px\n`;
  if (screen.colorDepth) info += `Color Depth: ${screen.colorDepth} bits\n`;
  if (screen.pixelDepth) info += `Pixel Depth: ${screen.pixelDepth} bits\n`;
  if (screen.orientation && screen.orientation.type) info += `Orientation: ${screen.orientation.type}\n`;

  info += "\n=== USER PREFERENCES ===\n";
  if (window.matchMedia('(display-mode: standalone)').matches) {
    info += `PWA Installed: Yes\n`;
  } else {
    info += `PWA Installed: No\n`;
  }
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    info += `Preferred Color Scheme: Dark\n`;
  } else {
    info += `Preferred Color Scheme: Light\n`;
  }

  info += `Timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}\n`;

  if (navigator.userAgentData) {
    info += "\n=== USER-AGENT DATA (EXPERIMENTAL) ===\n";
    info += `Brands: ${JSON.stringify(navigator.userAgentData.brands)}\n`;
    info += `Mobile: ${navigator.userAgentData.mobile}\n`;
    info += `Platform: ${navigator.userAgentData.platform}\n`;
  }

  info += `\n\n// Surf safely and protect yourself! Learn more: https://ssd.eff.org`;
  return info;
}

function typeText(text, element) {
  let i = 0;
  element.textContent = '';

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;

      element.scrollIntoView({ behavior: 'auto', block: 'end' });

      setTimeout(type, Math.random() * 10 + 5); 
    }
  }

  type();
}