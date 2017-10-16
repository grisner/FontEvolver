"use strict";
exports.__esModule = true;
var timer_1 = require("./timer");
var character = /** @class */ (function () {
    function character(newSizeX, newSizeY) {
        console.log('creating character');
        this.sizeX = newSizeX;
        this.sizeY = newSizeY;
        this.image = new Array(newSizeX * newSizeY * 3);
    }
    character.prototype.createRandomData = function () {
        var arr = new Array(this.sizeX * this.sizeY * 3);
        var values = this.sizeX * this.sizeY * 3;
        var i;
        for (i = 0; i < values; i++) {
            arr[i] = Math.random() * 256 | 0;
        }
        this.image = arr;
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
    generation.prototype.newGeneration = function () {
        // recreate all characters (from parents (eventually))
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
        var popSize = 3;
        var charSize = 2;
        this.running = false;
        this.gen = new generation(popSize, charSize);
        this.gen.newGeneration();
        this.t1 = new timer_1.timer(2000, function () { _this.gen.newGeneration(); });
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
