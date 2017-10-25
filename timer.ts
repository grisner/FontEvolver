"use strict";

export class timer {
    stateRunning: boolean;
    intervall: number;
    onTick: any;
    timer: any;

    constructor(newIntervall: number, func: any) {
        console.log('creating timer');
        this.intervall = newIntervall;
        this.onTick = func;
    }

    start() {
        console.log('starting timer');
        this.stateRunning = true;
        
        this.timer = setInterval(this.onTick,this.intervall);
    }


    stop() {
        console.log('stopping timer');
        clearInterval(this.timer);
        this.stateRunning = false;
    }

    
}
