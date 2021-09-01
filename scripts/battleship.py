from pprint import pprint
import time
import random


def game(): 
    turn = 0
    gameover = False
    current_turn = "player"
    player_board = gameboard("player", create_board(0, 10), 0, None, 4)
    computer_board = gameboard("computer", create_board(0, 10), 0, create_board("?", 10), 5)
    computer_board.board = place_ships_randomly_on_board(computer_board.board, [3,2])

    print_board(player_board.board)
    player_board.board = pick_ship_location(player_board.board, [4])

    while gameover == False:

        gameover = check_for_winner(player_board)
        if current_turn == "player" and gameover == False:
            print("current turn: " + str(turn))
            print(player_board.name + " turn")
            attack(computer_board)
            current_turn = "computer"
            turn += 1

        gameover = check_for_winner(computer_board)
        if current_turn == "computer" and gameover == False:
            print("current turn: " + str(turn))
            computer_attack(player_board)
            current_turn = "player"
            turn += 1
    

def create_board(character, size):
    grid = []
    for i in range(size):
        grid.append([])
        for b in range(size):
            grid[i].append(character)

    return grid


class gameboard():

    def __init__(self, name, board, hits, hidden_board, ship_value, MissesAndHits=[]):
         self.name = name
         self.board = board
         self.hits = hits
         self.hidden_board = hidden_board
         self.MissesAndHits = MissesAndHits
         self.ship_value = ship_value


class ship():

    def __init__(self, position, ship_type, length, placed):
        self.position = position #positon = [[1,2], [1,3], [1,4]]
        self.ship_type = ship_type #battleship
        self.length = length # 4
        self.placed =  placed
        if ship_type == "battleship":
            self.health = 4
        elif ship_type == "cruiser":
            self.health = 3
        elif ship_type == "patrol boat":
            self.health = 2

    def check_if_sunk(self):
        if self.health < 0:
            return True
        else:
            return False


    def ship_hit(self):
        self.health -= 1
    

    def is_placed(self):
        self.placed = True


def check_for_winner(gameboard):
    if int(gameboard.hits) >= int(gameboard.ship_value):
        print(gameboard.name + " has lost the game")
        return True
    else:
        return False


def pick_ship_location(board, ships):
    ship_list = ships #length of eatch ships, can add as many as you want
    correct_x_y = False
    
    while correct_x_y == False:
        x, y = get_correct_x_y()
        if y < 9 and x+ship_list[0] < 9 and y > -1 and x > -1:
            if board[y][x] != 2:
                if ship_list != []:
                    board = place_ship(x, y, board, ship_list[0])
                    ship_list.remove(ship_list[0])
                    print("place ships")
                    print_board(board)
                    if ship_list == []:
                        correct_x_y = True
            else:
                print("incorrect x, y try again")
    
    return board


def get_correct_x_y():
    correct_x_y = False
    while correct_x_y == False:
        x = input("enter x value: ")
        y = input("enter y value: ")
        if x.isdigit() == True:
            if y.isdigit() == True:
                x = int(x)
                y = int(y)
                return(x, y)



def place_ship(x, y, board, ship):
    length = ship

    board[y][x] = 2
    if length > 1:
        board[y][x+1] = 2
        if length > 2:
            board[y][x+2] = 2
            if length > 3:
                board[y][x+3] = 2

    return board



def place_ships_randomly_on_board(board, ship_list):
    correct_x_y = False

    while correct_x_y == False:
        x = random.randrange(-1, 10)
        y = random.randrange(-1, 10)
        if y < 9 and x+ship_list[0] < 9 and y > -1 and x > -1:
            if board[y][x] != 2:
                if ship_list != []:
                    board = place_ship(x, y, board, ship_list[0])
                    ship_list.remove(ship_list[0])
                    print("place ships")
                    print_board(board)
                    if ship_list == []:
                        correct_x_y = True
            else:
                print("incorrect x, y try again")
    
    return board




def computer_attack(gameboard):
    move_tried = False
    correct_x_y = False
    while correct_x_y == False:
        x = random.randrange(-1, 10)
        y = random.randrange(-1, 10)
        if y < 9 and x < 9 and y > -1 and x > -1:
            for i in gameboard.MissesAndHits:
                if i == [y, x]:
                    move_tried = True
            if gameboard.board[y][x] == 2 and move_tried == False:
                gameboard.hits += 1
                gameboard.MissesAndHits += [[y, x]]
                gameboard.board[y][x] = "X"
                correct_x_y = True
            elif move_tried == False:
                gameboard.board[y][x] = "M"
                gameboard.MissesAndHits += [[y, x]]
                correct_x_y = True


    print("computer turn")
    print_board(gameboard.board)
    time.sleep(2)


def attack(gameboard):
    move_tried = False
    correct_x_y = False

    print_board(gameboard.hidden_board)

    while correct_x_y == False:
        x, y = get_correct_x_y()
        if y < 9 and x < 9 and y > -1 and x > -1:
            for i in gameboard.MissesAndHits:
                if i == [y, x]:
                    move_tried = True
            if gameboard.board[y][x] == 2 and move_tried == False:
                gameboard.hits += 1
                gameboard.MissesAndHits += [[y, x]]
                gameboard.hidden_board[y][x] = "X"
                correct_x_y = True

            elif move_tried == False:
                gameboard.hidden_board[y][x] = "O"
                gameboard.MissesAndHits += [[y, x]]
                correct_x_y = True

            else:
                print("you already tried that attack")
                move_tried = False
                

    print("player attack")
    print_board(gameboard.hidden_board)
    time.sleep(2)


def print_board(board):
    header = len(board[0]*2)
    x = "" 
    for i in range(header):
         x += "-"

    print(x)

    for i in board:
        print (' '.join(str(n) for n in i))

    print(x)

game()

