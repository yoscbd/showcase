<?php
/**
 * The header for our theme
 *
 * Displays all of the <head> section and everything up till <div id="content">
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;

$bootstrap_version = get_theme_mod('understrap_bootstrap_version', 'bootstrap4');
$navbar_type = get_theme_mod('understrap_navbar_type', 'collapse');
?>
<!DOCTYPE html>
<html <?php language_attributes();?>>

<head>
    <meta charset="<?php bloginfo('charset');?>">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <?php wp_head();?>
</head>

<body <?php body_class();?> <?php understrap_body_attributes();?>>
    <?php do_action('wp_body_open');?>
    <div class="site" id="page">

        <!-- ******************* The Navbar Area ******************* -->
        <header id="wrapper-navbar">

            <div class="c-navigation">
                <div class="o-container">
                    <nav class="header-nav" role="navigation"
                        aria-label="<?php esc_html_e('YBD Main Navigation', '_themename')?>">
                        <?php wp_nav_menu(array('theme_location' => 'ybd-main-menu'))?>
                    </nav>
                </div>
            </div>
        </header><!-- #wrapper-navbar end -->