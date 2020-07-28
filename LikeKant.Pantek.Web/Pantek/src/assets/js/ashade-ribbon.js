/** 
 * Author: Shadow Themes
 * Author URL: http://shadow-themes.com
 */
"use strict";

let ashade_ribbon = {
	$el: jQuery('.ashade-albums-carousel'),
	type: 'large',
	target: 0,
	current: 0,
	isDown: false,
	isDownLink: false,
	isLinkMoved: false,
	isTouch: false,
	
	// Scroll Speed Option for Touch Devices
	touchSpeed: {
		vertical: 2, // Speed factor for Vertical Ribbon
		horizontal: 2, // Speed factor for Horizontal Ribbon
	},

	init: function() {
		if (ashade_ribbon.$el.hasClass('is-medium')) {
			ashade_ribbon.$bar = ashade_ribbon.$el.parent().children('.ashade-albums-carousel-progress');
			ashade_ribbon.barTarget = 0;
			ashade_ribbon.barCurrent = 0;
			ashade_ribbon.type = 'medium';
		}		
		if (ashade_ribbon.$el.hasClass('is-vertical')) {
			ashade_ribbon.type = 'vertical';
		}

		// Mouse Events
		ashade_ribbon.$el.on('mousedown', function(e) {
			if (ashade_ribbon.isTouch) {
				ashade_ribbon.isTouch = false;
			}
			if (!ashade_ribbon.$el.hasClass('is-hovered')) {
				e.preventDefault();
				ashade_ribbon.isDown = true;
				ashade_ribbon.$el.addClass('is-grabbed');
				if (ashade_ribbon.type == 'vertical') {
					ashade_ribbon.old_pageX = e.clientY;
				} else {
					ashade_ribbon.old_pageX = e.clientX;
				}
			}
		}).on('mouseup', function() {
			ashade_ribbon.isDown = false;
			ashade_ribbon.$el.removeClass('is-grabbed');
			ashade_ribbon.isDownLink = false;
		}).on('mouseleave', function() {
			ashade_ribbon.isDown = false;
			ashade_ribbon.$el.removeClass('is-grabbed');
			ashade_ribbon.isDownLink = false;
		}).on('mousemove', function(e) {
			e.preventDefault();
			if (ashade_ribbon.isDown) {
				if (ashade_ribbon.type == 'vertical') {
					let newX = (ashade_ribbon.old_pageX - e.clientY)*2,
						newTop = $ashade_window.scrollTop() + newX;
					ashade_ribbon.old_pageX = e.clientY;
					$ashade_window.scrollTop(newTop);
				} else {
					let newX = ashade_ribbon.old_pageX - e.clientX,
						newTop = $ashade_window.scrollTop() + newX;
					ashade_ribbon.old_pageX = e.clientX;
					$ashade_window.scrollTop(newTop);					
				}
			}
			if (ashade_ribbon.isDownLink) {
				ashade_ribbon.isLinkMoved = true;
			} else {
				ashade_ribbon.isLinkMoved = false;
			}
		});
		
		// Touch Events
		ashade_ribbon.$el[0]?.addEventListener('touchstart', function(e) {
			if (!ashade_ribbon.isTouch) {
				ashade_ribbon.isTouch = true;
			}
			ashade_ribbon.isDown = true;
			ashade_ribbon.$el.addClass('is-grabbed');
			if (ashade_ribbon.type == 'vertical') {
				ashade_ribbon.old_pageX = e.touches[0].clientY;
			} else {
				ashade_ribbon.old_pageX = e.touches[0].clientX;
			}
		}, false);
		ashade_ribbon.$el[0]?.addEventListener('touchmove', function(e) {
			if (ashade_ribbon.isDown) {
				if (ashade_ribbon.type == 'vertical') {
					let newX = (ashade_ribbon.old_pageX - e.touches[0].clientY)*ashade_ribbon.touchSpeed.vertical,
						newTop = $ashade_window.scrollTop() + newX;
					ashade_ribbon.old_pageX = e.touches[0].clientY;
					$ashade_window.scrollTop(newTop);
				} else {
					let newX = (ashade_ribbon.old_pageX - e.touches[0].clientX)*ashade_ribbon.touchSpeed.horizontal,
						newTop = $ashade_window.scrollTop() + newX;
					ashade_ribbon.old_pageX = e.touches[0].clientX;
					$ashade_window.scrollTop(newTop);
				}
			}
			if (ashade_ribbon.isDownLink) {
				ashade_ribbon.isLinkMoved = true;
			} else {
				ashade_ribbon.isLinkMoved = false;
			}			
		}, false);
		ashade_ribbon.$el[0]?.addEventListener('touchend', function(e) {
			ashade_ribbon.isDown = false;
			ashade_ribbon.$el.removeClass('is-grabbed');
			ashade_ribbon.isDownLink = false;
		}, false);

		// Links and Buttons
		ashade_ribbon.$el.find('a.ashade-button').on('mouseover', function() {
			if (!ashade_ribbon.isTouch) {
				ashade_ribbon.$el.addClass('is-hovered');
			}
		}).on('mouseout', function(){
			ashade_ribbon.$el.removeClass('is-hovered');
		});
		ashade_ribbon.$el.find('a').on('mousedown', function() {
			ashade_ribbon.isDownLink = true;
		}).on('click', function(e) {
			if (ashade_ribbon.isLinkMoved) {
				e.preventDefault();
				return false;
			}
			ashade_ribbon.isDownLink = false;
			ashade_ribbon.isLinkMoved = false;
		});
		
		ashade_ribbon.$el.find('.ashade-album-item').each(function() {
			if ('IntersectionObserver' in window) {
				ashade_ribbon.observer.observe(this);
			} else {
				jQuery(this).children('.ashade-album-item__inner').addClass('is-inview');
			}
		});

		// Layout
		ashade_ribbon.layout();

		// Start Animation
		ashade_ribbon.animate();
	},
	layout: function() {
		let $this = ashade_ribbon.$el,
			fullWidth = 0,
			setHeight;

		if (ashade_ribbon.type == 'large') {
			setHeight = $ashade_window.height() - $ashade_header.height() - $ashade_footer.height();
			// $this.css('top', $ashade_header.height());
		}
		if (ashade_ribbon.type == 'medium') {
			setHeight = $ashade_window.height()/2;
		}

		if (ashade_ribbon.type == 'large' || ashade_ribbon.type == 'medium') {
			$this.height(setHeight).find('.ashade-album-item__title').width(setHeight);
			$this.find('.ashade-album-item').each(function() {
				let $this_slide = jQuery(this),
					$this_slide_img = $this_slide.find('img');

				if ($this_slide_img.attr('height') && $this_slide_img.attr('width')) {
					$this_slide.height(setHeight);
					let imgRatio = parseInt($this_slide_img.attr('width'), 10)/parseInt($this_slide_img.attr('height'), 10),
						setWidth = setHeight*imgRatio;

					$this_slide_img.height(setHeight).width(setWidth);
					fullWidth = fullWidth + $this_slide.width();
				} else {
					$this_slide.height(setHeight);
				}
			});
		}

		if (ashade_ribbon.type == 'vertical') {
			$this.find('.ashade-album-item').each(function() {
				let $this_slide = jQuery(this),
					$this_slide_img = $this_slide.find('img'),
					setHeight = $this_slide_img.height();

				$this_slide.find('.ashade-album-item__title').width(setHeight);

				fullWidth = fullWidth + $this_slide.height();
			});
			fullWidth = fullWidth + $ashade_header.height() + $ashade_footer.height();
			$this.css('padding', $ashade_header.height()+'px 0 ' + $ashade_footer.height() + 'px 0')
			$this.height(fullWidth);
		} else {
			$this.width(fullWidth);
		}

		if (ashade_ribbon.type == 'vertical') {
			let body_height = fullWidth;
			$ashade_body.height(body_height);
		} else {
			let spacingLeft = parseInt($this.find('.ashade-album-item__inner').css('margin-right'), 10),
				body_height = fullWidth - $ashade_window.width() + spacingLeft + $ashade_window.height();


			$this.css('padding-left', spacingLeft + 'px');
			$ashade_body.height(body_height);
		}
	},
	animate: function() {
		if (ashade_ribbon.type == 'vertical') {
			// Scroll Content
			ashade_ribbon.current += ((ashade_ribbon.target - ashade_ribbon.current) * 0.1);
			ashade_ribbon.$el.css('transform', 'translate3d(0, -'+ ashade_ribbon.current +'px, 0)');
			// Img Motion Effect
			let img_current = (ashade_ribbon.target - ashade_ribbon.current) * 0.1;
			ashade_ribbon.$el.find('.ashade-album-item__overlay').css('transform', 'translate3d(0, '+ img_current +'px, 0)');
			ashade_ribbon.$el.find('img').css('transform', 'translate3d(0, '+ img_current +'px, 0)');
		} else {
			// Scroll Content
			ashade_ribbon.current += ((ashade_ribbon.target - ashade_ribbon.current) * 0.1);
			ashade_ribbon.$el.css('transform', 'translate3d(-'+ ashade_ribbon.current +'px, 0, 0)');
			// Img Motion Effect
			let img_current = (ashade_ribbon.target - ashade_ribbon.current) * 0.1;
			ashade_ribbon.$el.find('.ashade-album-item__overlay').css('transform', 'translate3d('+ img_current +'px, 0, 0)');
			ashade_ribbon.$el.find('img').css('transform', 'translate3d('+ img_current +'px, 0, 0)');			
			// Bar Update
			if (ashade_ribbon.type == 'medium') {
				ashade_ribbon.barCurrent += ((ashade_ribbon.barTarget - ashade_ribbon.barCurrent) * 0.1);
				ashade_ribbon.$bar.children('.ashade-albums-carousel-progress__bar').width(ashade_ribbon.barCurrent);
			}			
		}
		// Update Frame
		requestAnimationFrame( ashade_ribbon.animate );
	}
};
if ('IntersectionObserver' in window) {
	ashade_ribbon.observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if(entry.isIntersecting) {
				jQuery(entry.target).children('.ashade-album-item__inner').addClass('is-inview');
			} else {
				jQuery(entry.target).children('.ashade-album-item__inner').removeClass('is-inview');
			}
		});
	});
}

jQuery(document).ready( function() {
	ashade_ribbon.init();
});

$ashade_window.on('resize', function() {
	// Window Resize Actions
    ashade_ribbon.layout();
	setTimeout(ashade_ribbon.layout(), 500);
}).on('load', function() {
	// Window Load Actions
    ashade_ribbon.layout();
}).on('scroll', function() {
	if ($ashade_body.hasClass('ashade-albums-template--carousel')) {
		ashade_ribbon.target = $ashade_window.scrollTop();
		if (ashade_ribbon.type == 'medium') {
			let percent = Math.ceil($ashade_window.scrollTop() * 100 / ($ashade_body.height() - $ashade_window.height()));
			ashade_ribbon.barTarget = ashade_ribbon.$bar.width() * (percent/100);
		}
	}
});