
const imports = Promise.all([require("./zoned-popup")])



module.exports = {
    /**
     * 
     * @param {{zone:string,withCircle?:boolean,blocking?:boolean,data:Array<{text:string,option:string,onclick?:()=>void}>}} options 
     */
    singleStrandedPopupConversation: async (options) => {
        const [{ popupInZone }] = await imports
        let conversationIndex = 0

        function createPopup(index) {
            conversationIndex = Math.max(index, conversationIndex);
            popupInZone({
                zone: options.zone,
                blocking: options.blocking,
                withCircle: options.withCircle,
                popupText: options.data[index].text,
                initiallyOpened: index != 0,
                openCondition: () => conversationIndex == index,
                popupOptions: [{
                    label: options.data[index].option,
                    callback: () => {
                        if(options.data[index].onclick) {
                            options.data[index].onclick();
                        }
                        if(options.data[index + 1]) {
                            createPopup(index + 1);
                        }
                    }
                }]
            });
        }
        createPopup(0);
    }
}

