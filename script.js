let EMPTY = "";
let boxes = [];
let playerSymbol = "X";
let compSymbol = "O";
let playerTurn;
let moves;

//Создаем поле && проверяем введенное число на валидность && дизейблим кнопку
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


//Рисуем поле, присваиваем классы к каждой ячейке таблицы
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

//Начинаем игру TODO: сделать функционал выбора очереди
const startNewGame = () => {
    moves = 0;
    playerTurn = true;
    boxes.forEach(function (square) {
        square.innerHTML = EMPTY;
    });
};

const showModal = (winner) => {
    document.getElementById("modal").style.display='block';
    document.getElementById(winner).style.display='block';
};

//Считаем шаги, показываем модалку при выйигрыше или ничьей
function step() {
    if (playerTurn) {
        if (set(this)) {
            if (win(this)) {
                showModal("playerWin");
            }
            playerTurn = false;
        }
    } else {
        if (win(computerTurn())) {
            showModal("computerWin");
        }
        playerTurn = true;
    }
    moves += 1;
    if (moves === getFieldSize() * getFieldSize()) {
        showModal("draw");
    }
};

const set = (el) => {
    if (el.innerHTML !== EMPTY  ) {
        return false;
    }
    el.innerHTML = playerSymbol;
    return true;
};

const findEl = (x, y) =>{
    return document.getElementsByClassName(`col-${x} row-${y}`)[0];
};

const computerTurn = () => {
    //Комп проверяет может ли он выиграть
    for (let i = 0; i < getFieldSize(); i++) {
        for (let j = 0; j < getFieldSize(); j++) {
            let el = findEl(i, j);
            if (el.innerHTML === EMPTY) {
                if (winTurn(el, compSymbol)) {
                    el.innerHTML = compSymbol;
                    return el;
                }
            }
        }
    }
    //Комп проверяет может ли выиграть соперник
    for (let i = 0; i < getFieldSize(); i++) {
        for (let j = 0; j < getFieldSize(); j++) {
            let el = findEl(i, j);
            if (el.innerHTML === EMPTY) {
                if (winTurn(el, playerSymbol)) {
                    el.innerHTML = compSymbol;
                    return el;
                }
            }
        }
    }
    // Если следущим ходом никто не побеждает, комп делает ход на рандоме
    while (true) {
        let i = Math.floor(Math.random() * getFieldSize());
        let j = Math.floor(Math.random() * getFieldSize());
        let el = findEl(i, j);
        if (el.innerHTML === EMPTY) {
            el.innerHTML = compSymbol;
            return el;
        }
    }
};

//Расчет победного шага для компа
const winTurn = (el, symbol) => {
    el.innerHTML = symbol;
    if (win(el)) {
        return true;
    } else {
        el.innerHTML = EMPTY;
    }
    return false;
};

//Проверяет текущий ход на победу
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

//Возвращает массив элементов содержащих символ
const contains = (selector, symbol) => {
    let elements = document.querySelectorAll(selector);
    return [].filter.call(elements, function(element){
        return RegExp(symbol).test(element.textContent);
    });
};

//Перезагружаем окно дяя новой игры после выиграша
const Reload = () => {
    document.location.reload(true);
};
