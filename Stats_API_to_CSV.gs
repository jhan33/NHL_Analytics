//To go through all game id's, need game ids to go up to 1271 for seasons with 31 teams
//ie: Only tracking games from when Vegas was added (2017-2018) season
//Season_id = 17+, 2017-2018 and beyond
//Cannot include 21-22 season, Seattle was added

function NHL_extract() {


  var num_of_games = 15 //Set to 1271 for regular season

  var id_array = Array(num_of_games);
  for (var i = 0; i < num_of_games; i++) {
    id_array[i] = i+1;
  }

  var id_array_str = str_id(id_array)


  game_info = Array(num_of_games)
  for (var i = 0; i<id_array_str.length; i++) {

    game_id = id_array_str[i]
    var response = UrlFetchApp.fetch("https://statsapi.web.nhl.com/api/v1/game/201902" + game_id + "/feed/live");
    var json = JSON.parse(response.getContentText());
    var a = json.liveData.plays.allPlays;
    game_info[i] = a;
  }


  //Inefficient on memory usage, but declare the variables

  var shots_list_x = [];
  var shots_list_y = [];
  var goals_list_x = [];
  var goals_list_y = [];


  for (var j=0; j < num_of_games; j++) {
    game = game_info[j]
    for (var i =0; i < game.length; i++) {
      if(game[i].result.event == "Shot") {
        shots_list_x.push(game[i].coordinates.x);
        shots_list_y.push(game[i].coordinates.y);
      } else if (game[i].result.event == "Goal") {
        goals_list_x.push(game[i].coordinates.x);
        goals_list_y.push(game[i].coordinates.y);
      }

    }
  }


  //Create the csv files onto user's google drive 

  DriveApp.createFile('15 games - x coordinates of shots', shots_list_x, MimeType.CSV);
  DriveApp.createFile('15 games - y coordinates of shots', shots_list_y, MimeType.CSV);
  DriveApp.createFile('15 games - x coordinates of goals', goals_list_x, MimeType.CSV);
  DriveApp.createFile('15 games - y coordinates of goals', goals_list_y, MimeType.CSV);



}

//Function to go through all game id's
//Return a string array of all the game
function str_id(num_array) {
  var mylist = Array(num_array.length)
  for (let i = 0, len = num_array.length; i < len; i++){
    num = num_array[i].toString();
    while (num.length < 4) {          //Add digits of 0 in front to match game_id length of 4 (ie: 0015=game 15)
      num = "0" + num;
    }
    Logger.log(num)
    mylist[i] = num;
  }
  return mylist
}