
class gameboard {
    constructor(self, name, board, hits, hidden_board, ship_value, MissesAndHits=[]) {
        this.name = name
        this.board = board
        this.hits = hits
        this.hidden_board = hidden_board
        this.MissesAndHits = MissesAndHits
        this.ship_value = ship_value

    }
}

player_board_id = document.getElementById('player_board')


function create_board(board_id) {
    



    return board
}



var create_grid_number = 101


function create_new_grid() {
    while (create_grid_number > 1) {
        createGrid()
        create_grid_number -= 1 
        }
    }




function createGrid() {
    var div = document.createElement("div");
    div.className = "cell"
    document.getElementById("#grid-container").appendChild(div)
}



create_new_grid(player_board_id)


// def game(): #starts and manages the game
//     turn = 0
//     gameover = False
//     current_turn = "player"
//     player_board = gameboard("player", create_board(0, 10), 0, None, 4)
//     computer_board = gameboard("computer", create_board(0, 10), 0, create_board("?", 10), 5)
//     computer_board.board = place_ships_randomly_on_board(computer_board.board, [3,2])

//     print_board(player_board.board)
//     player_board.board = pick_ship_location(player_board.board, [4])

//     while gameover == False:
//         gameover = check_for_winner(player_board) #handles the players turn
//         if current_turn == "player" and gameover == False:
//             print("current turn: " + str(turn))
//             print(player_board.name + " turn")
//             attack(computer_board)
//             current_turn = "computer"
//             turn += 1


//         gameover = check_for_winner(computer_board) #handles the computers turn
//         if current_turn == "computer" and gameover == False:
//             print("current turn: " + str(turn))
//             computer_attack(player_board)
//             current_turn = "player"
//             turn += 1
