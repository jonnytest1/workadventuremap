
const userDataPr = require('./user-data');

async function enableGameMode() {
    WA.registerMenuCommand('open game overlay', () => {
        WA.openCoWebSite('./game/overlay/overlay.html', { asOverlay: true });
    });

    window.addEventListener('message', async messageEvent => {
        if(messageEvent.data.type === 'loaded') {
            const { getUserData } = await userDataPr;
            window.parent.postMessage({
                type: 'userdata',
                data: await getUserData()
            }, '*');
        } else if(messageEvent.data.type === 'exitSceneUrl') {
            WA.exitSceneTo(messageEvent.data.data);
        }
    });

}

module.exports = { enableGameMode };