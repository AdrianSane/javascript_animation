var bannerboy = bannerboy || {};
bannerboy.main = function() {

	var width = bannerboy.utils.getDimensions().width;
	var height = bannerboy.utils.getDimensions().height;
	var banner = bannerboy.createElement({id: "banner", width: width, height: height, backgroundColor: "#fff", overflow: "hidden", cursor: "pointer", parent: document.body});
	var main_tl;

	var images = [
		"img_cloudBig.png", 
		"img_cloudSmall.png", 
		"img_mario.png", 
		"img_pipe.png", 
		"img_floor.png", 
		"img_cta.png", 
		"img_coin.png", 
		"img_logo_mario.png"
	];

	bannerboy.preloadImages(images, function() {

		/* Create elements
		================================================= */
		
		/* eslint-disable indent */ 
		var bg = bannerboy.createElement({backgroundColor: "#7accc7", width: 300, height: 250, parent: banner});
		var img_cloudBig = bannerboy.createElement({backgroundImage: "img_cloudBig.png", left: -34, top: -23, retina: true, parent: banner});
		var img_cloudSmall = bannerboy.createElement({backgroundImage: "img_cloudSmall.png", left: 207, top: -6, retina: true, parent: banner});
		var img_mario = bannerboy.createElement({id: "mario", backgroundImage: "img_mario.png", left: 28, top: 117, retina: true, parent: banner});
		var img_pipe = bannerboy.createElement({backgroundImage: "img_pipe.png", left: 12, top: 165, retina: true, parent: banner});
		var img_floor = bannerboy.createElement({backgroundImage: "img_floor.png", top: 228, retina: true, parent: banner});
		var img_cta = bannerboy.createElement({backgroundImage: "img_cta.png", left: 85, top: 106, retina: true, parent: banner});
		var img_coin = bannerboy.createElement({backgroundImage: "img_coin.png", left: 141, top: 45, retina: true, parent: banner, opacity: 0});
			// var img_coin_1 = bannerboy.createElement({backgroundImage: "img_coin.png", left: 141, top: 45, retina: true, parent: banner});
			// var img_coin_2 = bannerboy.createElement({backgroundImage: "img_coin.png", left: 141, top: 45, retina: true, parent: banner});
			// var img_coin_3 = bannerboy.createElement({backgroundImage: "img_coin.png", left: 141, top: 45, retina: true, parent: banner});
			// var img_coin_4 = bannerboy.createElement({backgroundImage: "img_coin.png", left: 141, top: 45, retina: true, parent: banner});
			// var img_coin_5 = bannerboy.createElement({backgroundImage: "img_coin.png", left: 141, top: 45, retina: true, parent: banner});
		var img_logo_mario = bannerboy.createElement({backgroundImage: "img_logo_mario.png", left: 72, top: 17, retina: true, parent: banner});
		
		/* eslint-enable indent */

		/* Create additional elements
		================================================= */
		var border = bannerboy.createElement({border: "solid 1px #000", boxSizing: "border-box", width: width, height: height, parent: banner});

	  	/* Adjust elements
		================================================= */
		var clouds = [img_cloudBig, img_cloudSmall];
			// coins = [img_coin, img_coin_1, img_coin_2, img_coin_3, img_coin_4, img_coin_5];

		// var bounce = function(i){
		// 	for(var i = 0; i < coins.length; i++){
		// 		return new BBTimeline()
		// 		.to(coins[Math.floor(Math.random() * 6)], 2, {x: Math.floor(Math.random() * 401)})
		// 	}
		// }

		/* Particles
		================================================= */
		var particles_coin = new bannerboy.ParticleSystem({
			images: ["img_coin.png"],
			width: width,
			height: height,
			autoStart: false,
			lifespan: 5,
			maxParticles: 6,
			gravity: 0.5,
			wind: 0,
			opacity: 1,
			//turbulence: 0.1,
			emitter: {x: width / 2, y: 75, height: 5, width: 5},
			parent: banner,

			onEmitParticle: function(p) {
				p.scale = 0.5;
				p.vx = bannerboy.utils.randomRange(-2, 2);
				p.vy = bannerboy.utils.randomRange(-5, -7);
			},

			onUpdateParticle: function(p) {
				if (p.y > 220) p.vy *= -1;
				if (p.progress > 0.8 && p.scale > 0) {p.scale -= 0.01};
			}
		});
			

		/* Animations
		================================================= */

		var jump = function(obj){
			return new BBTimeline()
			.to(obj, .25, {y: -30, ease: Power2.easeIn})
			.chain()
			.to(obj, .5, {y: 60})
		}

		var blink = function(obj){
			return new BBTimeline().repeat(9)
			.from(obj, 1, {opacity: 0})
			.chain()
			.to(obj, 1.5, {opacity: 0})
		}

		// var splash = function(obj){
		// 	return new BBTimeline()
		// 	.staggerFromTo(coins, 2, {opacity:0}, {opacity: 1, y: 164, x: bounce, ease: Bounce.easeOut}, .15)
		// }

		clouds.in = new BBTimeline()
		.staggerFromTo(clouds, 20, {x: 335}, {x: -325}, .15).repeat(3)

		img_pipe.in = new BBTimeline()
		.from(img_pipe, 1, {y:150, scale:.75, ease: Elastic.easeOut.config(1, 1)})

		img_mario.in = new BBTimeline()
		.from(img_mario, 1, {y:150, scale:.25, ease: Elastic.easeOut.config(1, 1)})

		img_mario.jump = new BBTimeline()
		.to(img_mario, 1, {x: 105, ease: Sine.easeOut})
		.to(img_mario, 0.5, {y: -50, ease: Power2.easeOut})
		.chain()
		.to(img_mario, 0.5, {y: 60, ease: Power2.easeIn})


		img_pipe.out = new BBTimeline()
		.to(img_pipe, 1, {y: 150, scale: .5})

		img_logo_mario.in = new BBTimeline()
		.from(img_logo_mario, .25, {y: 20, scale: .75, opacity: 0, ease: Power2.easeIn})


		/* Timeline
		================================================= */
		main_tl = new BBTimeline()
		.offset(0.25)

		.add(clouds.in)

		.offset(.5)
		.add(img_pipe.in)

		.offset(.25)
		.add(img_mario.in)

		.offset(1.5)
		.add(img_mario.jump)

		.chain()
		.add(img_pipe.out)

		.offset(0.5)
		.add(jump(img_mario))


		.offset(0.105)
		.add(img_logo_mario.in)

		.offset(-0.5)
		.add(function() { particles_coin.start(); })
		//.add(splash())

		.offset(1)
		.add(blink(img_cta))



		scrubber(main_tl);
		/* Interactions
		================================================= */
		banner.onclick = function() {
			//
		};

		/* Helpers
		================================================= */

		/* Scrubber
		================================================= */
		function scrubber(tl) {
			if (window.location.origin == "file://") {
				bannerboy.include(["../bannerboy_scrubber.min.js"], function() {
					if (bannerboy.scrubberController) bannerboy.scrubberController.create({"main timeline": tl});
				});
			}
		}
	});
};