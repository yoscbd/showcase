// Add your JS customizations here
import MyNotes from "./ybd";
import Like from "./like";


const notes = new MyNotes();
const likes = new Like();

(function ($) {
    $(document).ready(function () {
        // Bootstrap menus open on hover
        $('ul.nav li.dropdown').hover(function () {
            $('.dropdown-menu', this).fadeIn();
        }, function () {
            $('.dropdown-menu', this).fadeOut('fast');
        }); // hover


        //toggling section 3 tabs:
        $(".section-third h4.second").on("click", function (e) {
            e.preventDefault();  // prevent navigating
            var selector = $(this).data("toggle");  // get corresponding element
            $("div.toggle").hide("slow");
            $(selector).show("slow");
        });

    });


})(jQuery);





