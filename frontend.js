"use strict";

let backendURL = "http://127.0.0.1:8000";

let setPixel= function(imageData, x, y, r, g, b, a) {
    let index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
};

let Get= function(URL, callbackFn) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = callbackFn;
    xhttp.open("GET", URL, true);
    xhttp.send();
};

let Put= function(URL, params, callbackFn) {
	let data = JSON.stringify(params);
    let http = new XMLHttpRequest();
    
    http.open("PUT", URL, true);
    
    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/json");
    http.setRequestHeader("Content-length", data.length);

	http.onreadystatechange = callbackFn;
    http.send(data);
    
}

let updateScreen= function() {
    // is run in frontend
    console.log('drawImages');

    let elements = document.getElementsByTagName('canvas');
    
    for(let el=0; el < elements.length; el++) {
        
    // for (let el in elements) {
        let element = elements[el];
        let ID = element.id.split('.')[2]
        let charID = element.id.split('.')[3]

        // Get data from the right character
        let url = backendURL + "/GetCharacterImage&" + ID + "&" + charID + "&" + el
        //console.log(el + ' | ' + url);

        Get(url, function(data) {
            if(data.target.readyState == 4) {
                //console.log("drawing: " + ID + ":" + charID);

                try{
                    response = JSON.parse(data.target.responseText);
                }
                catch(e) {
                    console.error(e)
                    window.d = data;
                    console.log('leaving a function getting ' + data.target.response.image.length)
                    return;
                }

                let element = elements[response.el];
                let c = element.getContext('2d');
                let width = c.canvas.width;
                let height = c.canvas.height;

                // create a new pixel array
                let imageData = c.createImageData(width, height);
                let image = response.image;

                for(let y=0; y < 100; y++) {
                    for(let x=0; x < 100; x++) {
                        /*if(x == 50 && y == 10) {
                            console.log(x + ";" + y + ": " + image[x][y][0] + "," + image[x][y][1] + "," + image[x][y][2] + "," + image[x][y][3]);
                        }*/

                        let r = image[x][y][0];
                        let g = image[x][y][1];
                        let b = image[x][y][2];
                        let a = image[x][y][3];
                        setPixel(imageData, x, y, r, g, b,a);
                    }
                }

                /*for(i=0;i < image.length; i+=3) {
                    x = i % width;
                    y = parseInt(i/width);
                    r = image[i];
                    g = image[i+1];
                    b = image[i+2];
                    a = 255;
                    setPixel(imageData, x, y, r, g, b,a);
                    
                }*/
                c.putImageData(imageData, 0, 0); // at coords 0,0
            }
        });

        // resetting all prios
        let inputs = document.getElementsByTagName('input');
        for(let i in inputs) {
            if(inputs[i].type == 'number') {
                inputs[i].value = 0;
            }
        }
    }
};

module.exports = {
    tick: function() {
        let url = backendURL + "/tick";
        Get(url, function(){
            updateScreen();
            //redraw();
        });
    },

    start: function() {
        let url = backendURL + "/runEvolution";
        Get(url, function(){console.log('started time');});
        window.t1 = setInterval(updateScreen, 150);
    },

    stop: function() {
        let url =backendURL + "/stopEvolution";
        Get(url, function(){console.log('stopped time');});    
        clearInterval(window.t1);
    },

    redraw: function() {
        updateScreen();
    },

    setPrio: function(id, value) {

        console.log('sending ' + id + "," + value);
        let params = {
            id: id,
            prio: value
        };

        let url = backendURL + "/setPrio";

        Put(url, params, function(){});
    }
}



