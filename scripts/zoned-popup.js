module.exports = {
    popupInZone:
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
};