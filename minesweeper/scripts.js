window.addEventListener("load", startGame);

function random(min, max){
	return Math.floor(Math.random() * (max - min)) + min;
};

const game = {
	board: [],
	currentLevel: 0,
	level: [{
		title: "легкий",
		size: 9,
		bombs: 10
	},{
		title: "сложный",
		size: 16,
		bombs: 40
	}],
	timerId: 1,
	isRunning: false,
	countPainted: 0,
	isTimerEnabled: false,
	displayValue: function(value, id) {
		let str = '';
		
		for (let j = value.toString().length; j < 3; j++ ) {
			str += '0';
		}
		
		document.getElementById(id).innerHTML = (value >= 0) ? str + value : value;
	},
	startTimer: function(){
		let i = 0;

		this.timerId = setInterval(() => {			
			this.displayValue(++i, "timer");
		}, 1000);
	},
	isAllPainted: function(flags){ 
		if (this.countPainted == this.level[this.currentLevel].size * this.level[this.currentLevel].size && flags == 0) {
			document.getElementById("smile").classList.add("smile--cool");
			clearInterval(this.timerId);
			this.isRunning = false;
		}
	},
	showLevel: function(){
		document.getElementById("level").innerHTML = "Уровень сложности:";
		
		let select = document.createElement("select");
		
		select.classList.add("level__select");

		this.level.forEach((item, i) => {
			let option = document.createElement("option");
			
			option.setAttribute("value", i);
			if (i == this.currentLevel) option.setAttribute("selected", "selected");
			option.innerHTML = item.title;
			
			select.appendChild(option);
		});
		
		select.onchange = (e) => {
			if (this.isRunning) this.stop();
			this.currentLevel = e.target.value;
			this.run();
		}

		document.getElementById("level").appendChild(select);
	},
	stop: function(){
		document.getElementById("game-board").innerHTML = "";
		clearInterval(this.timerId);
		this.board = [];
		this.isTimerEnabled = false;
		this.isRunning = false;
	},
	createHeader: function(){
		document.getElementById("game-board").innerHTML = "";
		
		let header = document.createElement("header");
		
		header.classList.add("header");
		header.innerHTML = "<div class='header__bomb-count' id='flags'>000</div><div class='smile' id='smile'>" + 
			"<div class='smile__eye smile__eye--left'></div><div class='smile__eye smile__eye--right'></div><div class='smile__mouth'></div></div>" + 
			"<div class='header__time' id='timer'>000</div>";
		document.getElementById("game-board").appendChild(header);
		
		document.getElementById("smile").addEventListener("click", () => {
			this.stop();
			this.run();
		});
	},
	createBoard: function(){
		let table = document.createElement("table");
		
		table.setAttribute("id", "game-table");
		table.classList.add("game-table");
		
		for (var i = 0; i < this.level[this.currentLevel].size; i++) {
			let tr = document.createElement("tr"), arr = [];
			
			for (let j = 0; j < this.level[this.currentLevel].size; j++) {
				let td = document.createElement("td");
				
				td.classList.add("game-table__cell");
				td.setAttribute("data-row", i);
				td.setAttribute("data-col", j);
				tr.appendChild(td);
				
				arr.push(0);
			}
			
			table.appendChild(tr);
			
			this.board.push(arr);
		}
		
		document.getElementById("game-board").appendChild(table);
	},
	createBombs: function(){
		pool = [];
		for (let i = 0; i < this.level[this.currentLevel].size; i++) {
			for (let j = 0; j < this.level[this.currentLevel].size; j++) {
				pool.push({row: i, col: j});
			}
		};
		
		for (let i = 0; i < this.level[this.currentLevel].bombs; i++) {
			const pos = random(0, pool.length);
			const row = pool[pos].row, col = pool[pos].col;
			this.board[row][col] = "x";			
			pool.splice(pos, 1);
		}
	},
	countBombs: function(){
		for (let i = 0; i < this.level[this.currentLevel].size; i++) {
			for (let j = 0; j < this.level[this.currentLevel].size; j++) {
				if (this.board[i][j] == "x") {
					for (let m = i - 1; m <= i + 1; m++) {
						for (var n = j - 1; n <= j + 1; n++) {
							if (this.board[m] && !(isNaN(this.board[m][n]))) {
								++this.board[m][n];
							}
						}						
					}
				}
			}
		}
	},
	open: function (tableCell){
		if (!tableCell.classList.contains("game-table__cell") || tableCell.classList.contains("game-table__cell--press") || tableCell.children.length) return;
		
		const row = +tableCell.dataset.row,
			col = +tableCell.dataset.col;
		
		const value = this.board[row][col];
				
		tableCell.classList.add("game-table__cell--press");
			
		if (value > 0) {
			tableCell.innerHTML = value;
			tableCell.classList.add("game-table__cell--value-" + value);
		} else if (value == 0) {
			for (let j = -1; j <= 1; j++) {
				for (let k = -1; k <= 1; k++) {
					const newRow = row + j,
						newCol = col + k;
					if (newRow >= 0 && newRow < this.level[this.currentLevel].size && newCol >= 0 && newCol < this.level[this.currentLevel].size) {
						this.open(document.getElementById("game-table").children[row + j].children[col + k]);
					}
				}
			}
		} else {					
			tableCell.innerHTML = "<div class='bomb bomb--active'><div class='bomb__circle'></div><div class='bomb__line'></div><div class='bomb__line bomb__line--rotate'></div><div class='bomb__small-circle'></div></div>";
			document.getElementById("smile").classList.add("smile--dead");
			this.isRunning = false;
			clearInterval(this.timerId);
		}
		
		++this.countPainted;
	},
	run: function() {
		this.isRunning = true;
		this.showLevel();
		this.createHeader();
		this.createBoard();
		this.createBombs();
		this.countBombs();
		
		let flags = this.level[this.currentLevel].bombs;
		this.displayValue(flags, "flags");
		
		let gameTableCell = document.getElementsByClassName("game-table__cell");
		
		for (let i = 0; i < gameTableCell.length; i++) {			
			showValue = e => {
				if (!this.isRunning) return;
				
				if (!this.isTimerEnabled) {
					this.isTimerEnabled = true;
					this.startTimer();
				}
				
				document.getElementById("smile").classList.add("smile--surprise");
				setTimeout(function(){
					document.getElementById("smile").classList.remove("smile--surprise");
				}, 100);
				
				this.open(e.target);
				
				this.isAllPainted(flags);
			};
			
			setFlag = e => {
				event.preventDefault();
				
				if (!this.isRunning) return;
				
				if (!e.target.classList.contains("game-table__cell--press")) {
					if (e.target.classList.contains("game-table__cell")) {
						e.target.innerHTML = "<div class='flag'><div class='flag__bottom'></div>" + 
						"<div class='flag__top'></div><div class='flag__flagpole flag__flagpole--black'></div>" + 
						"<div class='flag__flagpole flag__flagpole--red'></div><div class='flag__triangle'></div></div>";
						++this.countPainted;
						this.displayValue(--flags, "flags");
						
						if (!this.isTimerEnabled) {
							this.isTimerEnabled = true;
							this.startTimer();
						}
					} else if (e.target.classList.contains("flag") || e.target.innerHTML === "") {
						e.path[e.path.length-9].innerHTML = "";
						--this.countPainted;
						this.displayValue(++flags, "flags");
					}
				}
				
				this.isAllPainted(flags);
			}			
			
			gameTableCell[i].addEventListener("click", showValue);
			gameTableCell[i].addEventListener("contextmenu", setFlag);
		};
		
		// console.log(this.board);
	}
}

function startGame(){
	game.run();
};