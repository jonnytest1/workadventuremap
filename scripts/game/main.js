async function enableGameMode() {
    WA.registerMenuCommand('open game overlay', () => {
        WA.openCoWebSite('./game/overlay/overlay.html', { asOverlay: true });
    });

    window.addEventListener('message', messageEvent => {
        debugger;
    });
}

module.exports = { enableGameMode };