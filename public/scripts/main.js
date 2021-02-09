$(function()
{ // This function will disable futuristic births
    var dtToday = new Date();
    
    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
        day = '0' + day.toString();
    
    var maxDate = year + '-' + month + '-' + day;
    $('#birth_date').attr('max', maxDate);
});
 

$( "#form_register" ).submit(function( event ) 
{ // Sending data to server to create new account
    var birth_date = $('#form_register').find('input[name="birth_date"]').val();

    // Converting the Raw birth day to ISO 8601 Format
    var raw_date =  new Date(birth_date); 
    var iso_date = raw_date.toISOString(); 

    $.post("http://fannst.nl:3000/accounts/create/", { 
        username: $('#form_register').find('input[name="username"]').val(), 
        domain:  $('#form_register').find('select[name="domain"]').val(),
        password:  $('#form_register').find('input[name="password"]').val(),
        full_name:  $('#form_register').find('input[name="full_name"]').val(),
        birth_date:  iso_date,
    }).done(function( data ) {

        if(data.hasOwnProperty('error'))
        {
            $('#form_register p').css('color', 'Red');
            $('#form_register p').text(data['error']);
            $('#form_register p').effect("shake");
            // !TODO Create if statment that will check if there are no errors and the request was SUCCESS
            setTimeout(function(){
                $('#form_register p').css('color', 'Black');
                $('#form_register p').html('Have an account already? Try <a href="/login">Login</a>');
            }, 3000);
        } else {
            $('#form_register p').css('color', 'Green');
            $('#form_register p').text('Account successfully created');
            setTimeout(function(){
                window.location.replace("/login");
            }, 3000);
        }
    })


    event.preventDefault();
});


$( "#form_login" ).submit(function( event ) 
{ // Sending data to server for logging into existing account

    $.post("http://fannst.nl:3000/accounts/login/", { 
        username: $('#form_register').find('input[name="username"]').val(), 
        domain:  $('#form_register').find('select[name="domain"]').val(),
        password:  $('#form_register').find('input[name="password"]').val(),
    }).done(function( data ) {

        if(data.hasOwnProperty('error'))
        {
            $('#form_register p').css('color', 'Red');
            $('#form_register p').text(data['error']);
            $('#form_register p').effect("shake");

            setTimeout(function(){
                $('#form_register p').css('color', 'Black');
                $('#form_register p').html('Don\'t have an account yet? Create one with <a href="/register">Register</a>');
            }, 3000);
        } else {
            $('#form_register p').css('color', 'Green');
            $('#form_register p').text('Account successfully created');
            
        }
    })


    event.preventDefault();
});

// Filling in the domain function for the object select
$.getJSON("http://fannst.nl:3000/domains/public", null, function(data) {
    $.each(data.domains, function(index, item) {
        
        $("#domain").append( 
            $("<option></option>")
                .text(item)
                .val(item)
        );

    });
});