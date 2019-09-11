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
$('.footer').html("Paweł Michalski 4K TZN");

//klianie w pola
tiles--;
//console.log("test: ",tiles);

while (tiles >= 0) {
    //console.log("kurwa mac: ", tiles);
    addHandler(tiles, 1, 2); //nr kafelka, tryb, target
    tiles--;
}

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

/*
function randomBoard() {
    var tiles_nr = 99;
    var czteromasztowiec = 1;
    var trojmasztowiec = 2;
    var dwumasztowiec = 3;
    var jednomasztowiec = 4;

    while (czteromasztowiec < 0) {
        var num_1 = getrandomlayout(0, 99);
        var dir = getrandomlayout(0, 3);
        switch (dir) {
            case 0:
                //w prawo
                var num_2 = num_1 + 1;
                break;
            case 1:
                //w dol
                var num_2 
                break;
            case 2:
                //w lewo
                break;
            case 3:
                //w gore
                break;
        }
        czteromasztowiec--;
    }
}
*/

//losowanie liczby
function getrandomlayout(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
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
    ],
    [
        [1],
        [62],
        [37],
        [6], //3 jednomasztowce

        [48, 49],
        [30, 40],
        [98, 99], //6 dwumasztowce

        [60, 70, 80],
        [24, 34, 44], //8 trojmasztowce

        [74, 75, 76, 77] //9 czteromasztowce
    ],
    [
        [53],
        [13],
        [36],
        [77], //3 jednomasztowce

        [29, 39],
        [21, 31],
        [15, 16], //6 dwumasztowce

        [83, 84, 85],
        [61, 71, 81], //8 trojmasztowce

        [55, 56, 57, 58] //9 czteromasztowce
    ],
    [
        [7],
        [4],
        [82],
        [52], //3 jednomasztowce

        [55, 56],
        [24, 34],
        [21, 31], //6 dwumasztowce

        [74, 75, 76],
        [36, 37, 38], //8 trojmasztowce

        [58, 56, 57, 58] //9 czteromasztowce
    ],
    [
        [70],
        [43],
        [47],
        [27], //3 jednomasztowce

        [78, 87],
        [23, 24],
        [3, 4], //6 dwumasztowce

        [94, 95, 96],
        [30, 40, 50], //8 trojmasztowce

        [72, 73, 74, 75] //9 czteromasztowce
    ]
];
var n; //licznik do ilosci statkow
var p1startFresh = true; //nowa gra gracz I
var p2startFresh = true; //nowa gra gracz II
var start; //poczatek statku
var stop; //koniec statku
var layoutnumber_p1 = getrandomlayout(0, layouts.length - 1); //wybor planszy p1
var layoutnumber_p2 = getrandomlayout(0, layouts.length - 1); //wybor planszy p2
console.log("layout number p1: " + layoutnumber_p1);
console.log("layout number p2: " + layoutnumber_p2);
var p1Ships = []; //zapisane statki I gracza
var p1Shots = []; //zapisane strzaly I gracza
var p2Ships = []; //zapisane statki II gracza
var p2Shots = []; //zapisane strzaly II gracza
var p1ShipsToAdd = [];
var p2ShipsToAdd = [];
var shotDone = false;
var p1Score = 0;
var p2Score = 0;
var gameover = false;

//init statkow dla I gracza
showShips(curplayer);

$('#player1').css('filter', 'brightness(90%)');
$('#player2').css('filter', 'brightness(80%)');

//dodawanie statkow p1
for (n = 0; n <= 9; n++) {
    var s_1;
    var s_2;
    var s_3;
    var s_4;
    //console.log(n, layouts[layoutnumber_p1][n].length);
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
    //console.log(p1ShipsToAdd);
}
p1Ships = p1ShipsToAdd;
console.log("p1Ships:", p1Ships);

//dodawanie statkow p2
for (n = 0; n <= 9; n++) {
    var s_1;
    var s_2;
    var s_3;
    var s_4;
    //console.log(n, layouts[layoutnumber_p2][n].length);
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
    //console.log(p2ShipsToAdd);
}
p2Ships = p2ShipsToAdd;
console.log("p2Ships:", p2Ships);


//fnc

//zmiana gracza
function changePlayer(player) {
    var notifi;
    tiles = 0;
    if (player == 1) {
        notifi = "Teraz ruch gracza II";
        hideShips(curplayer);
        curplayer = 2; //zmiana gracza
        $('#player1').css('filter', 'brightness(80%)');
        setTimeout(function() {
            $('#player2').css('filter', 'brightness(90%)');
            while (tiles <= 99) {
                addHandler(tiles, 0, 2); //remove our events
                addHandler(tiles, 1, 1); //add theri events
                tiles++;
            }
            showShips(curplayer);
            setShots(curplayer);
        }, 1000);

    } else {
        notifi = "Teraz ruch gracza I";
        hideShips(curplayer);
        curplayer = 1; //zmiana gracza
        $('#player2').css('filter', 'brightness(80%)');
        setTimeout(function() {
            $('#player1').css('filter', 'brightness(90%)');
            while (tiles <= 99) {
                addHandler(tiles, 0, 1); //remove our events
                addHandler(tiles, 1, 2); //add theri events
                tiles++;
            }
            showShips(curplayer);
            setShots(curplayer);
        }, 1000);

    }
    shotDone = false;
    $('.notifi').html(notifi);
}

//pokazywanie statkow
function showShips(player) {
    /*
    var p1ships_local2 = [];
    var p2ships_local2 = [];
    */
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
    for (n = 0; n <= 9; n++) {
        $('.tile-ship').addClass('tile');
        $('.tile-ship').removeClass('tile-ship');
    }
}


//ustawianie statkow
function setShip(ship, player, ship_nr) {
    $.each(ship, function(index, value) {
        $('#' + player + 'T' + value).addClass('tile-ship');
        $('#' + player + 'T' + value).removeClass('tile');
    });
}

//dodawanie strzalu
function shot(player, tile) {
    if (!shotDone && !gameover) {
        if (player == 1) {
            //var tileid = '#2T' + tile;
            var ships = p2Ships;
            p1Shots.push(tile);
            //alert(tile);
        } else {
            //var tileid = '#1T' + tile;
            var ships = p1Ships;
            p2Shots.push(tile);
            //alert(tile);
        }

        if (player == 1) {
            check = $.inArray(tile, p2Ships);
            console.log("check var: ", check);
            setColor(player, tile, check);
            if (check != -1) {
                p1Score++;
                console.log("p1 PLUS 1", p1Score);
                if (p1Score >= 20) {
                    win(player);
                }
            }
        } else {
            check = $.inArray(tile, p1Ships);
            console.log("check var: ", check);
            setColor(player, tile, check);
            if (check != -1) {
                p2Score++;
                console.log("p2 PLUS 1", p2Score)
                if (p2Score >= 20) {
                    win(player);
                }
            }
        }
    }
}

//kolorowanie po strzale...
function setColor(player, tileNr, hit) {
    if (player == 1) {
        //var tileid = '#2T' + tileNr;
        var enemy = 2;
    } else {
        //var tileid = '#1T' + tileNr;
        var enemy = 1;
    }

    console.log("hit: ", hit);

    if (hit != -1) {
        //trafiony
        $('#' + enemy + 'T' + tileNr).addClass('tile-ship-destroy');
        $('#' + enemy + 'T' + tileNr).removeClass('tile');
        $('#' + enemy + 'T' + tileNr).addClass('tile-shot');
        $('#' + enemy + 'T' + tileNr).removeClass('tile-ship');
        console.log("FIND AT: ", tileNr, '#' + enemy + 'T' + tileNr);
    } else {
        //missed
        $('#' + enemy + 'T' + tileNr).addClass('tile-shot');
        $('#' + enemy + 'T' + tileNr).removeClass('tile');
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

        $('#' + playerToUpdate + 'T' + value).addClass('tile-shot');
        $('#' + playerToUpdate + 'T' + value).removeClass('tile');
    })

    $.each(theirShots, function(index, value) {
        console.log("ich strzaly: " + value);
        $('#' + player + 'T' + value).css('background-color', 'black');
    })
}

//wygrana
function win(player) {
    gameover = true; //flaga
    $('#btn').unbind('click');
    //powiadomienie
    if (player == 1) {
        var player_str = "I";
    } else {
        var player_str = "II";
    }
    $('.notifi').html("Wygrał gracz" + player_str);
}