<?php
/**
 * Template Name: homepage block editor
 *
 * Template for Gutenberg blocks version of Trulions homepage with no sidebars
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;

get_header();
$container = get_theme_mod('understrap_container_type');

if (is_front_page()) {
    get_template_part('global-templates/hero');
}
?>

<div class="wrapper" id="full-width-page-wrapper">

    <div class="<?php echo esc_attr($container); ?>" id="content">



        <main class="site-main" id="main">

            <?php
while (have_posts()) {
    the_post();
    get_template_part('loop-templates/content', 'page');

    // If comments are open or we have at least one comment, load up the comment template.
    if (comments_open() || get_comments_number()) {
        comments_template();
    }
}

?>




    </div><!-- #content -->

</div><!-- #full-width-page-wrapper -->

<?php
get_footer();