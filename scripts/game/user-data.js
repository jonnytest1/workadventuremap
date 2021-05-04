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
        if(userData) {
            return userData;
        }
        /**
         * @type { msgCpy["getUserData"]["response"]}
         */
        return new Promise(async (res, thrower) => {
            try {
                const { message, ws } = await backendConnectionPRomise;
                ws.addEventListener(event => {
                    if(event.type === 'userDataUpdate') {
                        userData = event.data;
                    }
                });
                res(await message({
                    type: 'getUserData'
                }));
            } catch(e) {
                debugger;
                console.error(e);
                thrower(e);
            }
        });
    }
};