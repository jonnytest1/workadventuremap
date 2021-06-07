/// <reference path="./index.js" />

scriptNesting(require('./backend-connection'), async imports => {
    const { message } = await imports;
    setTimeout(() => {
        WA.getGameState()
            .then(async state => {
                await Promise.all([
                    message({
                        type: "setAttribute",
                        data: {
                            key: "devicePixelRatio",
                            value: devicePixelRatio
                        }
                    }),
                    message({
                        type: "setAttribute",
                        data: {
                            key: "userAgent",
                            value: navigator.userAgent
                        }
                    }),
                    message({
                        type: 'userUpdate',
                        data: {
                            pusherUuid: state.uuid,
                            nickName: state.nickName
                        }
                    })
                ]);


            });
    }, 2000);
})