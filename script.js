let EMPTY = "";
let boxes = [];
let playerSymbol = "X";
let compSymbol = "O";
let playerTurn;
let moves;

const getFieldSize = () => {
    let number = Number(document.getElementById("input").value);

    if (number < 3 || number > 100) {
        document.getElementById("message").style.display='block'
    } else {
        document.getElementById("btn").disabled = true;
        document.getElementById("message").style.display='none';
        return number;
    }
};

const drawField = () => {
    const board = document.createElement('table');

    let identifier = 1;

    for (let i = 0; i < getFieldSize(); i++) {
        let row = document.createElement('tr');
        board.appendChild(row);

        for (let j = 0; j < getFieldSize(); j++) {
            let cell = document.createElement('td');
            row.appendChild(cell);
            cell.classList.add('col-' + j,'row-' + i);

            if (i === j) {
                cell.classList.add('diagonal-left-right');
            }

            if (j === getFieldSize() - i - 1) {
                cell.classList.add('diagonal-right-left');
            }

            cell.identifier = identifier;
            cell.addEventListener("click", step);
            row.appendChild(cell);
            boxes.push(cell);
            identifier += identifier;
        }
    }
    document.getElementById("tictactoe").appendChild(board);
    startNewGame();
};

const startNewGame = () => {
    moves = 0;
    playerTurn = true;
    boxes.forEach(function (square) {
        square.innerHTML = EMPTY;
    });
};

function step() {
    if (playerTurn) {
        if (set(this)) {
            if (win(this)) {
                document.getElementById("modal").style.display='block';
                document.getElementById("playerWin").style.display='block';
            }
            playerTurn = false;
        }
    } else {
        if (win(computerTurn())) {
            document.getElementById("modal").style.display='block';
            document.getElementById("computerWin").style.display='block';
        }
        playerTurn = true;
    }
    moves += 1;
    if (moves === getFieldSize() * getFieldSize()) {
        document.getElementById("modal").style.display='block';
        document.getElementById("draw").style.display='block';
    }
}

function set(el) {
    if (el.innerHTML !== EMPTY  ) {
        return false;
    }
    el.innerHTML = playerSymbol;
    return true;
}

function computerTurn() {
    for (let i = 0; i < getFieldSize(); i++) {
        for (let j = 0; j < getFieldSize(); j++) {
            let el = document.getElementsByClassName(`col-${i} row-${j}`)[0];
            if (el.innerHTML === EMPTY) {
                if (isOneTurnWin(el, compSymbol)) {
                    el.innerHTML = compSymbol;
                    return el;
                }
            }
        }
    }
    for (let i = 0; i < getFieldSize(); i++) {
        for (let j = 0; j < getFieldSize(); j++) {
            let el = document.getElementsByClassName(`col-${i} row-${j}`)[0];
            if (el.innerHTML === EMPTY) {
                if (isOneTurnWin(el, playerSymbol)) {
                    el.innerHTML = compSymbol;
                    return el;
                }
            }
        }
    }
    while (true) {
        let i = Math.floor(Math.random() * getFieldSize());
        let j = Math.floor(Math.random() * getFieldSize());
        let el = document.getElementsByClassName(`col-${i} row-${j}`)[0];
        if (el.innerHTML === EMPTY) {
            el.innerHTML = compSymbol;
            return el;
        }
    }
}

function isOneTurnWin(el, symbol) {
    el.innerHTML = symbol;
    if (win(el)) {
        return true;
    } else {
        el.innerHTML = EMPTY;
    }
    return false;
}

const win = (turnEl) => {
    const memberOf = turnEl.className.split(/\s+/);
    for (let i = 0; i < memberOf.length; i++) {
        let testClass = '.' + memberOf[i];
        let items = contains('#tictactoe ' + testClass, turnEl.innerHTML);
        if (items.length === getFieldSize()) {
            return true;
        }
    }
    return false;
};

const contains = (selector, text) => {
    let elements = document.querySelectorAll(selector);
    return [].filter.call(elements, function(element){
        return RegExp(text).test(element.textContent);
    });
};

const Reload = () => {
    document.location.reload(true);
};
