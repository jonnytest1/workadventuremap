///<reference path="./index.d.ts" />
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
        backendCExport.send({
            type: data.type,
            data: data.data,
            uuid: uuid
        });
        promiseMap[uuid] = resolv;

    });
    return pr;
}

const backendHost = "pi4.e6azumuvyiabvs9s.myfritz.net"
const backendDomain = `https://${backendHost}`

/**
 * @type {WebSocket}
 */
let websocket;
const callbacks = [];
/**
 * @type {Array<string>}
 */
let eventQueue = [];

let cookieCheckPromise = new Promise((res, thr) => {
    const iframe = document.createElement('iframe');
    window.addEventListener('message', messageEvent => {
        let eventData = messageEvent.data;
        if(eventData.type === 'iframeresponse') {
            console.debug('resolve cookie promise');
            res();
            iframe.remove();
        }
    });
    iframe.src = `${backendDomain}/mapserver/rest/message/${btoa(JSON.stringify({ type: 'cookie' }))}/message.html`;
    document.body.appendChild(iframe);
});

let isReady = false;
/**
 *
* @type {{addEventListener,send}}
*/
var backendCExport = {
    addEventListener: (callback) => {
        callbacks.push((callback));
    },
    send: async (msg) => {
        await cookieCheckPromise;
        if(websocket.readyState !== websocket.OPEN || !isReady) {
            console.log('caching', msg);
            eventQueue.push(JSON.stringify(msg));
        } else {
            console.log('sending directly', msg);
            websocket.send(JSON.stringify(msg));
        }

    }
};
function connectWebsocket() {
    isReady = false;
    websocket = new WebSocket(`wss://${backendHost}/mapserver/rest/message`);
    let connectionReadyResolver;
    let connectionCheckId

    websocket.onclose = () => {
        connectWebsocket();
    };
    websocket.onmessage = event => {
        console.debug('onmessage data', event);
        if(event.data == "connection") {
            clearInterval(connectionCheckId)
            connectionCheckId = undefined
            connectionReadyResolver();
            return
        }
        const eventJSon = JSON.parse(event.data);
        if(eventJSon.uuid && promiseMap[eventJSon.uuid]) {
            console.debug('resolving', eventJSon.data);
            promiseMap[eventJSon.uuid](eventJSon.data);
            delete promiseMap[eventJSon.uuid];
            return;
        }
        //console.log('no uuid for', eventJSon);

        callbacks.forEach(async cb => {
            cb(eventJSon);
        });
    };
    websocket.onopen = async () => {
        await new Promise((res) => {
            connectionReadyResolver = res;
            connectionCheckId = setInterval(() => {
                websocket.send("connectioncheck")
            }, 200)
        })
        isReady = true;
        try {
            for(let event of eventQueue) {
                await new Promise(res => setTimeout(res, 160));
                console.log('sending from queue', event);
                websocket.send(event);
            }
            eventQueue = [];
        } catch(e) {
            debugger;
            console.error(e);
        }

    };
}
connectWebsocket();

module.exports = {
    backendDomain,
    message,
    ws: backendCExport
};