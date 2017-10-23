"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var startPos = /** @class */ (function () {
    function startPos() {
        // TODO: GÖr om alltihop till ASCII-standard-siffror
        this.getStartData = function (characterID) {
            if (characterID == 1) {
                console.log("in getStartData: " + this.characters[characterID][50][10]);
            }
            return this.characters[characterID];
        };
        var charSize = 3;
        this.characters = new Array(3);
        for (var c = 0; c < charSize; c++) {
            var xArray = new Array(100);
            for (var x = 0; x < 100; x++) {
                var yArray = new Array(100);
                for (var y = 0; y < 100; y++) {
                    var arr = [256, 256, 256, 256];
                    yArray[y] = arr;
                }
                xArray[x] = yArray;
            }
            this.characters[c] = xArray;
        }
        // A
        this.characters[0][50][10] = [0, 0, 0, 256];
        this.characters[0][20][50] = [0, 0, 0, 256];
        this.characters[0][80][50] = [0, 0, 0, 256];
        this.characters[0][20][90] = [0, 0, 0, 256];
        this.characters[0][80][90] = [0, 0, 0, 256];
        // B
        this.characters[1][10][10] = [0, 0, 0, 256];
        this.characters[1][10][50] = [0, 0, 0, 256];
        this.characters[1][10][90] = [0, 0, 0, 256];
        this.characters[1][70][25] = [0, 0, 0, 256];
        this.characters[1][70][75] = [0, 0, 0, 256];
        // C
        this.characters[2][50][10] = [0, 0, 0, 256];
        this.characters[2][10][50] = [0, 0, 0, 256];
        this.characters[2][50][90] = [0, 0, 0, 256];
    }
    return startPos;
}());
exports.startPos = startPos;
//# sourceMappingURL=startPos.js.map