import { timer } from "./timer";

export class character {
    image: Array<number>;
    sizeX: number;
    sizeY: number;

    constructor(newSizeX: number, newSizeY: number) {
        this.sizeX = newSizeX;
        this.sizeY = newSizeY;
        this.image = new Array(newSizeX*newSizeY*3);
    }

    createRandomData () {
        let arr = new Array(this.sizeX * this.sizeY * 3);
        let values = this.sizeX * this.sizeY * 3;
        for (let i = 0; i < values; i++) {
            arr[i] = Math.random() * 256 | 0;
        }
        this.image = arr;
    }

    StartData() {
        let A: Array<number> = new Array(100,100,3);
        
        for(let x=0; x < 100; x++) {
            for(let y=0; y < 100; y++) {
                for(let rgb=0; rgb < 3; rgb++) {
                    A[x][y][rgb] = 256;
                }
                
            }
        }

        // Setting start positions
        A[50][10][0] = 0;
        A[50][10][1] = 0;
        A[50][10][2] = 0;
        A[10][50][0] = 0;
        A[10][50][1] = 0;
        A[10][50][2] = 0;
        A[90][50][0] = 0;
        A[90][50][1] = 0;
        A[90][50][2] = 0;
        A[10][90][0] = 0;
        A[10][90][1] = 0;
        A[10][90][2] = 0;
        A[90][90][0] = 0;
        A[90][90][1] = 0;
        A[90][90][2] = 0;
    }

    convertPosToIndex(x: number, y: number, rgb: number) {
        

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

    breedCharacters(parent1: character, parent2: character) {
        console.log('breeding');
        let child: character = new character(parent1.sizeX, parent1.sizeY);

        let img1 = parent1.image;
        let img2 = parent2.image;
        let img3: Array<number> = new Array(img1.length);

        for(var p in img1) {
            let chance: number = Math.random() * 10 | 0;

            switch(true) {
                case (chance < 5):
                    
                    img3[p] = img1[p];
                    break;
                case (chance < 8):
                    
                    img3[p] = img2[p];
                    break;
                default:
                    
                    img3[p] = Math.random() * 256 | 0;
            }

        }
        
        child.image = img3;
        return child;
    }

    nextGeneration() {
        console.log('next generation');
        // recreate all characters (from parents (eventually))
        let newPop: Array<individual> = new Array(this.population.length);
        let charSize: number = this.population[0].characters.length;

        

        for(let j=1;j < this.population.length; j++) {
            let ind = new individual(charSize);

            let parent1: individual = this.population[j];
            let parent2: individual = this.population[j-1];

            for(var c in parent1.characters) {
                ind.characters[c] = this.breedCharacters(parent1.characters[c], parent2.characters[c]);
            }

            newPop[j-1] = ind;
        }

        let newInd: individual= new individual(charSize);
        for(var c in newInd.characters) {
            newInd.characters[c].createRandomData();
        }
        newPop[this.population.length-1] = newInd;

        this.population = newPop;
    }

    newGeneration() {
        console.log('new generation');
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
    counter: number;

    constructor() {
        console.log('starting program');
        this.counter = 0;
        let popSize: number = 3;
        let charSize: number = 2;
        this.running = false;
        
        
        this.gen = new generation(popSize, charSize);

        this.gen.newGeneration();

        this.t1 = new timer(500, () => {
            this.gen.nextGeneration();
            this.counter++;
            console.log(this.counter);
        });
        
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


