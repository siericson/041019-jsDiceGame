/*
Game Rules:

-The game has 2 players, they play in rounds
-Each turn the active player can roll as many times as they want and the score is tallied to curent score
-If the active player rolls a 1 the current score is lost AND the next player becomes the active player
-Each player has ability to 'hold' their score - which means that the curent score total is added to total score and play passes to next player
-The winner is the first player to reach 100 points with their total score (global score)

-We need to track: scores (global score, round score), active player,
*/

var scores, roundScore, activePlayer, dice;

init();

// Roll dice button
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying){
        let dice1 = Math.ceil(Math.random()*6);
        let dice2 = Math.ceil(Math.random()*6);

        // display the dice
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'images/dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'images/dice-' + dice2 + '.png';

        // update the roundScore if not 1
        if (dice1 != 1 && dice2 != 1) {
            roundScore += dice1 + dice2;
            // current score of active player
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        } 
    }
}) // end btn-roll

// Hold button
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying){
        // transfer current score to global score
        scores[activePlayer] += roundScore;
        // DOM manipulation, update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        if(scores[activePlayer]>=20) {
            document.querySelector('#name-' + activePlayer).textContent = 'Mac Daddy!';
            
            document.querySelector('#dice-1').style.display = 'none';
            document.querySelector('#dice-2').style.display = 'none';
            document.querySelector('.btn-roll').style.display = 'none';
            document.querySelector('.btn-hold').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.getElementById('current-' + activePlayer).textContent = '0';
            gamePlaying = false;
            
        } else {
            nextPlayer();
            document.querySelector('#dice-1').style.display = 'none';
            document.querySelector('#dice-2').style.display = 'none';

        }
    }
}) // end btn-hold

// New game button
document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
        document.getElementById('current-' + activePlayer).textContent = '0';
        activePlayer == 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
    
        document.querySelector('#dice-1').style.display = 'none';
        document.querySelector('#dice-2').style.display = 'none';
}

function init() {
    scores = [0,0]; // resets totals scores to zero
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    document.querySelector('#dice-1').style.display = 'none'; // hide dice
    document.querySelector('#dice-2').style.display = 'none'; // hide dice
    document.querySelector('.btn-roll').style.display = 'block';
    document.querySelector('.btn-hold').style.display = 'block';
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active');
    
    document.querySelector('.player-0-panel').classList.add('active');
    
 
}










