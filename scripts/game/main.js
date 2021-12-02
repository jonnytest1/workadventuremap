/// <reference path="../index.js" />

module.exports = exportNesting(Promise.all([
    require('./user-data'),
    require('../backend-connection')]
), imports => {
    async function openOverlay() {
        WA.nav.openCoWebSite('./game/overlay/mapoverlay/dist/mapoverlay/index.html', true); //{ asOverlay: true, passInputEvents: true, allow: 'microphone' }
    }

    async function enableGameMode() {
        const [{ getUserData }, { message, ws }] = await imports;
        const userData = await getUserData();

        WA.ui.registerMenuCommand('open game overlay', () => {
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
                /**
                 * @type {any}
                 */
                let obj = WA;
                const parts = messageEvent.data.method.split(".")
                for(let part of parts) {
                    obj = obj[part];
                }
                if(typeof obj == "function") {
                    const response = await obj(...messageEvent.data.arguments);
                    window.parent.postMessage({
                        type: 'apicallresponse',
                        uuid: messageEvent.data.uuid,
                        data: response
                    }, '*');
                }
            }
        });

        let onMOveEvent = WA["onMoveEvent"]
        if(onMOveEvent) {
            onMOveEvent(e => {
                window.parent.postMessage({
                    type: 'movementpassthrough',
                    data: e
                }, '*');
            });
        }


    }
    return { enableGameMode, openOverlay }
})