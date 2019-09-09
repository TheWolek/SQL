//dodawanie pol
var tiles = 0;
var toupdate;
var toinsert = [];
var toinsert2 = [];
var curplayer = 1;
while (tiles <= 99) {
    toupdate = '<div class="tile" id="1T' + tiles + '"><div>';
    toinsert.push(toupdate);
    toupdate2 = '<div class="tile" id="2T' + tiles + '"><div>';
    toinsert2.push(toupdate2);
    tiles++;
}
$('#player1').html(toinsert);
$('#player2').html(toinsert2);

//przycisk zmiany rundy
$('#btn').on('click', function() { changePlayer(curplayer); });

//klianie w pola
tiles--;
//console.log("test: ",tiles);

while (tiles >= 0) {
    //console.log("kurwa mac: ", tiles);
    addHandler(tiles, 1, 2); //nr kafelka, tryb, target
    tiles--;
}
//............................................ NIE MAM SLOW
function addHandler(tile, mode, player) {
    if (mode == 1) {
        //dodwanie
        $('#' + player + 'T' + tile).click(function() {
            shot(curplayer, tile);
            shotDone = true;
        });
        //console.log("dodwanie eventow dla: ",player);
    } else {
        //usuwanie
        $('#' + player + 'T' + tile).unbind('click');
        //console.log("usuwanie eventow dla: ",player);
    }
}

//game vars
var layouts = [
    [
        [31],
        [71],
        [16],
        [76], //3 jednomasztowce

        [11, 12],
        [34, 24],
        [69, 59], //6 dwumasztowce

        [27, 37, 47],
        [93, 94, 95], //8 trojmasztowce

        [51, 52, 53, 54] //9 czteromasztowce
    ],
    [
        [32],
        [73],
        [17],
        [78], //3 jednomasztowce

        [12, 13],
        [35, 25],
        [70, 80], //6 dwumasztowce

        [58, 48, 38],
        [94, 95, 96], //8 trojmasztowce

        [52, 52, 54, 55] //9 czteromasztowce
    ]
];
var n; //licznik do ilosci statkow
var p1startFresh = true; //nowa gra gracz I
var p2startFresh = true; //nowa gra gracz II
var start; //poczatek statku
var stop; //koniec statku
var layoutnumber_p1 = getrandomlayout(0, 1); //wybor planszy p1
var layoutnumber_p2 = getrandomlayout(0, 1); //wybor planszy p2
console.log("layout number p1: " + layoutnumber_p1);
console.log("layout number p2: " + layoutnumber_p2);
var p1Ships = []; //zapisane statki I gracza
var p1Shots = []; //zapisane strzaly I gracza
var p2Ships = []; //zapisane statki II gracza
var p2Shots = []; //zapisane strzaly II gracza
var p1ShipsToAdd = [];
var p2ShipsToAdd = [];
var shotDone = false;

//init statkow dla I gracza
showShips(curplayer);

//dodawanie statkow p1
for (n = 0; n <= 9; n++) {
    var s_1;
    var s_2;
    var s_3;
    var s_4;
    console.log(n, layouts[layoutnumber_p1][n].length);
    switch (layouts[layoutnumber_p1][n].length) {
        case 1:
            s_1 = layouts[layoutnumber_p1][n][0];
            p1ShipsToAdd.push(s_1);
            break;
        case 2:
            s_1 = layouts[layoutnumber_p1][n][0];
            s_2 = layouts[layoutnumber_p1][n][1];
            p1ShipsToAdd.push(s_1, s_2);
            break;
        case 3:
            s_1 = layouts[layoutnumber_p1][n][0];
            s_2 = layouts[layoutnumber_p1][n][1];
            s_3 = layouts[layoutnumber_p1][n][2];
            p1ShipsToAdd.push(s_1, s_2, s_3);
            break;
        case 4:
            s_1 = layouts[layoutnumber_p1][n][0];
            s_2 = layouts[layoutnumber_p1][n][1];
            s_3 = layouts[layoutnumber_p1][n][2];
            s_4 = layouts[layoutnumber_p1][n][3];
            p1ShipsToAdd.push(s_1, s_2, s_3, s_4);
            break;
    }
    console.log(p1ShipsToAdd);
}
p1Ships = p1ShipsToAdd;

//dodawanie statkow p2
for (n = 0; n <= 9; n++) {
    var s_1;
    var s_2;
    var s_3;
    var s_4;
    console.log(n, layouts[layoutnumber_p2][n].length);
    switch (layouts[layoutnumber_p2][n].length) {
        case 1:
            s_1 = layouts[layoutnumber_p2][n][0];
            p2ShipsToAdd.push(s_1);
            break;
        case 2:
            s_1 = layouts[layoutnumber_p2][n][0];
            s_2 = layouts[layoutnumber_p2][n][1];
            p2ShipsToAdd.push(s_1, s_2);
            break;
        case 3:
            s_1 = layouts[layoutnumber_p2][n][0];
            s_2 = layouts[layoutnumber_p2][n][1];
            s_3 = layouts[layoutnumber_p2][n][2];
            p2ShipsToAdd.push(s_1, s_2, s_3);
            break;
        case 4:
            s_1 = layouts[layoutnumber_p2][n][0];
            s_2 = layouts[layoutnumber_p2][n][1];
            s_3 = layouts[layoutnumber_p2][n][2];
            s_4 = layouts[layoutnumber_p2][n][3];
            p2ShipsToAdd.push(s_1, s_2, s_3, s_4);
            break;
    }
    console.log(p2ShipsToAdd);
}
p2Ships = p2ShipsToAdd;


//fnc

//losowanie liczby int
function getrandomlayout(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//zmiana gracza
function changePlayer(player) {
    var notifi;
    tiles = 0;
    if (player == 1) {
        notifi = "Teraz ruch gracza II";
        hideShips(curplayer);
        curplayer = 2; //zmiana gracza
        while (tiles <= 99) {
            addHandler(tiles, 0, 2); //remove our events
            addHandler(tiles, 1, 1); //add theri events
            tiles++;
        }
        showShips(curplayer);
        setShots(curplayer);
    } else {
        notifi = "Teraz ruch gracza I";
        hideShips(curplayer);
        curplayer = 1; //zmiana gracza
        while (tiles <= 99) {
            addHandler(tiles, 0, 1); //remove our events
            addHandler(tiles, 1, 2); //add theri events
            tiles++;
        }
        showShips(curplayer);
        setShots(curplayer);
    }
    shotDone = false;
    $('.notifi').html(notifi);
}

//pokazywanie statkow
function showShips(player) {
    var p1ships_local2 = [];
    var p2ships_local2 = [];
    var shipToShow = [];
    if (player == 1) {
        number = layoutnumber_p1;
        //p1Ships.push(layouts[number]);
    } else {
        number = layoutnumber_p2;
        //p2Ships.push(layouts[number]);
    }
    for (n = 0; n <= 9; n++) {
        var s_1;
        var s_2;
        var s_3;
        var s_4;
        shipToShow = [];
        switch (layouts[number][n].length) {
            case 1:
                s_1 = layouts[number][n][0];
                shipToShow.push(s_1);
                break;
            case 2:
                s_1 = layouts[number][n][0];
                s_2 = layouts[number][n][1];
                shipToShow.push(s_1, s_2);
                break;
            case 3:
                s_1 = layouts[number][n][0];
                s_2 = layouts[number][n][1];
                s_3 = layouts[number][n][2];
                shipToShow.push(s_1, s_2, s_3);
                break;
            case 4:
                s_1 = layouts[number][n][0];
                s_2 = layouts[number][n][1];
                s_3 = layouts[number][n][2];
                s_4 = layouts[number][n][3];
                shipToShow.push(s_1, s_2, s_3, s_4);
                break;
        }
        setShip(shipToShow, player, n);
        if (player == 1) {
            p1ships_local2.push(shipToShow);
            //console.log("p1ShipsLocal przy rysowaniu: ", p1ships_local2);
        } else {
            p2ships_local2.push(shipToShow);
            //console.log("p2ShipsLocal przy rysowaniu: ", p2ships_local2);
        }
    }
    if (player == 1) {
        p1Ships = p1ships_local2;
        console.log("p1Ships przy rysowaniu: ", p1Ships);
    } else {
        p2Ships = p2ships_local2;
        console.log("p2Ships przy rysowaniu: ", p2Ships);
    }


}

//ukrywanie statkow
function hideShips(player) {
    var shipToHide = [];
    var p1ships_local = [];
    var p2ships_local = [];
    if (player == 1) {
        number = layoutnumber_p1;
    } else {
        number = layoutnumber_p2;
    }
    /*
    if(player==1) {
        p1startFresh = false;
        console.log("p1startFresh "+p1startFresh);
    } else {
        p2startFresh = false;
        console.log("p2startFresh "+p2startFresh);
    }
    */
    for (n = 0; n <= 9; n++) {
        var s_1;
        var s_2;
        var s_3;
        var s_4;
        shipToHide = [];
        switch (layouts[number][n].length) {
            case 1:
                s_1 = layouts[number][n][0];
                shipToHide.push(s_1);
                break;
            case 2:
                s_1 = layouts[number][n][0];
                s_2 = layouts[number][n][1];
                shipToHide.push(s_1, s_2);
                break;
            case 3:
                s_1 = layouts[number][n][0];
                s_2 = layouts[number][n][1];
                s_3 = layouts[number][n][2];
                shipToHide.push(s_1, s_2, s_3);
                break;
            case 4:
                s_1 = layouts[number][n][0];
                s_2 = layouts[number][n][1];
                s_3 = layouts[number][n][2];
                s_4 = layouts[number][n][3];
                shipToHide.push(s_1, s_2, s_3, s_4);
                break;
        }
        //console.log(ship);
        if (player == 1) {
            p1ships_local.push(shipToHide);
        } else {
            p2ships_local.push(shipToHide);
        }


        $('.tile-ship').addClass('tile');
        $('.tile-ship').removeClass('tile-ship');
    }
    if (player == 1) {
        p1Ships = p1ships_local;
    } else {
        p2Ships = p2ships_local;
    }
    //console.log("p1ships_local:",p1ships_local);
    console.log("p1ships przy schowaniu:", p1Ships);
    console.log("p2ships przy schowaniu:", p2Ships);
}


//ustawianie statkow
function setShip(ship, player, ship_nr) {
    $.each(ship, function(index, value) {
        $('#' + player + 'T' + value).addClass('tile-ship');
        $('#' + player + 'T' + value).removeClass('tile');
    });
    /*
    console.log("statek: od " + start + " do " + stop);
    $('#' + player + 'T' + start).addClass('tile-ship');
    $('#' + player + 'T' + start).removeClass('tile');
    $('#' + player + 'T' + stop).addClass('tile-ship');
    $('#' + player + 'T' + stop).removeClass('tile');
    shipToShow = [];

    shipToShow.push(start);
    shipToShow.push(stop);


    if (stop - start > 0) { //statek wiekszy do 2
        var tochange = start + (stop - start) - 1;
        var roznica = (stop - start);

        switch (roznica) {
            case 2: //kolorowanie jednego pola w poziomie - statek na 3
                $('#' + player + 'T' + tochange).addClass('tile-ship');
                $('#' + player + 'T' + tochange).removeClass('tile');
                console.log("roznica 2: " + tochange);
                shipToShow.push(tochange);
                break;
            case 3: //kolorowanie dwoch pol w poziomie statek na 4
                var lessTochange = tochange - 1;
                $('#' + player + 'T' + tochange).addClass('tile-ship');
                $('#' + player + 'T' + tochange).removeClass('tile');
                $('#' + player + 'T' + lessTochange).addClass('tile-ship');
                $('#' + player + 'T' + lessTochange).removeClass('tile');
                var test = tochange - 1;
                console.log("roznica 3: " + test);
                shipToShow.push(tochange);
                shipToShow.push(lessTochange);
                break;
        } //57start 27stop
    } else if (stop - start < 0) {
        var tochange = start + (stop - start) + 10; //37
        var roznica = (stop - start); //-30

        switch (roznica) {
            case (-20): //kolorowanie jednego pola w pionie
                $('#' + player + 'T' + tochange).addClass('tile-ship');
                $('#' + player + 'T' + tochange).removeClass('tile');
                console.log("roznica -20: " + tochange);
                shipToShow.push(tochange);
                break;
            case (-30): //kolorowanie dwoch pol w pionie
                var lessTochange = tochange + 10;
                $('#' + player + 'T' + tochange).addClass('tile-ship');
                $('#' + player + 'T' + tochange).removeClass('tile');
                $('#' + player + 'T' + lessTochange).addClass('tile-ship');
                $('#' + player + 'T' + lessTochange).removeClass('tile');
                var test = tochange - 1;
                console.log("roznica -30: " + test);
                shipToShow.push(tochange);
                shipToShow.push(lessTochange);
                break;
        }
    }
    console.log("shipToShow: ", shipToShow);
    return shipToShow;
    */
}

//dodawanie strzalu
function shot(player, tile) {
    if (!shotDone) {
        if (player == 1) {
            var tileid = '#2T' + tile;
            var ships = p2Ships;
            p1Shots.push(tile);
            //alert(tile);
        } else {
            var tileid = '#1T' + tile;
            var ships = p1Ships;
            p2Shots.push(tile);
            //alert(tile);
        }

        $.each(ships, function(index, value) {
            //value = [start,stop];
            if (player == 1) {

            } else {

            }
        });
        $(tileid).css('background-color', 'gray');
    }
}

//setShots
function setShots(player) {
    var playerToUpdate;
    if (player == 1) {
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
        console.log("nasze strzaly: " + value);
        if (player == 1) {
            playerToUpdate = 2;
        } else {
            playerToUpdate = 1;
        }

        $('#' + playerToUpdate + 'T' + value).css('background-color', 'black');
    })

    $.each(theirShots, function(index, value) {
        console.log("ich strzaly: " + value);
        $('#' + player + 'T' + value).css('background-color', 'black');
    })
}