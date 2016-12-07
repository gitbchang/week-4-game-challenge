$(document).ready(function(){
		
		var starWarsChar = [
			{
				name: "Dolores",
				hp: 100,
				attack: 5,
				counter: 12,
				enemyattack: 7,
				picture: "assets/images/dolores-profile-resized.jpg",
				
			},
			{
				name: "Maeve",
				hp: 130,
				attack: 10,
				counter: 5,
				enemyattack: 10,
				picture: "assets/images/maeve-profile-resized.jpg",
				
			},
			{
				name: "Teddy Flood",
				hp: 150,
				attack: 12,
				counter: 5,
				enemyattack: 15,
				picture: "assets/images/teddy-profile-resized.jpg",
				
			},
			{
				name: "Man in Black",
				hp: 180,
				attack: 15,
				counter: 3,
				enemyattack: 25,
				picture: "assets/images/william-profile-resized.jpg",
				
			}
		];

		var starWarsCharHp = [120, 100, 150, 180];

		var currentEnemySelected = 0;
		var playerCharSelected = 0;
		var selectedCharID;
		var enemyCharID;
		var timesAttacked = 1;
		var enemiesDefeated = 0;


		function renderInitial(){
		 	for(var i = 0; i < starWarsChar.length; i++){
		 		var charDiv = $("<div>");
		 		var charImg = $("<img>");
		 		charDiv.addClass("initialCharacter");
		 		charDiv.addClass("col-md-2");
		 		// used to identify attributes
		 		charDiv.attr("id", i);
		 		charDiv.attr("data-name", starWarsChar[i].name);
		 		charImg.attr("src", starWarsChar[i].picture);

		 		charDiv.append("<h4>"+starWarsChar[i].name+"</h4>");
		 		charDiv.append(charImg);
		 		charDiv.append('<p class="health">Health: '+starWarsChar[i].hp+'</p>');

		 		$("#instructionHeader").html("<p>     Choose a character below to get started!</p>");
		 		$("#instructionHeader").effect( "highlight", {color:"#ffc50f"}, 2000);

		 		$("#startArea").append(charDiv);
		 		$("#restartButton").remove();
		 	}
		 	
		 }
		 
		 renderInitial();

		 $(document).on("click", ".initialCharacter", function(){
  			console.log($(this).data("name"));
  			// if($("#playerCharArea:empty").length === 0){
  			if(playerCharSelected === 0){
  				// console.log("player char area is empty");
  				// How to refer back to this char's attributes when attacking?
  				selectedCharID = $(this).attr("id");
  				console.log(selectedCharID);
  				
  				$(this).removeClass("initialCharacter");
  				$(this).addClass("playerSelectedChar");
  				//detach
  				//siblings
  				$(this).siblings("div").addClass("futureEnemy");
  				$(this).siblings("div").removeClass("initialCharacter");
  				var removeEnemies = $(this).siblings("div").detach();
  				$("#enemyCharArea").html(removeEnemies);
  				$("#playerCharArea").append(this);

  				$("#instructionHeader").html("<p>     Now Click On An Enemy You Wish To Fight</p>")
  				$("#instructionHeader").effect( "highlight", {color:"#ffc50f"}, 2000);

  				playerCharSelected++;
  			}
		  
		  
		}); // end of initialCharacter click

		$(document).on("click", ".futureEnemy", function(){

			if(currentEnemySelected === 0){
				
				$("#defenderArea").append(this);
				$(this).removeClass("futureEnemy");
				$(this).addClass("currentEnemy");
				enemyCharID = $(this).attr("id");
				currentEnemySelected++;
				// Hide area until current enemy defeated
				$("#enemyCharArea").hide(1000);
				// Instruction Update
				$("#instructionHeader").html('<p class="text-center">Click the "Attack" Button to Fight</p>')
				$("#instructionHeader").effect( "highlight", {color:"#ffc50f"}, 2000);
			}
			else {
				console.log("defeat current enemy first");	

			}
	
		}); // end of futureEnemy click

		$(document).on("click", "#attackButton", function(){
			if(currentEnemySelected === 1){ 
				// enemy attack calculation
				starWarsChar[selectedCharID].hp = starWarsChar[selectedCharID].hp - starWarsChar[enemyCharID].enemyattack;
				// play char attack calculation
				starWarsChar[enemyCharID].hp = starWarsChar[enemyCharID].hp - (starWarsChar[selectedCharID].attack + (starWarsChar[selectedCharID].counter * timesAttacked));

				$("div.playerSelectedChar > p.health").html("Health: " + starWarsChar[selectedCharID].hp);

				$("div.currentEnemy > p.health").html("Health: " + starWarsChar[enemyCharID].hp);

				// red blink effect
				$("div.currentEnemy").effect( "highlight", {color:"#ff0029"}, 500);
				$("div.playerSelectedChar").effect( "highlight", {color:"#ff0029"}, 500);

				isEnemyDead(); // check if enemy is dead
				isPlayerDead(); // check if player is dead
				playerWin();
				timesAttacked++;
			}
			

		}); // end of attackButton

		$(document).on("click", "#restartButton", function(){
			restart();
		});

		function isEnemyDead(){
			if(starWarsChar[enemyCharID].hp < 1){

				$("#defenderArea").empty();
				enemiesDefeated++;
				currentEnemySelected = 0;
				$("#enemyCharArea").show(1000);
			}
		}

		function isPlayerDead(){
			if(starWarsChar[selectedCharID].hp < 1){
				//animation for dead hero
				alert("Your Hero has been Defeated!");
				$("#instructionHeader").html('<p class="text-center">Click the "Restart" Button to Try Again</p>')
				$("#instructionHeader").effect( "highlight", {color:"#ffc50f"}, 2000);
				createRestartButton();

			}
		}

		function playerWin(){
			if(enemiesDefeated === 3){
				alert("You Win!");
				createRestartButton();
				
			}
		}

		function createRestartButton(){
				var restartButton = $("<button>");
				restartButton.text("Restart");
				restartButton.addClass("btn btn-default");
				restartButton.attr("id", "restartButton");
				$("#buttonArea").append(restartButton);
		}



		function restart(){
			currentEnemySelected = 0;
		    playerCharSelected = 0;
		    enemiesDefeated = 0;
		    timesAttacked = 1;
		    
		    $("#playerCharArea").empty();
		    $("#enemyCharArea").empty();
		    $("#defenderArea").empty();
		    for(var x = 0; x < starWarsCharHp.length; x++){
		    	starWarsChar[x].hp = starWarsCharHp[x];
		    }

		    renderInitial(); //should be the last function to run
		}

	

}); // end of document.ready