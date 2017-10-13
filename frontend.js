


setPixel= function (imageData, x, y, r, g, b, a) {
    var index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
};

exports.drawImages= function() {
        // is run in frontend

        console.log('drawImages');

        var elements = document.getElementsByTagName('canvas');
        console.log(elements.length);

        //for(i=0; i < elements.length; i++) {
        for(var element in elements) {

            var c = elements[element].getContext('2d');

            // create a new pixel array
            imageData = c.createImageData(100, 100);

            // Get data from the right character
            for(i=1;i < 99; i++) {
                this.setPixel(imageData, i,i,0,0,0,255);            
            }

            c.putImageData(imageData, 0, 0); // at coords 0,0

        }


        //const ctx = element.getContext('2d');
//        ctx.fillRect(0,0, 100, 100);
    
};