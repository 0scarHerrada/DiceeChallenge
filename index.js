// Model
const model = {
    gameActive:  false,
    setGameActive: function() {
        if (this.gameActive === false) {
            this.gameActive = true;
        } else {
            this.resetGame();
        }
    },
    playerOneRolled: false,
    setPlayerOneRolled: function() {
        if (this.playerOneRolled === false) {
            this.playerOneRolled = true;
        } else {
            this.playerOneRolled = false;
        }
    },
    playerOneRollValue: 0,
    setPlayerOneRollValue: function() {
        this.playerOneRollValue = Math.floor(Math.random() * 6) + 1;
    },
    playerOneScore : 0,
    setPlayerOneScore: function() {
       this.playerOneScore = this.playerOneScore + 1;
    },
    playerTwoRolled: false,
    setPlayerTwoRolled: function() {
        if (this.playerTwoRolled === false) {
            this.playerTwoRolled = true;
        } else {
            this.playerTwoRolled = false;   
        }
    },
    playerTwoRollValue: 0,
    setPlayerTwoRollValue: function() {
        this.playerTwoRollValue = Math.floor(Math.random() * 6) + 1;
    },
    playerTwoScore: 0,
    setPlayerTwoScore: function() {
        this.playerTwoScore = this.playerTwoScore + 1;
    },
    winningMessage: "",
    setWinningMessage: function() {
        if (this.playerOneRollValue > this.playerTwoRollValue) {
            this.winningMessage = "Player One Wins";
            this.setPlayerOneScore();
        } else if (this.playerOneRollValue < this.playerTwoRollValue) {
            this.winningMessage = "Player Two Wins";
            this.setPlayerTwoScore();
        } else {
            this.winningMessage = "Game is a Draw";
        }
        setTimeout(() => {
            this.setPlayerOneRolled();
            this.setPlayerTwoRolled();
            this.playerOneRollValue = 1;
            this.playerTwoRollValue = 1;
        }, 2000)
    },
    resetPlayerScores: function() {
        this.playerOneScore = 0;
        this.playerTwoScore = 0;
    },
    resetWinningMessage: function() {
        this.winningMessage = "";
    },
    resetGame: function() {
        this.resetPlayerScores();
        this.playerOneRollValue = 1;
        this.playerTwoRollValue = 1;
        this.resetWinningMessage();
    }
}

// View
const view = {
    init: function()  {
        this.startRefresh = document.getElementById("start-refresh");
        this.playerOneDice = document.getElementById("player-one-dice");
        this.playerTwoDice = document.getElementById("player-two-dice");
        this.playerOneScore = document.getElementById("player-one-score");
        this.playerTwoScore = document.getElementById("player-two-score");
        this.winningMessage = document.getElementById("winning-message");
    },
    displayStartRefresh: function() {
        this.startRefresh.textContent = "+ Refresh Score";
    },
    displayPlayerOneDice: function(playerOneRollValue) {
        this.playerOneDice.setAttribute("src", `./images/dice${playerOneRollValue}.png`);
    },
    displayPlayerTwoDice: function(playerTwoRollValue) {
        this.playerTwoDice.setAttribute("src", `./images/dice${playerTwoRollValue}.png`);
    },
    displayPlayerOneScore: function(playerOneScore) {
        this.playerOneScore.textContent = String(playerOneScore);
    },
    displayPlayerTwoScore: function(playerTwoScore) {
        this.playerTwoScore.textContent = String(playerTwoScore);
    },
    displayWinningMessage: function() {
        this.winningMessage.textContent = model.winningMessage;
    }
}

// Controller
const controller = {
    pushStartRefresh: function() {
        if (model.gameActive === true) {
            model.setGameActive();
            view.displayWinningMessage();
            view.displayPlayerOneDice(model.playerOneRollValue);
            view.displayPlayerTwoDice(model.playerTwoRollValue);
            view.displayPlayerOneScore(model.playerOneScore);
            view.displayPlayerTwoScore(model.playerTwoScore);
        }
        model.setGameActive();
        view.init();
        view.displayStartRefresh();
    },
    playerOneRoll: function() {
        if (model.gameActive === true) {
            if (model.playerOneRolled === false) {
                model.setPlayerOneRollValue();
                model.setPlayerOneRolled();
                view.displayPlayerOneDice(model.playerOneRollValue);
                if (model.playerTwoRolled === true) {
                    model.setWinningMessage();
                    view.displayWinningMessage();
                    view.displayPlayerOneScore(model.playerOneScore);
                    view.displayPlayerTwoScore(model.playerTwoScore);
                    setTimeout(() => {
                        view.displayPlayerOneDice(model.playerOneRollValue);
                        view.displayPlayerTwoDice(model.playerTwoRollValue);
                        model.resetWinningMessage();
                        view.displayWinningMessage();
                    }, 2250)
                }
            } 
        }
    },
    playerTwoRoll: function() {
        if (model.gameActive === true) {
            if (model.playerTwoRolled === false) {
                model.setPlayerTwoRollValue();
                model.setPlayerTwoRolled();
                view.displayPlayerTwoDice(model.playerTwoRollValue);
                if (model.playerOneRolled === true) {
                    model.setWinningMessage();
                    view.displayWinningMessage();
                    view.displayPlayerTwoScore(model.playerTwoScore);
                    view.displayPlayerOneScore(model.playerOneScore);
                    setTimeout(() => {
                        view.displayPlayerTwoDice(model.playerTwoRollValue);
                        view.displayPlayerOneDice(model.playerOneRollValue);
                        model.resetWinningMessage();
                        view.displayWinningMessage();
                    }, 2250)
                }
            } 
        }
    }
}