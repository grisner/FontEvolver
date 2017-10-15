"use strict";
var character = /** @class */ (function () {
    function character() {
    }
    return character;
}());
module.exports = character;
/*
class individual {
    characters: Array<character>;

    constructor(charSize: number) {
        var i: number;
        for(i=0; i < charSize; i++) {
            var c = new character();
            this.characters.push(c);
        }
    }
}

class generation {
    population: Array<individual>;

    constructor(popSize: number, charSize: number) {
        var i: number;
        for(i=0; i < popSize; i++) {
            var ind = new individual(charSize);
            this.population.push(ind);
        }
    }

}

class program {
    running: boolean;

    constructor() {
        console.log('starting program');
        this.running = false;
        var t1 = new timer(2000, function(){console.log('test');});

        setTimeout(function(){t1.stopTimer()}, 10000)
    }

    
}

class timer {
    stateRunning: boolean;
    intervall: number;
    onTick: any;

    constructor(newIntervall: number, func: any) {
        console.log('creating timer');
        this.intervall = newIntervall;
        this.onTick = func;
    }

    public startTimer() {
        this.stateRunning = true;
        setTimeout(this.tick, this.intervall);
    }

    public tick(){
        if(this.stateRunning) {
            this.onTick;
            setTimeout(this.tick, this.intervall);
        }
    }

    public stopTimer() {
        this.stateRunning = false;
    }
}
*/ 
