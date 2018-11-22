(function() {
    // Игра крестики-нолики
    // todo: подсветить выигрышную комбинацию

    var board = new Array(9)
    var cells = document.getElementById('board').querySelectorAll('td')
    var gameOver = false

    var generateRandomIndex = function() {
        return Math.floor(Math.random() * 9)
    }

    var isBoardEmpty = function() {
        var counter = 0

        board.forEach(function(cell) {
            if (cell) {
                ++counter
            }
        })

        return counter === board.length
    }

    /**
     * @returns {Number} X is 1, 0 is 0, -1 is standoff
     */
    var checkRules = function() {
        var directions = {
            up: [0, 1, 2],
            bottom: [6, 7, 8],
            left: [0, 3, 6],
            right: [2, 5, 8],
            diagLR: [0, 4, 8],
            diagRL: [2, 4, 6],
            vertical: [1, 4, 7],
            horizontal: [3, 4, 5]
        }

        for (direction in directions) {
            var counterX = 0;
            var counter0 = 0;

            directions[direction].forEach(function(index) {
                if (board[index] === 'X') {
                    counterX++
                } else if (board[index] === '0') {
                    counter0++
                }
            })

            if (counterX === 3) {
                return 1
            } else if (counter0 === 3) {
                return 0
            }
        }

        return -1
    }

    var setMessage = function() {
        var code = checkRules()
        var message = 'Standoff'

        if (code === 1) {
            message = 'X won'
        } else if (code === 0) {
            message = '0 won'
        }

        document.getElementById('message').innerHTML = message
    }

    var playTurn = function() {
        // Ход противника состоит из одного из вариантов:
        // - проверить, что у противника непоследний ход, иначе заблокировать
        // - найти свой символ и попробовать продолжить
        // - или найти свободные трешки, поставить крестик
        // - если нет продолжения, поставить рандомно (x)

        if (isBoardEmpty()) {
            gameOver = true
            setMessage()
        } else {
            while(1) {
                var index = generateRandomIndex()

                if (!board[index]) {
                    board[index] = '0'
                    cells[index].innerHTML = '0'

                    var result = checkRules()

                    if (result === 0 || result === 1) {
                        setMessage()
                    }

                    break
                }
            }
        }
    }

    cells.forEach(function(cell) {
        cell.addEventListener('click', function() {
            if (!cell.innerHTML && gameOver === false) {
                board[Number(cell.id) - 1] = 'X'
                cell.innerHTML = 'X'

                var result = checkRules()
                if (result === -1) {
                    playTurn()
                } else {
                    setMessage()
                    gameOver = true
                }
            }
        })
    })

})()