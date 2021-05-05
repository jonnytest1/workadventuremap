
const userDataPr = Promise.all([require('./user-data'), require('../backend-connection')]);

async function enableGameMode() {
    const [{ getUserData }, { message }] = await userDataPr;
    const userData = await getUserData();

    WA.registerMenuCommand('open game overlay', () => {
        WA.openCoWebSite('http://localhost:4200/scripts/game/overlay/mapoverlay/dist/mapoverlay/', { asOverlay: true });
    });
    if(userData.autoOpenGameOverlay) {
        WA.openCoWebSite('http://localhost:4200/scripts/game/overlay/mapoverlay/dist/mapoverlay/', { asOverlay: true });
    }

    window.addEventListener('message', async messageEvent => {

        const type = messageEvent.data.type;
        if(messageEvent.data.type === 'passthrough') {
            message({ ...messageEvent.data.data, uuid: messageEvent.data.uuid })
                .then(response => {
                    window.parent.postMessage({
                        type: 'passthroughresponse',
                        uuid: messageEvent.data.uuid,
                        data: response
                    }, '*');
                });
        } else if(messageEvent.data.type === 'apicall') {
            const response = await WA[messageEvent.data.method](...messageEvent.data.arguments);
            window.parent.postMessage({
                type: 'apicallresponse',
                uuid: messageEvent.data.uuid,
                data: response
            }, '*');
        }
    });

}

module.exports = { enableGameMode };