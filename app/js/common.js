$(function() {

	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};
	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });

	// Search toggle
	$('.toggle-search').click(function() {
		$(this).toggleClass('active');
		$('.search-wrapp').slideToggle();
	});
	$('.search-panel .fa-close').click(function(){
		$('.search-wrapp').slideUp();
		$('.toggle-search').removeClass('active');
	})

	// Mobile menu
	$('.toggle-mnu').click(function(){
		$(this).toggleClass('active');
		$('.main-nav-wrapp').toggleClass('active');
	})

	// Massonry grid
	$('.masonry-wrapp').masonry({
		itemSelector: '.post',
		gutter: '.gutter-sizer',
		percentPosition: true,
		fitWidth: true,
		stagger: 30
	});

});
