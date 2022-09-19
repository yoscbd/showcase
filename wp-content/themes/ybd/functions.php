<?php
/**
 * UnderStrap functions and definitions
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;

// UnderStrap's includes directory.
$understrap_inc_dir = 'inc';

// Array of files to include.
$understrap_includes = array(
    '/theme-settings.php', // Initialize theme default settings.
    '/setup.php', // Theme setup and custom theme supports.
    '/widgets.php', // Register widget area.
    '/enqueue.php', // Enqueue scripts and styles.
    '/template-tags.php', // Custom template tags for this theme.
    '/pagination.php', // Custom pagination for this theme.
    '/hooks.php', // Custom hooks.
    '/extras.php', // Custom functions that act independently of the theme templates.
    '/customizer.php', // Customizer additions.
    '/custom-comments.php', // Custom Comments file.
    '/class-wp-bootstrap-navwalker.php', // Load custom WordPress nav walker. Trying to get deeper navigation? Check out: https://github.com/understrap/understrap/issues/567.
    '/editor.php', // Load Editor functions.
    '/block-editor.php', // Load Block Editor functions.
    '/deprecated.php', // Load deprecated functions.
    '/custom-posts-types.php', // Load custom-posts-types functions.
    '/like-route.php', // custom REST functions.
);

// Load WooCommerce functions if WooCommerce is activated.
if (class_exists('WooCommerce')) {
    $understrap_includes[] = '/woocommerce.php';
}

// Load Jetpack compatibility file if Jetpack is activiated.
if (class_exists('Jetpack')) {
    $understrap_includes[] = '/jetpack.php';
}

// Include files.
foreach ($understrap_includes as $file) {
    require_once get_theme_file_path($understrap_inc_dir . $file);
}

add_action('after_setup_theme', 'bootstrap_setup');

if (!function_exists('bootstrap_setup')) {

    function bootstrap_setup()
    {

        add_action('init', 'register_menu');

        function register_menu()
        {
            register_nav_menu('top-bar', 'Bootstrap Top Menu');
        }

        class Bootstrap_Walker_Nav_Menu extends Walker_Nav_Menu
        {

            function start_lvl(&$output, $depth = 0, $args = null)
            {

                $indent = str_repeat("\t", $depth);
                $output .= "\n$indent<ul class=\"dropdown-menu\">\n";

            }

            function start_el(&$output, $item, $depth = 0, $args = array(), $id = 0)
            {

                $indent = ($depth) ? str_repeat("\t", $depth) : '';

                $li_attributes = '';
                $class_names = $value = '';

                $classes = empty($item->classes) ? array() : (array) $item->classes;
                $classes[] = ($args->has_children) ? 'dropdown' : '';
                $classes[] = ($item->current || $item->current_item_ancestor) ? 'active' : '';
                $classes[] = 'menu-item-' . $item->ID;

                $class_names = join(' ', apply_filters('nav_menu_css_class', array_filter($classes), $item, $args));
                $class_names = ' class="' . esc_attr($class_names) . '"';

                $id = apply_filters('nav_menu_item_id', 'menu-item-' . $item->ID, $item, $args);
                $id = strlen($id) ? ' id="' . esc_attr($id) . '"' : '';

                $output .= $indent . '<li' . $id . $value . $class_names . $li_attributes . '>';

                $attributes = !empty($item->attr_title) ? ' title="' . esc_attr($item->attr_title) . '"' : '';
                $attributes .= !empty($item->target) ? ' target="' . esc_attr($item->target) . '"' : '';
                $attributes .= !empty($item->xfn) ? ' rel="' . esc_attr($item->xfn) . '"' : '';
                $attributes .= !empty($item->url) ? ' href="' . esc_attr($item->url) . '"' : '';
                $attributes .= ($args->has_children) ? ' class="dropdown-toggle" data-toggle="dropdown"' : '';

                $item_output = $args->before;
                $item_output .= '<a' . $attributes . '>';
                $item_output .= $args->link_before . apply_filters('the_title', $item->title, $item->ID) . $args->link_after;
                $item_output .= ($args->has_children) ? ' <b class="caret"></b></a>' : '</a>';
                $item_output .= $args->after;

                $output .= apply_filters('walker_nav_menu_start_el', $item_output, $item, $depth, $args);
            }

            function display_element($element, &$children_elements, $max_depth, $depth = 0, $args, &$output)
            {

                if (!$element) {
                    return;
                }

                $id_field = $this->db_fields['id'];

                //display this element
                if (is_array($args[0])) {
                    $args[0]['has_children'] = !empty($children_elements[$element->$id_field]);
                } else if (is_object($args[0])) {
                    $args[0]->has_children = !empty($children_elements[$element->$id_field]);
                }

                $cb_args = array_merge(array(&$output, $element, $depth), $args);
                call_user_func_array(array(&$this, 'start_el'), $cb_args);

                $id = $element->$id_field;

                // descend only when the depth is right and there are childrens for this element
                if (($max_depth == 0 || $max_depth > $depth + 1) && isset($children_elements[$id])) {

                    foreach ($children_elements[$id] as $child) {

                        if (!isset($newlevel)) {
                            $newlevel = true;
                            //start the child delimiter
                            $cb_args = array_merge(array(&$output, $depth), $args);
                            call_user_func_array(array(&$this, 'start_lvl'), $cb_args);
                        }
                        $this->display_element($child, $children_elements, $max_depth, $depth + 1, $args, $output);
                    }
                    unset($children_elements[$id]);
                }

                if (isset($newlevel) && $newlevel) {
                    //end the child delimiter
                    $cb_args = array_merge(array(&$output, $depth), $args);
                    call_user_func_array(array(&$this, 'end_lvl'), $cb_args);
                }

                //end this element
                $cb_args = array_merge(array(&$output, $element, $depth), $args);
                call_user_func_array(array(&$this, 'end_el'), $cb_args);

            }

        }

    }

}

/* setcookie(TEST_COOKIE, 'WP Cookie check', 0, COOKIEPATH, COOKIE_DOMAIN);
if (SITECOOKIEPATH != COOKIEPATH) {
setcookie(TEST_COOKIE, 'WP Cookie check', 0, SITECOOKIEPATH, COOKIE_DOMAIN);
} */

function ybdfilter($title, $id)
{

    if ($id === 1) {
        return $title . ' | ' . $id;
    }

    return $title;

}
//add_filter('the_title', 'ybdfilter', 10, 2);

//add_filter('manage_posts_columns', 'ybd_realestate_columns');
function ybd_realestate_columns($columns)
{

    $columns = array(
        'cb' => $columns['cb'],
        'image' => __('Image'),
        'title' => __('Title'),
        'price' => __('Price', 'smashing'),
        'area' => __('Area', 'smashing'),
    );

    return $columns;
}

//add_action('manage_posts_custom_column', 'ybd_realestate_column', 10, 2);
function ybd_realestate_column($column, $post_id)
{
    // Image column
    if ('image' === $column) {
        echo get_the_post_thumbnail($post_id, array(80, 80));
    }
}

add_theme_support('block-templates');
// Add support for Block Styles.
add_theme_support('wp-block-styles');