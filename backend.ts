"use strict";

import { timer } from "./timer";
import { evolution } from "./evolution";
import { startPos } from "./startPos";


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
                let rgba = [256,256,256,256];
                xArray[x] = rgba;
            }
            this.image[y] = xArray;
        }

    }

    createRandomData () {

        let span: number = Math.floor(Math.random() * 5)+1;

        for(let y = 0; y< 100; y+=span) {
            for(let x = 0; x < 100; x+=span) {
                this.image[x][y][0] = Math.random() * 256 | 0;
                this.image[x][y][1] = Math.random() * 256 | 0;
                this.image[x][y][2] = Math.random() * 256 | 0;
                this.image[x][y][3] = 256;
            }
        }
    }


    StartData(index: number) {
        var s = new startPos();
        this.image = s.getStartData(index);
        if(index == 1) {console.log("after getStartData: " + this.image[50][10]);}
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
        //console.log('new generation');
        for(var i in this.population) {
            let ind = this.population[i];
            for(let c = 0; c < ind.characters.length; c++) {
            //for(var c in ind.characters) {
                let char = ind.characters[c];
                //char.createRandomData();
                console.log('creating start pattern for ' + c.toString());
                char.StartData(c);
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


