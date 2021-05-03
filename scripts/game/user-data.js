
let userData;

const backendConnectionPRomise = Promise.resolve(require('../backend-connection'));

module.exports = {
    getUserData: async () => {
        if(userData) {
            return userData;
        }
        return new Promise(async res => {
            const { message, ws } = await backendConnectionPRomise;
            ws.addEventListener(event => {
                if(event.type === 'userDataUpdate') {
                    userData = event.data;
                }
            });
            res(message({
                type: 'getUserData'
            }));
        });
    }
};