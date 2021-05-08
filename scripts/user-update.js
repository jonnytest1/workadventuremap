
const backendcon = require('./backend-connection');
(async () => {
    const { message } = await backendcon;
    setTimeout(() => {
        WA.getGameState()
            .then(async state => {
                await message({
                    type: 'userUpdate',
                    data: {
                        pusherUuid: state.uuid,
                        nickName: state.nickName
                    }
                });

            });
    }, 2000);
})();
