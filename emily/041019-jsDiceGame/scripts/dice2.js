/*
Game Rules:

- the game has 2 players, they play in rounds
- Each turn the active player can roll as many times as they want and teh score is tallied to current score
- IF the active player rolls a 1 the current score is lost AND the next player becomes the active player
- each player has ability to 'hold' their score - which means that the current score total is added to total score and play passes to next player
- the winner is the first player to reach 100 points with their total score (global score)

-- we need to track: scores (global score, round score), active player, dice

*/

var scores, roundScore, activePlayer;

scores = [0,0];
roundScore = 0;
activePlayer = 0;

// --------------- global reset -----------
// hide the dice initially
document.querySelector('.dice').style.display = 'none';

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

// roll button
document.querySelector('.btn-roll').addEventListener('click', function(){
    let dice = Math.ceil(Math.random()*6); /* Math.floor(Math.random()*6)+1; */
    let diceDom = document.querySelector('.dice');
    console.log(diceDom);
    console.log(dice);
    
    // display the dice
    diceDom.style.display = 'block';
    diceDom.src = 'images/dice-' + dice + '.png';
    
    // update the roundScore if not 1
    if (dice != 1) { // (dice>1)
        roundScore += dice;
        //curent score of active player
        document.querySelector('#current-'+activePlayer).textContent = roundScore;
    } else {
        /*
        document.querySelector('#current-'+activePlayer).textContent = 0;
        
        // if a 1 is rolled: set roundScore =0, activePlayer = 1;
        activePlayer == 0 ? activePlayer = 1 : activePlayer = 0; // if activePlayer is 0 then activePlayer should be 1 else activePlayer is 0
        roundScore = 0;
        
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        */
        nextPlayer();
    } 
}) // end btn-roll

// hold button
document.querySelector('.btn-hold').addEventListener('click', function(){
    // transfer current score to global score
    scores[activePlayer] +=  roundScore;
    console.log(scores);
    // DOM manipulation, update the UI
    document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
    
    if(scores[activePlayer]>=20){
        document.querySelector('#name-'+activePlayer).textContent = 'Winner!'; // change text of player1/2 to winner
        document.querySelector('.dice').style.display = 'none'; // hide dice
        document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
        document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
        document.getElementById('current-'+activePlayer).textContent = '0';
    } else {
        nextPlayer();
        document.querySelector('.dice').style.display = 'none';
        
    }
}) // end btn-hold

function nextPlayer(){
    document.getElementById('current-'+activePlayer).textContent = '0';
    activePlayer == 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}






