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
/**
 * @type {{
 * ws:WebSocket,
 * onmessage:((event)=>any)}}
 */
const ws = {
    onmessage: event => { },
    ws: null
};
const messageCallback = event => {
    if(event.type === 'receivemessage') {
        WA.sendChatMessage(event.message, event.author);
    }
};
function connectWebsocket() {
    ws.ws = new WebSocket('wss://pi4.e6azumuvyiabvs9s.myfritz.net/mapserver/rest/message');
    ws.ws.onclose = () => {
        connectWebsocket();
    };
    ws.ws.onmessage = event => {
        ws.onmessage(JSON.parse(event.data));
    };

}
connectWebsocket();

module.exports = {
    message,
    ws
};