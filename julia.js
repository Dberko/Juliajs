$.noConflict();
 
var cx = 0, cy = 0, kat1 = 0, kat2 = 1;
var WJulia = 768;
var HJulia = 768;
var contextJulia;
var pixJulia;
var imgdJulia;
var idJulia;
var frame = 0;
 
function SetupJulia()
{
    clearInterval( idJulia );
 
    var elemJulia = document.getElementById('JuliaCanvas');
    if (elemJulia && elemJulia.getContext)
    {
        contextJulia = elemJulia.getContext('2d');
        if (contextJulia)
        {
            if (contextJulia.createImageData)
                imgdJulia = contextJulia.createImageData(WJulia, HJulia);
            else
                imgdJulia = contextJulia.getImageData(0, 0, WJulia, HJulia);
 
            pixJulia = imgdJulia.data;
        }
    }
 
    idJulia = setInterval(LoopJulia, 3);
}
 
function LoopJulia()
{
 
    kat1 += 0.003;
    kat2 += 0.007;
    cx = 981 * Math.sin(kat1);
    cy = 983 * Math.cos(kat2);
    frame++;
 
    RysujJulie();
 
    /* context/canvas */
    contextJulia.putImageData(imgdJulia, 0, 0);
    contextJulia.font = "bold 12px sans-serif";
    contextJulia.fillStyle = 0;
    contextJulia.fillText( frame, 20, 20 );
}
 
 
function RysujJulie()
{
    var px = 0;
    for (var i = -2304; i < 2304; i = i + 6)
    {
        var py = 0;
        for (var j = -2304; j < 2304; j = j + 6)
        {
            var c = 0;
            var x = i;
            var y = j;
            var x2 = x * x;
            var y2 = y * y;
 
            while (((x2 + y2) < 4000000) && (c < 31))
            {
                c++;
 
                y  = ((x * y) >> 9) + cy;
                x  = ((x2 - y2) >> 10) + cx;
                x2 = x * x;
                y2 = y * y;
 
            }
 
            SetPixelColor( pixJulia, (py * WJulia + px) << 2, 
              255, 255-(8*c), 255-(6 * c), 255 - c );
 
            py++;
        }
 
        px++;
    }
}
 
function SetPixelColor(pix,offs, a, r, g, b)
{            
    pix[offs++] = r;
    pix[offs++] = g;
    pix[offs++] = b;
    pix[offs] = a;
}
 
jQuery(function() {
  SetupJulia();
});
