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

	function getPostWidth() {
		if (window.innerWidth > 992)
		{
			return '32%'
		} else if (window.innerWidth <= 992) {
			return '48%';
		}
	}

	if (window.innerWidth > 515) {
		// Massonry grid
		$('.masonry-wrapp').wookmark({
			itemWidth: getPostWidth(),
			flexibleWidth: getPostWidth(),
			offset: 15,
			autoResize: true
		});
	}

});

$(window).resize(function() {
	$('.masonry-wrapp').trigger('refreshWookmark');
})