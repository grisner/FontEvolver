"use strict";

import { timer } from "./timer";
import { evolution } from "./evolution"

export class character {
    image: number[][][];
    sizeX: number;
    sizeY: number;

   
    constructor(newSizeX: number, newSizeY: number) {
        this.sizeX = newSizeX;
        this.sizeY = newSizeY;
        //this.image = new Array(newSizeX*newSizeY*3);
        
        this.image = new Array<number[][]>(100);
        for(let y = 0; y< newSizeY; y++) {
            let xArray = new Array<number[]>(100);    

            for(let x = 0; x < newSizeX; x++) {
                let rgb = [256,256,256];
                // let rgb = new Array<number>(3);

                xArray[x] = rgb;
                //this.image[x][y][0] = 0;
            }
            this.image[y] = xArray;
        }
    }

    createRandomData () {
  /*      let arr = new Array(this.sizeX * this.sizeY * 3);
        let values = this.sizeX * this.sizeY * 3;
        for (let i = 0; i < values; i++) {
            arr[i] = Math.random() * 256 | 0;
        }
        this.image = arr;
*/

        let span: number = Math.floor(Math.random() * 5)+1;

        for(let y = 0; y< 100; y+=span) {
            for(let x = 0; x < 100; x+=span) {
                this.image[x][y][0] = Math.random() * 256 | 0;
                this.image[x][y][1] = Math.random() * 256 | 0;
                this.image[x][y][2] = Math.random() * 256 | 0;
            }
        }

        
           /* 
        let arr = new Array<number[][]>(100);
        for(let y=0; y < 100; y++) {
            let xArray = new Array<number[]>(100);    

            for(let x = 0; x < 100; x++) {

                let rgb = new Array<number>(3);
                rgb[0] = Math.random() * 256 | 0;
                //arr[x][y][0] = Math.random() * 256 | 0;

                xArray[x] = rgb;
            }
            arr[y] = xArray;
        }*/
        //this.image = arr;
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
        // TODO: Do this for all characters
        // TODO: move this to another file
        A[50][10] = [0,0,0];
        A[10][50] = [0,0,0];
        A[90][50] = [0,0,0];
        A[10][90] = [0,0,0];
        A[90][90] = [0,0,0];
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
    evo: evolution;

    constructor(popSize: number, charSize: number) {
        console.log('starting program');
        this.counter = 0;
        this.running = false;
        
        this.gen = new generation(popSize, charSize);

        this.gen.newGeneration();
        this.evo = new evolution();

        this.t1 = new timer(150, () => {
            this.gen = this.evo.nextGeneration({oldGen: this.gen});
            //console.log(this.gen.population[0].characters[0].image[50][50] + " / " + this.gen.population[1].characters[0].image[50][50] + " => " + newGen[0].characters[0].image[50][50]);
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

    tick() {
        console.log('ticking');
        this.gen = this.evo.nextGeneration({oldGen: this.gen});
        this.counter++;
        console.log(this.counter);
    }
    
}


