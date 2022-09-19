<?php
/**
 * Template Name: homepage row html
 *
 * Template for row HTML version of Trulions homepage with no sidebars
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





        <main class="site-main" id="main" role="main">

            <section class="section-first">
                <div>
                    <div class="banner-title">
                        <h4><?php _e('Lease Accounting Software for IFRS 16', 'understrap');?></h4>
                    </div>
                </div>
                <div>
                    <div class="banner-main-section">
                        <div class="left">
                            <h3>
                                <?php _e('IFRS 16 compliance just got a whole lot easier thanks to AI-enhanced automated lease accounting software powered by Trullion', 'understrap');?>

                            </h3>
                            <p>
                                Lease accounting software can keep you ahead of IFRS 16-related changes thanks to
                                seamless automation and smart AI-enhanced capabilities. Say goodbye to errors and
                                regulatory risk, and hello to painless compliance.
                            </p>
                        </div>
                        <div class="right">
                            <?php display_acf_img('banner_main_img', 'full');?>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="banner-cta">
                        <button type="button">Accelerate your compliance now</button>
                    </div>
                </div>
            </section>

            <section class="section-second">
                <div class="grid-container">
                    <div class="item item1">
                        <h3>
                            IFRS 16 Compliance: <br />Challenges Ahead
                        </h3>
                    </div>
                    <div class="item item2">
                        <h4>New lease accounting standard</h4>
                        <p>
                            IFRS 16, the new lease accounting standard, brings sweeping changes to how we account for
                            leases, and affects every company and industry. Ensuring compliance is a challenge that
                            grows with each additional lease you have in place.
                        </p>
                    </div>
                    <div class="item item3">
                        <h4>Relooking at your reports</h4>
                        <p>
                            From office and other real estate leases to employee vehicles, equipment and even contracts
                            you were unaware had a lease element within them – IFRS 16 means completely relooking at how
                            your organization calculates, accounts for and reports on leases. This now includes
                            recognizing lease assets and liabilities on the balance sheet.
                        </p>
                    </div>
                    <div class="item item4">
                        <h4>Manual work increases the risk</h4>
                        <p>
                            Manually dealing with leases has not only become inefficient, it also exponentially
                            increases the risk of error and non-compliance, not to mention using up the precious time of
                            you and your team.
                        </p>
                    </div>

                </div>
            </section>
            <section class="section-third">
                <div class="section-container">
                    <div class="left">
                        <?php display_acf_img('section_3_img', 'full');?>
                    </div>
                    <div class="right">
                        <h4>In 30 Days Or Less!</h4>
                        <h3>Use Automation To Streamline Your Processes: Accelerate IFRS 16 Compliance With Trullion’s
                            Lease Accounting Software</h3>

                        <div class="toggle_tabs">

                            <div>
                                <h4 data-toggle="#div1" class="second">Automates IFRS 16 workflows</h4>
                                <div id="div1" class="toggle">
                                    <hr>
                                    <p>Your most precious resource is your time. Trullion automates IFRS 16 workflows to
                                        ensure compliance, eliminate error and streamline operations in a fraction of
                                        the time it would take without Trullion’s game-changing lease accounting
                                        software in place. </p>
                                    <hr>
                                </div>

                            </div>
                            <div>
                                <h4 data-toggle="#div2" class="second">Automates2</h4>
                                <div class="toggle" id="div2">
                                    <hr>
                                    <p>Your most precious 2 Trullion automates IFRS 16 workflows to ensure compliance,
                                        eliminate error and streamline operations in a fraction of the time it would
                                        take without Trullion’s game-changing lease accounting software in place.</p>
                                    <hr>
                                </div>
                            </div>
                            <div>
                                <h4 data-toggle="#div3" class="second">Automates 3 </h4>
                                <div class="toggle" id="div3">
                                    <hr>
                                    <p>Your most precious 3 Trullion automates IFRS 16 workflows to ensure compliance,
                                        eliminate error and streamline operations in a fraction of the time it would
                                        take without Trullion’s game-changing lease accounting software in place.</p>
                                    <hr>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </section>

            <section class="section-forth">

                <?php
if (current_user_can('administrator')) {
    ?>

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

                <?php }?>
                <div class="section-container">



                    <div class="left">

                        <h4>With Trullion’s AI-powered lease accounting software you can</h4>

                        <ul class="min-list link-list" id="my-notes">
                            <?php

$userNotes = new WP_Query(array(
    'post_type' => 'note',
    'posts_per_page' => 5,
    'orderby' => 'date',
    'order' => 'DESC',
));

while ($userNotes->have_posts()) {
    $userNotes->the_post();?>


                            <li data-id="<?php the_ID();?>"><i class="fa fa-check-square"
                                    aria-hidden="true"></i><?php echo esc_attr(get_the_title()); ?></li>



                            <?php }

?>
                        </ul>
                        <style>
                        #my-notes,
                        #my-notes li,
                        #my-notes p,
                        #my-notes i {
                            color: #fff;
                            list-style-type: none;
                        }
                        </style>
                        <!-- reset the main query loop -->
                        <?php wp_reset_postdata();?>

                        <button class="cta-button" type="button">Book a demo</button>




                    </div>
                    <div class="right">

                        <?php display_acf_img('section_4_trail', 'full');?>



                    </div>

                </div>


            </section>


            <section class="section-fifth">
                <div class="section-container">
                    <div class="quote">

                        <div class="quote-container">
                            <div class="quote-text-wrap">
                                <div class="title"><i class="fa fa-quote-left" aria-hidden="true"></i></div>
                                <p class="main-text">
                                    The biggest benefit of Trullion is the peace of mind, knowing that we have a
                                    solution to deploy when we have a new lease, a tried and true way of accounting for
                                    it safely and making sure there are no mistakes. I just know that I have a system
                                    that I can trust and that I don’t have to worry about and I know I’m not
                                    going to have issues in terms of accounting for my leases or finding my contracts.”
                                </p>
                                <p class="sub-text">
                                    Vincent Schurr, Global Director of Corporate Accounting and Consolidations at Eisai
                                    US

                                </p>
                            </div>
                            <div class="img-wrap"> <?php display_acf_img('quote_image', 'full');?></div>
                            <div class="icon-wrap"> <?php display_acf_img('quote_image_icon', 'full');?></div>

                        </div>

                    </div>
                    <div class="cta">
                        <h4>How Eisai Saved Time and Improved Accuracy with Trullion </h4>
                        <button class="cta" type="button">Read the Case Study</button>
                    </div>
                </div>


            </section>
            <section class="section-sixth">
                <div class="section-container">
                    <h4>Features and Benefits</h4>
                    <div class="items">

                        <div class="item">
                            <div class="icon"><?php display_acf_img('item_icon', 'full');?></div>
                            <h6>AI-Powered Data Entry</h6>
                            <p class="text">
                                Simply and automatically extract key data points directly from PDF contracts and Excel
                                files to generate the necessary ASC 842 reports with just one click journal entries,
                                full disclosure reports, and other business intelligence.
                            </p>
                        </div>


                        <div class="item">
                            <div class="icon"><?php display_acf_img('item_icon', 'full');?></div>
                            <h6>Intuitive, Easy to Use UI</h6>
                            <p class="text">
                                Navigate seamlessly through our modern, clean, and easy-to-use interface, built for
                                financial leaders.
                            </p>
                        </div>


                        <div class="item">
                            <div class="icon"><?php display_acf_img('item_icon', 'full');?></div>
                            <h6>Automated Bulk Upload & Modification Detection</h6>
                            <p class="text">
                                Upload any Excel file and the software can detect new, changed and modified leases.
                            </p>
                        </div>


                        <div class="item">
                            <div class="icon"><?php display_acf_img('item_icon', 'full');?></div>
                            <h6>Streamline ASC 842 Compliance</h6>
                            <p class="text">
                                Automate ASC 842 workflows to generate 100% auditable journal entries and disclosures.
                                Get compliant in 30 days or less.
                            </p>
                        </div>


                        <div class="item">
                            <div class="icon"><?php display_acf_img('item_icon', 'full');?></div>
                            <h6>ERP Entries & Dynamic Reporting</h6>
                            <p class="text">
                                Leverage our modern user experience to generate ERP-ready journal entries, full
                                disclosure reports, and other business intelligence.
                            </p>
                        </div>


                        <div class="item">
                            <div class="icon"><?php display_acf_img('item_icon', 'full');?></div>
                            <h6>SOC 1 & SOC 2 Audited </h6>
                            <p class="text">
                                Backed by SOC reports by Big 4 audit firms and stored in the most secure cloud
                                environment.
                            </p>
                        </div>



                    </div>
                </div>
            </section>
            <section class="section-seventh">
                <section class="section-container">
                    <div class="left"><?php display_acf_img('sec_7_img', 'full');?></div>
                    <div class="right">
                        <h2>IFRS 16 Lease Accounting Software Implementation </h2>
                        <p>
                            Implementing IFRS 16 accounting software should require minimal time and effort on your
                            part.
                        </p>
                        <p>
                            With Trullion, you can achieve IFRS 16 compliance in just 30 days or less, without heavy
                            involvement from your IT department and no costly integrations between ERP systems.
                        </p>
                        <p>
                            Trullion’s team of experts will get you onboarded in no time, and once you get started, the
                            Trullion support team is available to help with any request or need.

                        </p>
                    </div>
                </section>
            </section>


            <section class="section-8">
                <section class="section-container">
                    <div class="cta">
                        <h5>Get started with Trullion today! </h5>
                        <button class="cta" type="button">Request a Demo</button>
                    </div>

                </section>
            </section>

        </main><!-- #main -->





    </div><!-- #content -->

</div><!-- #full-width-page-wrapper -->

<?php
get_footer();