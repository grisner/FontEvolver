"use strict";
exports.__esModule = true;
var timer_1 = require("./timer");
var character = /** @class */ (function () {
    function character(newSizeX, newSizeY) {
        this.sizeX = newSizeX;
        this.sizeY = newSizeY;
        this.image = new Array(newSizeX * newSizeY * 3);
    }
    character.prototype.createRandomData = function () {
        var arr = new Array(this.sizeX * this.sizeY * 3);
        var values = this.sizeX * this.sizeY * 3;
        for (var i = 0; i < values; i++) {
            arr[i] = Math.random() * 256 | 0;
        }
        this.image = arr;
    };
    character.prototype.StartData = function () {
        var A = new Array(100, 100, 3);
        for (var x = 0; x < 100; x++) {
            for (var y = 0; y < 100; y++) {
                for (var rgb = 0; rgb < 3; rgb++) {
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
    };
    character.prototype.convertPosToIndex = function (x, y, rgb) {
    };
    character.prototype.getCharacterImage = function () {
        return this.image;
    };
    return character;
}());
exports.character = character;
var individual = /** @class */ (function () {
    function individual(charSize) {
        this.characters = new Array(charSize);
        for (var i = 0; i < charSize; i++) {
            var c = new character(100, 100);
            this.characters[i] = c;
        }
        console.log('characters in this ind: ' + this.characters.length);
    }
    individual.prototype.getCharacterImage = function (characterID) {
        return this.characters[characterID].getCharacterImage();
    };
    return individual;
}());
exports.individual = individual;
var generation = /** @class */ (function () {
    function generation(popSize, charSize) {
        this.population = new Array(popSize);
        for (var i = 0; i < popSize; i++) {
            var ind = new individual(charSize);
            this.population[i] = ind;
        }
        console.log('popSize: ' + this.population.length);
    }
    generation.prototype.breedCharacters = function (parent1, parent2) {
        console.log('breeding');
        var child = new character(parent1.sizeX, parent1.sizeY);
        var img1 = parent1.image;
        var img2 = parent2.image;
        var img3 = new Array(img1.length);
        for (var p in img1) {
            var chance = Math.random() * 10 | 0;
            switch (true) {
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
    };
    generation.prototype.nextGeneration = function () {
        console.log('next generation');
        // recreate all characters (from parents (eventually))
        var newPop = new Array(this.population.length);
        var charSize = this.population[0].characters.length;
        for (var j = 1; j < this.population.length; j++) {
            var ind = new individual(charSize);
            var parent1 = this.population[j];
            var parent2 = this.population[j - 1];
            for (var c in parent1.characters) {
                ind.characters[c] = this.breedCharacters(parent1.characters[c], parent2.characters[c]);
            }
            newPop[j - 1] = ind;
        }
        var newInd = new individual(charSize);
        for (var c in newInd.characters) {
            newInd.characters[c].createRandomData();
        }
        newPop[this.population.length - 1] = newInd;
        this.population = newPop;
    };
    generation.prototype.newGeneration = function () {
        console.log('new generation');
        for (var i in this.population) {
            var ind = this.population[i];
            for (var c in ind.characters) {
                var char = ind.characters[c];
                char.createRandomData();
            }
        }
    };
    return generation;
}());
exports.generation = generation;
var program = /** @class */ (function () {
    function program() {
        var _this = this;
        console.log('starting program');
        this.counter = 0;
        var popSize = 3;
        var charSize = 2;
        this.running = false;
        this.gen = new generation(popSize, charSize);
        this.gen.newGeneration();
        this.t1 = new timer_1.timer(500, function () {
            _this.gen.nextGeneration();
            _this.counter++;
            console.log(_this.counter);
        });
    }
    program.prototype.start = function () {
        this.t1.start();
        this.running = true;
    };
    program.prototype.stop = function () {
        this.t1.stop();
        this.running = false;
    };
    return program;
}());
exports.program = program;
