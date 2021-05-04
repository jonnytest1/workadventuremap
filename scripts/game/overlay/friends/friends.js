
document.querySelector('#friendsTable');

window.addEventListener('message', messageEvent => {
    if(messageEvent.data.type === 'userdata') {
        /**
         * @type { Parameters<Parameters<msgCpy["getUserData"]["response"]["then"]>[0]>[0]}
         */
        const userData = messageEvent.data.data;
        const table = document.querySelector('#friendsTable');
        for(let friend in userData.friends) {
            const friendBOj = userData.friends[friend];

            const tr = document.createElement('tr');
            const indexTd = document.createElement('td');
            indexTd.textContent = friendBOj.index + '';
            tr.appendChild(indexTd);

            const nameTd = document.createElement('td');
            nameTd.textContent = friend;
            tr.appendChild(nameTd);

            const statusTd = document.createElement('td');
            statusTd.textContent = friendBOj.status;
            tr.appendChild(statusTd);

            if(friendBOj.status === 'online') {
                const roomTd = document.createElement('td');
                const roomLink = document.createElement('a');
                roomLink.textContent = friendBOj.room.replace('_/global', '');
                if(friendBOj.jitsiRoom && friendBOj.jitsiRoom !== 'invalidmapref') {
                    roomLink.textContent += ' - ' + friendBOj.jitsiRoom;
                }
                roomLink.href = '';
                roomLink.onclick = e => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.parent.postMessage({
                        type: 'exitSceneUrl',
                        data: '/' + friendBOj.room
                    }, '*');
                };
                roomTd.appendChild(roomLink);
                tr.appendChild(roomTd);
            }

            table.appendChild(tr);
        }

    }
});

onload = () => {
    window.parent.postMessage({
        type: 'loaded'
    }, '*');
};
