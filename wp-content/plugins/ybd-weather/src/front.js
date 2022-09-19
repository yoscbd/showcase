(function ($) {
    $("#weather-cta").on("click", function () {

        let selected_city = $("#cities").find('option:selected').val();
        const weatherBlock = $(".weather");
        var ourRequestData = {
            action: "weather_api",
            selectedlocation: selected_city,
            nonce: weather_script_vars.nonce
        }
        $.ajax({
            /*
            /* if it was a jason datatype request we whould have use ' beforeSend: xhr'
              beforeSend: xhr => {
                 xhr.setRequestHeader("X-WP-Nonce", weather_script_vars.nonce)
             }, */
            url: weather_script_vars.ajax_url,
            type: "POST",
            // dataType: 'json',
            data: ourRequestData,
            success: response => {
                console.log(response);
                weatherBlock.hide('slow', function () {
                    weatherBlock.html('');
                    weatherBlock.show('slow');
                    weatherBlock.html(response);
                });

            },
            error: response => {
                console.log("Sorry")
                console.log(response)
            }
        })


    });

})(jQuery);