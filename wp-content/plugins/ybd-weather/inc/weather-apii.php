<?php

if (!defined('ABSPATH')) {
    exit;
}
// Exit if accessed directly

/******** This is the code for featching weahter data when the page loads *********/

add_action('admin_init', 'ybd_get_weather');
function ybd_get_weather($atts)
{
    $desired_country = $atts;
    if ($desired_country === "none") {
        $desired_country = "tel-aviv,il";

    }

    // build the URL for wp_remote_get() function that will Performs an HTTP request using the GET method and returns its response.
    $forecast = wp_remote_get(add_query_arg(array( // array of parameters:
        'q' => $desired_country, // City,Country code
        'APPID' => '016a21ad4aca7fca4e3224e7ca18393a', // do not forget to set your API key here
        'units' => 'metric', // if I want to show temperature in Degrees Celsius
    ), 'http://api.openweathermap.org/data/2.5/weather')); //main url for api

    if (!is_wp_error($forecast) && wp_remote_retrieve_response_code($forecast) == 200) {

        //  print_r($forecast); // use it to see all the returned values!

        $forecast = json_decode(wp_remote_retrieve_body($forecast)); //Retrieves the body of an already retrieved HTTP request., see: https://codex.wordpress.org/Function_API/wp_remote_retrieve_body

        $forecast_str = '<h3>Weather Forcat for ' . $forecast->name . '</h3> ';
        $forecast_str .= '<p>' . $forecast->main->temp . ' °С </p> ';
        $forecast_str .= '<p>Humidity: ' . $forecast->main->humidity . ':</p> ';
        $forecast_str .= '<p>Wind speed: ' . $forecast->wind->speed . 'KM </p>';
        $forecast_str .= '<p class="credit">Data source: <a href="https://openweathermap.org/api">openweathermap</a> </p>';

        //icon:

        $forecast_icon = $forecast->weather[0]->icon;
        $icon_url = 'http://openweathermap.org/img/wn/' . $forecast_icon . '@2x.png';
        $icon_img = '<img src="' . $icon_url . '" loading="lazy">';

        if (current_user_can('manage_options')) {

            if ($atts === "none" || empty($atts)) {
                ob_start();
                ?>
<p><svg style="width:1rem;height:1rem;fill:red" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">

        <path
            d="M256 32V51.2C329 66.03 384 130.6 384 208V226.8C384 273.9 401.3 319.2 432.5 354.4L439.9 362.7C448.3 372.2 450.4 385.6 445.2 397.1C440 408.6 428.6 416 416 416H32C19.4 416 7.971 408.6 2.809 397.1C-2.353 385.6-.2883 372.2 8.084 362.7L15.5 354.4C46.74 319.2 64 273.9 64 226.8V208C64 130.6 118.1 66.03 192 51.2V32C192 14.33 206.3 0 224 0C241.7 0 256 14.33 256 32H256zM224 512C207 512 190.7 505.3 178.7 493.3C166.7 481.3 160 464.1 160 448H288C288 464.1 281.3 481.3 269.3 493.3C257.3 505.3 240.1 512 224 512z" />
    </svg>
    <b><u>Note To Site Admin!!!</u></b> Note that not
    country was selected on editor for this block so
    default country
    is tel aviv
</p>
<?php
return ob_get_clean();
            }

        }

    } else {

        return; // you can use print_r( $forecast ); here for debugging
    }

    // }

    //Generate the html for displaying weather forcast:

//Generate the html for displaying weather forcast:
    $obj_to_return = "";
    $obj_to_return = '<div>
     <div class="weather">
         <div class="icon">' . $icon_img . '</div>
         <div class="forcast">' . $forecast_str . ' </div>
     </div>
    </div>';

    return $obj_to_return;

}