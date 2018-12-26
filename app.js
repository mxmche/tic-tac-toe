(function() {
    var board = new Array(9)
    var cells = []
    var gameOver = false
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

    var isBoardFilled = function() {
        var counter = 0

        for (var i = 0; i < board.length; i++) {
            if (board[i]) {
                counter++
            }
        }

        return counter === board.length
    }

    /**
     * @returns {Number} X is 1, 0 is 0, -1 is standoff
     */
    var checkRules = function() {
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

    var showMessage = function(code) {
        var message = 'Ничья'

        if (code === 1) {
            message = 'X выиграли'
        } else if (code === 0) {
            message = '0 выиграли'
        }

        alert(message)
    }

    /**
     * @param {Number*} index Index of cell
     * @param {String} symbol X or 0 symbol
     */
    var paintCell = function(index, symbol) {
        board[index] = symbol
        cells[index].innerHTML = symbol
    }

    var playTurn = function() {

        // найти свой символ и попробовать продолжить
        for (name in directions) {
            var indexes = directions[name]

            // Сначала найти свои двойки
            var countX = 0
            var hasEmptyCell = -1
            indexes.forEach(function(index) {
                if (board[index] === '0') {
                    ++countX
                } else if (!board[index]) {
                    hasEmptyCell = index
                }
            })

            if (countX === 2 && hasEmptyCell !== -1) {
                paintCell(hasEmptyCell, '0')
                return
            }

            if (indexes[0] === 'X') {
                if (!indexes[1]) {
                    paintCell(1, 'X')
                    return
                } else if (!indexes[2]) {
                    paintCell(2, 'X')
                    return
                }
            } else if (indexes[1] === 'X') {
                if (!indexes[0]) {
                    paintCell(0, 'X')
                    return
                } else if (!indexes[2]) {
                    paintCell(2, 'X')
                    return
                }
            } else if (indexes[2] === 'X') {
                if (!indexes[0]) {
                    paintCell(0, 'X')
                    return
                } else if (!indexes[1]) {
                    paintCell(1, 'X')
                    return
                }
            }
        }

        // проверить, что у противника непоследний ход, иначе заблокировать
        for (name in directions) {
            var indexes = directions[name]
            var counter = 0
            var hasEmptyCell = -1

            // count turns in all directions
            indexes.forEach(function(index) {
                if (board[index] === 'X') {
                    ++counter
                } else if (!board[index]) {
                    hasEmptyCell = index
                }
            })

            if (counter === 2 && hasEmptyCell !== -1) {
                // заблокировать свободную клетку противнику
                paintCell(hasEmptyCell, '0')
                return
            }
        }

        // или найти свободные трешки, поставить крестик
        for (var i = 0; i < board.length; i++) {
            if (!board[i]) {
                paintCell(i, '0')
                return
            }
        }
    }

    function init() {
        var body = document.getElementsByTagName('body')[0]
        var table = document.createElement('table')
        var id = 1

        table.id = 'board'
        table.setAttribute('border', '1')

        for (var i = 0; i < 3; i++) {

            var tr = document.createElement('tr')

            for (var j = 0; j < 3; j++) {
                var td = document.createElement('td')
                td.id = id
                tr.appendChild(td)
                id++
            }

            table.appendChild(tr)
        }

        body.appendChild(table)
    }

    init()

    cells = document.getElementById('board').querySelectorAll('td')

    cells.forEach(function(cell) {
        cell.addEventListener('click', function() {
            if (!cell.innerHTML && gameOver === false) {
                paintCell(Number(cell.id) - 1, 'X')
    
                var result = checkRules()
    
                if (result === -1) {
                    playTurn()
    
                    var result = checkRules()
    
                    if (result === 0 || result === 1) {
                        showMessage(result)
                    } else if (isBoardFilled()) {
                        showMessage(result)
                    }
                } else {
                    showMessage(result)
                    gameOver = true
                }
            }
        })
    })

})()