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

    $('#btnAddDrink').on('click', function () {
        $('#modal').find('.modal-title').html('Добавить товар');

        $.ajax({
            url: SITE_URL + 'admin/adddrink',
            type: 'GET',
            data: {},
            success: function (response) {
                showModal('#modal', response);
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

    $('#drinksList').off('click', '.edit-drink-btn');
    $('#drinksList').on('click', '.edit-drink-btn', function () {
        $('#modal').find('.modal-title').html('Редактировать товар');
        
        $.ajax({
            url: SITE_URL + 'admin/editdrink',
            type: 'GET',
            data: {
                id: $(this).attr('data-drink-id')
            },
            success: function (response) {
                showModal('#modal', response);
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

    $('#drinksList').off('click', '.delete-drink-btn');
    $('#drinksList').on('click', '.delete-drink-btn', function () {
        $('#modal').find('.modal-title').html('Удалить товар');

        $.ajax({
            url: SITE_URL + 'admin/deletedrink',
            type: 'GET',
            data: {
                id: $(this).attr('data-drink-id')
            },
            success: function (response) {
                showModal('#modal', response);
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

});