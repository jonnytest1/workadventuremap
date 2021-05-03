/// <reference path="./index.d.ts" />

var module = {};
Object.defineProperty(module, 'exports', {
    get: () => {
        return document.currentScript['exports'] || {};
    },
    set: (obj) => {
        document.currentScript['exports'] = obj;
    }
});
const currentScript = document.currentScript;
// @ts-ignore
const scriptURL = new URL(currentScript.src);
//@ts-ignore
window.importScript = async (scriptLoadUrl) => {
    const scriptToUse = document.currentScript || currentScript;
    return new Promise((resolv, thrower) => {
        const script = document.createElement('script');
        if(!scriptLoadUrl.endsWith('.js')) {
            scriptLoadUrl += '.js';
        }
        let newSrc;
        if('src' in scriptToUse) {
            const baseURL = new URL(scriptToUse.src);
            baseURL.search = '';
            newSrc = new URL(scriptLoadUrl, baseURL.href);
        } else {
            //idk
        }
        script.src = newSrc.href;
        const existingScript = [...document.scripts].find(scr => scr.src === script.src);
        if(existingScript) {
            resolv(existingScript['exports']);
        }
        script.onload = () => {
            resolv(script['exports']);
        };
        script.onerror = e => {
            console.error(e);
        };
        document.body.appendChild(script);
    });
};

// @ts-ignore
window.require = importScript;

const url = scriptURL.searchParams.get('url');
require(url);
