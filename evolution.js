"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var b = require("./backend");
var evolution = /** @class */ (function () {
    function evolution() {
    }
    // creating offspring based on parents
    evolution.prototype.breed = function (p) {
        var parent1 = p.parent1;
        var parent2 = p.parent2;
        var child = new b.individual(p.parent1.characters.length);
        for (var c = 0; c < child.characters.length; c++) {
            var chunkX = Math.floor(Math.random() * 9 + 1);
            for (var y = 0; y < parent1.characters[0].sizeY; y++) {
                for (var x = 0; x < parent1.characters[0].sizeX; x += chunkX) {
                    var chance = Math.random() * 20 | 0;
                    var template = void 0;
                    switch (true) {
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
                            template = [0, 0, 0, 0];
                    }
                    for (var spanx = x; spanx < x + chunkX; spanx++) {
                        child.characters[c].image[x][y] = template;
                    }
                }
            }
        }
        return child;
    };
    // creating a new generation depending on rules
    evolution.prototype.nextGeneration = function (old) {
        console.log('next generation');
        var oldGen = old.oldGen;
        var popSize = oldGen.population.length;
        console.log('popSize: ' + popSize);
        var newGen = new b.generation(popSize, oldGen.population[0].characters.length);
        // random behaviour
        for (var n = 0; n < popSize; n++) {
            // randomize parents
            var parent1ID = Math.floor(Math.random() * popSize);
            var parent2ID = Math.floor(Math.random() * popSize);
            //let parent1ID = 0;
            //let parent2ID = 1;
            var parent1 = oldGen.population[parent1ID];
            var parent2 = oldGen.population[parent2ID];
            console.log('pairing ' + parent1ID + ' with ' + parent2ID);
            newGen.population[n] = this.breed({ parent1: parent1, parent2: parent2 });
            //newGen.population[1] = this.breed({parent2,parent1});            
        }
        return newGen;
    };
    return evolution;
}());
exports.evolution = evolution;
//# sourceMappingURL=evolution.js.map