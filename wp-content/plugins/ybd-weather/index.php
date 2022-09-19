<?php

/*
Plugin Name: weather api block V223
Description: allow you to add weather report via  http://api.openweathermap.org weather api.
Version: 1.0
Author: YBD

 */

if (!defined('ABSPATH')) {
    exit;
}
// Exit if accessed directly

include 'inc/weather-ajaxapi.php';

class weatherApiBlock
{
    public function __construct()
    {
        add_action('init', array($this, 'adminAssets'));
    }

    public function adminAssets()
    {

        wp_enqueue_script('weather-scripts', plugin_dir_url(__FILE__) . 'build/front.js', array('jquery'), $js_version, true);
        wp_localize_script('weather-scripts', 'weather_script_vars', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('reg-nonce'),
            'root_url' => get_site_url(),
        )
        );

        register_block_type_from_metadata(__DIR__, [
            'render_callback' => array($this, 'theHTML'),
        ]);

    }

    public function theHTML($attributes)
    { // this function will render our HTML and PHP:
        $ybd_block_wrapper_attributes = get_block_wrapper_attributes([
            'style' =>
            'background:' . $attributes['backgroundColor'] .
            ';background-color:' . $attributes['backgroundColor'] .
            ';color:' . $attributes['textColor'] .
            ';',
        ]);

        ob_start();?>
<div class="weather-block-api" <?php echo $ybd_block_wrapper_attributes; ?>>


    <p class="cta fe_cta">
        <select name="cities" id="cities">
            <option value="tel-aviv,il">Tel-Aviv</option>
            <option value="london,uk">London</option>
            <option value="paris,fr">Paris</option>
        </select>
        <button id="weather-cta">Update Forcast</button>
    </p>

    <?php echo ybd_get_weather(esc_html($attributes['selectedCountry'])); ?>

</div>

<?php
return ob_get_clean();
    }
}

$WeatherApiBlock = new weatherApiBlock();

// get the api code for generationg weater report block:

include 'inc/weather-apii.php';