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
var n; //licznik do ilosci statkow
var p1startFresh = true; //nowa gra gracz I
var p2startFresh = true; //nowa gra gracz II
var start; //poczatek statku
var stop; //koniec statku
var layoutnumber = getrandomlayout(0,0); //wybor planszy
console.log("layout number: "+layoutnumber);
var p1Ships = []; //zapisane statki I gracza
var p1Shots = []; //zapisane strzaly I gracza
var p2Ships = []; //zapisane statki II gracza
var p2Shots = []; //zapisane strzaly II gracza

//init statkow dla I gracza
showShips(curplayer);



//fnc

//losowanie liczby int
function getrandomlayout(min,max) {
     return Math.floor(Math.random() * (max - min + 1) + min);
}

//pokazywanie statkow
function showShips(player) {
    for(n=0;n<=9;n++) {
        start = layouts[layoutnumber][n][0];
        stop = layouts[layoutnumber][n][1];
        setShip(start,stop,player);
    }
}

//ukrywanie statkow
function hideShips(player) {
    var ship = [];
    var p1ships_local = [];
    var p2ships_local = [];
    var s_start;
    var s_stop;
    var s_status;
    /*
    if(player==1) {
        p1startFresh = false;
        console.log("p1startFresh "+p1startFresh);
    } else {
        p2startFresh = false;
        console.log("p2startFresh "+p2startFresh);
    }
    */
    for (n=0;n<=9;n++) {
        s_start = layouts[layoutnumber][n][0];
        s_stop = layouts[layoutnumber][n][1];
        //ship = [poczatek,koniec,stan];
        ship = [];
        ship.push(s_start,s_stop);
        //console.log(ship);
        if(player==1) {
            p1ships_local.push(ship);
        } else {
            p2ships_local.push(ship);
        }
        
        
        $('.tile-ship').addClass('tile');
        $('.tile-ship').removeClass('tile-ship');
    }
    if(player==1) {
        p1Ships = p1ships_local;
    } else {
        p2Ships = p2ships_local;
    }
    //console.log("p1ships_local:",p1ships_local);
    console.log("p1ships:",p1Ships);
    console.log("p2ships:",p2Ships);
}

//zmiana gracza
function changePlayer(player) {
    var notifi;
    if(player==1) {
        notifi = "Teraz ruch gracza II";
        hideShips(curplayer);
        curplayer = 2;
        showShips(curplayer);
        setShots(curplayer);
    } else {
        notifi = "Teraz ruch gracza I";
        hideShips(curplayer);
        curplayer = 1;
        showShips(curplayer);
        setShots(curplayer);
    }
    $('.notifi').html(notifi);
}

//ustawianie statkow
function setShip(start, stop, player,status) {
    console.log("statek: od "+start+" do "+stop);
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
                console.log("roznica 3: "+test);
                break;
        }//57start 27stop
    } else if(stop-start < 0) {
        var tochange = start + (stop-start)+10;//37
        var roznica = (stop-start);//-30
        
        switch (roznica) {
            case (-20): //kolorowanie jednego pola w pionie
                $('#'+player+'T'+tochange).addClass('tile-ship');
                $('#'+player+'T'+tochange).removeClass('tile');
                console.log("roznica -20: "+tochange);
                break;
            case (-30): //kolorowanie dwoch pol w pionie
                var lessTochange = tochange+10;
                $('#'+player+'T'+tochange).addClass('tile-ship');
                $('#'+player+'T'+tochange).removeClass('tile');
                $('#'+player+'T'+lessTochange).addClass('tile-ship');
                $('#'+player+'T'+lessTochange).removeClass('tile');
                var test = tochange-1;
                console.log("roznica -30: "+test);
                break;
        }
    }
}

//setShots
function setShots(player) {
    var playerToUpdate;
    if(player==1) {
        var ourShots = p1Shots;
        var theirShots = p2Shots;
        var ourShips = p1Ships;
        var theirShips = p2Ships;
    } else {
        var ourShots = p2Shots;
        var theirShots = p1Shots;
        var ourShips = p2Ships;
        var theirShips = p1Ships;
    }
    $.each(ourShots, function(index, value) {
        console.log("nasze strzaly: "+value);
        if(player==1) {
            playerToUpdate = 2;
        } else {
            playerToUpdate = 1;
        }
        
        $('#'+playerToUpdate+'T'+value).css('background-color','black');
    })
    
    $.each(theirShots, function(index, value) {
        console.log("ich strzaly: "+value);
        $('#'+player+'T'+value).css('background-color','black');
    })
}

