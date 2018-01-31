var drinksDatatableOpts = {
    paging: false,
    info: false,
    autoWidth: false,
    ajax: {
        url: SITE_URL + 'api/drinks',
        type: 'GET',
        cache: false,
        dataType: 'json',
        dataSrc: ''
    },
    columns: [
        { data: 'name' },
        { data: 'quantity' },
        {
            data: 'price',
            render: function (data, type, row) {
                return data + ',00 \u20bd';
            }
        },
        {
            data: 'img',
            render: function (data, type, row) {
                var img = data || '_default.png';
                return '<img class="img-thumbnail drink-img" src="' + (SITE_URL + 'Content/img/Drinks/' + img) + '" />';
            },
            orderable: false
        },
        {
            data: null,
            render: function (data, type, row) {
                var deleteBtn = '<button type="button" class="btn btn-light drinks-btn delete-drink-btn" data-drink-id="' + row.id + '">' +
                    '<img src="' + (SITE_URL + 'Content/img/delete_icon.png') + '">' +
                '</button>';
                var editBtn = '<button type="button" class="btn btn-light drinks-btn edit-drink-btn" data-drink-id="' + row.id + '">' +
                    '<img src="' + (SITE_URL + 'Content/img/edit_icon.png') + '">' +
                '</button>';
                return editBtn + deleteBtn;
            },
            'orderable': false
        }
    ],
    language: {
        search: 'Поиск:',
        emptyTable: 'Отсутствуют товары',
        zeroRecords: 'Отсутствуют товары',
        loadingRecords: 'Загрузка...'
    }
}

$(function () {

    var drinksDatatable = $('#drinksDatatable').DataTable(drinksDatatableOpts);
    $('#drinksDatatable_wrapper > .row:first-child > div:first-child').append($('#btnAddDrink'));

    $('#navDrinksTab').on('shown.bs.tab', function (e) {

        drinksDatatable.ajax.reload();

    });

    $('#navCoinsTab').on('shown.bs.tab', function (e) {

        updateCoins();

    });

    /*----- ДОБАВИТЬ ТОВАР -----*/
    $('#btnAddDrink').on('click', function () {
        $('#modal').find('.modal-title').html('Добавить товар');

        $.ajax({
            url: SITE_URL + 'admin/adddrink',
            type: 'GET',
            data: {},
            success: function (response) {
                showModal('#modal', response);
                $.validator.unobtrusive.parse($('#modalAddDrink'));
            }
        });
    });

    $('#modal').off('submit', '#modalAddDrink');
    $('#modal').on('submit', '#modalAddDrink', function (e) {
        e.preventDefault();

        var subButton = $(this).find('#subModalForm');
        buttonLoading(subButton);

        $.ajax({
            url: $(this).attr('action'),
            type: 'POST',
            data: new FormData($('#modalAddDrink')[0]),
            contentType: false,
            processData: false,
            success: function (response) {
                if (response == 'success') {

                    $('#modal').modal('hide');
                    drinksDatatable.ajax.reload();

                } else {

                    $('#modal').find('.modal-body').html(response);

                    buttonActive(subButton);

                }
            }
        });
    });
    /*----------*/

    /*----- РЕДАКТИРОВАТЬ ТОВАР -----*/
    $('#drinksList').off('click', '.edit-drink-btn');
    $('#drinksList').on('click', '.edit-drink-btn', function () {
        $('#modal').find('.modal-title').html('Редактировать товар');
        
        $.ajax({
            url: SITE_URL + 'admin/editdrink',
            type: 'GET',
            data: {
                id: $(this).data('drinkId')
            },
            success: function (response) {
                showModal('#modal', response);
                $.validator.unobtrusive.parse($('#modalEditDrink'));
            }
        });
    });

    $('#modal').off('submit', '#modalEditDrink');
    $('#modal').on('submit', '#modalEditDrink', function (e) {
        e.preventDefault();

        var subButton = $(this).find('#subModalForm');
        buttonLoading(subButton);

        $.ajax({
            url: $(this).attr('action'),
            type: 'POST',
            data: new FormData($('#modalEditDrink')[0]),
            contentType: false,
            processData: false,
            success: function (response) {
                if (response == 'success') {

                    $('#modal').modal('hide');
                    drinksDatatable.ajax.reload();

                } else {

                    $('#modal').find('.modal-body').html(response);

                    buttonActive(subButton);

                }
            }
        });
    });
    /*----------*/

    /*----- УДАЛИТЬ ТОВАР -----*/
    $('#drinksList').off('click', '.delete-drink-btn');
    $('#drinksList').on('click', '.delete-drink-btn', function () {
        $('#modal').find('.modal-title').html('Удалить товар');

        $.ajax({
            url: SITE_URL + 'admin/deletedrink',
            type: 'GET',
            data: {
                id: $(this).data('drinkId')
            },
            success: function (response) {
                showModal('#modal', response);
                $.validator.unobtrusive.parse($('#modalDeleteDrink'));
            }
        });
    });

    $('#modal').off('submit', '#modalDeleteDrink');
    $('#modal').on('submit', '#modalDeleteDrink', function (e) {
        e.preventDefault();

        var subButton = $(this).find('#subModalForm');
        buttonLoading(subButton);

        $.ajax({
            url: $(this).attr('action'),
            type: 'POST',
            data: $(this).serialize(),
            success: function (response) {
                if (response == 'success') {

                    $('#modal').modal('hide');
                    drinksDatatable.ajax.reload();

                } else {

                    $('#modal').find('.modal-body').html(response);

                    buttonActive(subButton);

                }
            }
        });
    });
    /*----------*/

    $('#modal').off('click', '.drink-img-delete-btn');
    $('#modal').on('click', '.drink-img-delete-btn', function (e) {
        var img = $('#modal .drink-img');
        img.find('#img').val('');
        img.hide();
    });
    $('#modal').off('change', '#modalEditDrink #PostedImage');
    $('#modal').on('change', '#modalEditDrink #PostedImage', function (e) {
        var img = $('#modal .drink-img');
        if (img.length && img.find('#img').val()) {
            if ($(this).val()) {
                $('#modal .drink-img').hide();
            } else {
                $('#modal .drink-img').show();
            }
        }
    });

    $('#coinsList').on('input', '.coin-quantity-field', function () {
        updateCoinValue($(this));
    });
    $('#coinsList').on('change', '.coin-allowed-field', function () {
        updateCoinValue($(this));
    });

});

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

                var coinCard = $('<form class="card text-center coin-card" data-coin-id="' + coins[i].id + '"></form>');
                coinCard.append('<img class="card-img-top" src= "' + (SITE_URL + 'Content/img/coin_' + coins[i].value) + '.png" >');
                var cardBody = $('<div class="card-body"></div>');

                var idField = $('<input id="coinId_' + coins[i].id + '" type="hidden" value="' + coins[i].id + '">');
                var valueField = $('<input id="coinValue_' + coins[i].id + '" type="hidden" value="' + coins[i].value + '">');

                var quantityField = $('' +
                    '<div class="form-group">' +
                        '<label for="coinQuantity_' + coins[i].id + '">Количество</label>' +
                        '<input class="form-control form-control-sm text-box single-line coin-quantity-field" type="number" ' +
                            'id="coinQuantity_' + coins[i].id + '" value="' + coins[i].quantity + '" data-coin-id="' + coins[i].id + '"' +
                            'data-val="true" ' +
                            'data-val-number="Значением поля Количество должно быть число." ' +
                            'data-val-range="Значение поля Количество может быть только положительным." ' +
                            'data-val-range-max="2147483647" ' +
                            'data-val-range-min="0">' +
                        '<span class="field-validation-valid text-danger" data-valmsg-for="coinQuantity_' + coins[i].id + '" data-valmsg-replace="true"></span>' +
                    '</div>'
                );

                var checked = coins[i].allowed ? ' checked="checked"' : '';
                var allowedField = $('' +
                    '<div class="form-group">' +
                        '<div class="form-check">' +
                            '<input class="form-check-input coin-allowed-field" type="checkbox" id="coinAllowed_' + coins[i].id + '" ' + checked + ' data-coin-id="' + coins[i].id + '">' +
                            '<label class="form-check-label" for="gridCheck">Принимается</label>' +
                        '</div>' +
                    '</div>'
                );

                cardBody
                        .append(idField)
                        .append(valueField)
                        .append(quantityField)
                        .append(allowedField);

                coinCard.append(cardBody);
                $('#coinsList').append(
                    $('<div class="col-lg-3 col-md-6 col-sm-6"></div>').append(coinCard)
                );

                $.validator.unobtrusive.parse(coinCard);

            }
            loader.hide();
        },
        error: function (err) {
            $('#coinsList').html(err);
            loader.hide();
        }
    });
}

function updateCoinValue(objChanged) {
    var cardBody = objChanged.parents('.card-body');
    var coindId = objChanged.data('coinId');

    if ($('form[data-coin-id=' + coindId + ']').valid()) {
        $.ajax({
            url: SITE_URL + 'api/coins/',
            type: 'PUT',
            cache: false,
            dataType: 'json',
            data: {
                id: cardBody.find('#coinId_' + coindId).val(),
                value: cardBody.find('#coinValue_' + coindId).val(),
                quantity: cardBody.find('#coinQuantity_' + coindId).val(),
                allowed: cardBody.find('#coinAllowed_' + coindId).is(':checked')
            },
            success: function (coin) {

            },
            error: function (err) {
                console.log(err.responseJSON.Message);
            }
        });
    }
}