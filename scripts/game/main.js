
const userDataPr = Promise.all([require('./user-data'), require('../backend-connection')]);

async function enableGameMode() {
    WA.registerMenuCommand('open game overlay', () => {
        WA.openCoWebSite('http://localhost:4200/scripts/game/overlay/mapoverlay/dist/mapoverlay/', { asOverlay: true });
    });

    window.addEventListener('message', async messageEvent => {
        const [{ getUserData }, { message }] = await userDataPr;
        const type = messageEvent.data.type;
        if(type === 'loaded') {
            window.parent.postMessage({
                type: 'userdata',
                data: await getUserData()
            }, '*');
        } else if(messageEvent.data.type === 'exitSceneUrl') {
            WA.exitSceneTo(messageEvent.data.data);
        } else if(messageEvent.data.type === 'passthrough') {
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