(function($) {

    function onFormSubmit(event) {
        var data = $(event.target).serializeArray();

        var thesis = {};
        for (var i = 0; i < data.length; i++) {
            var key = data[i].name;
            var value = data[i].value;
            thesis[key] = value
        }

        var list_element = $('<li>');

        list_element.html(thesis.Year + ' ' + thesis.Title + ' - by ' + thesis.created_by + ' ' + '<a href=\"/edit/' + thesis.id + '\"><button id=\"edit\" type=\"submit\">Edit</button></a>' + ' ' + '<a href=\"/delete/' + thesis.id + '\"><button id=\"delete\" type=\"submit\">Delete</button></a>');

        var thesis_entry_api = '/api/thesis'
        $.post(thesis_entry_api, thesis, function(response){
            if (response.status = 'OK'){
                var full_detail = response.data.Year + ' ' + response.data.Title + ' - by ' + response.data.created_by + ' ' + '<a href=\"/edit/' + response.data.id + '\"><button id=\"edit\" type=\"submit\">Edit</button></a>' + ' ' + '<a href=\"/delete/' + response.data.id + '\"><button id=\"delete\" type=\"submit\">Delete</button></a>'

                $('.thesis-list').prepend('<li>' + full_detail + '</li>');
                $('.create-form').trigger("reset");
            }else {

            }
        });
        return false;
    }

    function loadAllThesis(){
        var thesis_entry_api = '/api/thesis';
        $.get(thesis_entry_api, {}, function(response){
            console.log('Thesis list', response)
            response.data.forEach(function(thesis){
                var full_detail = thesis.Year + ' ' + thesis.Title + ' - by ' + thesis.created_by + ' ' + '<a href=\"/edit/' + thesis.id + '\"><button id=\"edit\" type=\"submit\">Edit</button></a>' + ' ' + ' ' + '<a href=\"/delete/' + thesis.id + '\"><button id=\"delete\" type=\"submit\">Delete</button></a>';
                $('.thesis-list').append('<li>' +  full_detail + '</li>')
            });
        });
    }

    function onRegistrationForm(event) {
        var data = $(event.target).serializeArray();

        var user = {};
        for (var i = 0; i < data.length; i++) {
            var key = data[i].name;
            var value = data[i].value;
            user[key] = value
        }

        var api_register = '/api/user';
        $.post(api_register, user, function(response){
            if (response.status = 'OK'){
                $(location).attr('href', '/home');
                console.log();
                return false;
            }
        })

        return false;
    }

    $('.registration-form').submit(onRegistrationForm)
    $('.create-form').submit(onFormSubmit)
    loadAllThesis()
})(jQuery)
