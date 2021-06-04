

/**
 * @typedef {{
 *    zone:string,withCircle?:boolean,blocking?:boolean,data:Array<{text:string,option:string,onclick?:()=>void}>
 * }} SingleConversationOptions
 */

/**
 * 
 * @typedef {{
 *          buttonText:string,
 *          continuation?:ConversationButton
 *           _hasClicked?:boolean 
 *          onclick?:()=>void,
 *      }} ButtonElement
 * 
 * @typedef {{
 *      message:string,
 *      resumeMainIndex?:boolean
 *      exhaustOptionsBeforeContinue?:boolean
 *      buttons:Array<ButtonElement|string>|string
 * }} ConversationButton _hasClicked=true wont show up
 */

/**
 * @typedef {{
 *    zone:string,
 *    withCircle?:boolean,
 *    blocking?:boolean,
 *    data:Array<ConversationButton>
 *    onfinish?:(options:MultiConversationOptions)=>void
 *    _conversationIndex?:Array<number>
 * }} MultiConversationOptions
 */


module.exports = exportNesting(Promise.all([require("./zoned-popup")]), imports => {
    /**
     * @param {SingleConversationOptions} options 
     */
    async function singleStrandedPopupConversation(options) {
        const [{ popupInZone }] = await imports
        let conversationIndex = 0

        function createPopup(index) {
            conversationIndex = Math.max(index, conversationIndex);

            const currentIndexData = options.data[index];
            const popupOptions = [{
                label: currentIndexData.option,
                callback: () => {
                    if(currentIndexData.onclick) {
                        currentIndexData.onclick();
                    }
                    if(options.data[index + 1]) {
                        createPopup(index + 1);
                    }
                }
            }];
            popupInZone({
                zone: options.zone,
                blocking: options.blocking,
                withCircle: options.withCircle,
                popupText: currentIndexData.text,
                initiallyOpened: index != 0,
                openCondition: () => conversationIndex == index,
                popupOptions: popupOptions
            });
        }
        createPopup(0);
    }

    /**
     * @param {MultiConversationOptions} options 
     */
    async function multiStrandedPopupConversation(options) {
        const [{ popupInZone }] = await imports
        options._conversationIndex = [0]

        /**
         * 
         * @param {Array<number>} indexArray 
         */
        function getForIndexArray(indexArray) {
            const indices = [...indexArray]

            let option = options.data[indices.shift()]

            for(let indexParam of indices) {
                let subButtons = option.buttons
                if(typeof subButtons == "string") {
                    throw new Error("cannot get index of string")
                } else {
                    const subButton = subButtons[indexParam]
                    if(typeof subButton == "string") {
                        throw new Error("cannot get index of string")
                    } else {
                        option = subButton.continuation
                    }
                }

            }
            return option
        }

        /**
         * 
         * @param {Array<number>} conversationPos 
         * @param {ConversationButton} [currentIndexData] 
         */
        function createPopup(conversationPos, currentIndexData) {
            const indexPos = options._conversationIndex.length - 1
            options._conversationIndex = conversationPos.map((val, index) => {
                return Math.max(conversationPos[index], val)
            })

            currentIndexData = currentIndexData || getForIndexArray(conversationPos);

            if(currentIndexData == undefined) {
                if(options.onfinish) {
                    options.onfinish(options)
                }
                return
            }
            const popupOptions = [];


            if(typeof currentIndexData.buttons == "string") {
                currentIndexData.buttons = [currentIndexData.buttons]
            }


            /**
            * @type {Array<ButtonElement>}
            */
            let buttons = currentIndexData.buttons = currentIndexData.buttons.map(alternative => {
                if(typeof alternative == "string") {
                    /**
                     * @type {ButtonElement}
                     */
                    const newAlternative = {
                        buttonText: alternative
                    }
                    return newAlternative
                } else {
                    return alternative
                }
            })
            buttons
                .filter(alternative => {
                    if(!currentIndexData.exhaustOptionsBeforeContinue) {
                        return true
                    }
                    return !alternative._hasClicked
                })
                .map(alternative => ({
                    label: alternative.buttonText,
                    callback: () => {
                        alternative._hasClicked = true
                        if(alternative.onclick) {
                            alternative.onclick();
                        }
                        if(!currentIndexData.exhaustOptionsBeforeContinue || popupOptions.length == 1) {
                            let continuation = undefined
                            if(alternative.continuation) {
                                continuation = alternative.continuation
                            }
                            let newIndex = [...conversationPos];
                            if(continuation) {
                                options._conversationIndex.push(0)
                                newIndex.push(0)
                            } else {
                                if(newIndex.length > 1) {
                                    if(!currentIndexData.resumeMainIndex) {
                                        if(options.onfinish) {
                                            options.onfinish(options)
                                        }
                                        return
                                    }
                                    newIndex.length = 1
                                }
                                newIndex[newIndex.length - 1]++
                            }
                            createPopup(newIndex, continuation)
                        } else {
                            createPopup([...conversationPos])
                        }

                    }
                }))
                .forEach((option) => {
                    popupOptions.push(option)
                })

            popupInZone({
                zone: options.zone,
                blocking: options.blocking,
                withCircle: options.withCircle,
                popupText: currentIndexData.message,
                initiallyOpened: conversationPos.length > 1 || conversationPos[0] > 0,
                openCondition: () => JSON.stringify(options._conversationIndex) == JSON.stringify(conversationPos),
                popupOptions: popupOptions
            });
        }
        createPopup([0]);
    }
    return {
        singleStrandedPopupConversation,
        multiStrandedPopupConversation
    }
})

/**
 *
 * example usage (main flow is down then towards bottom-right where necessary)
 *
 *    multiStrandedPopupConversation({
        zone: "convtest",
        onfinish: (opts) => {
            opts._conversationIndex = [0]
        },
        data: [{
            message: "test2.2",
            buttons: ["abc", "bef"]
        }, {
            message: "test2.5",
            buttons: [{
                buttonText: "b1",
                continuation: {
                    message: "b1message",
                    resumeMainIndex: true,
                    buttons: [{
                        buttonText: "b1response",
                        continuation: {
                            message: "b1respmess",
                            exhaustOptionsBeforeContinue: true,
                            resumeMainIndex: true,
                            buttons: ["exhaust1", "exhaust2"]
                        }
                    }, "b1responsee2"]
                }
            }, "b2a"]
        }, {
            message: "test3",
            buttons: "finish"
        }
        ]
    })
 *
 *
 *
 *
 */
