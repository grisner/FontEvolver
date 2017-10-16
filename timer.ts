export class timer {
    stateRunning: boolean;
    intervall: number;
    onTick: any;
    timer: any;

    constructor(newIntervall: number, func: any) {
        console.log('creating timer');
        this.intervall = newIntervall;
        this.onTick = func;
    }

    start() {
        console.log('starting timer');
        this.stateRunning = true;
        console.log(this.intervall);
        console.log(this.onTick);

        this.timer = setTimeout(() => 
            {
                this.tick(
                    this.intervall,
                    this.stateRunning,
                    this.onTick
                );
            }, 
            this.intervall
        );
    }

    tick(intervall: number, stateRunning: boolean, onTick: any) {

        if(stateRunning == true) {
            onTick();
            this.timer = setTimeout(() => {this.tick(this.intervall, this.stateRunning, this.onTick);}, this.intervall);
        }
    }

    stop() {
        console.log('stopping timer');
        this.stateRunning = false;
    }

    
}
