$(document).ready(function(){
  //Idea here is to have a "base" case (for example, img1 is an X for TTT board) and reverse() the array if the player chooses Os instead. Following, use xoArray[0] as the player's marks and xoArray[1] as the cpu or player 2's marks.
  var xoArray = ['http://www.clipartbest.com/cliparts/jix/EyA/jixEyAb5T.png',
                 'http://www.clker.com/cliparts/3/F/h/l/W/o/cyrillic-letter-o-md.png'];
  //Number of players
  var players = 0;
  var turn = 1;
  var boardState = ['','','',
                   '','','',
                   '','',''];
  var spotState = ['x','o'];
  var dummyFlip;
  var contNue;
  
  $('.playerBtn').click(function(){
    players = $(this).attr('value');
    $('#playerSelect').addClass('hide');
    $('#xoSelect').removeClass('hide');
    console.log(players);
    if(players==2){
        $('#xoText').html('Player One, select Xs or Os. (X always goes first!)')
      }
  });
  //If O is selected, array is reversed and X is set to player 2. Functionally meaningless for local two player game, as X always goes first. (make note of that).
  $('.xoBtn').click(function(){
    if($(this).attr('value') == 'O'){
      xoArray.reverse();
      spotState.reverse();
      
      dummyFlip = true;
      if(players==1){
        boardState[4]=spotState[1];
        $('#spot5').html('<img src="'+xoArray[1]+'">');
      }
      
      turn = 1;
        if(players==2){
           turn = 2;
           }
      //console.log('turn is'+turn);
    }
    else{
      dummyFlip = false;
      console.log('turn is'+turn);
    }
      
    $('#xoSelect').addClass('hide');
    $('#tBoard').removeClass('hide');
    
  })
  //X always goes first. First click goes to X, regardless of which position it is in.
  //Check boardState for null entries, can only overwrite empty spots on the board. For endGame conditions, check checkWin function after every play.
  $('.gameSpot').click(function(){
    var current = $(this).attr('value');
    if(boardState[current] == ''){
      if(turn == 1){
        $(this).html('<img src="'+xoArray[0]+'">')
        $('#xFirst').addClass('hide');
        boardState[current] = spotState[0];
        console.log(boardState);
        contNue = checkWin();
        if(contNue == 'winner'){
          return;
        }
        
          setTimeout(function(){
            turn = 2;
            if(players==1){
              placeCorner(boardState,xoArray,spotState,turn);
              console.log(boardState);
              checkWin();
              turn = 1;
            }
            resolveTie(boardState);
            
          },500);
        
     }
     else if(turn == 2){
        $(this).html('<img src="'+xoArray[1]+'">')
        $('#xFirst').addClass('hide');
       boardState[current] = spotState[1];
       console.log(boardState);
       checkWin();
       turn = 1;
      }
    }
  });
  
  //Checks for winning board states or full/draw board states after every play.
  //Win States (0 index adjusted): 012, 048, 036, 147, 246, 258, 345, 678
  function checkWin(){
    console.log('Checking victory conditions...');
    //Example check, need victory conditions for both x and o
    if(boardState[0] === 'x' && boardState[1] === 'x' && boardState[2] ==='x'){
      console.log('X Top Row Victory');
      chickenDinner();
      return "winner";
    }
    else if(boardState[0] === 'x' && boardState[4] === 'x' && boardState[8] === 'x'){
      console.log('X \\\ Victory');
      chickenDinner();
      return "winner";
    }
    else if(boardState[0] === 'x' && boardState[3] === 'x' && boardState[6] === 'x'){
      console.log('X Left Column Victory');
      chickenDinner();
      return "winner";
    }
    else if(boardState[1] === 'x' && boardState[4] === 'x' && boardState[7] === 'x'){
      console.log('X Middle Column Victory');
      chickenDinner();
      return "winner";
    }
    else if(boardState[2] === 'x' && boardState[4] === 'x' && boardState[6] === 'x'){
      console.log('X / Victory');
      chickenDinner();
      return "winner";
    }
    else if(boardState[2] === 'x' && boardState[5] === 'x' && boardState[8] === 'x'){
      console.log('X Right Column Victory');
      chickenDinner();
      return "winner";
    }
    else if(boardState[3] === 'x' && boardState[4] === 'x' && boardState[5] === 'x'){
      console.log('X Middle Row Victory');
      chickenDinner();
      return "winner";
    }
    else if(boardState[6] === 'x' && boardState[7] === 'x' && boardState[8] === 'x'){
      console.log('X Bottom Row Victory');
      chickenDinner();
      return "winner";
    }
    if(boardState[0] === 'o' && boardState[1] === 'o' && boardState[2] ==='o'){
      console.log('O Top Row Victory');
      chickenDinner();
      return "winner";
    }
    else if(boardState[0] === 'o' && boardState[4] === 'o' && boardState[8] === 'o'){
      console.log('O \\\ Victory');
      chickenDinner();
      return "winner";
    }
    else if(boardState[0] === 'o' && boardState[3] === 'o' && boardState[6] === 'o'){
      console.log('O Left Column Victory');
      chickenDinner();
      return "winner";
    }
    else if(boardState[1] === 'o' && boardState[4] === 'o' && boardState[7] === 'o'){
      console.log('O Middle Column Victory');
      chickenDinner();
      return "winner";
    }
    else if(boardState[2] === 'o' && boardState[4] === 'o' && boardState[6] === 'o'){
      console.log('O / Victory');
      chickenDinner();
      return "winner";
    }
    else if(boardState[2] === 'o' && boardState[5] === 'o' && boardState[8] === 'o'){
      console.log('O Right Column Victory');
      chickenDinner();
      return "winner";
    }
    else if(boardState[3] === 'o' && boardState[4] === 'o' && boardState[5] === 'o'){
      console.log('O Middle Row Victory');
      chickenDinner();
      return "winner";
    }
    else if(boardState[6] === 'o' && boardState[7] === 'o' && boardState[8] === 'o'){
      console.log('O Bottom Row Victory');
      chickenDinner();
      return "winner";
    }
  
  
  function chickenDinner(){
    console.log(turn);
    if(dummyFlip===false){
      if(turn === 1){
        $('#vicString').text('X Wins!');
      }
      else if(turn === 2){
        $('#vicString').text('O Wins!');
      }
    }
    else if(dummyFlip === true){
      if(turn === 1){
        $('#vicString').text('O Wins!');
      }
      else if(turn === 2){
        $('#vicString').text('X Wins!');
      }
      
    }
      $('#tBoard').addClass('hide');
      $('#victoryScreen').removeClass('hide');
    }
  }
  
  $('#resetBtn').click(function(){
    for(i=1;i<10;i++){
      $('#spot'+i).html('');
    }
    //reset conditions to default values
    xoArray = ['http://www.clipartbest.com/cliparts/jix/EyA/jixEyAb5T.png',
                 'http://www.clker.com/cliparts/3/F/h/l/W/o/cyrillic-letter-o-md.png'];
    spotState = ['x','o'];
 
    players = 0;
    turn = 1;
    boardState = ['','','',
                   '','','',
                   '','',''];
    $('#victoryScreen').addClass('hide');
    $('#playerSelect').removeClass('hide');
    
  });
  
  
  
  
  });
  

function placeCorner(arr, xoArray, spotState){
  var cornArr = [0,2,6,8];
  var randArr = [1,3,4,5,7];
  //console.log(cornArr);
  for(var i=0;i<cornArr.length;i++){
    if(arr[cornArr[i]] !== ''){
      cornArr[i] = '';
     // console.log(cornArr[i]);
    }
  }
  //console.log(cornArr);
  cornArr = cornArr.filter(function(value){
    return value !== "";
  });
  //console.log(cornArr);
  var chosenCorner = cornArr[Math.floor(Math.random()*cornArr.length)];
  //console.log(chosenCorner);

  $('#spot'+(chosenCorner+1)).html('<img src="'+xoArray[1]+'">');
  arr[chosenCorner] = spotState[1];
  
  if(chosenCorner == undefined){
  //  get boardState, prune to empty spots, pick random empty spot, place there
    for(var j=0;j<arr.length;j++){
      if(arr[randArr[j]] !== ''){
        randArr[j] = '';
      }
    }
    randArr = randArr.filter(function(value){
      return value !== "";
    });
    var chosenRand = randArr[Math.floor(Math.random()*randArr.length)];
    console.log(chosenRand);
    $('#spot'+(chosenRand+1)).html('<img src="'+xoArray[1]+'">');
    arr[chosenRand] = spotState[1];
  }
}

function resolveTie(arr){
  console.log('Checking Ties...');
  if(arr.indexOf('') == -1){
    console.log('Draw!');
    $('#vicString').text('Draw!');
    $('#tBoard').addClass('hide');
    $('#victoryScreen').removeClass('hide');
  }
}