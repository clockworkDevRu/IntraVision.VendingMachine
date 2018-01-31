$(function () {

    $('#modal').off('hidden.bs.modal');
    $('#modal').on('hidden.bs.modal', function () {
        $(this).find('.modal-title').html('');
        $(this).find('.modal-body').html('');
    });

    $('#modal').off('shown.bs.modal');
    $('#modal').on('shown.bs.modal', function () {
        $('*[autofocus]').focus();
    });

    if ($.validator != undefined) {
        $.validator.methods.range = function (value, element, param) {
            var globalizedValue = value.replace(",", ".");
            return this.optional(element) || (globalizedValue >= param[0] && globalizedValue <= param[1]);
        }

        $.validator.methods.number = function (value, element) {
            return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:[\s\.,]\d{3})+)(?:[\.,]\d+)?$/.test(value);
        }
    }

});

function showModal(selector, content, size) {
    size = size == undefined ? '' : size;

    $(selector).find('.modal-body').html(content);

    var dialog = $(selector).find('.modal-dialog');
    dialog.removeClass('modal-sm modal-lg');
    switch (size) {
        case 'small':
            dialog.addClass('modal-sm');
            break;
        case 'large':
            dialog.addClass('modal-lg');
            break;
        default:
            break;
    }

    $(selector).modal('show');
}

function buttonLoading(btn) {
	btn.addClass('disabled');
	btn.prop('disabled', true);
}
	
function buttonActive(btn) {
	btn.removeClass('disabled');
	btn.prop('disabled', false);
}