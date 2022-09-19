<?php
// Exit if accessed directly.
defined('ABSPATH') || exit;

?>
<div class="section-container">


    <div class="create-note">
        <h2 class="headline headline--medium">Create New Note</h2>
        <input class="new-note-title" placeholder="note text" required>
        <!-- <textarea class="new-note-body" placeholder="Your note here..."></textarea>-->
        <span class="submit-note">Create Note</span>
        <p class="note_users-message">you must enter some text for this note</p>
    </div>

    <style>
    .create-note {
        padding: 4rem;
    }

    .note_users-message {
        display: none;
    }
    </style>



</div>