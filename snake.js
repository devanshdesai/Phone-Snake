var square_size = 20;
var spacing = 3;
var snake_length = 3;
var type = 0;
var cutoff = 10;
var interval;

var width = (22 * square_size) + (23 * spacing);
var height = (23 * square_size) + (24 * spacing);

var numbers = [];
var cells = [];
var out = [];

var playing = 0;
var snake_position;
var move_direction = 2;
var delta = 1;
var key_pressed = 0;
var number_count = 0;
var phone_number = "";

var easy = "#66bb6a";
var medium = "#ffc107";
var hard = "#d50000";
var color = easy;

$(document).ready(function() {
    $("#overlay").addClass("overlay");

    $("#canvas").width = width;
    $("#canvas").height = height;
    $("#canvas").css({
        "width": width,
        "height": height,
        "margin-top": "" + (-height / 2 + 20) + "px",
        "margin-left": "" + (-width / 2 - 3) + "px"
    });

    $("#overlay").width = width;
    $("#overlay").height = height;
    $("#overlay").css({
        "width": width,
        "height": height,
        "margin-top": "" + (-height / 2 + 20) + "px",
        "margin-left": "" + "" + (-width / 2 - 3) + "px"
    });

    startGame();
    $("#game").fadeIn(2000);
    interval = setInterval(moveSnake, 225);

    $("#easy").click(function() {
        $("#overlay").css({
            "background-color": "#000",
            "opacity": "0.60",
            "filter": "alpha(opacity=60)"
        });
        $("#overlay").html("<br><br>Press ENTER to start");
        $("#overlay").show();
        playing = 0;
        $("#phone").html("Enter your phone number:<br>(XXX) XXX-XXXX");
        color = easy;
        startGame();
        $("#difficulty").css("background-color", easy);
        clearInterval(interval);
        interval = setInterval(moveSnake, 200);
    });

    $("#medium").click(function() {
        $("#overlay").css({
            "background-color": "#000",
            "opacity": "0.60",
            "filter": "alpha(opacity=60)"
        });
        $("#overlay").html("<br><br>Press ENTER to start");
        $("#overlay").show();
        playing = 0;
        $("#phone").html("Enter your phone number:<br>(XXX) XXX-XXXX");
        color = medium;
        startGame();
        $("#difficulty").css("background-color", medium);
        clearInterval(interval);
        interval = setInterval(moveSnake, 150);
    });

    $("#hard").click(function() {
        $("#overlay").css({
            "background-color": "#000",
            "opacity": "0.60",
            "filter": "alpha(opacity=60)"
        });
        $("#overlay").html("<br><br>Press ENTER to start");
        $("#overlay").show();
        playing = 0;
        $("#phone").html("Enter your phone number:<br>(XXX) XXX-XXXX");
        color = hard;
        startGame();
        $("#difficulty").css("background-color", hard);
        clearInterval(interval);
        interval = setInterval(moveSnake, 100);
    });
});

$(document).keydown(function(e) {
    if (e.keyCode > 36 && e.keyCode < 41 && Math.abs(move_direction - (e.keyCode - 37)) != 2) {
        if (key_pressed == 0) {
            move_direction = e.keyCode - 37;
        }
        key_pressed = 1;
    } else if (e.keyCode == 27) { // Esc key
        $("#overlay").css({
            "background-color": "#000",
            "opacity": "0.60",
            "filter": "alpha(opacity=60)"
        });
        $("#overlay").html("<br><br>Press ENTER to start");
        $("#overlay").show();
        playing = 0;
        $("#phone").html("Enter your phone number:<br>(XXX) XXX-XXXX");
        startGame();
    } else if (e.keyCode == 13) { // Enter key
        if (number_count == cutoff) {

        } else {
            $("#overlay").css({
                "background-color": "#000",
                "opacity": "0.60",
                "filter": "alpha(opacity=60)"
            });
            playing = Math.abs(playing - 1);
            if (playing == 1) {
                $("#overlay").hide();
                $("#overlay").empty();
            } else {
                $("#overlay").show();
                $("#overlay").html("<br><br>Press ENTER to start");
            }
        }
    }
});

function startGame() {
    cells = [];
    out = [];
    snake_length = 3;
    move_direction = 2;
    delta = 1;
    number_count = 0;

    for (i = 0; i < 506; i++) {
        cells.push(0);
    }

    for (i = 0; i < 11; i++) {
        out.push("X");
    }

    cells[463] = 1;
    cells[464] = 2;
    cells[465] = 3;
    snake_position = 465;

    generateBoard();
    updateBoard();
}

function generateBoard() {
    var random;
    numbers = [];

    for (i = 0; i < 100; i++) {
        numbers.push(10);
    }

    for (i = 0; i < 10; i++) {
        for (n = 0; n < 10; n++) {
            while (true) {
                random = Math.floor(Math.random() * 100);
                if (numbers[random] == 10) {
                    numbers[random] = i;
                    break;
                }
            }
        }
    }
}

function updateBoard() {
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.clearRect(0, 0, width, height);
    var count = 0;

    for (h = 0; h < 23; h++) {
        for (w = 0; w < 22; w++) {
            ctx.fillStyle = "#ddd";
            ctx.fillRect(spacing + w * (square_size + spacing), spacing + h * (square_size + spacing), square_size, square_size);

            if (h % 2 == 1 && w != 0 && w != 21 && h < 20 && w % 2 == ((h + 1) / 2) % 2) {
                if (numbers[count] < 10) {
                    ctx.fillStyle = "#1565c0";
                    ctx.fillRect(spacing + w * (square_size + spacing), spacing + h * (square_size + spacing), square_size, square_size);
                    ctx.fillStyle = "#fff";
                    ctx.font = "" + (square_size - 1) + "px Arial";
                    ctx.fillText("" + numbers[count], spacing + w * (square_size + spacing) + 4, spacing + h * (square_size + spacing) + square_size - 3);

                    if (snake_position == h * 22 + w) {
                        out[number_count] = numbers[count];
                        phone_number = "" + out[0] + "" + out[1] + "" + out[2] + "-" + out[3] + "" + out[4] + "" + out[5] + "-" + out[6] + "" + out[7] + "" + out[8] + "" + out[9] + "";

                        $("#phone").html("Enter your phone number:<br>(" + out[0] + "" + out[1] + "" + out[2] + ") " + out[3] + "" + out[4] + "" + out[5] + "-" + out[6] + "" + out[7] + "" + out[8] + "" + out[9] + "");

                        for (i = 0; i < 506; i++) {
                            if (cells[i] > 0 && cells[i] != snake_length) {
                                cells[i] += 1;
                            }
                        }

                        numbers[count] = 10;
                        number_count += 1;
                        snake_length += 1;

                        if (number_count == cutoff) {
                            playing = 0;
                            $("#overlay").css({
                                "background-color": "#80ff80",
                                "opacity": "1.00",
                                "filter": "alpha(opacity=100)"
                            });
                            var ph_number = "(" + out[0] + "" + out[1] + "" + out[2] + ") " + out[3] + "" + out[4] + "" + out[5] + "-" + out[6] + "" + out[7] + "" + out[8] + "" + out[9] + "";
                            $("#overlay").html("<br>The number you entered is<br>" + ph_number + "" + "<br><div id='submit' class='waves-effect waves-light blue darken-3 btn-large'><i class='material-icons right'>done</i>Submit</div>&nbsp;&nbsp;&nbsp;<div id='retry' class='waves-effect blue darken-3 waves-light btn-large'><i class='material-icons right'>replay</i>Retry</div>");
                            $("#overlay").show();

                            $("#submit").click(function() {
                                $("#game").fadeOut(1000, function() {
                                    window.location = "submit.html";
                                });
                            });

                            $("#retry").click(function() {
                                $("#overlay").css({
                                    "background-color": "#000",
                                    "opacity": "0.60",
                                    "filter": "alpha(opacity=60)"
                                });
                                $("#overlay").html("<br><br>Press ENTER to start");
                                $("#phone").html("Enter your phone number:<br>(XXX) XXX-XXXX");
                                $("#retry").remove();
                                $("#submit").remove();
                                startGame();
                            });
                        }
                    }
                }
                count += 1;
            }
            if (cells[h * 22 + w] > 0) {
                ctx.fillStyle = color;
                ctx.fillRect(spacing + w * (square_size + spacing), spacing + h * (square_size + spacing), square_size, square_size);
            }
        }
    }
}

function moveSnake() {
    if (playing == 1) {
        if (cells[snake_position + delta] > 0) {
            playing = 0;
            $("#overlay").css("background-color", "rgba(230, 0, 0, 0.8)");
            $("#overlay").html("<br><br>INVALID NUMBER");
            $("#overlay").show();
        } else {
            if (move_direction == 0) { // Left direction
                delta = -1;
            } else if (move_direction == 1) { // Up direction
                delta = -22;
            } else if (move_direction == 2) { // Right direction
                delta = 1;
            } else if (move_direction == 3) { // Down direction
                delta = 22;
            }

            snake_position += delta;

            for (i = 0; i < 506; i++) {
                if (cells[i] > 0) {
                    cells[i]--;
                }
            }

            if ((snake_position - delta) % 22 == 21 && move_direction == 2) {
                snake_position -= 22;
            } else if ((snake_position - delta) % 22 == 0 && move_direction == 0) {
                snake_position += 22;
            } else if (snake_position > 506) {
                snake_position -= 506;
            } else if (snake_position < 0) {
                snake_position += 506;
            }

            cells[snake_position] = snake_length;
            updateBoard();
        }
    }

    key_pressed = 0;
}

$('.dropdown-button').dropdown({
    inDuration: 300,
    outDuration: 225,
    constrain_width: true, // Does not change width of dropdown to that of the activator
    hover: true, // Activate on hover
    gutter: 0, // Spacing from edge
    belowOrigin: true, // Displays dropdown below the button
    alignment: 'left' // Displays dropdown with edge aligned to the left of button
});
