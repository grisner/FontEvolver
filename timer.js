"use strict";
exports.__esModule = true;
var timer = /** @class */ (function () {
    function timer(newIntervall, func) {
        console.log('creating timer');
        this.intervall = newIntervall;
        this.onTick = func;
    }
    timer.prototype.start = function () {
        console.log('starting timer');
        this.stateRunning = true;
        console.log(this.intervall);
        console.log(this.onTick);
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
