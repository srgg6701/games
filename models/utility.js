function realRegCountryFill()
{
    $.ajax({
        url: '/user/getCountry',
        dataType: 'json',
        success: function (data)
        {
            $('#country').val(data)
        }
    })
}


function profFill()
{
    $.ajax({
        url: '/user/profileForm',
        dataType: 'json',
        success: function (data)
        {
            if (data.user.birthDate)
            {
                var bD = new Date(data.user.birthDate)
                $("#day").val(bD.getDate())
                $("#month").val(monthI[bD.getMonth()])
                $("#year").val(bD.getFullYear())
            }
            if (data.user.gender == 1)
            {
                $("#radio_male").parent().addClass('checked')
            }
            else
            {
                $("#radio_female").parent().addClass('checked')
            }
            $("#username").val(data.user.username)
            $("#password").val(data.user.password)
            $("#email").val(data.user.email)
            $("#zip_code").val(data.user.zip)
            $("#address").val(data.user.address)
            $("#home_phone").val(data.user.phone)
            $("#mobile_phone").val(data.user.cellphone)
            $("#city").val(data.user.city)
            $("#country").val(data.country)
        }
    })
}
