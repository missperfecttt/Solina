export const initGoogleAnalytics = () => {
  if (document.getElementById('ga-script')) return;

  const script = document.createElement('script');
  script.id = 'ga-script';
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-YOUR-ID';
  script.async = true;
  document.head.appendChild(script);

  const inline = document.createElement('script');
  inline.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-YOUR-ID');
  `;
  document.head.appendChild(inline);
};