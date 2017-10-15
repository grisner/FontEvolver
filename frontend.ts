
    function setPixel (imageData: ImageData, x: number, y: number, r: number, g: number, b: number, a: number) {
        var index: number = (x + y * imageData.width) * 4;
        imageData.data[index + 0] = r;
        imageData.data[index + 1] = g;
        imageData.data[index + 2] = b;
        imageData.data[index + 3] = a;
    };

    function drawImages () {
        // is run in frontend

        console.log('drawImages');

        var elements = document.getElementsByTagName('canvas');
        console.log(elements.length);

        //for(i=0; i < elements.length; i++) {
        for(var element in elements) {

            var c = elements[element].getContext('2d');

            // create a new pixel array
            var imageData: ImageData = c.createImageData(100, 100);

            // Get data from the right character
            var i: number;
            for(i=1;i < 99; i++) {
                this.setPixel(imageData, i,i,0,0,0,255);            
            }

            c.putImageData(imageData, 0, 0); // at coords 0,0

        }  
    };




