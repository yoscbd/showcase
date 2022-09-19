<?php
/**
 * Template Name: Notes Page Template
 *

 *
 * @package Understrap
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;

get_header();
?>
<section class="section-first" style="width:1440px;margin:0 auto;">
    <h1><u>my nothes</u></h1>
    <?php
while (have_posts()):
    the_post();
    ?>

    <ul class="min-list link-list" id="my-notes">
        <?php
    $userNotes = new WP_Query(array(
        'post_type' => 'note',
        'posts_per_page' => -1,
        'author' => get_current_user_id(),
    ));

    while ($userNotes->have_posts()) {
        $userNotes->the_post();?>
        <li>
            <input class="note-title-field" value="<?php echo esc_attr(get_the_title()); ?>">

            <textarea rows="1"
                class="note-body-field"><?php echo esc_attr(wp_strip_all_tags(get_the_content())); ?></textarea>
            <span class="edit-note"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</span>
            <span class="delete-note"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</span>
        </li>
        <?php }

    ?>
    </ul>

    <?php
endwhile;
?>
    </div>
    <style>
    #my-notes {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

    }

    #my-notes li {
        width: 80%;
        display: flex;
        justify-content: space-between;
        align-items: end;
        padding-bottom: 3rem;

    }

    input,
    textarea {
        width: 275px;
    }
    </style>
    <?php
get_footer();