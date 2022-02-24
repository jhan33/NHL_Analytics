//To go through all game id's, need game ids to go up to 1271 for seasons with 31 teams
//ie: Only tracking games from when Vegas was added (2017-2018) season
//Season_id = 17+, 2017-2018 and beyond
//Cannot include 21-22 season, Seattle was added

async function NHL_extract() {

    var num_of_games = 1271 //Set to 1271 for regular season
  
    var id_array = Array(num_of_games);
    for (var i = 0; i < num_of_games; i++) {
      id_array[i] = i+1;
    }
  
    var id_array_str = str_id(id_array)
  
  
    var game_info = Array(num_of_games)
    for (var i = 0; i<id_array_str.length; i++) {
  
      var game_id = id_array_str[i]
      const fetch = require("node-fetch");
      const response = await fetch("https://statsapi.web.nhl.com/api/v1/game/201902" + game_id + "/feed/live");
      const mydata = await response.json();
      var a = mydata.liveData.plays.allPlays;
      game_info[i] = a;
    }
  

    //We do not know how many shots there would be taken on a given day
    var shots_list = [];
    var goals_list = [];
  
  
    for (var j=0; j < num_of_games; j++) {
      game = game_info[j]
      for (var i =0; i < game.length; i++) {
        if(game[i].result.event == "Shot") {
          shots_list.push([game[i].coordinates.x, game[i].coordinates.y]);
        } else if (game[i].result.event == "Goal") {
          goals_list.push([game[i].coordinates.x, game[i].coordinates.y]);
        }
  
      }
    }
  
  
    //By this point an array has been created containing shot and goal data
    //The current project scope will be to extract a csv
    //For now the array will be left, for further improvements to the project

 
    const createCsvWriter = require('csv-writer').createObjectCsvWriter;
    const csvWriter_shots = createCsvWriter({
       path: 'shotsdata.csv',   //Change to data.csv
       header: [
       {id: 'sx', title: 'Shot_x'},      //header declaration 
       {id: 'sy', title: 'Shot_y'}   //id is used to declare when data is being input by program
       //{id: 'gx', title: 'Goal_x'},          //Title is just the name of my name
       //{id: 'gy', title: 'Goal_y'}    //Note that we storing as objects
      ]
    });

    const csvWriter_goals = createCsvWriter({
      path: 'goalsdata.csv',   //Change to data.csv
      header: [
      {id: 'gx', title: 'Goal_x'},      //header declaration 
      {id: 'gy', title: 'Goal_y'}   //id is used to declare when data is being input by program
      ]        
   });

    var shot_data_csv = [];
    var goal_data_csv = [];


    for (var i=0; i<shots_list.length; i++) {
        var myshotdata = shots_list[i]
        var shot_data = {
            sx: myshotdata[0],
            sy: myshotdata[1]
        }
        shot_data_csv.push(shot_data)
    }

    for (var i=0; i<goals_list.length; i++) {
        var mygoaldata = goals_list[i]
        var goal_data = {
          gx: mygoaldata[0],
          gy: mygoaldata[1]
       }
        goal_data_csv.push(goal_data)
    }



  csvWriter_shots
    .writeRecords(shot_data_csv)  //Wants an array on objects
    .then(()=> console.log('The CSV for shots file was written successfully'));
  
  csvWriter_goals
    .writeRecords(goal_data_csv)  //Wants an array on objects
    .then(()=> console.log('The CSV for goals file was written successfully'));
  

  
  
  }
  
  //Function to go through all game id's
  //Return a string array of all the game
  function str_id(num_array) {
    var mylist = Array(num_array.length)
    for (let i = 0, len = num_array.length; i < len; i++){
      var num = num_array[i].toString();
      while (num.length < 4) {          //Add digits of 0 in front to match game_id length of 4 (ie: 0015=game 15)
        num = "0" + num;
      }
      mylist[i] = num;
    }
    return mylist
  }

  NHL_extract()
