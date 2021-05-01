/// <reference path="./index.d.ts" />
(async () => {
    const state = await WA.getGameState();
    const links = [
        {
            text: 'Demo Map',
            link: '/_/global/alexbrandad.github.io/testmap-gh-pages-first-test/Tuto/tutoV3.json'
        }, {
            text: 'Jonnys Map Cave',
            link: '/_/global/localhost/workadventuremap/map.json#start-teleporter-cave'
        }, {
            text: 'Jonnys Map City',
            link: '/_/global/localhost/workadventuremap/map.json#start-teleporter-city'
        }, {
            text: 'Hell',
            link: '/_/global/localhost/workadventuremap/fire/fire.json'
        }, {
            text: 'Github Jonnies Map Cave',
            link: '/_/global/jonnytest1.github.io/workadventuremap/map.json#start-teleporter-cave'
        }, {
            text: 'Github Jonnies Map City',
            link: '/_/global/jonnytest1.github.io/workadventuremap/map.json#start-teleporter-city'
        }, {
            text: 'Demo Map',
            link: '/_/global/alexbrandad.github.io/testmap-gh-pages-first-test/Tuto/tutoV3.json'
        }, {
            text: 'testset set sdf ssf ',
            link: '/_/global/alexbrandad.github.io/testmap-gh-pages-first-test/Tuto/tutoV3.json'
        }
    ];
    links.
        filter(entry => !('/' + state.roomId).includes(entry.link))
        .forEach(entry => {
            const li = document.createElement('li');
            const link = document.createElement('a');
            link.textContent = entry.text || entry.link;
            link.href = entry.link;
            link.style.color = 'white';
            if(!entry.link.includes('#')) {
                entry.link += '#start-teleporter';
            }
            link.onclick = e => {
                openPage(entry.link);
                WA.closeCoWebSite();
                e.preventDefault();
                e.stopPropagation();
            };
            li.appendChild(link);

            document.querySelector('#listcontainer')
                .appendChild(li);
        });

    function openPage(page) {
        WA.loadPage(page);
        /*window.parent.postMessage({
            'type': 'loadPage',
            'data': {
                url: page
            }
        }, '*');*/
    }
})();

window.onbeforeunload = () => {
    debugger;
};
