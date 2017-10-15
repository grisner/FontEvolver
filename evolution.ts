class character {
    image: Array<number>;

    constructor() {}

}

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
    

    constructor() {
        this.state = false;
    }

    
}

class timer {
    state: boolean;
    intervall: number;
    onTick: function;

    constructor() {

    }

    public startTimer() {
        this.state = true;

    }

    public tick(){
        if(this.state) {

        }
    }

    public stopTimer() {
        this.state = false;
    }
}

