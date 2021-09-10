const range = (start, end) => Array.from({length: (end - start)}, (v, k) => k + start);


class gameboard {
    constructor(name, ship_list, div_board=[], board=[], hits=0, ship_value=7, MissesAndHits=[], div_board_unlocked=false) {
        this.name = name
        this.div_board = div_board
        this.board = board
        this.hits = hits
        this.MissesAndHits = MissesAndHits
        this.ship_value = ship_value
        this.div_board_unlocked = div_board_unlocked
        this.ship_list = ship_list

    }
}


class game {
    constructor(gameover=false, current_turn="player", computer_gameboard, player_gameboard, ships_placed=false) {
        this.gameover = gameover
        this.current_turn = current_turn
        this.computer_gameboard = computer_gameboard
        this.player_gameboard = player_gameboard
        this.ships_placed = ships_placed
    }

}


function game_setup() {
    game_variables = new game()
    game_variables.computer_gameboard = new gameboard("computer")
    game_variables.player_gameboard = new gameboard("player")
    create_board(game_variables.player_gameboard, "#player-grid-container", "player")
    create_board(game_variables.computer_gameboard, "#computer-grid-container", "computer")
    game_variables.player_gameboard.board = create_gameboard()
    game_variables.computer_gameboard.board = create_gameboard()
    game_variables.player_gameboard.ship_list = [3, 4]
    game_variables.computer_gameboard.ship_list = [4, 3]
    game_variables.player_gameboard.ships_placed = false
    place_ships_randomly_on_board()


}


function game_manager() {
    if (game_variables.gameover == true) {
        console.log("gameover")
    }


    if (game_variables.player_gameboard.ship_value == game_variables.player_gameboard.hits) {
        document.getElementById("status_text").innerText = "computer has won!"
        game_variables.gameover = true
    }


    if (game_variables.computer_gameboard.ship_value == game_variables.computer_gameboard.hits) {
        document.getElementById("status_text").innerText = "player has won!"
        game_variables.gameover = true
    }


    if (game_variables.current_turn == "player" && game_variables.gameover == false) {
        document.getElementById("status_text").innerText = "player turn"
    }

    if (game_variables.current_turn == "computer" && game_variables.gameover == false) {
        document.getElementById("status_text").innerText = "computer turn"
        computer_attack()
        game_variables.current_turn = "player"
    }


    setTimeout(game_manager, 1)
}


function create_board(gameboard, board_id, board_name) {
    let arrays = 10
    while (arrays > 0) {
        let array_count = 10
        let b = []
        while (array_count > 0) {
            var div = document.createElement("button");
            div.className = "cell"
            if (game_variables.ships_placed == false && gameboard.name == "player") {
                div.addEventListener("click", place_player_ships);
            }
            if (board_name == "computer") {
                div.addEventListener("click", grid_tile_hit);
            }
            document.getElementById(board_id).appendChild(div)
            array_count -= 1 
            b.push(div)
            }
        arrays -= 1
        gameboard.div_board.push(b)
        }
    }


function place_player_ships() {
    get_tile_index.call(this)
}


function create_gameboard() {
    let grid = []
    i = []
    for (i in range(0, 10)){
        grid.push([])
        for (b in range(0, 10)) {
            grid[i].push(0)
        }
    }

    return grid
    }


function create_new_grid(grid_id) {
    var create_grid_number = 100
    while (create_grid_number > 0) {
        createGrid(grid_id)
        create_grid_number -= 1 
        }
    }


function place_ships_randomly_on_board(){
    let correct_x_y = false
    while (correct_x_y == false && game_variables.player_gameboard.ships_placed == false){
        let x = generateRandomInteger(1, 9)
        let y = generateRandomInteger(1, 9)
        if (y < 10 && x+game_variables.computer_gameboard.ship_list[0] < 10 && y > -1 && x > -1) {
            if (game_variables.computer_gameboard.board[y][x] != 2){
                if ( game_variables.computer_gameboard.ship_list != []) {
                    place_computer_ship(y, x, game_variables.computer_gameboard.ship_list[0])
                    game_variables.computer_gameboard.ship_list.shift();
                    if (game_variables.computer_gameboard.ship_list.length == 0) {
                        correct_x_y = true
                    }
                }
            }
        }
    }    
}


function computer_attack(){
    let move_tried = false
    let correct_x_y = false
    
    while (correct_x_y == false){
        let x = generateRandomInteger(0, 9)
        let y = generateRandomInteger(0, 9)
        game_variables.player_gameboard.MissesAndHits.forEach(element => {
            if (element[0] == x && element[1] == y){
                move_tried == true
            } 
        });

        if (move_tried == false && game_variables.player_gameboard.board[y][x] == 2 && game_variables.player_gameboard.div_board[y][x].className != "tile_hit" && game_variables.player_gameboard.div_board[y][x].className != "tile_miss") {
            game_variables.player_gameboard.div_board[y][x].className = "tile_hit"
            game_variables.player_gameboard.MissesAndHits.push([x, y])
            game_variables.player_gameboard.hits += 1
            correct_x_y = true
        }

        if (move_tried == false && game_variables.player_gameboard.board[y][x] == 0 && game_variables.player_gameboard.div_board[y][x].className != "tile_hit" && game_variables.player_gameboard.div_board[y][x].className != "tile_miss") {
            game_variables.player_gameboard.div_board[y][x].className = "tile_miss"
            game_variables.player_gameboard.MissesAndHits.push([x, y])
            correct_x_y = true
        }

    }
    
}


function place_computer_ship(y, x, ship) { 
    length = ship
    game_variables.computer_gameboard.board[y-1][x] = 2;
    if (length > 1){
        game_variables.computer_gameboard.board[y-1][x+1] = 2;
    }
        if (length > 2){
            game_variables.computer_gameboard.board[y-1][x+2] = 2;
        }
            if (length > 3){
                game_variables.computer_gameboard.board[y-1][x+3] = 2;
            }
                if (length > 4){
                    game_variables.computer_gameboard.board[y-1][x+4] = 2;
                }
}


function generateRandomInteger(min, max) {
    return Math.floor(min + Math.random()*(max + 1 - min))
    }


function place_ship(x, y, board, ship) { 
    length = ship
    let b = board[y-1][x]
    b.className = "ship_tile"
    game_variables.player_gameboard.board[y-1][x] = 2
    if (length > 1){
       let a = board[y-1][x+1]
       game_variables.player_gameboard.board[y-1][x+1] = 2
       a.className = "ship_tile"
    }
        if (length > 2){
           let b = board[y-1][x+2]
           game_variables.player_gameboard.board[y-1][x+2] = 2
           b.className = "ship_tile"
        }
            if (length > 3){
               let c = board[y-1][x+3]
               game_variables.player_gameboard.board[y-1][x+3] = 2
               c.className = "ship_tile"
            }

                if (length > 4){
                    let c = board[y-1][x+4]
                    game_variables.player_gameboard.board[y-1][x+4] = 2
                    c.className = "ship_tile"
                }
}


function grid_tile_hit() {
    if (game_variables.current_turn == "player" && game_variables.player_gameboard.ships_placed == true) {
        let x = get_computer_tile_index.call(this)
        //console.log(x[0], x[1] + " cords")
        if (game_variables.computer_gameboard.board[x[0]][x[1]] != "X") {
            if (game_variables.computer_gameboard.board[x[0]][x[1]] == 2){
                this.className = "tile_hit"
                game_variables.current_turn = "computer"
                game_variables.computer_gameboard.hits += 1
            }
            if (game_variables.computer_gameboard.board[x[0]][x[1]] == 0) {
                this.className = "tile_miss"
                game_variables.current_turn = "computer"
            }
        }
    }
}


function get_tile_index() {
    let x = game_variables.player_gameboard.div_board.indexOf(this)
    let index_y = 0
    while (x == -1) {
        x = game_variables.player_gameboard.div_board[index_y].indexOf(this)
        index_y += 1
    }
    if (game_variables.player_gameboard.ships_placed == false) {
        pick_ship_location(game_variables.player_gameboard.div_board, x, index_y-1) 
    }
    console.log(index_y-1, + " " + x)
}


function get_computer_tile_index() {
    let x = game_variables.computer_gameboard.div_board.indexOf(this)
    let index_y = 0
    while (x == -1) {
        x = game_variables.computer_gameboard.div_board[index_y].indexOf(this)
        index_y += 1
    }
    return [index_y-1, x]
}


function pick_ship_location(board, x, y) {
    let ship_list = game_variables.player_gameboard.ship_list 
    let correct_x_y = false
    while (correct_x_y == false){
        if (y < 10 && x+ship_list[0] < 10 && y > -1 && x > -1){
            if (board[y][x].className != "ship_tile"){
                if (ship_list != []){
                    board = place_ship(x, y+1, board, ship_list[0])
                    game_variables.player_gameboard.ship_list.shift();
                }
                    if (game_variables.player_gameboard.ship_list.length == 0){
                        game_variables.player_gameboard.ships_placed = true
                        correct_x_y = true
                        game_manager()
                    }
                
            else
                return null
            }
    }
    return board
    }
}

