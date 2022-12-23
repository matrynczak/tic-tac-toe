const gameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', '']
    return {board}
})();

const displayController = (() => {
    const {board} = gameBoard;
    const cells = document.querySelectorAll(".cell");
    const renderBoard = () => {
        cells.forEach((cell, index) => {
            const value = document.createElement('p');
            value.textContent = board[index];
            cell.appendChild(value);
            cell.classList.add('not-clickable');
        });
    }
   
    return {renderBoard}
})();

const Player = (name, symbol) => {
    return {name, symbol}
}

const playGame = (() => {
    const marksArray = ['X', 'O'];
    const playerXnameInput = document.querySelector('input.player-x');
    const playerOnameInput = document.querySelector('input.player-o');
    const whoStartGameInfo = document.querySelector('.who-start');
    const winnerInfo = document.querySelector('.winner');
    const nextTurnInfo = document.querySelector('.next-player');
    const {board} = gameBoard;
    let PlayerX = Player('', 'X');
    let PlayerO = Player('', 'O');
    
    const cells = document.querySelectorAll(".cell");
    displayController.renderBoard();
    const fillCells = () => {
        
        let markToPut = '';
        let tempMark = '';
        const startButton = document.querySelector('.start-game');        
        startButton.addEventListener('click', () => {
            PlayerX.name = playerXnameInput.value;
            PlayerO.name = playerOnameInput.value;
            
            tempMark = marksArray[Math.floor(Math.random()*marksArray.length)];
            
            if(PlayerX.name !== '' && PlayerO.name !== '') {
                whoStartGameInfo.textContent = tempMark === 'X' ? `The game begins player ${PlayerX.name}` : `The game begins player ${PlayerO.name}`;
                cells.forEach((cell) => {
                    cell.classList.remove('not-clickable');
                });
            }
        });

        cells.forEach((cell,index) => {
            cell.addEventListener('click', () => {
                if(tempMark === PlayerO.symbol) {
                    markToPut = tempMark;
                    tempMark = PlayerX.symbol
                }
                else {
                    markToPut = tempMark;
                    tempMark = PlayerO.symbol
                }
                if(board[index] === ''){
                    board[index] = markToPut;
                    cells[index].textContent = markToPut;
                }
                else {
                    cells[index].classList.add('blink-bg');
                }
                nextTurnInfo.textContent = tempMark === 'X' ? PlayerX.name : PlayerO.name;
                checkWinner();
            })
        })
    }

    const checkWinner = () => {
        const winningSets = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
        winningSets.forEach(set => {
            if(cells[set[0]].textContent !== '' &&
                cells[set[0]].textContent === cells[set[1]].textContent && cells[set[1]].textContent === cells[set[2]].textContent ) { 
                    winnerInfo.textContent = ` 🥳 The winner of the battle is ${cells[set[0]].textContent === 'X' ? PlayerX.name : PlayerO.name}! 🥳`;
                    cells[set[0]].classList.add('winning-line');
                    cells[set[1]].classList.add('winning-line');
                    cells[set[2]].classList.add('winning-line');
                    cells.forEach(cell => {
                        cell.classList.add('not-clickable');
                    })
                }
        });
    }

    const clearBoard = () => {
        const {board} = gameBoard;
        const cells = document.querySelectorAll(".cell");

        for(let i=0; i<board.length; i++) {
            board[i] = '';
            cells[i].textContent = '';
            cells[i].classList.remove('winning-line');
        }
        playerXnameInput.value = '';
        playerOnameInput.value = '';
        winnerInfo.textContent = '';
        whoStartGameInfo.textContent = '';
    }

    const clearButton = document.querySelector('.clear-board');
    clearButton.addEventListener('click', clearBoard);

    return {fillCells}
})()

playGame.fillCells()

