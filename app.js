(function() {
    // Игра крестики-нолики
    // Первым ходит пользователь
    // todo: проверка правила на каждый ход игрока
    // todo: стили

    var board = new Array(9)
    var cells = document.getElementById('board').querySelectorAll('td')

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

    var playTurn = function() {
        // Ход противника состоит из одного из вариантов:
        // - проверить, что у противника непоследний ход, иначе заблокировать
        // - найти свой символ и попробовать продолжить
        // - или найти свободные трешки, поставить крестик
        // - если нет продолжения, поставить рандомно

        if (isBoardEmpty()) {
            alert('Game over')
        } else {
            while(1) {
                var index = generateRandomIndex()

                if (!board[index]) {
                    board[index] = '0'
                    cells[index].innerHTML = '0'
                    break
                }
            }
        }
    }

    cells.forEach(function(cell) {
        cell.addEventListener('click', function() {
            if (!cell.innerHTML) {
                board[Number(cell.id) - 1] = 'X'
                cell.innerHTML = 'X'
            }

            playTurn()
        })
    })

})()