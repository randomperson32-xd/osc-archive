document.addEventListener('DOMContentLoaded', () => {
  const wipBanner = document.querySelector('.wip');
  const closeBtn = document.getElementById('close-wip-btn');

  if (localStorage.getItem('wipBannerClosed') === 'true') {
    if (wipBanner) wipBanner.style.display = 'none';
  }

  if (closeBtn && wipBanner) {
    closeBtn.addEventListener('click', () => {
      wipBanner.style.display = 'none';
      localStorage.setItem('wipBannerClosed', 'true');
    });
  }
});

window.resetWipBanner = function() {
  localStorage.removeItem('wipBannerClosed');
  const wipBanner = document.querySelector('.wip');
  if (wipBanner) {
    wipBanner.style.display = 'block';
  }
  console.log('restored');
};


function applySettings() {
  const currentTheme = localStorage.getItem('site_theme') || 'nord';
  const currentBlur = localStorage.getItem('header_blur_enabled') || 'on';

  document.documentElement.setAttribute('data-theme', currentTheme);
  document.documentElement.setAttribute('data-blur', currentBlur);
}

applySettings();

document.addEventListener('DOMContentLoaded', () => {
  applySettings();

  const themeSelect = document.getElementById('theme-select');
  const blurToggle = document.getElementById('blur-toggle');

  if (themeSelect && blurToggle) {
    const savedTheme = localStorage.getItem('site_theme') || 'nord';
    const savedBlur = localStorage.getItem('header_blur_enabled') || 'on';

    themeSelect.value = savedTheme;
    blurToggle.checked = (savedBlur === 'on');

    themeSelect.addEventListener('change', (e) => {
      localStorage.setItem('site_theme', e.target.value);
      applySettings();
    });

    blurToggle.addEventListener('change', (e) => {
      const blurStatus = e.target.checked ? 'on' : 'off';
      localStorage.setItem('header_blur_enabled', blurStatus);
      applySettings();
    });
  }

  const closeWipBtn = document.getElementById('close-wip-btn');
  const wipBanner = document.getElementById('wip-banner');
  if (closeWipBtn && wipBanner) {
    closeWipBtn.addEventListener('click', () => {
      wipBanner.style.display = 'none';
    });
  }
});



document.addEventListener('click', async (e) => {
  const link = e.target.closest('a');

  if (
    !link ||
    link.origin !== location.origin ||
    link.target === '_blank' ||
    e.metaKey || e.ctrlKey || e.shiftKey || e.altKey
  ) return;

  if (!document.startViewTransition) return;

  e.preventDefault();
  const targetUrl = link.href;

  const response = await fetch(targetUrl);
  const html = await response.text();

  const newDoc = new DOMParser().parseFromString(html, 'text/html');

  const currentContainer = document.querySelector('main') || document.body;
  const newContainer = newDoc.querySelector('main') || newDoc.body;

  document.startViewTransition(() => {
    currentContainer.innerHTML = newContainer.innerHTML;
    document.title = newDoc.title;
    history.pushState({}, '', targetUrl);
    window.scrollTo(0, 0);
  });
});