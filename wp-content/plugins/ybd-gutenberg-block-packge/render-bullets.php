<?php

// Exit if accessed directly.
defined('ABSPATH') || exit;

// This function will render our block
function ybd_content_render_latest_bullets_block($attributes)
{
    $numberOfColumns = $attributes['numberOfColumns'];
    $mainTitle = $attributes['main_title'];
    $cta_text = $attributes['cta_text'];
    $cta_url = $attributes['cta_url'];

    //get latset notes
    $args = array(
        'post_type' => 'note',
        'posts_per_page' => $attributes['numberOfPosts'],
        'post_status' => 'publish',
        'order' => $attributes['order'],
        'orderby' => $attributes['orderBy'],
    );

    $recent_posts = get_posts($args);

    ob_start();?>

<section class="section-forth">

    <?php

    if (current_user_can('manage_options')) {
        ?>
    <div class="create-note">
        <h3 class="headline headline--medium">
            <?php _e('Create New Note (This option is avaiable for Admin user`s only)', 'ybd-blocks')?></h3>
        <input class="new-note-title" style="padding: 0.2rem;margin-bottom: 0.5rem;" placeholder="Note's Text Here..."
            required="">

        <span class="submit-note btn btn-secondary btn-sm"
            style="background: #d3854c; border-color: #000;"><?php _e('Add Note', 'ybd-blocks')?></span>
        <p class="note_users-message"><?php _e('you must enter some text for this note', 'ybd-blocks')?></p>
    </div>

    <?php

    }
    ?>



    <div class="section-container">
        <div class="left">

            <h4><?php _e(esc_html($mainTitle), 'ybd-blocks')?></h4>

            <ul class="min-list link-list" id="my-notes">

                <?php

    foreach ($recent_posts as $post) {
        $post_id = get_the_ID();
        $title = get_the_title($post);
        $title = $title ? $title : __('(No title)', 'ybd-blocks');
        $permalink = get_permalink($post);
        $excerpt = get_the_excerpt($post);

        ?>

                <li data-id="<?php echo $post_id ?>"><i class="fa fa-check-square"
                        aria-hidden="true"></i><?php echo $title ?></li>

                <?php }?>

            </ul>

            <button class="cta-button" type="button"
                href="<?php echo esc_url($cta_url) ?>"><?php _e(esc_attr($cta_text), 'ybd-blocks')?></button>

        </div>
        <div class="right">
            <?php echo wp_get_attachment_image($attributes['imgID'], 'full'); ?>
        </div>

    </div>


</section>



<?php

    return ob_get_clean();
}