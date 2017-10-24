
var backendURL = "http://127.0.0.1:8000";

var setPixel= function(imageData, x, y, r, g, b, a) {
    var index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
};

var Get= function(URL, callbackFn) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = callbackFn;
    xhttp.open("GET", URL, true);
    xhttp.send();
};

var updateScreen= function() {
    // is run in frontend
    console.log('drawImages');

    var elements = document.getElementsByTagName('canvas');
    
    for(var el=0; el < elements.length; el++) {
        
    // for (var el in elements) {
        var element = elements[el];
        var ID = element.id.split('.')[2]
        var charID = element.id.split('.')[3]

        // Get data from the right character
        var url = backendURL + "/GetCharacterImage&" + ID + "&" + charID + "&" + el
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

                var element = elements[response.el];
                var c = element.getContext('2d');
                var width = c.canvas.width;
                var height = c.canvas.height;

                // create a new pixel array
                var imageData = c.createImageData(width, height);
                var image = response.image;

                for(var y=0; y < 100; y++) {
                    for(var x=0; x < 100; x++) {
                        /*if(x == 50 && y == 10) {
                            console.log(x + ";" + y + ": " + image[x][y][0] + "," + image[x][y][1] + "," + image[x][y][2] + "," + image[x][y][3]);
                        }*/

                        var r = image[x][y][0];
                        var g = image[x][y][1];
                        var b = image[x][y][2];
                        var a = image[x][y][3];
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
    }
};

module.exports = {
    tick: function() {
        var url = backendURL + "/tick";
        Get(url, function(){
            updateScreen();
        });
    },

    start: function() {
        var url = backendURL + "/runEvolution";
        Get(url, function(){console.log('started time');});
        window.t1 = setInterval(updateScreen, 150);
    },

    stop: function() {
        var url =backendURL + "/stopEvolution";
        Get(url, function(){console.log('stopped time');});    
        clearInterval(window.t1);
    },

    redraw: function() {
        updateScreen();
    }
}



