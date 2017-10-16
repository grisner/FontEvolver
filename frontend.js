setPixel=function(imageData, x, y, r, g, b, a) {
    var index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
};

Get=function(URL, callbackFn) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = callbackFn;
    xhttp.open("GET", URL, true);
    xhttp.send();
};

updateScreen = function() {
    // is run in frontend
    console.log('drawImages');

    var elements = document.getElementsByTagName('canvas');
    console.log(elements.length);


    for(el=0; el < elements.length; el++) {
        
    // for (var el in elements) {
        var element = elements[el];
        var ID = element.id.split('.')[2]
        var charID = element.id.split('.')[3]

        // Get data from the right character
        console.log("drawing: " + ID + ":" + charID);
        var url = "http://127.0.0.1/GetCharacterImage&" + ID + "&" + charID + "&" + el

        Get(url, function(data){

            try{
                response = JSON.parse(data.target.responseText);
                window.response = response;
            }
            catch(e) {
                console.error(e)
                window.t = data.target
                console.log(data.target.response)
            }

            element = elements[response.el];
            var c = element.getContext('2d');
            var width = c.canvas.width;
            var height = c.canvas.height;

            // create a new pixel array
            var imageData = c.createImageData(width, height);

            window.response = response;
            var image = response.image;

            for(i=0;i < image.length; i+=3) {
                x = i % width;
                y = parseInt(i/width);
                r = image[i];
                g = image[i+1];
                b = image[i+2];
                a = 255;
                setPixel(imageData, x, y, r, g, b,a);
                
            }
            c.putImageData(imageData, 0, 0); // at coords 0,0
            console.log("drawn: " + ID + ":" + charID);
        });

        
        
    }
};

exports.drawImages = function() {
    updateScreen();
};

run = function() {
    let url = "http://127.0.0.1/runEvolution";
    Get(url, function(){console.log('started time');});
    window.t1 = setInterval(updateScreen, 1000);
};

stop = function() {
    let url = "http://127.0.0.1/stopEvolution";
    Get(url, function(){console.log('stopped time');});    
    clearInterval(window.t1);
};




