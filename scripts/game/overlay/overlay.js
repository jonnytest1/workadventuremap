window.addEventListener('message', messageEvent => {
    if(messageEvent.data.type === 'userdata') {
        document.querySelector('#deaths').textContent = `you died ${messageEvent.data.data.deathCount} times so far`;

    }
});

onload = () => {
    window.parent.postMessage({
        type: 'loaded',
        data: '\'parentWindow from WEbsite\''
    }, '*');
};
