
(async () => {
    const { message } = await require('./backend-connection');
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
