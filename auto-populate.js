(function() {
    'use strict';

    var faucets = {
        bitcoin: {
            baseBet: 0.00000002,
            maxBet: 20,
            betOdds: 2,
            totalRolls: 999999,
            betOn: 'lo', // hi, lo, alt
            stopProfit: 0,
            stopLoss: 0.00001000,
            randomizeClientSeed: true,
            doNotRefresh: true,
            enableSounds: false,
            disableJackpot: true,
            hittingMaxBet: {
                returnToBase: false,
                stopBetting: false
            },
            onWin: {
                returnToBase: true,
                increaseBetBy: 0,
                changeOddsTo: 5 // 0 to disable
            },
            onLose: {
                returnToBase: false,
                increaseBetBy: 0.3,
                changeOddsTo: 5 // 0 to disable
            }
        },
        dogecoin: {
            baseBet: 0.02,
            maxBet: 900000,
            betOdds: 2,
            totalRolls: 999999,
            betOn: 'hi', // hi, lo, alt
            stopProfit: 0,
            stopLoss: 20,
            randomizeClientSeed: true,
            doNotRefresh: true,
            enableSounds: false,
            disableJackpot: true,
            hittingMaxBet: {
                returnToBase: false,
                stopBetting: false
            },
            onWin: {
                returnToBase: true,
                increaseBetBy: 0,
                changeOddsTo: 0 // 0 to disable
            },
            onLose: {
                returnToBase: false,
                increaseBetBy: 1,
                changeOddsTo: 0 // 0 to disable
            }
        }
    }

    var config = null; // Will be set on activate

    return activate();

    ///////////////

    function activate() {
        config = location.host !== 'freedoge.co.in' ? faucets.bitcoin : faucets.dogecoin;

        if (!config) {
            alert('Config is not set!');
            return;
        }

        applyAutoBet();
        console.clear();
        console.log([
            'Freebitco.in MultiplyBTC values UPDATED.\n',
            '    Betting brings seriours risks! Bet for fun and only what you can afford to lose.\n',
            '    If you like this script and feel like sending me satoshies:',
            '        Donate BTC: 14nzuE5cmYa3reh57MNn2HPoytLySd6t3g',
            '        Tip me with Doge: DKdDDuQvdaXXZWroCt3AGSWfYufkyxbiSz'
        ].join('\n'));

        return 'Auto Bet values updated.';
    }

    function applyAutoBet() {
        setNumberField('autobet_base_bet', config.baseBet);
        setNumberField('autobet_max_bet', config.maxBet);
        setNumberField('autobet_bet_odds', config.betOdds);
        setNumberField('autobet_roll_count', config.totalRolls);
        setNumberField('stop_after_profit', config.stopProfit);
        setNumberField('stop_after_loss', config.stopLoss);
        setBetOn(config.betOn);

        $('#autobet_max_bet_reset').prop('checked', config.hittingMaxBet.returnToBase);
        $('#autobet_max_bet_stop').prop('checked', config.hittingMaxBet.stopBetting);

        $('#autobet_change_client_seed').prop('checked', config.randomizeClientSeed);
        $('#autobet_dnr').prop('checked', config.doNotRefresh);
        $('#autobet_enable_sounds').prop('checked', config.enableSounds);

        setOn('win', config.onWin);
        setOn('lose', config.onLose);

        if (config.disableJackpot) {
            disableJackpot();
        }
    }

    function setOn(state, stateConfig) {
        // Gather fields
        var $returnToBase = $('#autobet_' + state + '_return_to_base');

        // Validate values
        if (stateConfig.returnToBase && stateConfig.increaseBetBy) {
            alert('You can\'t have "return to base" and "increase bet by" turned on at the same time for "on ' + state + '"!');
            return;
        }

        // Apply values
        $returnToBase.prop('checked', stateConfig.returnToBase);
        setPercentField('autobet_' + state + '_increase_bet', stateConfig.increaseBetBy);
        setNumberField('autobet_' + state + '_change_odds', stateConfig.changeOddsTo);
    }

    function setNumberField(fieldName, value) {
        var $field =  $('#' + fieldName);
        var printValue;

        if (value < 1 && value !== 0) {
            printValue = value.toFixed(8);
        } else {
            printValue = value.toString();
        }

        if ($field.attr('type') === 'checkbox') {
            if (value) {
                $field.prop('checked', true);
                $('#' + fieldName + '_value').val(printValue);
            } else {
                $field.prop('checked', false);
            }
        } else {
            $field.val(printValue);
        }
    }

    function setPercentField(fieldName, value) {
        if (value) {
            $('#' + fieldName).prop('checked', true);
            $('#' + fieldName + '_percent').val(value * 100);
        } else {
            $('#' + fieldName).prop('checked', false);
        }
    }

    function setBetOn(value) {
        if (value === 'alternate') {
            value = 'alt';
        }

        $('#autobet_bet_hi').prop('checked', value === 'hi');
        $('#autobet_bet_lo').prop('checked', value === 'lo');
        $('#autobet_bet_alternate').prop('checked', value === 'alt');
    }

    function disableJackpot() {
        $('.jackpot_row input').prop('checked', false);
    }
}) ();