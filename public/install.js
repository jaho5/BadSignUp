window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);

function saveBeforeInstallPromptEvent() {
    
    deferredInstallPrompt = evt;
    installButton.removeAttribute('hidden');
    
    deferredInstallPrompt.prompt();
    // Hide the install button, it can't be called twice.
    evt.srcElement.setAttribute('hidden', true);
}

console.log('hello')