//const PriorityQueue = require("./TinyQueue");

function estimate(maze){
    let sum = 0;
    for(let i=0;i<maze.length;i++){
        for(let j=0;j<maze[i].length;j++){
            if(maze[i][j]!=Number.MAX_VALUE)
                sum+=calculateDistManhatan({x:i,y:j},coordinate(maze[i][j]));
        }
    }
    return sum;
}
function estimatell(maze){
    let sum = 0;
    for(let i=0;i<maze.length;i++){
        for(let j=0;j<maze[i].length;j++){
            if(maze[i][j]!=Number.MAX_VALUE)
                sum+=calculateDistManhatan({x:i,y:j},coordinate(maze[i][j]));
        }
    }
    return sum;
}
function calculateDistManhatan(p1, p2){
    return Math.abs(p1.x-p2.x)+Math.abs(p2.y-p1.y);
}
function coordinate(number){
    return {x:Math.ceil(number/4)-1,y:(number-1)%4};
}


function findBlankCord(maze){
    for(let i=0;i<maze.length;i++){
        for(let j=0;j<maze[i].length;j++){
            if(maze[i][j]==Number.MAX_VALUE)return {x:i,y:j};
        }
    }
}
function _move(maze, pieceCord, targetCord){
    maze=clone(maze);
    maze[pieceCord.x][pieceCord.y]=maze[targetCord.x][targetCord.y];
    maze[targetCord.x][targetCord.y]=Number.MAX_VALUE;
    return maze;
}
function clone(maze){
    return maze.map(oned=>oned.map(e=>e));
}
function availableMoves(blankCord, width, height){
    let moves = [];
    if(blankCord.x<height-1)moves.push({x:blankCord.x+1,y:blankCord.y});
    if(blankCord.x>0)moves.push({x:blankCord.x-1,y:blankCord.y});
    if(blankCord.y<width-1)moves.push({x:blankCord.x,y:blankCord.y+1});
    if(blankCord.y>0)moves.push({x:blankCord.x,y:blankCord.y-1});
    return moves;
}
function solve(maze){
    let pQueue = new TinyQueue([{blankCord:findBlankCord(maze),path:[],cost:0,costToTarget:estimate(maze),snapshot:maze}],
                                    (a,b)=>(a.costToTarget+a.cost)-(b.costToTarget+b.cost));
    let visited = new Set();

    do{
        let current=pQueue.pop();
        visited.add(JSON.stringify(current.snapshot));
        if(current.costToTarget==0)return current.path;

        let avail = availableMoves(current.blankCord, maze[0].length,maze.length);
        
        for(e of avail){
            let mazeClone = _move(current.snapshot,current.blankCord,e);
            if(visited.has(JSON.stringify(mazeClone)))continue;
            pQueue.push({blankCord:e,path:[...current.path,e],cost:current.cost+1,costToTarget:estimate(mazeClone),snapshot:mazeClone});
        }
    }
    while(true);
}

