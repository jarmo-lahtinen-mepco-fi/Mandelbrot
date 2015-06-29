var ox = -0.75;
var oy = 0.0;
var radius = 2.5;
var width = 800;
var height = 600;
var xstart = 0;
var xend = 0;
var ystart = 0;
var yend = 0;
var radx = 0;
var rady = 0;
var xzoom = 0;
var yzoom = 0;
var zoom1 = 0.8;
var zoom2 = 0.5;
var zoom3 = 0.2;
var maxIterations = 512;
var r_values = new Array(255);
var g_values = new Array(255);
var b_values = new Array(255);
var rstart = 0;
var gstart = 0;
var bstart = 0;
var rend = 0;
var gend = 0;
var bend = 0;

resetValues(ox, oy, radius);
createPalette();
console.log("xstart: " + xstart + "\nystart: " + ystart + "\nxend: " + xend + "\nyend: " + yend + "\nxzoom: " + xzoom + "\nyzoom: " + yzoom);
drawMandelbrotSet();

function drawMandelbrotSet() {
    //var object = document.getElementById("iteration_input");
    //maxIterations = object.value;
    createPalette();
    drawPalette(255, 0, 0, 255, 255, 0);	
    maxIterations = document.getElementById("iteration_input").value;
    console.log("drawMandelbrotSet(): " + maxIterations);
    var canvas = document.getElementById("mandelbrotcanvas").getContext("2d");
    var pic = canvas.createImageData(width, height);
    var rx = 0;
    var iy = 0;
    var pos = 0;
    for (y = 0; y < height; y++) {
        for (x = 0; x < width; x++) {
            rx = xstart + xzoom * x;
            iy = ystart + yzoom * y;
            c = getIterationCount(rx, iy); // color value
            /*if (x % 20 === 0) {
                console.log("rx = " + rx + ", iy = " + iy + ", c = " + c);
            }*/
            
            pos = x + (width * y);
            if (c === 256) {
                //console.log("rx = " + rx + ", iy = " + iy + ", c = " + c);
                pic.data[4*pos] = 0;
                pic.data[4*pos+1] = 0;
                pic.data[4*pos+2] = 0;
                pic.data[4*pos+3] = 255;
            }
            else {
                pic.data[4*pos] = r_values[c];
                pic.data[4*pos+1] = g_values[c];
                pic.data[4*pos+2] = b_values[c];
                pic.data[4*pos+3] = 255;
            }
        }
    }
    //console.log("pos = " + pos);    
    canvas.putImageData(pic, 0, 0);
    console.log("drawMandelbrotSet(): done!");
}

function getIterationCount(x, y) {
    var real = 0.0;
    var imag = 0.0;
    var mag = 0.0;
    var iterations = 0;
    while((iterations < maxIterations) && (mag < 4.0)) {
        mag = real * real - imag * imag;	// squared magnitude
        imag = 2.0 * real * imag + y;      	// iterated value, imaginary part
        real = mag + x;                         // iterated value, real part
        iterations++;
    }
    while (iterations > 255) {                 // If maximum iterations is more than 256,
        //iterations = iterations - 256;		// returned color value will be decreased by 256.
        return 256;
    }
    return iterations;
}

function resetValues(x, y, r) {
    console.log("resetValues()");
    radx = r;
    rady = (height/width) * r;
    xstart = x - radx;
    xend = x + radx;
    ystart = y + rady;
    yend = y - rady;
    xzoom = (xend - xstart) / width;
    yzoom = (yend - ystart) / height;
}

function getCoordinates(event) {
    console.log("getCoordinates()");
    var canvas = document.getElementById('mandelbrotcanvas');
    var x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - canvas.offsetLeft;
    var y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop - canvas.offsetTop;
    var rx = xstart + xzoom * x;
    var iy = ystart + yzoom * y;
    document.getElementById('coordinates').innerHTML = "xstart: " + xstart + "<br>" + "ystart: " + ystart + "<br>" 
    	+ "xend: " + xend + "<br>" + "yend: " + yend + "<br>" + "xzoom: " + xzoom + "<br>" + "yzoom: " + yzoom 
    	+ "<br>" + "x=" + x + ", y=" + y + "<br>" + "rx=" + rx + ", iy=" + iy + "<br>" + "max iterations: " + maxIterations;
}

//http://jqueryui.com/slider/#colorpicker
function createPalette() { //startColor, endColor) {
    /*var rstart = startColor >> 16;
    var gstart = (startColor - (rstart<<16)) >> 8;
    var bstart = startColor - (rstart<<16) - (gstart<<8);
    var rend = endColor >> 16;
    var gend = (endColor - (rend<<16)) >> 8;
    var bend = endColor - (rend<<16) - (gend<<8);*/
    rstart = document.getElementById("R_start_value").value;
    gstart = document.getElementById("G_start_value").value;
    bstart = document.getElementById("B_start_value").value;
    rend = document.getElementById("R_end_value").value;
    gend = document.getElementById("G_end_value").value;
    bend = document.getElementById("B_end_value").value;
    console.log("createPalette(): " + rstart + ", " + gstart + ", " + bstart);
    console.log("createPalette(): " + rend + ", " + gend + ", " + bend);
    var r = rstart;
    var g = gstart;
    var b = bstart;
    var length = 255;
    for (i = 0; i < length; i++) {
    r = ((rend - rstart)/length)*i + rstart;
    g = ((gend - gstart)/length)*i + gstart;
    b = ((bend - bstart)/length)*i + bstart;
    r_values[i] = r;
    g_values[i] = g;
    b_values[i] = b;
    //console.log(r + "_" + g + "_"+ b + "\n");
    }
    drawPalette(rstart, gstart, bstart, rend, gend, bend);
}

function drawPalette(rs, gs, bs, re, ge, be) {
    console.log("drawPalette(): " + rs + ", " + gs + ", " + bs + ", " + re + ", " + ge + ", " + be);
    console.log("rs type: " + typeof rs);
    var gradientBox = document.getElementById("palette").getContext("2d"); 
    var gradient = gradientBox.createLinearGradient(0,0,200,50);
    var start = hexFromRGB(Number(rs), Number(gs), Number(bs));
    var end = hexFromRGB(Number(re), Number(ge), Number(be));
    //console.log("start: #" + start);
    //console.log("end: #" + end);
    gradient.addColorStop(0, "#" + start);
    gradient.addColorStop(1, "#" + end);
    gradientBox.fillStyle = gradient; 
    gradientBox.fillRect(10, 10, 180, 40); 
}

function hexFromRGB(r, g, b) {
    var hex = [
        r.toString(16),
        g.toString(16),
        b.toString(16)
    ];
    $.each( hex, function( nr, val ) {
        if ( val.length === 1 ) {
            hex[ nr ] = "0" + val;
        }
    });
    return hex.join( "" ).toUpperCase();
}
