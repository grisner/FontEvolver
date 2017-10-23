"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var timer = /** @class */ (function () {
    function timer(newIntervall, func) {
        console.log('creating timer');
        this.intervall = newIntervall;
        this.onTick = func;
    }
    timer.prototype.start = function () {
        console.log('starting timer');
        this.stateRunning = true;
        this.timer = setInterval(this.onTick, this.intervall);
    };
    timer.prototype.stop = function () {
        console.log('stopping timer');
        clearInterval(this.timer);
        this.stateRunning = false;
    };
    return timer;
}());
exports.timer = timer;
//# sourceMappingURL=timer.js.map