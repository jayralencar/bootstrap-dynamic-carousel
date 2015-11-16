/*!
 * Bootstrap Dynamic Carousel v1.1.0 (https://github.com/JayrAlencar/bootstrap-dynamic-carousel)
 *
 * Copyright 2015 Jayr Alencar (http://jayralencar.com.br)
 * Licensed under the The MIT License (MIT) (https://github.com/JayrAlencar/bootstrap-dynamic-tabs/blob/master/LICENSE)
 */
 (function ( $ ) {

	//YOUTUBE
	var player;
	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	// VIMEO
	var tag = document.createElement('script');
	tag.src = "http://f.vimeocdn.com/js/froogaloop2.min.js";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);



	$.fn.bootstrapDynamicCarousel = function(options) {
		var settings = $.extend({
			interval: 5000,
			controls: true,
			indicators: true,
			id: this.attr('id')
		}, options );

		this.carousel({
			interval: settings.interval
		}).addClass('carousel slide').attr({
			'data-rid':'carousel',
			id: settings.id
		});

		if(!this.find('.carousel-indicators').length){
			if(settings.indicators){
				this.append('<ol class="carousel-indicators"></ol>')
			}
		}

		if(!this.find('.carousel-inner').length){
			this.append($('<div/>',{
				class: 'carousel-inner',
				role: 'listbox'
			}));
		}

		if(settings.controls){
			var left = $('<a/>',{
				class: 'left carousel-control',
				href: '#'+settings.id,
				role: 'button',
				'data-slide':'prev'
			}).append($('<span/>',{
				class: 'glyphicon glyphicon-chevron-left',
				'aria-hidden': 'true'
			})).append($('<span/>',{
				class: 'sr-only'
			}).text("Previous"));

			var right = $('<a/>',{
				class: 'right carousel-control',
				href: '#'+settings.id,
				role: 'button',
				'data-slide':'next'
			}).append($('<span/>',{
				class: 'glyphicon glyphicon-chevron-right',
				'aria-hidden': 'true'
			})).append($('<span/>',{
				class: 'sr-only'
			}).text("Next"));

			if(!this.find('carousel-control').length){
				this.append(left).append(right)
			}
		}

		var myCarousel = this;
		this.on('slid.bs.carousel', function(){
			var e = jQuery.Event( "slided" );
			myCarousel.find('.carousel-inner').find('.active').trigger(e)
		});
		this.on('slide.bs.carousel', function(){
			var ev = jQuery.Event( "sliding" );
			myCarousel.find('.carousel-inner').find('.active').trigger(ev)
		});
		return this;
	};

	$.fn.addItem = function(options){
		// alert(this.attr('id'))
		var settings = $.extend({
			type: 'image',
			href: '#',
			captionTag: 'h3',
			active: false
		}, options );

		// IMAGE
		if(settings.type=='image'){
			image = $('<img/>',{
				class: 'img-resonsive',
				src: settings.url
			}).css({
				width: this.width(),
				height: this.height()
			});

			var a = $('<a/>',{
				href:settings.href
			}).append(image);

			var item = $('<div/>',{
				class: 'item',
				type: settings.type
			}).append(a);

			if(settings.id){
				item.attr('id', settings.id);
			}

			if(settings.active){
				this.find('.carousel-inner').find('.active').removeClass('active');
				item.addClass('active')
			}

			if(settings.caption){
				var caption = $('<div/>',{
					class: 'carousel-caption'
				}).append($('<'+settings.captionTag+'/>').text(settings.caption));
				item.append(caption)
			}

		}

		//YOUTUBE
		if(settings.type == 'youtube'){
			var videoId = gup('v',settings.url);
			var width = this.width();
			var height = this.height();

			var myCarousel = this;

			var item = $('<div/>',{
				class: 'item',
				type: settings.type
			});

			if(settings.id){
				item.attr('id', settings.id);
			}

			item.on('sliding', function(){
				player.destroy()
			});
			
			item.on('slided', function(){
				var divVideo = $('<div/>',{id: videoId}).appendTo(item)
				player = new YT.Player(videoId, {
					width: width,
					height: height,
					videoId : videoId,
					events : {
						'onReady' : function(event){
							event.target.playVideo();
							myCarousel.carousel('pause')
						},
						'onStateChange' : function(event){
							if (event.data == '0') {
								player.destroy()
								myCarousel.carousel('next').carousel('cycle');
							}
						}
					}
				});
			})
			
		}


		//VIMEO
		if(settings.type == 'vimeo'){
			var parts = settings.url.split('/');
			var videoId = parts.pop();
			var myCarousel = this;
			var playerV;

			var iframe = $('<iframe/>',{
				id: videoId,
				src: 'https://player.vimeo.com/video/'+videoId+'?api=1&player_id='+videoId,
				width: this.width(),
				height: this.height(),
				frameborder: 0,
				webkitallowfullscreen: true,
				mozallowfullscreen: true,
				allowfullscreen: true
			});

			var item = $('<div/>',{
				class: 'item',
				type: settings.type
			});

			if(settings.id){
				item.attr('id', settings.id);
			}

			item.on('slided', function(){
				myCarousel.carousel('pause')
				item.append(iframe)
				playerV = $f(iframe[0]);
				playerV.addEvent('ready', function(){
					playerV.api('play');
					playerV.addEvent('finish', function(id){
						myCarousel.carousel('next').carousel('cycle');
					});
				});
			});
			item.on('sliding', function(){
				iframe.remove();
			})

		}

		if(this.find('.carousel-indicators').length){
			var size = this.find('.carousel-indicators').find('li').size();
			var indicator = $('<li/>',{
				'data-target': '#'+this.attr('id'),
				'data-slide-to': size
			});

			if(settings.active){
				this.find('.carousel-indicators').find('.active').removeClass('active');
				indicator.addClass('active');
			}
			this.find('.carousel-indicators').append(indicator)
		}		

		this.find('.carousel-inner').append(item);

	}

	$.fn.removeById = function(id){
		var element = this.find('.carousel-inner').find('#'+id);
		if(element.hasClass('active')){
			this.carousel('next');
		}
		element.remove();
	}

	function gup( name, url ) {
		if (!url) url = location.href;
		name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		var regexS = "[\\?&]"+name+"=([^&#]*)";
		var regex = new RegExp( regexS );
		var results = regex.exec( url );
		return results == null ? null : results[1];
	}
	
}( jQuery ));
