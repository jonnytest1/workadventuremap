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

popupInZone({
    zone: 'friendship-explanation-zone',
    popupText: 'stand in there together to become friends 😊',
    objectLayerName: 'freindship popup',
    popupOptions: [{
        label: 'ok',
        callback: popup => popup.close()
    }]
});

/**
 * @type {NodeJS.Timeout}
 */
let friendshipInterval;
/**
 * @type {Array<string>}
 */
let friends = null;

WA.onEnterZone('friendship', async () => {
    let readyFriends = await message({
        type: 'readyfriendship'
    });
    readyFriends.new.forEach(id => {
        WA.sendChatMessage(`you have become friends with ${id}`, 'armor');
    });

    friends = readyFriends.friends;

    friendshipInterval = setInterval(async () => {
        /**
         * @type {Array<string>}
         */
        const newFriends = await message({
            type: 'friendscheck'
        });
        newFriends.filter(newFriend => !friends.includes(newFriend))
            .forEach(friend => {
                WA.sendChatMessage(`you have become friends with ${friend}`, 'amor');
            });
        friends = newFriends;
    }, 1000);
});

WA.onLeaveZone('friendship', () => {
    message({
        type: 'unreadyfriendship'
    });
    clearInterval(friendshipInterval);
});

WA.onChatMessage(msg => {
    if(msg === '!friends') {
        message({ type: 'friendstatus' });
    }
});

setTimeout(() => {
    WA.getGameState()
        .then(async state => {
            await message({
                type: 'userUpdate',
                data: {
                    uuid: state.uuid,
                    nickName: state.nickName
                }
            });

        });
}, 1000);