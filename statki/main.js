//dodawanie pol
var tiles = 0;
var toupdate;
var toinsert = [];
var toinsert2 = [];
var curplayer = 1;
while (tiles <= 99) {
    toupdate = '<div class="tile" id="1T'+tiles+'"><div>';
    toinsert.push(toupdate);
    toupdate2 = '<div class="tile" id="2T'+tiles+'"><div>';
    toinsert2.push(toupdate2);
    tiles++;
}
$('#player1').html(toinsert);
$('#player2').html(toinsert2);

//przycisk zmiany rundy
$('#btn').on('click',function() { changePlayer(curplayer); });

//game vars
var layouts = [
    [
        [31,31],[71,71],[16,16],[76,76], //3
        [11,12],[34,24],[69,59], //6
        [47,27],[93,95],//8
        [51,54] //9
    ],
    [
        [32,32],[73,73],[17,17],[78,78], //3
        [12,13],[35,25],[70,80], //6
        [58,38],[94,96],//8
        [52,55] //9
    ]
];
var n;
var start;
var stop;
var layoutnumber = getrandomlayout(0,0); //wybor planszy kappa
console.log("random number is: "+layoutnumber);
var board;
var row;
var rows= [];
for (tiles=0;tiles>=99;tiles++) {
    row = []
}

//init statkow dla I gracza
showShips(curplayer);



//fnc

function getrandomlayout(min,max) {
     return Math.floor(Math.random() * (max - min + 1) + min);
}

function showShips(player) {
    for(n=0;n<=9;n++) {
        start = layouts[layoutnumber][n][0];
        stop = layouts[layoutnumber][n][1];
        setShip(start,stop,player);
    }
}

function hideShips(player) {
    
}

function changePlayer(player) {
    var notifi;
    if(player==1) {
        notifi = "Teraz ruch gracza II";
        hideShips(curplayer);
        curplayer = 2;
        showShips(curplayer);
    } else {
        notifi = "Teraz ruch gracza I";
        hideShips(curplayer);
        curplayer = 1;
        showShips(curplayer);
    }
    $('.notifi').html(notifi);
}

function setShip(start, stop, player) {
    console.log(start);
    $('#'+player+'T'+start).addClass('tile-ship');
    $('#'+player+'T'+start).removeClass('tile');
    $('#'+player+'T'+stop).addClass('tile-ship');
    $('#'+player+'T'+stop).removeClass('tile');
    if(stop - start > 0) {
        var tochange = start + (stop-start)-1;
        var roznica = (stop-start);
        
        switch (roznica) {
            case 2: //kolorowanie jednego pola w poziomie
                $('#'+player+'T'+tochange).addClass('tile-ship');
                $('#'+player+'T'+tochange).removeClass('tile');
                console.log("roznica 2: "+tochange);
                break;
            case 3: //kolorowanie dwoch pol w poziomie
                var lessTochange = tochange-1;
                $('#'+player+'T'+tochange).addClass('tile-ship');
                $('#'+player+'T'+tochange).removeClass('tile');
                $('#'+player+'T'+lessTochange).addClass('tile-ship');
                $('#'+player+'T'+lessTochange).removeClass('tile');
                var test = tochange-1;
                console.log("roznica 2: "+test);
                break;
        }//57start 27stop
    } else if(stop-start < 0) {
        var tochange = start + (stop-start)+10;//37
        var roznica = (stop-start);//-30
        
        switch (roznica) {
            case (-20): //kolorowanie jednego pola w pionie
                $('#'+player+'T'+tochange).addClass('tile-ship');
                $('#'+player+'T'+tochange).removeClass('tile');
                console.log("roznica 2: "+tochange);
                break;
            case (-30): //kolorowanie dwoch pol w pionie
                var lessTochange = tochange+10;
                $('#'+player+'T'+tochange).addClass('tile-ship');
                $('#'+player+'T'+tochange).removeClass('tile');
                $('#'+player+'T'+lessTochange).addClass('tile-ship');
                $('#'+player+'T'+lessTochange).removeClass('tile');
                var test = tochange-1;
                console.log("roznica 2: "+test);
                break;
        }
    }
}


