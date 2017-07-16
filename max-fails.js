// Calculates from the website values. Based on whole balance/
// NOTE: Martingale is a bad idea! Consider using other strategies.
(function() {
    'use strict';

    var domBonus = document.querySelector('#bonus_account_balance');
    var maxBet = Number.parseFloat(document.querySelector('#balance').innerHTML);
    var baseBet = Number.parseFloat(document.querySelector('.auto_bet_base_bet_value').value);
    var bonus =  Number.parseFloat(domBonus ? domBonus.innerHTML.split(' ')[0] : '0');
    var betOdds = Number.parseFloat(document.querySelector('#autobet_bet_odds').value);

    if (!isNaN(bonus)) {
         maxBet += bonus;
    }

    console.log('Total coins:', maxBet);

    for (i = 1; maxBet > 0; i++) {
        maxBet -= baseBet;
        console.log('#' + i, ":", baseBet.toFixed(8));
        baseBet *= betOdds;
    }

    console.info('MAX FAIL ROLLS: ' + i);
    return i;
}) ();