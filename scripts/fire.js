/// <reference path="index.d.ts" />
/**
 * @template {keyof msgCpy} T
 * @param {{
 *      type:T,
 *      data?:msgCpy[T]["param"]
 * }} data
 * @returns {Promise<msgCpy[T]["response"]>}
 */
async function message(data) {
    /**
     * @type {Promise<msgCpy[T]["response"]>}
     */
    const pr = new Promise((resolv, thrower) => {
        const img = document.createElement('iframe');
        window.onmessage = (messageEvent) => {
            /**
             * @type {{type:"iframeresponse",data:msgCpy[T]["response"]}}
             */
            let eventData = messageEvent.data;
            if(eventData.type === 'iframeresponse') {
                resolv(eventData.data);
                img.remove();
            }
        };
        img.src = `https://pi4.e6azumuvyiabvs9s.myfritz.net/mapserver/rest/message/${btoa(JSON.stringify(data))}/message.png`;
        document.body.appendChild(img);
    });
    return pr;
}
WA.onEnterZone('death', async () => {
    const [state] = await Promise.all([
        WA.getGameState(),
        message({
            type: 'incrementDeath'
        })
    ]);
    WA.exitSceneTo(`/${state.roomId}${state.startLayerName ? '#' + state.startLayerName : ''}`);
    WA.sendChatMessage('you died ...', '');
});