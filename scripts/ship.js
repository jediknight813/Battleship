function create_ship(length, postion) {
    //pass
}


class ship {
    constructor(length, postion) {
        this.postion = postion;
        this.length = length;
    }


    get_length() {
        return this.length
    }


    get_postion() {
        return this.postion;
    }


}


const new_ship = new ship(4, [{A : 1}]);


console.log(new_ship.length);

