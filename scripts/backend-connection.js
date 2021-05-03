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

const callbacks = [];
/**
 * @type {{
 * ws:WebSocket,
 * addEventListener:((event)=>any)}}
 */
const ws = {
    addEventListener: (callback) => {
        callbacks.push((callback));
    },
    ws: null
};

function connectWebsocket() {
    ws.ws = new WebSocket('wss://pi4.e6azumuvyiabvs9s.myfritz.net/mapserver/rest/message');
    ws.ws.onclose = () => {
        connectWebsocket();
    };
    ws.ws.onmessage = event => {
        callbacks.forEach(cb => {
            cb(JSON.parse(event.data));
        });
    };

}
connectWebsocket();

module.exports = {
    message,
    ws
};