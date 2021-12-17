
let state=[[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,Number.MAX_VALUE]];
let zeroPos={x:3,y:3};

function render(state){
    for(let i=0;i<state.length;i++){
        for(let j=0;j<state[i].length;j++){
            $(`#tile${state[i][j]}`).css({top:100*i+"px",left:100*j+"px"});
        }
    }
}
function shuffle(){
    let moves=[];
    let zPos=zeroPos;
    for(let i =0; i<100;i++){
        zPos=chooseRandom(zPos);
        moves.push(zPos);
    }
    groupMove(moves,2000);
}
function move(init,target,afterMov,duration=200){
    let temp = state[target.x][target.y];
    state[target.x][target.y]=Number.MAX_VALUE;
    state[init.x][init.y]=temp;
    zeroPos=target;
    moveDom(init,afterMov,duration);
}
function moveDom(init,afterMov,duration){
    $(`#tile${state[init.x][init.y]}`).animate({top:100*init.x+"px",left:100*init.y+"px"},duration,afterMov);
}
function findPos(value){
    for(let i=0; i<4; i++){
        for(let j=0;j<4;j++){
            if(state[i][j]==value)return {x:i,y:j};
        }
    }
}
function chooseRandom(zPos){
    let choices = [];
    if(zPos.x>0)choices.push({y:zPos.y,x:zPos.x-1});
    if (zPos.x<3)choices.push({y:zPos.y,x:zPos.x+1});
    if(zPos.y>0)choices.push({x:zPos.x,y:zPos.y-1});
    if(zPos.y<3)choices.push({x:zPos.x,y:zPos.y+1});
    
    return choices[Math.floor(choices.length*Math.random())];

}
init = function() {
    var puzzleArea = document.getElementById('puzzlearea');
    var divs = puzzleArea.getElementsByTagName("div");
      
    // initialize each piece
    for (var i=0; i< divs.length; i++) {
        var div = divs[i];
        
        // calculate x and y for this piece
        var x = ((i % 4) * 100) ;
        var y = (Math.floor(i / 4) * 100) ;

        // set basic style and background
        div.className = "puzzlepiece";
        div.style.left = x + 'px';
        div.style.top = y + 'px';
        div.style.backgroundImage = 'url("background.jpg")';
        div.style.backgroundPosition = -x + 'px ' + (-y) + 'px';
        
        // store x and y for later
        div.x = x;
        div.y = y; 
    }        
};
function areNeighbors(x,y){
    if(x.x==y.x&&Math.abs(x.y-y.y)==1)return true;
    else if(x.y==y.y&&Math.abs(x.x-y.x)==1)return true;
    return false;
}
function groupMove(solution,totalDuration){
    let single = totalDuration/solution.length;
    function doMove(){
        if(solution.length){
            move(zeroPos,solution.shift(),doMove,single);
        }
    }
    doMove();
}
$(function(){
    init();
    $("#shufflebutton").click(()=>{
        shuffle();
    });

    $(".puzzlepiece").click(function(){
        let pos = findPos(parseInt($(this).attr("id").substring(4)));
        if(areNeighbors(zeroPos,pos)){
            move(zeroPos,pos)
        }
    });
    $(".puzzlepiece").hover(function(){
        let pos = findPos(parseInt($(this).attr("id").substring(4)));
        if(areNeighbors(zeroPos,pos)){
            $(this).toggleClass("movablepiece");
        }
    });

    $("#solveButton").click(function(){
        let solution = solve(state);
        groupMove(solution,200*solution.length);
    })
});