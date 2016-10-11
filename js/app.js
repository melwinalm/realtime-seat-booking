$(document).ready(function () {

    var firebase = new Firebase("https://seat-booking-realtime.firebaseio.com/");


    Login = function () {
        $("#seatStructure").css('visibility', 'visible');
        showSeats();
    };


    // 0 - unbooked seat
    // 1 - booked seat
    var contentString = "";

    var arr;


    // To load all the seats
    for (let i = 0; i < 10; i++) {
        contentString += "<div>"
        for (let j = 0; j < 10; j++) {
            contentString += "<img id='seat" + i + j + "' src='images/none.png' />";
        }
        contentString += "</div>";
    }
    $("#seats").html(contentString);



    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            $('#seats').on('click', '#seat' + i + j, function () {

                let string = 'seat' + i + j;
                
                if ($('#seat' + i + j).attr('src') == 'images/booked.png') {
                    // Do nothing
                }
                else if ($('#seat' + i + j).attr('src') == 'images/none.png') {

                    firebase.child(string).set({
                        vacancy: 1,
                        name: $("#emailId").val(),
                        locX: i,
                        locY: j
                    });
                } else {
                    firebase.child(string).set({
                        vacancy: 0,
                        name: "",
                        locX: i,
                        locY: j
                    });
                }
            });

        }
    }



    function showSeats() {
        firebase.on("value", function (snapshot) {
            var allSeats = (snapshot.val());
            for (var key in allSeats) {

                let id = "#seat" + allSeats[key].locX + allSeats[key].locY;

                if (allSeats[key].name == $("#emailId").val() && allSeats[key].vacancy == 1) {
                    $(id).attr('src', 'images/selected.png');
                    $(id).attr('style', "cursor: pointer");
                }
                else if (allSeats[key].name != $("#emailId").val() && allSeats[key].vacancy == 1) {
                    $(id).attr('src', 'images/booked.png');
                    $(id).attr('style', "cursor: default");
                }
                else {
                    $(id).attr('src', 'images/none.png');
                    $(id).attr('style', "cursor: pointer");
                }
            }
        });
    }

});