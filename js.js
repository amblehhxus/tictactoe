var board = ['', '', '', '', '', '', '', '', '']
const box = document.querySelector(".board");
const list = document.querySelectorAll(".box");

// Bug: back to menu, eventListener; after win, when restart the next button still appears


let player2 = 'O';
let player1 = 'X';
let currentPlayer = player1;

let round = 1;
let player1Score = 0;
let player2Score = 0;

const gameDisplay = (() => {

  // Player List
  const pvpMode = () => {
    document.querySelector('.player-1').textContent = "PLAYER 1";
    document.querySelector('.player-2').textContent = "PLAYER 2";
  }

  const aiMode = () => {
    document.querySelector('.player-1').textContent = "PLAYER";
    document.querySelector('.player-2').textContent = "AI";
  }

  // Scores
  const countRound = () => {
    document.querySelector('.round').textContent = `ROUND ${round}/5`;
  }

  const updateScore = () => {
    document.querySelector('.player-1-score').textContent = `${player1Score}`;
    document.querySelector('.player-2-score').textContent = `${player2Score}`;
  }

  // Restart game
  const restart = () => {
    round = 1;
    player1Score = 0;
    player2Score = 0;
    currentPlayer = "X";
    board = ['', '', '', '', '', '', '', '', ''];
    updateScore();
    document.querySelector(".stroke").getContext("2d").clearRect(0, 0, 233, 233);
    document.querySelector(".winner").innerText = "";
    tictactoe.drawBoard();
    startGame();
    for (let i = 0 ; i < list.length; i++) {
      list[i].addEventListener('click' , tictactoe.markSpot); 
    }
  }

  // Next round
  const nextRound = () => {
    round++;
    countRound();
    currentPlayer = "X";
    board = ['', '', '', '', '', '', '', '', ''];
    document.querySelector(".winner").innerText = "";
    tictactoe.drawBoard();
    document.querySelector(".stroke").getContext("2d").clearRect(0, 0, 233, 233);
    startGame();
    for (let i = 0 ; i < list.length; i++) {
      list[i].addEventListener('click' , tictactoe.markSpot); 
    };
    document.querySelector(".next-round").style.display = "none";
  }

  return {
    pvpMode,
    aiMode,
    countRound,
    updateScore,
    restart,
    nextRound
  }
})();

const tictactoe = (() => {
		
    // Draw board with DOM
		const drawBoard = () => {
    		
        for (let i = 0; i < list.length; i++) {
        list[i].innerText = board[i];
        
        }
    }
    
    
    // Check for game status
    const gameStatus = () => {
    
 				let result = checkWinner();
  			
        console.log(result === player1);

        if (result === 'tie') {
          document.querySelector(".winner").innerText = "ROUND IS TIE!";

      } else if (result === player1) {
          player1Score++;
          document.querySelector(".winner").innerText = "PLAYER 1 WINS THE ROUND!";

      } else if (result === player2 && gameMode === "pvp") {
        player2Score++;
        document.querySelector(".winner").innerText = "PLAYER 2 WINS THE ROUND!";
      
      } else if (result === player2 && gameMode !== "pvp") {
        player2Score++;
        document.querySelector(".winner").innerText = "AI WINS THE ROUND!";
      }

        if (result === 'tie' || result !== null) {

          if (round === 5 && player1Score === player2Score) {
            
            document.querySelector(".winner-modal").style.display = "flex";
            document.querySelector(".in-game").className = "in-game noevent";
            document.querySelector(".figure").className = "figure tie";
            document.querySelector(".announce-winner").innerText = "THE GAME IS TIE..."

          } else if (round === 5 && player1Score > player2Score || player1Score === 3) {
            document.querySelector(".winner-modal").style.display = "flex";
            document.querySelector(".in-game").className = "in-game noevent";
            document.querySelector(".figure").className = "figure won";
            if (gameMode === "pvp") {
              document.querySelector(".announce-winner").innerText = "PLAYER 1 WON THE GAME!";
            } else {
              document.querySelector(".announce-winner").innerText = "PLAYER WON THE GAME!";
            }
            
            
          } else if (round === 5 && player1Score < player2Score || player2Score === 3) {
            document.querySelector(".in-game").className = "in-game noevent";
            document.querySelector(".winner-modal").style.display = "flex";
            if (gameMode === "pvp") {
              document.querySelector(".figure").className = "figure won";
              document.querySelector(".announce-winner").innerText = "PLAYER 2 WON THE GAME!";
            } else {
              document.querySelector(".figure").className = "figure lost";
              document.querySelector(".announce-winner").innerText = "AI WON THE GAME :(";
            }
          } else {
          document.querySelector(".next-round").style.display = "flex";
          }
          for (let i = 0 ; i < list.length; i++) {
            list[i].removeEventListener('click' , tictactoe.markSpot); 
          }
        }

        

        gameDisplay.updateScore();
		}
    

		// Function for equal spot signs
		function equals3(a, b, c) {
        return a === b && b === c && a !== '';
    }

    // Function for winner stroke
    function stroke() {
      const ctx = document.querySelector(".stroke").getContext("2d");

      let size = 77;
      let gap = size / 2;

      ctx.strokeStyle = "rgba(255, 161, 0, 0.89)";
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.beginPath();

        // Top, mid, bot horizontal; left, mid, right vertical; left, right diagonal
        if (equals3(board[0], board[1], board[2])) {
          ctx.moveTo(9.25, gap);
          ctx.lineTo(223.75, gap);
        } else if (equals3(board[3], board[4], board[5])) {
          ctx.moveTo(9.25, gap + size);
          ctx.lineTo(223.75, gap + size);
        } else if (equals3(board[6], board[7], board[8])) {
          ctx.moveTo(9.25, gap + (2 * size));
          ctx.lineTo(223.75, gap + (2 * size));
        
        } else if (equals3(board[0], board[3], board[6])) {
          ctx.moveTo(gap, 9.25);
          ctx.lineTo(gap, 223.75);
        } else if (equals3(board[1], board[4], board[7])) {
          ctx.moveTo(gap + size, 9.25);
          ctx.lineTo(gap + size, 223.75);
        } else if (equals3(board[2], board[5], board[8])) {
          ctx.moveTo(gap + (2 * size), 9.25);
          ctx.lineTo(gap + (2 * size), 223.75);
        
        } else if (equals3(board[0], board[4], board[8])) {
          ctx.moveTo(9.25, 9.25);
          ctx.lineTo(223.75, 223.75);
        } else if (equals3(board[2], board[4], board[6])) {
          ctx.moveTo(223.75, 9.25);
          ctx.lineTo(9.25, 223.75);
        } 
      
      ctx.stroke();
    }

		// Check for a winner
		const checkWinner = () => {
        let winner = null;

        // Top left vertical && horizontal
        if (equals3(board[0], board[1], board[2]) || equals3(board[0], board[3], board[6])) {
            winner = board[0];
            stroke();

        }

        // Middle horizontal && diagonal
        if (equals3(board[1], board[4], board[7]) || equals3(board[3], board[4], board[5])
        || equals3(board[0], board[4], board[8]) || equals3(board[2], board[4], board[6])) {
            winner = board[4];
            stroke();
        }

        // Bottom right vertical && horizontal
        if (equals3(board[2], board[5], board[8]) || equals3(board[6], board[7], board[8])) {
            winner = board[8];
            stroke();
        }


        // Check for open spots
        let openSpots = 0;

        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                openSpots++;
            }
        }


        // Check for a winner
        if (winner === null && openSpots === 0) {
            return 'tie';
        } else {
            return winner;
        }
    }

    const checkWinnerMinimax = () => {
      let winner = null;

      // Top left vertical && horizontal
      if (equals3(board[0], board[1], board[2]) || equals3(board[0], board[3], board[6])) {
          winner = board[0];
         

      }

      // Middle horizontal && diagonal
      if (equals3(board[1], board[4], board[7]) || equals3(board[3], board[4], board[5])
      || equals3(board[0], board[4], board[8]) || equals3(board[2], board[4], board[6])) {
          winner = board[4];
      }

      // Bottom right vertical && horizontal
      if (equals3(board[2], board[5], board[8]) || equals3(board[6], board[7], board[8])) {
          winner = board[8];
      }


      // Check for open spots
      let openSpots = 0;

      for (let i = 0; i < board.length; i++) {
          if (board[i] === '') {
              openSpots++;
          }
      }


      // Check for a winner
      if (winner === null && openSpots === 0) {
          return 'tie';
      } else {
          return winner;
      }
  }
    
    let openSpots = 0;

    function checkOpenSpots() {
      openSpots = 0;
      for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                openSpots++;
            }
        }
    };

    
    // Smart AI move
    function bestMove() {

    // AI to make its turn
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < board.length; i++)
      if (board[i] === '') {
        board[i] = player2;
        let score = minimax(board, 0, false);
        board[i] = '';


        // From looping, AI takes the highest score of the current loop
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }

    board[move] = player2;
    currentPlayer = player1;
  }
  

    let scores = {
    		X: 10,
        O: -10,
        tie: 0
    };


		function minimax(board, depth, isMaximizing) {
  let result = tictactoe.checkWinnerMinimax();
  if (result !== null) {
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) 
      if (board[i] == '') {
          board[i] = player2;
          let score = minimax(board, depth + 1, false);
          board[i] = '';
          bestScore = Math.max(score, bestScore);
        }
    return bestScore;
      
    
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) 
      if (board[i] == '') {
          board[i] = player1;
          let score = minimax(board, depth + 1, true);
          board[i] = '';
          bestScore = Math.min(score, bestScore);
        }
    
    return bestScore;  
    
  }
}
    
    // Random move for dumb AI
    const randomSpot = () => {
    		const random = Math.floor(Math.random() * 8);
  			return random;
		}
    
    
    const dumbMove = () => {
    		
        let random = randomSpot();
        
        let result = tictactoe.checkWinner();

        checkOpenSpots();
        console.log(openSpots);

  			if (board[random] !== "" && openSpots !== 0) {
            // Loop again
            dumbMove();
        } else if (result !== null) {
            return;
        } else {
      			board[random] = player2;
            currentPlayer = player1;
        }
    }
    
    
    // Fill in spot
    function markSpot()  {
				const id = parseInt(this.id);
  
        // PVP
        if (gameMode === 'pvp') {
        
        		if (currentPlayer === player1 && board[id] === '') {
            		board[id] = player1;
                currentPlayer = player2;
                
            } else if (currentPlayer === player2 && board[id] === '') {
            		board[id] = player2;
                currentPlayer = player1;
            }
        drawBoard();
        gameStatus();
        }
        
        // Smart AI
        if (gameMode === 'smart-ai') {
        		if (currentPlayer === player1 && board[id] === '') {
          	
                board[id] = player1;
                currentPlayer = player2;
                bestMove();
                
                drawBoard();
                gameStatus();
            }
        }
        
        // Dumb AI
        if (gameMode === 'dumb-ai') {
        		if (currentPlayer === player1 && board[id] === '') {
          	
                board[id] = player1;
                currentPlayer = player2;
                dumbMove();
                
                drawBoard();
                gameStatus();
            }
        }
    } 
    

    
		return {
    		drawBoard,
        gameStatus,
    		checkWinner,
        checkWinnerMinimax,
        markSpot,
        dumbMove,
        bestMove,
        scores
    }
})();



 


		// DOM loop
   for (let i = 0 ; i < list.length; i++) {
   			list[i].addEventListener('click' , tictactoe.markSpot); 
	 }

    
    
let gameMode; // = "pvp", "pve"
const turnSetting = document.querySelectorAll('.default');

const difficultySetting = document.querySelector('.difficulty');

function showSetting() {
		if (this.className === 'pvp') {
        document.querySelector(".pvp-setting").style.display = "flex";
        document.querySelector(".main-menu").style.display = "none";

    } else if (this.className === 'ai') {
        document.querySelector(".ai-setting").style.display = "flex";
        document.querySelector(".main-menu").style.display = "none";
        difficultySetting.className = "difficulty selected";
    }
}

function resetClassName() {
		for (let i = 0; i < turnSetting.length; i++){
          turnSetting[i].className = 'default';
    }
}

function resetDifficulty() {
    difficultySetting.className = 'difficulty';
}

function setPlayer() {

		// PVP mark
    if (this.id === 'first-x' || this.id === 'second-x') {
    
    		resetClassName();
    		this.nextElementSibling.className = 'default selected';
				this.className = 'default selected';
        
    } else if (this.id === 'second-o' || this.id === 'first-o') {
    
    		resetClassName();
    		this.previousElementSibling.className = 'default selected';
				this.className = 'default selected';
    }
    
    
    // AI mark
		if (this.id === 'player-x') {
    		
      resetClassName();
				this.className = 'default selected';
        
    } else if (this.id === 'player-o') {
      resetClassName();
				this.className = 'default selected';
    }
    
    
    // AI mode
    if (this.id === 'dumb-ai') {
    		
        this.id = 'smart-ai';
        document.querySelector("#brain").textContent = '< SMART AI';
        
    } else if (this.id === 'smart-ai') {
    
        this.id = 'dumb-ai';
        document.querySelector("#brain").textContent = 'DUMB AI >';
    }
}

document.querySelector(".pvp").addEventListener('click', showSetting);

document.querySelector(".ai").addEventListener('click', showSetting);


for (let i = 0; i < turnSetting.length; i++){
  turnSetting[i].addEventListener('click', setPlayer);
      } 


difficultySetting.addEventListener('click', setPlayer);

      
    
function startGame() {

    document.querySelector(".in-game").style.display = 'flex';
    document.querySelector(".main-menu").style.display = 'none';
    document.querySelector(".pvp-setting").style.display = 'none';
    document.querySelector(".ai-setting").style.display = 'none';
		
    // PVP
    if (turnSetting[0].className === 'default selected') {
        gameMode = 'pvp';
        gameDisplay.pvpMode();
        gameDisplay.countRound();
        
    } else if (turnSetting[2].className === 'default selected') {
    		gameMode = 'pvp';
        player1 = 'O';
        player2 = 'X';
        currentPlayer = player2;

        gameDisplay.pvpMode();
        gameDisplay.countRound();
    }
    
    
    // Smart AI
    if (difficultySetting.id === 'smart-ai') {
    		
        gameMode = 'smart-ai';
        gameDisplay.aiMode();
        gameDisplay.countRound();
        
        if (turnSetting[4].className === 'default selected') {
            tictactoe.scores.X = -10;
            tictactoe.scores.O = 10;

        } else if (turnSetting[5].className === 'default selected') {
            player1 = 'O';
            player2 = 'X';
            tictactoe.bestMove();
            tictactoe.drawBoard();
            
    		}
   	}
    
    
    // Dumb AI
    if (difficultySetting.id === 'dumb-ai' && difficultySetting.className === "difficulty selected") {
    
    		gameMode = 'dumb-ai';
        gameDisplay.aiMode();
        gameDisplay.countRound();
        
        if (turnSetting[5].className === 'default selected') {
            player1 = 'O';
            player2 = 'X';
            tictactoe.dumbMove();
            tictactoe.drawBoard();
            
    		}
   	}
}

function back() {
  document.querySelector(".pvp-setting").style.display = "none";
  document.querySelector(".ai-setting").style.display = "none";
  document.querySelector(".in-game").style.display = "none";
  document.querySelector(".main-menu").style.display = "flex";

  difficultySetting.className = "difficulty"
  difficultySetting.id = 'dumb-ai';
  document.querySelector("#brain").textContent = 'DUMB AI >';

  player2 = 'O';
  player1 = 'X';
  currentPlayer = player1;

  round = 1;
  player1Score = 0;
  player2Score = 0;
  gameDisplay.updateScore();
    
  document.querySelector(".stroke").getContext("2d").clearRect(0, 0, 233, 233);

  for (let i = 0 ; i < list.length; i++) {
    list[i].addEventListener('click' , tictactoe.markSpot); 
  }

  document.querySelector(".winner").innerText = "";
  board = ['', '', '', '', '', '', '', '', ''];
  tictactoe.drawBoard();
  gameMode = null;
  resetClassName();
}

function closeModal() {
  document.querySelector(".winner-modal").style.display = "none"; 
  document.querySelector(".in-game.noevent").className = "in-game";
}


for (let i = 0; i < 2; i++){
		document.querySelectorAll(".start")[i].addEventListener('click', startGame);  
    }

for (let i = 0; i < 3; i++){
		document.querySelectorAll(".back")[i].addEventListener('click', back);  
    }

document.querySelector(".restart").addEventListener('click', gameDisplay.restart);

document.querySelector(".next-round").addEventListener('click', gameDisplay.nextRound);

document.querySelector(".close-modal").addEventListener('click', closeModal);