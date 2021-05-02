///<reference path="./index.d.ts" />

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
 * @param {{
 *    zone:string
 *    objectLayerName?:string,
 *    popupText:string,
 *    delay?:number
 *    popupOptions:Array<PopupOptions>
 * }} options
 */
function popupInZone(options) {
    if(!options.objectLayerName) {
        options.objectLayerName = options.zone;
    }
    let lastOpened = 0;
    /**
     * @type {Popup}
     */
    let popup;
    WA.onEnterZone(options.zone, () => {
        if(options.delay) {
            if(lastOpened + options.delay > Date.now()) {
                return;
            }
        }
        lastOpened = Date.now();
        popup = WA.openPopup(options.objectLayerName, options.popupText, options.popupOptions.map(option => {
            const callback = option.callback;
            const popupOptions = {
                ...option,
                className: option.className || 'normal',
                callback: () => {
                    if(callback) {
                        callback(popup);
                    }
                    popup.close();
                    popup = undefined;
                }
            };

            return popupOptions;
        }));
    });
    WA.onLeaveZone(options.zone, () => {
        if(popup) {
            popup.close();
            popup = undefined;
        }
    });
}