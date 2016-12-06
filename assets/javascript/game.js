$(document).ready(function(){
		
		var starWarsChar = [
			{
				name: "Obi-Wan Kenobi",
				hp: 120,
				counter: 5,
				picture: "assets/images/obiwan.jpg",
				enemyAttack: 15
			},
			{
				name: "Luke Skywalker",
				hp: 100,
				counter: 5,
				picture: "assets/images/Luke_Skywalker.jpg",
				enemyAttack: 15
			},
			{
				name: "Darth Sidious",
				hp: 150,
				counter: 5,
				picture: "assets/images/Darth_Sidious.jpg",
				enemyAttack: 15
			},
			{
				name: "Darth Maul",
				hp: 180,
				counter: 5,
				picture: "assets/images/darth_maul.jpg",
				enemyAttack: 15
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
				$("#enemyCharArea").hide(1000);
			}
			else {
				console.log("defeat current enemy first");	

			}
	
		}); // end of futureEnemy click

		$(document).on("click", "#attackButton", function(){
			if(currentEnemySelected === 1){ 
				starWarsChar[selectedCharID].hp = starWarsChar[selectedCharID].hp - starWarsChar[enemyCharID].counter;
				starWarsChar[enemyCharID].hp = starWarsChar[enemyCharID].hp - (starWarsChar[selectedCharID].counter * timesAttacked);

				$("div.playerSelectedChar > p.health").html("Health: " + starWarsChar[selectedCharID].hp);

				$("div.currentEnemy > p.health").html("Health: " + starWarsChar[enemyCharID].hp);
				$("div.currentEnemy").effect( "highlight", {color:"#ff0029"}, 1000);
				$("div.playerSelectedChar").effect( "highlight", {color:"#ff0029"}, 1000);

				isEnemyDead(); // check if enemy is dead
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

		function playerWin(){
			if(enemiesDefeated === 3){
				alert("You Win!");
				var restartButton = $("<button>");
				restartButton.text("Restart");
				restartButton.addClass("btn btn-default");
				restartButton.attr("id", "restartButton");
				$("#buttonArea").append(restartButton);
			}
		}

		function restart(){
			currentEnemySelected = 0;
		    playerCharSelected = 0;
		    enemiesDefeated = 0;
		    timesAttacked = 1;
		    
		    $("#playerCharArea").empty();
		    $("#enemyCharArea").empty();
		    for(var x = 0; x < starWarsCharHp.length; x++){
		    	starWarsChar[x].hp = starWarsCharHp[x];
		    }

		    renderInitial(); //should be the last function to run
		}

	

}); // end of document.ready