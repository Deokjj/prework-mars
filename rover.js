//initial rover object
var myRover = {
  position: [0,0],
  direction: 'N'
};

//x is a integer, creates x times x grid.
function gridGenerator(x){
  console.log("you have " + x + "x" + x+ " grid.");
  var grid =[]

  for(var i =0; i<x; i++){
    //intialize with empty arr every i loop
    var childArr =[];

    for(var j=0; j<x; j++){
      //false -> no obstacle, true -> obstacle
      if(Math.random() <0.85){
        childArr.push(false);
      }
      else{
        childArr.push(true);
      }
    }
    grid.push(childArr);
  }
  //find center index and that is always false (no obstacle)
  var center_index = Math.floor( (x-1)/2 );
  grid[center_index][center_index] = false;

  return grid;
}

//This generates 10*10 grid with obstacles in random places
var grid = gridGenerator(10);
console.log("new grid:");
console.log(grid);

// this function returns the indices of rover position on grid
// position: [0,0] is located at [4][4] on grid (to make it middle point)
function positionOnGrid([x, y]){
  return [x+4,y+4];
}

//this function calls position of rover and check if there is an obstacle
function isObstacle([x,y]){
  var onGrid = positionOnGrid([x,y]);

  if(onGrid[0] < 0 || onGrid[1] <0 ||
          onGrid[0] >= grid.length || onGrid[1] >= grid[0].length){
    return undefined;
  }
  else if( grid[ onGrid[0] ][ onGrid[1] ]=== true ){

    return true;
  }
  else {
    return false;
  }
}

function goForward(rover) {

  var previousP = rover.position.slice();

  switch(rover.direction) {
    case 'N':
      rover.position[0]++
      break;
    case 'E':
      rover.position[1]++
      break;
    case 'S':
      rover.position[0]--
      break;
    case 'W':
      rover.position[1]--
      break;
  }

  if( isObstacle(rover.position) === true ){
    console.log( "**Obstacle at [" + rover.position[0] + ", "+rover.position[1]+"]\n" +
    "rover is stopped at: [" + previousP[0] + ", " + previousP[1] + "]**" );
    return true;
  }
  else if(isObstacle(rover.position) === undefined){
    console.log("**[" + rover.position[0] + ", "+rover.position[1]+"] is outside the grid\n"+
    "rover is stopped at: [" + previousP[0] + ", " + previousP[1] + "]**");
    return true;
  }
  else{
    console.log("New Rover Position: [" + rover.position[0] +
    ", " + rover.position[1] + "]");
    return false;
  }
}

  function goBackward(rover) {
    switch(rover.direction) {
      case 'N':
        rover.position[0]--;
        break;
      case 'E':
        rover.position[1]--
        break;
      case 'S':
        rover.position[0]++
        break;
      case 'W':
        rover.position[1]++
        break;
    }

    console.log("New Rover Position: [" + rover.position[0] + ", " + rover.position[1] + "]");
  }

function turnRight(rover) {
  switch(rover.direction) {
    case 'N':
      rover.direction = 'E';
      break;
    case 'E':
      rover.direction = 'S';
      break;
    case 'S':
      rover.direction = 'W';
      break;
    case 'W':
      rover.direction = 'N';
      break;
  }
  console.log("Rover at[" + rover.position[0] + ", " + rover.position[1] + "] is now facing " + rover.direction);

}

function turnLeft(rover) {
  switch(rover.direction) {
    case 'N':
      rover.direction = 'W';
      break;
    case 'E':
      rover.direction = 'N';
      break;
    case 'S':
      rover.direction = 'E';
      break;
    case 'W':
      rover.direction = 'S';
      break;
  }
  console.log("Rover at[" + rover.position[0] + ", " + rover.position[1] + "] is now facing " + rover.direction);

}

//here
function takeCommands(string){
  var commandArr = string.split("");
  for(var i =0; i< commandArr.length; i++){
    switch(commandArr[i]){
      case 'f':
        if(goForward(myRover)){
          return;
        }
        break;
      case 'b':
        if(goBackward(myRover)){
          return;
        }
        break;
      case 'r':
        turnRight(myRover);
        break;
      case 'l':
        turnLeft(myRover);
    }
  }
}

console.log();
console.log("commands are: ffffbbrfbrrfll");
takeCommands("ffffbbrfbrrfll");

console.log();
console.log("commands are: ffffffff");
takeCommands("ffffffff");
