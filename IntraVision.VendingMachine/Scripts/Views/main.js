$(function() {

    $('#drinksList').on('click', '.drink-card', function (e) {
        var drinkCard = $(this);
        buttonLoading(drinkCard);

        var id = drinkCard.data('drinkId');
        $.ajax({
            url: SITE_URL + 'main/buydrink/',
            type: 'POST',
            cache: false,
            dataType: 'json',
            data: {
                id: id
            },
            success: function (insertedCoins) {
                $('.coins-inserted').html(insertedCoins + ',00 \u20bd');

                var drinkPurchasedCard = $('<div class="card bg-dark text-center drink-purchased-card"></div>');
                drinkPurchasedCard.append('<img class="card-img-top" src="' + drinkCard.find('.card-img-top').attr('src') + '" />');
                drinkPurchasedCard.append('<div class="card-body">' +
                    '<h5 class="card-title">' + drinkCard.find('.drink-title').text() + '</h5>' +
                '</div>');
                $('#drinksPurchasedList').append(
                    $('<div class="col-md-3 col-sm-4"></div>').append(drinkPurchasedCard)
                );

                $('#btnTakeDrinks').removeClass('hidden');

                updateDrinks();
            }
        });
    });

    $('#btnTakeDrinks').on('click', function (e) {
        $('#drinksPurchasedList').html('');
        $('#btnTakeDrinks').addClass('hidden');
    });

    $('#coinsList').on('click', '.coin-link', function (e) {
        var btn = $(this);
        buttonLoading(btn);

        var coinValue = $(this).data('coinValue');
        $.ajax({
            url: SITE_URL + 'main/insertcoin/',
            type: 'POST',
            cache: false,
            dataType: 'json',
            data: {
                value: coinValue
            },
            success: function (insertedCoins) {
                $('.coins-inserted').html(insertedCoins + ',00 \u20bd');
                
                updateDrinks();

                buttonActive(btn);
            }
        });
    });

    $('#btnGetChange').on('click', function (e) {
        $('#changeList').html('');
        $('#btnGetChange').addClass('hidden');
        $.ajax({
            url: SITE_URL + 'main/getchange/',
            type: 'POST',
            cache: false,
            dataType: 'json',
            success: function (coins) {
                if (coins.length) {
                    for (var i = 0; i < coins.length; i++) {

                        var coin = $('<div class="btn btn-link col-md-6"></div>');
                        coin.append('<img class="img-fluid" src= "' + (SITE_URL + 'Content/img/coin_' + coins[i].value) + '.png" >');
                        coin.append('<span class="badge badge-dark">' + coins[i].quantity + '</span>');
                        $('#changeList').append(coin);

                    }

                    $('#btnTakeChange').removeClass('hidden');

                } else {

                    $('#btnGetChange').removeClass('hidden');

                }
                updateInsertedCoins();
            }
        });
    });

    $('#btnTakeChange').on('click', function (e) {
        $('#changeList').html('');
        $('#btnTakeChange').addClass('hidden');
        $('#btnGetChange').removeClass('hidden');
    });

    updateDrinks();
    updateCoins();

});

function updateDrinks() {
    var loader = $('#drinksList').prev('.loader');
    loader.show();

    var insertedCoins = parseInt($('.coins-inserted').text());

    $.ajax({
        url: SITE_URL + 'api/drinks',
        type: 'GET',
        cache: false,
        dataType: 'json',
        success: function (drinks) {
            $('#drinksList').html('');
            if (drinks.length) {
                for (var i = 0; i < drinks.length; i++) {

                    var disabled = (!drinks[i].quantity || insertedCoins < drinks[i].price) ? ' disabled' : '';
                    
                    var drinkCard = $('<a class="card bg-dark text-center btn btn-dark drink-card' + disabled + '" data-drink-id="' + drinks[i].id + '"></a>');
                    drinkCard.append('<img class="card-img-top" src="' + (SITE_URL + 'Content/img/Drinks/' + (drinks[i].img || '_default.png' )) + '" />');
                    drinkCard.append('<div class="card-body">' +
                        '<span class="badge badge-dark drink-card-quantity">' + drinks[i].quantity + '</span>' +
                        '<h5 class="card-title"><span class="drink-title">' + drinks[i].name + '</span> <span class="badge badge-secondary">' + drinks[i].price + ',00 \u20bd</span></h5>' +
                    '</div>');
                    $('#drinksList').append(
                        $('<div class="col-md-4 col-sm-6"></div>').append(drinkCard)
                    );

                }
            } else {

                $('#drinksList').html('<div class="text-center">Отсутствуют товары.</div>');

            }
            loader.hide();
        },
        error: function (err) {
            $('#drinksList').html(err);
            loader.hide();
        }
    });
}

function updateCoins() {
    var loader = $('#coinsList').prev('.loader');
    loader.show();

    $.ajax({
        url: SITE_URL + 'api/coins',
        type: 'GET',
        cache: false,
        dataType: 'json',
        success: function (coins) {
            $('#coinsList').html('');
            for (var i = 0; i < coins.length; i++) {

                var disabled = coins[i].allowed ? '' : ' disabled';
                var coinBtn = $('<a class="btn btn-dark coin-link' + disabled + '" data-coin-value="' + coins[i].value + '"></a>');
                coinBtn.append('<img class="img-fluid" src= "' + (SITE_URL + 'Content/img/coin_' + coins[i].value) + '.png" >');
                $('#coinsList').append(coinBtn);

            }
            loader.hide();
        },
        error: function (err) {
            $('#coinsList').html(err);
            loader.hide();
        }
    });
}

function updateInsertedCoins() {
    $.ajax({
        url: SITE_URL + 'main/getinsertedcoins',
        type: 'POST',
        cache: false,
        dataType: 'json',
        success: function (insertedCoins) {
            $('.coins-inserted').html(insertedCoins + ',00 \u20bd');

            updateDrinks();
        }
    });
}