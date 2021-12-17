//accepts two dimensional array
//returns coordinates
function solve(maze){
    console.log(maze);
    let zeroPos=findBlankCord(maze);
    for(let depth=1;;depth++){
        let soln = solveIterativeDeepningDFS(maze,[],zeroPos,depth);
        if(soln)return soln;
    }
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

function isSolved(maze){
    for(let i=maze.length-1,prev=Number.MAX_VALUE;i>=0;i--){
        for(let j=maze[i].length-1;j>=0;j--){
            if(maze[i][j]>prev)return false;
            prev=maze[i][j];
        }
    }
    return true;
}

function solveIterativeDeepningDFS(maze,moves,blankCord,maxDepth,depth=1){
    if(maxDepth<depth)return false;
    else{
        if(maxDepth===depth&&isSolved(maze))return moves;
        else{
            let availMoves=availableMoves(blankCord,maze[0].length,maze.length);
            for(let amove of availMoves){
                moves.push(amove);
                let soln = solveIterativeDeepningDFS(_move(maze,blankCord,amove), moves,amove, maxDepth, depth+1);
                if(soln)return soln;
                moves.pop();
            }
        }
    }
}