
const userDataPr = Promise.all([require('./user-data'), require('../backend-connection')]);


async function openOverlay() {
    WA.openCoWebSite('./game/overlay/mapoverlay/dist/mapoverlay/index.html', { asOverlay: true, passInputEvents: true, allow: 'microphone' });
}

async function enableGameMode() {
    const [{ getUserData }, { message, ws }] = await userDataPr;
    const userData = await getUserData();

    WA.registerMenuCommand('open game overlay', () => {
        openOverlay();
    });
    if(userData.autoOpenGameOverlay && !window.blockAutoOpenOverlay) {
        openOverlay();
    }

    ws.addEventListener(
        /**
         * @param { { type: 'positionUpdate', data: any }} data
         * */
        (data) => {
            if(data.type === 'positionUpdate') {
                window.parent.postMessage(data, '*');
            }
        });

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
    WA.onMoveEvent(e => {
        window.parent.postMessage({
            type: 'movementpassthrough',
            data: e
        }, '*');
    });
}

module.exports = { enableGameMode, openOverlay };