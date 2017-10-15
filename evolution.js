var character = /** @class */ (function () {
    function character() {
    }
    return character;
}());
var individual = /** @class */ (function () {
    function individual(charSize) {
        var i;
        for (i = 0; i < charSize; i++) {
            var c = new character();
            this.characters.push(c);
        }
    }
    return individual;
}());
var generation = /** @class */ (function () {
    function generation(popSize, charSize) {
        var i;
        for (i = 0; i < popSize; i++) {
            var ind = new individual(charSize);
            this.pop.push(ind);
        }
    }
    return generation;
}());
