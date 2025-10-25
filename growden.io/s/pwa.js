window.deferredInstall = null;
window.addEventListener('beforeinstallprompt', (e) => {
  window.deferredInstall = e;
  console.log('PWA install prompt has been saved.');
  if (typeof unityInstance !== 'undefined' && unityInstance != null) {
    unityInstance.SendMessage('PWAManager', 'OnPwaPromptAvailabilityChanged', window.deferredInstall ? "1" : "0");
  }
});
