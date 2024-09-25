function getRandomCharacter() {
    let characterString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const index = parseInt(Math.floor(Math.random() * characterString.length));
    return characterString[index];
}

function getRandomString(blockSize, numBlocks) {
    let string = "";
    for (let i = 0; i < numBlocks - 1; i++) {
        for (let j = 0; j < blockSize; j++) {
            string += getRandomCharacter();
        }
        string += "-";
    }
    for (let j = 0; j < blockSize; j++) {
        string += getRandomCharacter();
    }
    return string;
}

class Node {
    /**
     * @param {*} data
     * @param {Edge[]} edges
     */
    constructor(data, edges = []) {
        this.id = getRandomString(5, 2);
        this.data = data;
        this.edges = edges;
    }

    addEdge(edge) {
        if (edge.source.id === this.id) {
            this.edges.push(edge);
        }
    }
}

class Edge {
    /**
     * @param {Node} source
     * @param {Node} target
     * @param {*} data
     */
    constructor(source, target, data) {
        this.id = getRandomString(6, 2);
        this.source = source;
        this.target = target;
        this.data = data;
        this.source.addEdge(this);
    }
}

// const node1 = new Node("Node 1");
// const node2 = new Node("Node 2");
// const node3 = new Node("Node 3");
// const node4 = new Node("Node 4");

// const edge1 = new Edge(node1, node2, "Edge 1");
// const edge2 = new Edge(node1, node3, "Edge 2");
// const edge3 = new Edge(node2, node4, "Edge 3");

// console.log(node1);
// console.log(node2);
// console.log(node3);
// console.log(node4);

// console.log(edge1);
// console.log(edge2); 
// console.log(edge3);

class State extends Node {
    get moves() {
        return this.edges;
    }
}

class Move extends Edge {
    /**
    @param {State} source
    @param {State} target
    @param {function} fn
    */
    constructor(source, target, fn) {
        super(source, target, fn);
    }
}

class StateMachine {
    /**
     * 
     * @param {State} start 
     * @param {(x: State) => boolean} isEndState
     * @param {State[]} states 
     * @param {Move[]} moves
     */
    constructor(start, isEndState, states, moves) {
        this.start = start;
        this.isEndState = isEndState;
        this.states = states;
        this.moves = moves;
        this.currentState = start;
    }

    /**
     * @param {Move} move
     * 
     * @returns {State}
     */
    getNextState(move) {
        if(this.isEndState(this.currentState)) {
            return this.currentState;
        }
        
        return this.currentState;
    }
}

new StateMachine()