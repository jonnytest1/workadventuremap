/// <reference path="./index.d.ts" />

/**
 * @template T
 * @param {T} imports
 * @param {(imports:Promise<T>)=>Promise<void>} callback
 */
var scriptNesting = async function(imports, callback) {
    return callback(Promise.resolve(imports))
}

/**
 * @template T
 * @template U
 * @param {T} imports
 * @param {(imports:Promise<T>)=>U} callback
 */
var exportNesting = async function(imports, callback) {
    return callback(Promise.resolve(imports))
}

/**
 * @type {{[key:string]:Promise<any>}}
 */
let loadingSCriptsMap = {};
var module = { exports: null };
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

const currentScriptUrl = new URL(scriptURL.href);
currentScriptUrl.search = ""

/**
 * 
 * @param {string} scriptLoadUrl 
 * @returns 
 */
async function scriptImporting(scriptLoadUrl) {
    const scriptToUse = document.currentScript || currentScript;
    if(!scriptLoadUrl.endsWith('.js')) {
        scriptLoadUrl += '.js';
    }
    if(scriptLoadUrl.startsWith("@jonnygithub/")) {
        scriptLoadUrl = new URL(scriptLoadUrl.replace("@jonnygithub/", './'), currentScriptUrl.href.replace("index.js", "")).href
    }
    let newSrc;
    if('src' in scriptToUse) {
        const baseURL = new URL(scriptToUse.src);
        baseURL.search = '';
        newSrc = new URL(scriptLoadUrl, baseURL.href);
    } else {
        //idk
    }
    if(!loadingSCriptsMap[newSrc.href]) {
        loadingSCriptsMap[newSrc.href] = new Promise((resolv, thrower) => {
            const script = document.createElement('script');
            script.src = newSrc.href;
            /*const existingScript = [...document.scripts].find(scr => scr.src === script.src);
            if(existingScript) {
                let exps = existingScript['exports'];

                resolv(exps);
                return;
            }*/
            let timeout = setTimeout(() => {
                //debugger;
                console.error(script.src + ' didnt load in 1 sec');
            }, 2000);
            script.onload = () => {
                const ecps = script['exports'];
                if(!ecps && (script.src.includes('popup'))) {
                    debugger;
                }
                resolv(ecps);
                clearTimeout(timeout);
            };
            script.onerror = e => {
                debugger;
                console.error(e);
            };
            document.body.appendChild(script);
        });
    }
    return loadingSCriptsMap[newSrc.href];
};

//@ts-ignore
window.importScript = scriptImporting

// @ts-ignore
window.require = importScript;

const scriptLoadUrl = scriptURL.searchParams.get('url');
if(!document.body) {
    window.addEventListener('load', () => {
        for(let requireUrl of scriptLoadUrl.split(',')) {
            scriptImporting(requireUrl);
        }
    });
} else {
    for(let requireUrl of scriptLoadUrl.split(',')) {
        scriptImporting(requireUrl);
    }
}
