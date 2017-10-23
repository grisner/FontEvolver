"use strict";


import * as b from "./backend"
// import {program} from "./backend"

import * as interfaces from './interfaces'

export class evolution {
    constructor() {}

    // creating offspring based on parents
    
    breed(p: interfaces.IBreed) {
        
        let parent1: b.individual = p.parent1;
        let parent2: b.individual = p.parent2;

        
        let child: b.individual = new b.individual(p.parent1.characters.length);
        
        
        for(let c = 0; c < child.characters.length; c++) {
            let chunkX = Math.floor(Math.random() * 9 + 1);

            for(let y = 0; y < parent1.characters[0].sizeY; y++) {
                for(let x = 0; x < parent1.characters[0].sizeX; x+=chunkX) {
                    let chance: number = Math.random() * 20 | 0;
                    let template: any;
                
                    switch(true) {
                        case (chance < 9):
                            template = parent1.characters[c].image[x][y];
                            break;

                        case (chance < 18):
                            template = parent2.characters[c].image[x][y];
                            break;
                        
                        default:
                            /*child.characters[c].image[x][y][0] = Math.random() * 256 | 0;
                            child.characters[c].image[x][y][1] = Math.random() * 256 | 0;
                            child.characters[c].image[x][y][2] = Math.random() * 256 | 0;*/

                            template = [0,0,0,255];
                    }

                    for(let spanx = x; spanx < x + chunkX; spanx++) {
                        child.characters[c].image[x][y] = template;
                    }

                }
            }
        }        

        return child;
    }


    // creating a new generation depending on rules
    nextGeneration(old: interfaces.INextGeneration) {
        console.log('next generation');
        var oldGen = old.oldGen;
        
        var popSize = oldGen.population.length
        console.log('popSize: ' + popSize);
        var newGen: b.generation = new b.generation(popSize, oldGen.population[0].characters.length);
        
        // random behaviour
        for(let n = 0; n<popSize; n++) {
            // randomize parents
            let parent1ID = Math.floor(Math.random() * popSize);
            let parent2ID = Math.floor(Math.random() * popSize);
            //let parent1ID = 0;
            //let parent2ID = 1;
            let parent1: b.individual = oldGen.population[parent1ID]; 
            let parent2: b.individual = oldGen.population[parent2ID];
            console.log('pairing ' + parent1ID + ' with ' + parent2ID);

            
            newGen.population[n] = this.breed({parent1,parent2});            
            //newGen.population[1] = this.breed({parent2,parent1});            
            
        }

        return newGen;
    }
}
