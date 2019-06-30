let EMPTY = "";
let boxes = [];
let turn;
let score;
let moves;

const getFieldSize = () => {
    return Number(document.getElementById("input").value);
};

const drawField = () => {
    const board = document.createElement('table');
    document.getElementById("btn").disabled = true;

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
    score = {
        "X": 0,
        "O": 0
    };
    moves = 0;
    turn = "X";
    boxes.forEach(function (square) {
        square.innerHTML = EMPTY;
    });
};

const win = (clicked) => {
    const memberOf = clicked.className.split(/\s+/);
    for (let i = 0; i < memberOf.length; i++) {
        let testClass = '.' + memberOf[i];
        let items = contains('#tictactoe ' + testClass, turn);

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

function step() {
    if (turn === "X") {
        set(this);
        computerTurn();
        moves += 2;
    }
};

function computerTurn() {
    let flag = true;
    while (flag) {
        let i = Math.floor(Math.random() * getFieldSize());
        let j = Math.floor(Math.random() * getFieldSize());
        let el = document.getElementsByClassName(`col-${i} row-${j}`)[0];
        if (el.innerHTML === EMPTY) {
            el.innerHTML = turn;
            flag = false;
        }
    }
    turn = "X";
};

function set(el) {
    if (el.innerHTML !== EMPTY  ) {
        return;
    }
    el.innerHTML = turn;
    if (win(el)) {
        alert('Winner: Player ' + turn);
        startNewGame();
    } else if (moves === getFieldSize() * getFieldSize()) {
        alert("Draw");
        startNewGame();
    } else {
        turn = "O";
    }
}
