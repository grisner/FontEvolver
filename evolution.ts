import { timer } from "./timer";

export class character {
    image: Array<number>;
    sizeX: number;
    sizeY: number;

    constructor(newSizeX: number, newSizeY: number) {
        console.log('creating character');
        this.sizeX = newSizeX;
        this.sizeY = newSizeY;
        this.image = new Array(newSizeX*newSizeY*3);
    }

    createRandomData () {
        var arr = new Array(this.sizeX * this.sizeY * 3);
        var values = this.sizeX * this.sizeY * 3;
        var i: number;
        for (i = 0; i < values; i++) {
            arr[i] = Math.random() * 256 | 0;
        }
        this.image = arr;
    }

    getCharacterImage() {
        return this.image;
    }

}


export class individual {
    characters: Array<character>;

    constructor(charSize: number) {
        
        this.characters = new Array(charSize);
        for(let i=0; i < charSize; i++) {
            var c = new character(100,100);
            this.characters[i] = c;
        }

        console.log('characters in this ind: ' + this.characters.length);
    }

    getCharacterImage(characterID: number) {
        return this.characters[characterID].getCharacterImage();
    }
}


export class generation {
    population: Array<individual>;

    constructor(popSize: number, charSize: number) {
        this.population = new Array(popSize);

        for(let i=0; i < popSize; i++) {
            var ind = new individual(charSize);
            this.population[i] = ind;
        }

        console.log('popSize: ' + this.population.length);
    }

    newGeneration() {
        // recreate all characters (from parents (eventually))
        for(var i in this.population) {
            let ind = this.population[i];
            for(var c in ind.characters) {
                let char = ind.characters[c];
                char.createRandomData();
            }
        }
    }

}


export class program {
    running: boolean;
    gen: generation;
    t1: timer;

    constructor() {
        console.log('starting program');
        let popSize: number = 3;
        let charSize: number = 2;
        this.running = false;
        
        
        this.gen = new generation(popSize, charSize);

        this.gen.newGeneration();

        this.t1 = new timer(2000, () => {this.gen.newGeneration();});
        
    }

    start() {
        this.t1.start();
        this.running = true;
    }

    stop() {
        this.t1.stop();
        this.running = false;
    }
    
}


