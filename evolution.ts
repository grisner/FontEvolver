"use strict";

import * as b from "./backend"
// import {program} from "./backend"

import * as interfaces from './interfaces'

export class evolution {
    constructor() {}

    arrayEquals(a: any, b: any) {
        if (a.length != b.length)
            return false;

        for (let i = 0, l=a.length; i < l; i++) {
            // Check if we have nested arrays
            if (a[i] instanceof Array && b[i] instanceof Array) {
                // recurse into the nested arrays
                if (!this.arrayEquals(a[i], b[i]))
                    return false;
            }           
            else if (a[i] != b[i]) { 
                // Warning - two different object instances will never be equal: {x:20} != {x:20}
                return false;
            }           
        }       
        return true;
    }


    // creating offspring based on parents
    breed(p: interfaces.IBreed) {
        
        let parent1: b.individual = p.parent1;
        let parent2: b.individual = p.parent2;

        
        let child: b.individual = new b.individual(p.parent1.characters.length);
        
        
        for(let c = 0; c < child.characters.length; c++) {
            //let chunkX = Math.floor(Math.random() * 9 + 1);
            let chunkX = 1;

            for(let y = 0; y < parent1.characters[0].sizeY; y++) {
                for(let x = 0; x < parent1.characters[0].sizeX; x+=chunkX) {
                    let chance: number = Math.random() * 20 | 0;
                    let template: any;

                    let p1 = parent1.characters[c].image[x][y];
                    let p2 =  parent2.characters[c].image[x][y];
                    let white = [256,256,256,256];

                    //console.log( p1 + ' / ' + p2);

                    if(this.arrayEquals(p1, white) && this.arrayEquals(p2, white)) {
                        //console.log('moving on');
                    }
                    else {
                        //console.log('fiddlin pixel');
                        
                        if(chance < 10) {
                            
                            let newNeighbourX = x +  Math.floor(Math.random() * 3) - 1;
                            let newNeighbourY = y +  Math.floor(Math.random() * 3) - 1;

                            if(newNeighbourX < 0) {newNeighbourX = 0}
                            else if(newNeighbourX > 99) {newNeighbourX = 99}
                            if(newNeighbourY < 0) {newNeighbourY = 0}
                            else if(newNeighbourY > 99) {newNeighbourY = 99}
                            
                            child.characters[c].image[x][y] = [0,0,0,256];
                            child.characters[c].image[newNeighbourX][newNeighbourY] = [0,0,0,256];
                        }
                        else if(chance > 9) {
                            child.characters[c].image[x][y] = [256,256,256,256];
                        }
                    }

                }
            }
        }        

        return child;
    }

    // creating a new generation depending on rules
    nextGeneration(old: interfaces.INextGeneration) {
        console.log('next generation');
        let oldGen = old.oldGen;
        
        let popSize = oldGen.population.length
        let newGen: b.generation = new b.generation(popSize, oldGen.population[0].characters.length);

        oldGen.population = oldGen.population.sort(function(a, b){
            return b.prio - a.prio;
        });

        // Giving all individuals an extra point and calculating mean
        let mean: number= 0;
        for(let i in oldGen.population) {
            if(typeof(oldGen.population[i].prio) == 'undefined' ) {
                oldGen.population[i].prio = 0;
            } 
            oldGen.population[i].prio++;
            mean += oldGen.population[i].prio;
        }
        mean = (oldGen.population.length*2)/mean;

        // Calculate whom to breed with who
        let parents1: Array<number> = [];
        let parents2: Array<number> = [];

        for(let i: number=0; i < oldGen.population.length; i++) {
            let breedings:number = Math.floor(oldGen.population[i].prio * mean); // calculate amount of breedings per individual

            for(let j:number=0; j < breedings; j++) {
            
                if(parents1.length < oldGen.population.length && i%2==0 ) {
                    parents1.push(i);
                }
                else {
                    parents2.push(i);
                }
            }
        }

        // if the parent lists haven't been filled, we fill
        for(let i = parents1.length; i < oldGen.population.length; i++) {
            parents1.push(Math.floor(Math.random() * oldGen.population.length));
        }

        for(let i = parents2.length; i < oldGen.population.length; i++) {
            parents2.push(Math.floor(Math.random() * oldGen.population.length));
        }

        


        // First we breed the lists with each other
        for(let i: number = 0; i < parents1.length; i++) {
            let parent1ID: number = parents1[i];
            let parent2ID: number = parents2[i];

            let parent1: b.individual = oldGen.population[parent1ID]; 
            let parent2: b.individual = oldGen.population[parent2ID];
            console.log('pairing ' + parent1ID + ' with ' + parent2ID);

            
            newGen.population[i] = this.breed({parent1,parent2});     
        }


        /*
        // The last individual in the new generation is created new
        let newInd: b.individual = new b.individual(oldGen.population[0].characters.length);
        newGen.population[popSize-1] = newInd;

        
        // random behaviour
        // TODO: let prio influence the choice of partners
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
        */

        return newGen;
    }
}
