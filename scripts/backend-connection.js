function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
/**
 * @type {{[uuid:string]:(args)=>void}}
 */
const promiseMap = {};
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
        const uuid = uuidv4();
        ws.send({
            type: data.type,
            data: data.data,
            uuid: uuid
        });
        promiseMap[uuid] = resolv;
        /*const img = document.createElement('iframe');
        window.onmessage = (messageEvent) => {
            /**
             * @type {{type:"iframeresponse",data:msgCpy[T]["response"]}}
             *
            let eventData = messageEvent.data;
            if(eventData.type === 'iframeresponse') {
                resolv(eventData.data);
                img.remove();
            }
        };
        img.src = `https://pi4.e6azumuvyiabvs9s.myfritz.net/mapserver/rest/message/${btoa(JSON.stringify(data))}/message.png`;
        document.body.appendChild(img);*/
    });
    return pr;
}
/**
 * @type {WebSocket}
 */
let websocket;
const callbacks = [];
/**
 * @type {Array<string>}
 */
let eventQueue = [];

/**
 * @type {{addEventListener,send}}
 */
const ws = {
    addEventListener: (callback) => {
        callbacks.push((callback));
    },
    send: (msg) => {
        if(websocket.readyState !== websocket.OPEN) {
            console.log('caching', msg);
            eventQueue.push(JSON.stringify(msg));
        } else {
            websocket.send(JSON.stringify(msg));
        }

    }
};
function connectWebsocket() {
    websocket = new WebSocket('wss://pi4.e6azumuvyiabvs9s.myfritz.net/mapserver/rest/message');
    websocket.onclose = () => {
        connectWebsocket();
    };
    websocket.onmessage = event => {
        console.log('onmessage data', event);
        const eventJSon = JSON.parse(event.data);
        if(eventJSon.uuid && promiseMap[eventJSon.uuid]) {
            console.log('resolving', eventJSon.data);
            promiseMap[eventJSon.uuid](eventJSon.data);
            delete promiseMap[eventJSon.uuid];
            return;
        }
        console.log('no uuid for', eventJSon);

        callbacks.forEach(cb => {
            cb(eventJSon);
        });
    };
    websocket.onopen = () => {
        setTimeout(async () => {
            try {
                for(let event of eventQueue) {
                    await new Promise(res => setTimeout(res, 100));
                    console.log('sending from queue', event);
                    websocket.send(event);
                }
                eventQueue = undefined;
            } catch(e) {
                console.error(e);
            }
        }, 100);

    };

}
connectWebsocket();

module.exports = {
    message,
    ws
};