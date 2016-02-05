$(function(){
	fast_click();
	fullpage_init();
	form_init();
	mascot_anim_init();
	scrollTo_init();
	lazy_init();
});
function mascot_anim_init() {
	var minWidth = 767;
	var mq_width = window.matchMedia( "(min-width: "+ minWidth +"px)" ).matches;
	if (mq_width != true) return;
	var tl_before = [];
	var before_size = ('.mascot .before i').length;
	var tl_after = [];
	var after_size = ('.mascot .before i').length;
	$('.mascot .before i').each(function(index){
		var $this = $(this);
		tl_before[index] = new TimelineLite();
		var x =-rnd(200, 420);
		var y=-rnd(280, 420);
		tl_before[index]
			.delay(index)
			.to($this, 0, {x:x, y:y, opacity: 0})
			.to($this, 0.1, {opacity: 1 })
			.to($this, 2, {x:0, y:0, opacity: 1, rotation:rnd(-180, 180), case: Power1.easeOut})
			.to($this, 0.1, {opacity: 0})
			.to($this, 6, {opacity: 0, onComplete: function(){tl_before[index].restart();}})
	})
	$('.mascot .after i').each(function(index){
		var $this = $(this);
		tl_after[index] = new TimelineLite();
		var x =rnd(200, 420);
		var y=-rnd(280, 420);
		tl_after[index]
			.delay(index)
			.from($this, 0, {x:0, y:0, opacity: 0})
			.to($this, 0.1, {opacity: 1})
			.to($this, 1.6, {x:x, y:y, opacity: 1, rotation:rnd(-180, 180), ease: Power1.easeIn })
			.to($this, 0.1, {opacity: 0})
			.to($this, 5, {opacity: 0, onComplete: function(){tl_after[index].restart();}})
	})

	function rnd(min, max) {
		var rand = min + Math.random() * (max - min)
		rand = Math.round(rand);
		return rand;
	}
};

function fast_click() {
	$('label').addClass('needsclick');
	FastClick.attach(document.body);
};

function fullpage_init() {
	var $fullpage = $('.fullpage');
	var minWidth = 1023;
	var minHeight = 739;
	var $body = $("body");
	var $window = $(window);
	if (!$fullpage.length) return;
	function init() {
		$fullpage.fullpage({
			css3: true,
			navigation: true,
			navigationPosition: 'right',
			responsiveWidth: minWidth,
			responsiveHeight: minHeight,
			afterResize: function(){
				responsive();
			},
			afterLoad: function(anchorLink, index){
				var loadedSection = $(this);
				if(index == 2){
					var timer = 0;
					var animEffect = ['fadeInUp', 'fadeInRight', 'fadeInLeft'];
					loadedSection.find('li').each(function(index){
						var $this = $(this);
						setTimeout(function(){
							$this.addClass('animated ' + animEffect[index])
						},timer)
						timer = timer + 200;
					});
				}
				if(index == 4){
					var timer = 0;
					var $items = loadedSection.find('li');;
					$items.each(function(){
						var $this = $(this);
						setTimeout(function(){
							$this.addClass('animated fadeInUp')
						},timer);
						timer = timer + 200;
					});
				}
			}
		});
		$fullpage.on('click','.next-slide', function(){
			$.fn.fullpage.moveSectionDown();
			if ($fullpage.hasClass('fp-destroyed')) {
				var $target = $(this).closest('.section').next();
				var offset;
				var header_height = $('.header').innerHeight();
				offset = $target.offset().top - header_height;
				$('html, body').animate({
					scrollTop: offset + 'px'
				}, 'normal');
				return false;
			};
			return false;
		});
	}
	init();
	responsive();

	function responsive() {
		if (minWidth >= $window.width() || minHeight >= $(window).height()) {
			if ($fullpage.hasClass('fp-destroyed')) return;
			$.fn.fullpage.destroy('all');
		}
		else {
			if ($fullpage.hasClass('fp-destroyed')) {
				init();
			}
		}
	}

	var rtime;
	var timeout = false;
	var delta = 200;
	$window.resize(function() {
		rtime = new Date();
		if (timeout === false) {
			timeout = true;
			setTimeout(resizeend, delta);
		}
	});

	function resizeend() {
		if (new Date() - rtime < delta) {
			setTimeout(resizeend, delta);
		} else {
			timeout = false;
			responsive();
		}
	};
};

function scrollTo_init() {
	$('a[data-toggle="scroll"]').on('click', function(){
		var $this = $(this);
		var offset, target;
		if ($this.hasClass('contactus')) {
			$.fn.fullpage.moveTo(5);
		}
		if ($this.data('target')) {
			$target = $($this.data('target'));
		} else  {
			$target = $($(this).attr('href'));
		}
		var header_height = $('.header').innerHeight();
		if ($target.length) {
			offset = $target.offset().top - parseInt($target.css( "margin-top" )) - header_height;
		} else {
			offset = 0
		}
		$('html, body').animate({
				scrollTop: offset + 'px'
		}, 'normal');
		return false;
	});
}

function form_init() {
	$('.contactus-form form').each(function(){
		$(this).validate({
			rules: {
				name: {
					required: true,
					minlength: 2
				},
				email: {
					required: true,
					email: true
				},
				msg: {
					required: true,
					minlength: 2
				}
			},
			messages: {
				name: {
					required: "Please enter a name",
					minlength: "Your name must consist of at least 2 characters"
				},
				email: "Please enter a valid email address",
				msg: {
					required: "Please enter a message",
					minlength: "Your message must consist of at least 2 characters"
				}
			},
			submitHandler: function(form) {
				var $thisForm = $(form);
				var minWidth = 767;
				var timeout = 0;
				var mq_width = window.matchMedia( "(min-width: "+ minWidth +"px)" ).matches;
				$thisForm.parent().addClass('loading');
				$thisForm.find(".alert").hide();
				$.ajax({
					type: "POST",
					url: $thisForm.attr("action"),
					data: $thisForm.serialize(),
					success: function( data ) {
						data = $.parseJSON(data);
						$thisForm.parent().removeClass('loading');
						if (data.email == false) {
							$thisForm.find(".alert.error").show().html(data.email_text);
						}
						else {
							$thisForm.parent().removeClass('loading');
							if (mq_width == true) {
								$thisForm.closest('.letter').addClass('packing-letter');
								timeout = 2000;
							}
							setTimeout(function(){
								$thisForm[0].reset();
								$thisForm.closest('.letter').removeClass('packing-letter');
							}, timeout);
							if (mq_width != true) {
								var $alert_success = $thisForm.find(".alert.success");
								$alert_success.show().html(data.email_text);
								setTimeout(function(){
									$alert_success.hide().html('');
								}, 2000);
							}
						}
					}
				});
				return false;
			}
		});
	});
}

function lazy_init() {
	$("img.lazy").Lazy({
		effect: 'fadeIn',
		effectTime: 200,
		afterLoad: function(el){
			$(el).parent().removeClass('loading');
		}
	});
}
