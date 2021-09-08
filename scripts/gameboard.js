player_board_id = document.getElementById('#computer-grid-container')
computer_board_id = document.getElementById('#computer-grid-container')


class gameboard {
    constructor(name, div_board=[], board=[], hits=0, hidden_board=[], ship_value=10, MissesAndHits=[], div_board_unlocked=false) {
        this.name = name
        this.div_board = div_board
        this.board = board
        this.hits = hits
        this.hidden_board = hidden_board
        this.MissesAndHits = MissesAndHits
        this.ship_value = ship_value
        this.div_board_unlocked = div_board_unlocked

    }
}

class game {
    constructor(gameover, current_turn, computer_gameboard, player_gameboard) {
        this.gameover = gameover
        this.current_turn = current_turn
        this.computer_gameboard = computer_gameboard
        this.player_gameboard = player_gameboard
    }

}


function game_manager() {
    game_variables = new game()
    game_variables.computer_board = new gameboard("computer")
    game_variables.player_board = new gameboard("player")
    create_board(game_variables.player_board, "#player-grid-container")
    create_board(game_variables.computer_board, "#computer-grid-container")

    console.log(game_variables.player_board.div_board)

}



function create_board(gameboard, board_id) {
    let arrays = 10
    while (arrays > 0) {
        let array_count = 10
        let b = []
        while (array_count > 0) {
            var div = document.createElement("button");
            div.className = "cell"
            div.addEventListener("click", grid_tile_hit);
            document.getElementById(board_id).appendChild(div)
            array_count -= 1 
            b.push(div)
            }
        arrays -= 1
        gameboard.div_board.push(b)
        }
    }


function create_new_grid(grid_id) {
    var create_grid_number = 100
    while (create_grid_number > 0) {
        createGrid(grid_id)
        create_grid_number -= 1 
        }
    }


function grid_tile_hit() {
    this.className = "tile_hit"
    get_tile_index.call(this)
}

function get_tile_index(tile) {
    let x = player_board.indexOf(this)
    let index_y = 0
    while (x == -1) {
        x = player_board[index_y].indexOf(this)
        index_y += 1
    }
    console.log(index_y, + " " + x )
}

