<?php

// Exit if accessed directly.
defined('ABSPATH') || exit;

function render_banner($attributes)
{

    if (!$attributes['imgID']) {
        $attributes['imgID'] = 54;
    }

    if (!$attributes['imgURL']) {
        $attributes['imgURL'] = 'http://127.0.0.1/custom/wp-content/uploads/2022/08/Group-2074-2222.webp';
    }

    if (!$attributes['first_title']) {
        $attributes['first_title'] = "Lease Accounting Software for IFRS 16";
    }
    if (!$attributes['main_title']) {
        $attributes['main_title'] = "IFRS 16 compliance just got a whole lot easier thanks to AI-enhanced automated lease accounting software powered by Trullion";
    }
    if (!$attributes['main_text']) {
        $attributes['main_text'] = "Lease accounting software can keep you ahead of IFRS 16-related changes thanks to seamless automation and smart AI-enhanced capabilities. Say goodbye to errors and regulatory risk, and hello to painless compliance.";
    }
    if (!$attributes['btn_text']) {
        $attributes['btn_text'] = "Accelerate your compliance now";
    }
    if (!is_admin()) {
        // wp_enqueue_script('attentionFrontend', plugin_dir_url(__FILE__) . 'build/frontend.js', array('wp-element'));
        // wp_enqueue_style('attentionFrontendStyles', plugin_dir_url(__FILE__) . 'build/frontend.css');
    }

    ob_start();?>
<section class="section-first">
    <div>
        <div class="banner-title">
            <h4 style="color: <?=$attributes['banner_title_color'];?>"><?php echo $attributes['first_title']; ?></h4>
        </div>
    </div>
    <div>
        <div class="banner-main-section">
            <div class="left">
                <h3 style="color: <?php echo $attributes['banner_text_color']; ?>">
                    <?php echo $attributes['main_title']; ?>


                </h3>
                <p style="color: <?php echo $attributes['banner_text_color']; ?>">
                    <?php echo $attributes['main_text']; ?>
                </p>
            </div>
            <div class="right">
                <?php

    echo wp_get_attachment_image($attributes['imgID'], 'full');
    ?>
            </div>
        </div>
    </div>
    <div>
        <div class="banner-cta">
            <button type="button"> <?php echo $attributes['btn_text']; ?>
            </button>
        </div>
    </div>
</section>
<?php return ob_get_clean();
}