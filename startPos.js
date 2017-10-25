"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class startPos {
    constructor() {
        // TODO: GÖr om alltihop till ASCII-standard-siffror
        this.getStartData = function (characterID) {
            if (characterID == 1) {
                console.log("in getStartData: " + this.characters[characterID][50][10]);
            }
            return this.characters[characterID];
        };
        let charSize = 3;
        this.characters = new Array(3);
        for (let c = 0; c < charSize; c++) {
            let xArray = new Array(100);
            for (let x = 0; x < 100; x++) {
                let yArray = new Array(100);
                for (let y = 0; y < 100; y++) {
                    let arr = [256, 256, 256, 256];
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
}
exports.startPos = startPos;
//# sourceMappingURL=/home/f2520233/DATA/source/HTML/FontEvolver/startPos.js.map