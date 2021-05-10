import { Injectable } from '@angular/core';
import { ApiService } from './api-service';

@Injectable({
    providedIn: "root"
})
export class SpeechRecognitionService {
    recognition: SpeechRecognition;


    constructor(private apiService: ApiService) {
        //@ts-ignore
        var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
        //@ts-ignore
        var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
        //@ts-ignore
        var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

        this.recognition = new SpeechRecognition();
        this.recognition.lang = 'de'; //Sprache auf Deutsch festlegen

        var speechRecognitionList = new SpeechGrammarList();
        speechRecognitionList.addFromString('Brandad Systems', 1);
        this.recognition.grammars = speechRecognitionList;
        this.recognition.continuous = true;
        this.recognition.onresult = function (event) {
            if (event.results.length > 0) {
                if (event.results[0][0].transcript.toLocaleLowerCase() == "Brandad Systems".toLocaleLowerCase()) {
                    apiService.WAApi("exitSceneTo", "/_/global/brandad-systems.github.io/workadventure-maps/openbas.json")
                }
                var utterance = new SpeechSynthesisUtterance(event.results[0][0].transcript);
                utterance.lang = 'de'; //Sprache auf Deutsch festlegen
                speechSynthesis.speak(utterance);
            }
        };
        this.recognition.onerror = function (event) {
            debugger;
        };
        this.recognition.onnomatch = function (event) {
            debugger;
        };

        this.recognition.onspeechend = function () {
            debugger;
        };

    }

    start() {
        this.recognition.start();
    }
}