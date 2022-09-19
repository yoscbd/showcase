<?php

function ybd_post_types()
{
/*
// Professor Post Type
register_post_type('professor', array(
'show_in_rest' => true,
'supports' => array('title', 'editor', 'thumbnail'),
'public' => true,
'labels' => array(
'name' => 'Professors',
'add_new_item' => 'Add New Professor',
'edit_item' => 'Edit Professor',
'all_items' => 'All Professors',
'singular_name' => 'Professor',
),
'menu_icon' => 'dashicons-welcome-learn-more',
));
// Like Post Type
register_post_type('like', array(
'supports' => array('title'),
'public' => false,
'show_ui' => true,
'labels' => array(
'name' => 'Likes',
'add_new_item' => 'Add New Like',
'edit_item' => 'Edit Like',
'all_items' => 'All Likes',
'singular_name' => 'Like',
),
'menu_icon' => 'dashicons-heart',
)); */
    // Note Post Type
    register_post_type('note', array(
        // 'capability_type' => 'note',
        //  'map_meta_cap' => true,
        'show_in_rest' => true,
        'supports' => array('title'),
        'public' => false,
        'show_ui' => true,
        'labels' => array(
            'name' => 'Notes',
            'add_new_item' => 'Add New Note',
            'edit_item' => 'Edit Note',
            'all_items' => 'All Notes',
            'singular_name' => 'Note',
        ),
        'menu_icon' => 'dashicons-welcome-write-blog',
    ));
}

add_action('init', 'ybd_post_types');