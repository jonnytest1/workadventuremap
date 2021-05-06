///<reference path="../index.d.ts" />
/**
 * @type { msgCpy["getUserData"]["response"]}
 */
let userData;

const backendConnectionPRomise = Promise.resolve(require('../backend-connection'));

module.exports = {
    /**
     *
     * @returns { msgCpy["getUserData"]["response"]}
     */
    getUserData: async () => {
        if(!userData) {
            userData = new Promise(async (res, thrower) => {
                try {
                    const { message, ws } = await backendConnectionPRomise;

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
};