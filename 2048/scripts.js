function random(min, max){
	return Math.floor(Math.random() * (max - min)) + min;
};

var game = {
	size: 4,
	board: [],
	currentScore: 0,
	maxScore: 0,
	lastCreatedNumber: {},
	clearSession: function() {
		this.board = [];
		this.currentScore = 0;
		document.getElementById("current-score").innerHTML = 0;
	},
	createBoard: function(){
		for (var i = 0; i < this.size; i++) {
			var arr = [];
			for (var j = 0; j < this.size; j++) {
				arr.push(false);
			}
			this.board.push(arr);
		}
	},
	createNumber: function(){
		var arrNumber = [2, 2, 2, 2, 2, 2, 2, 2, 2, 4],
			pool = [];
		
		for (var i = 0; i < this.size; i++) {
			for (var j = 0; j < this.size; j++) {
				if (!this.board[i][j]) {
					pool.push({row: i, col: j});
				}
			}
		}
		
		var randomPosition = random(0, pool.length);
		var randomNumber = arrNumber[random(0, 10)];
		this.lastCreatedNumber = pool[randomPosition];
		this.board[this.lastCreatedNumber.row][this.lastCreatedNumber.col] = randomNumber;		
	},
	rotate: function(array, direction){
		var arr = [[], [], [], []];    
		for (var i = 0; i < this.size; i++ ) {
			for (var j = 0; j < this.size; j++) {      	
				if (direction == "to right") {
					arr[i][this.size - j - 1] = array[j][i];
				} else if (direction == "to left") {
					arr[this.size - i - 1][j] = array[j][i];
				}
			}
		};    
		return arr;
	},
	horizontalMove: function(direction){
		for (var i = 0; i < this.board.length; i++ ) {
			this.board[i] = this.board[i].filter(function(item){
				return item;
			});
			if (direction == "to left") {
				var j = 0;
				while (j < this.board[i].length - 1) {
					if (this.board[i][j] == this.board[i][j+1]) {
						this.board[i][j] += this.board[i][j+1];
						this.currentScore += this.board[i][j];
						this.board[i].splice(j+1, 1);
					}
					j++;
				}
			} else {
				var j = this.board[i].length - 1;
				while (j > 0) {
					if (this.board[i][j] == this.board[i][j-1]) {
						this.board[i][j] += this.board[i][j-1];
						this.currentScore += this.board[i][j];
						this.board[i].splice(j-1, 1);
						j--;
					}
					j--;
				}
			};
			for (var j = this.board[i].length; j < this.size; j++) {
				if (direction == "to right") {
					this.board[i].unshift(false);
				} else if (direction == "to left") {
					this.board[i].push(false);
				}
			}
		}
	},
	verticalMove: function(direction){
		this.board = this.rotate(this.board, "to right");
		if (direction == "to top") {
			this.horizontalMove("to right");
		} else if (direction == "to bottom") {
			this.horizontalMove("to left");
		};
		this.board = this.rotate(this.board, "to left");
	},
	showBoard: function(){
		if (document.getElementById("game-board").innerHTML) {
			document.getElementById("game-board").innerHTML = "";
		};
		var table = document.createElement("table");
		table.classList.add("game-table");
		for (var i = 0; i < this.size; i++) {
			var tr = document.createElement("tr");
			for (var j = 0; j < this.size; j++) {
				var td = document.createElement("td");
				if (this.board[i][j]) {	
					td.innerHTML = this.board[i][j];
					td.classList.add("value-" + this.board[i][j]);	
					if (i == this.lastCreatedNumber.row && j == this.lastCreatedNumber.col) {
						td.classList.add("new-value");
					}
				}
				tr.appendChild(td);
			}
			table.appendChild(tr);
		}
		document.getElementById("game-board").appendChild(table);
	},
	canToMove: function(direction){
		function check(array){
			for (var i = 0; i < array.length; i++) {
				var pos = (array[i].indexOf(false) != -1) ? array[i].indexOf(false) : array.length;
				
				for (var j = 0; j < pos - 1; j++) {
					if (array[i][j] == array[i][j+1]) {
						return true;
					}
				}
				
				while (pos < array.length) {
					if (array[i][pos]) {
						return true;
					}
					pos++;
				}
			}
			return false;
		};
		
		switch (direction) {
			case "to left":
				var array = this.board;
				break;
			case "to top":
				var array = this.rotate(this.board, "to left");	
				break;
			case "to right":
				var array = this.rotate(this.board, "to right");
				array = this.rotate(array, "to right");
				break;
			case "to bottom":
				var array = this.rotate(this.board, "to right");
				break;
		};
		return check(array);
	},
	canToPlay: function(){
		var arr = [this.canToMove("to left"), this.canToMove("to top"), this.canToMove("to right"), this.canToMove("to bottom")];
		if (arr.indexOf(true) != -1) {
			return true;
		};
		return false;		
	},
	over: function(){
		var div = document.createElement("div");
		div.classList.add("game-over-message");
		div.innerHTML = "<h2 class='game-over-message__title'>Игра окончена</h2><div class='game-over-message__try-again' id='try-again'>Начать заново</div>";
		document.getElementById("game-board").appendChild(div);
		
		document.getElementById("try-again").addEventListener("click", startGame);
	},
	run: function(){
		this.clearSession();
		this.createBoard();
		this.createNumber();
		this.createNumber();
		this.showBoard();
		
		document.addEventListener("keydown", action.bind(this));
		
		function action(e){
			switch (e.keyCode) {
				case 37:
				if (!this.canToMove("to left")) {
					return;
				}
				this.horizontalMove("to left");
				break;
			case 38:
				if (!this.canToMove("to top")) {
					return;
				}
				this.verticalMove("to top");
			 	break;
			case 39:
				if (!this.canToMove("to right")) {
					return;
				}
				this.horizontalMove("to right");
			 	break;
			case 40:
				if (!this.canToMove("to bottom")) {
					return;
				}
				this.verticalMove("to bottom");
				break;
			default:
				return;
			};
			
			this.createNumber();
			this.showBoard();	
			if (!this.canToPlay()) {
				this.over();
			};
			
			document.getElementById("current-score").innerHTML = this.currentScore;
			
			if (this.currentScore > this.maxScore) {
				this.maxScore = this.currentScore;
				document.getElementById("max-score").innerHTML = this.maxScore;
			}
		}
	}
};

function startGame(e){
	game.run();
	
	document.getElementById("start-game").addEventListener("click", startGame);
}

window.addEventListener("load", startGame);