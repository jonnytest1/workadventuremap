///<reference path="../index.d.ts" />


module.exports = exportNesting(require('../backend-connection'), imports => {
    /**
     * @type { msgCpy["getUserData"]["response"]}
     */
    let userData;
    return {
        /**
        *
        * @returns { msgCpy["getUserData"]["response"]}
        */
        getUserData: async () => {
            if(!userData) {
                userData = new Promise(async (res, thrower) => {
                    try {
                        const { message, ws } = await imports;

                        /*ws.addEventListener(event => {
                            if(event.type === 'userDataUpdate') {
                                userData = event.data;
                            }
                        });*/
                        console.log('getUserData msg');
                        const userDataResult = await message({
                            type: 'getUserData'
                        });
                        console.log('get userdata returned');
                        res(userDataResult);
                    } catch(e) {
                        debugger;
                        console.error(e);
                        thrower(e);
                    }
                });

            }
            return userData;
        }
    }
});