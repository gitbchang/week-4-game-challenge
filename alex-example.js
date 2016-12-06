$(document).ready(function(){

    // Made an object of all 4 characters with all traits
    var characters = {
        reaper: { name: "Reaper", health: 120, counter: 25},
        winston: { name: "Winston", health: 180, counter: 15},
        hanzo: { name: "Hanzo", health: 150, counter: 20 },
        soldier: { name: "Solider 76", health: 100, counter: 30 }
    };
    //Loop through the characters object to add values to each
    $(".char").each(function(index, div){
        var jDiv  = $(div);
        var value = $(div).attr('value');
        jDiv.html("<h3>" + characters[value].name + "</h3>" +
            "<p>Health: " + characters[value].health + "</p>" + 
            "<p>Attack: " + characters[value].counter + "</p>");
    })



    
    //All character divs start with an intial class
    $(".char").click(function() {
        //if the enemies area is empty..
        if( $("#enemies").is(":empty")){
            //add the hero class to the player chosen character
            var hero = $(this).addClass("hero");
            $(this).removeClass("initial");
            // add the enemy class to the rest of the 3 characters
            if ($(".char").not("initial")) {
                var enemies = $(".initial").addClass("enemy");
                $("#enemies").append(enemies);
                $(".enemy").click(function(){
                    //If a defender is empty, add one of the enemies to defender area
                    if ( $("#defender").is(":empty") ){
                        $(this).removeClass("enemy");
                        $(this).addClass("defender");
                        var defender = $(this).addClass("defender");
                        $("#defender").append(defender);
                    }
                });
            }
        }
    });
    $("button").click(function(){
        var attackPower = 0;
            if ($("#defender").is(":empty") ){
            alert("Please choose a defender");
            }
            else{
                $(".yourAttack").html("<p>You attack for " + (attackPower + 8) + " damage!</p>");
                $(".defender").each(function(index, div){
                    var value = $(div).attr('value');
                    $(".enemyAttack").html("<p>" + characters[value].name + " attacks you for " + characters[value].counter + " damage!</p>");
                });
                console.log("hello");
            }
    });
});