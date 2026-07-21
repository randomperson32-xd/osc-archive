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