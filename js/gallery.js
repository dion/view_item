	var ViewItemGallery = function () {
		this.element = document.querySelector('.hero img'); 
		this.thumbs = document.getElementById('hero-thumbs');
		this._init();

	};

	ViewItemGallery.prototype._init = function () {
		this.calculateThumbnails();
		this._bind();
	};

	ViewItemGallery.prototype._bind = function () {
		var self = this;
		
		this.thumbs.addEventListener('click', function (e) { 
			e.preventDefault();
			
			var targetType = e.target.nodeName,
			    imageSource = e.srcElement ? e.srcElement.src : e.target.src;

			if (targetType === 'IMG') {
				self.element.src = imageSource;
				new ResizeHeroImage();
			}
		}, false);

		window.addEventListener('load', function (e) {
			new ResizeHeroImage();
		}, false);
	};

	ViewItemGallery.prototype.calculateThumbnails = function () {
		var items = this.thumbs.querySelectorAll('li'),
		    total = items.length,
		    totalWidth = (total * 56);

		if (totalWidth <= 459) {
			this.thumbs.style.width = totalWidth + 'px';
		} else {
			this.thumbs.style.width = '459px';
		}
	};

	var ResizeHeroImage = function () {
		this.element = document.querySelector('.hero .herowrapper img'); 

		this._init();
	};

	ResizeHeroImage.prototype._init = function () {
		var width = this.element.offsetWidth,
		    height = this.element.offsetHeight;

		//if (width >= 500 || height >= 500) {
			if (width > height) {
				this.element.style.width = '500px';
				this.element.style.height = '';
			}

			if (height > width) {
				this.element.style.height = '500px';
				this.element.style.width = '';
			}

			if (width === height && width < 500) {
				this.element.style.width = '';
				this.element.style.height = '500px';
			}

			if (width === height && width > 500) {
				this.element.style.width = '500px';
				this.element.style.height = '';
			}
		//}
	};
/*
	ProwlerScrolling 
	--Tracks page Y coordinates and toggles visibility of prowler bar and toggles current segments on prowler nav
*/
	var ProwlerScrolling = function () {
		this.element = document.querySelector('.prowler_bar');
		this.isOpened = false;
		
		var self = this;

		window.addEventListener('load', function () {
			self._init();
		}, false);
	};

	ProwlerScrolling.prototype._init = function () {
		this.itemSpecifics = document.querySelector('.item-specifics').offsetTop;
		this.sellerDescription = document.querySelector('.seller-description').offsetTop;
		this.sellerInformation = document.querySelector('.seller-information').offsetTop;
		this.shippingPayments = document.querySelector('.shipping-payments').offsetTop;
		this.faqs = document.querySelector('.faqs').offsetTop;
		this.returns = document.querySelector('#returnpolicy').offsetTop;
		this.prowlerNav = this.element.querySelector('.activesummary');
		
		var self = this,
		    backToTop = this.element.querySelector('.backtotop'),
		    inpageNav = document.querySelector('.subnav'),
		    buyOptionsBtn = document.querySelector('.buyoptions'),
		    buyingOptionsbox = document.querySelector('#buyingoptionsbox'),
		    buyingOptionsboxContent = document.querySelector('#buyingoptionsbox .buyingcontent'),
		    headerShipping = document.querySelector('.headershipping'),
		    headerReturns = document.querySelector('.headerreturns'),
		    headerDelivery = document.querySelector('.headerdelivery'),
		    headerCondition = document.querySelector('.headercondition'),
		    headerSpecifics = document.querySelector('.headerspecifics'),
		    prowlerone = document.querySelector('.prowler_content #prowlerone'),
		    prowlertwo = document.querySelector('.prowler_content #prowlertwo'),
		    prowlerthree = document.querySelector('.prowler_content #prowlerthree');

		window.addEventListener('scroll', function (e) {
			self.toggleProwlerBar();
		}, false);

		backToTop.addEventListener('click', function (e) {
			e.preventDefault(e);
			$('html,body').stop().animate({scrollTop:0}, 100);
		}, false);

		this.prowlerNav.addEventListener('click', function (e) {
			e.preventDefault();
			self.scrollToPosition(e);
		}, false);

		/* temporary */
		headerShipping.addEventListener('click', function (e) {
			e.preventDefault();

			$('html,body').animate({scrollTop: (self.shippingPayments - 100)}, 100);
		}, false);

		if (prowlerone) {
			prowlerone.addEventListener('click', function (e) {
				e.preventDefault();

				$('html,body').animate({scrollTop: (self.itemSpecifics - 100)}, 100);
			}, false);
		}

		if (headerSpecifics) {
			headerSpecifics.addEventListener('click', function (e) {
				e.preventDefault();

				$('html,body').animate({scrollTop: (self.itemSpecifics - 100)}, 100);
			}, false);	
		}
		
		if (prowlertwo) {
			prowlertwo.addEventListener('click', function (e) {
				e.preventDefault();

				$('html,body').animate({scrollTop: (self.shippingPayments - 100)}, 100);
			}, false);
		}

		if (prowlerthree) {
			prowlerthree.addEventListener('click', function (e) {
				e.preventDefault();

				$('html,body').animate({scrollTop: (self.returns - 150)}, 100);
			}, false);
		}

		if (headerReturns) {
			headerReturns.addEventListener('click', function (e) {
				e.preventDefault();

				$('html,body').animate({scrollTop: (self.returns - 170)}, 100);
			}, false);
		}

		if (headerDelivery) {
			headerDelivery.addEventListener('click', function (e) {
				e.preventDefault();

				$('html,body').animate({scrollTop: (self.shippingPayments - 100)}, 100);
			}, false);
		}

		if (headerCondition) {
			headerCondition.addEventListener('click', function (e) {
				e.preventDefault();

				$('html,body').animate({scrollTop: (self.itemSpecifics - 100)}, 100);
			}, false);
		}
		/* temporary */

		inpageNav.addEventListener('click', function (e) {
			e.preventDefault();
			self.scrollToPosition(e);
		}, false);

		buyOptionsBtn.addEventListener('click', function (e) {
			e.preventDefault();
		}, false);

		buyOptionsBtn.addEventListener('mouseover', function () {
			buyingOptionsbox.style.display = 'block';
			self.buyOptionsOpened = true;
		}, false);

		buyingOptionsbox.addEventListener('mouseout', function (e) {
			if (self.buyOptionsOpened) {
				var xPos = e.x,
				    yPos = e.y;

				if (xPos <= 1124 || xPos >= 1385) { //|| yPos >= 270) {
					buyingOptionsbox.style.display = 'none';
				}
			}
		}, false);

		buyingOptionsboxContent.addEventListener('click', function (e) {
			e.preventDefault();

			if (e.target.nodeName === 'IMG' && e.target.parentNode.nodeName === 'A') {
				console.log('img btn clicked');
			}
		}, false);
	};

	ProwlerScrolling.prototype.scrollToPosition = function (e) {
		var position = 0,
		    offset = 100;

		if (e.target.nodeName === 'A') {
			if (e.target.innerHTML === 'Item specifics') {
				position = this.itemSpecifics;
			}

			if (e.target.innerHTML === 'Description') {
				position = this.sellerDescription;
			}

			if (e.target.innerHTML === 'Seller information') {
				position = this.sellerInformation;
			}

			if (e.target.innerHTML === 'Shipping and payments') {
				position = this.shippingPayments;
			}

			if (e.target.innerHTML === 'FAQs') {
				position = this.faqs;
			}

			$('html,body').animate({scrollTop: (position - offset)}, 100);
		}
	};

	ProwlerScrolling.prototype.toggleProwlerBar = function () {
		var offset = 100;
		if (window.pageYOffset >= (this.itemSpecifics - offset)) {
			if (!this.isOpened) {
				//this.element.style.display = 'block';
				$(this.element).fadeIn();
				this.isOpened = true;
			}	
		} else {
			if (this.isOpened) {
				$(this.element).fadeOut();
				//this.element.style.display = 'none';
				this.isOpened = false;
			}
		}

		if (this.isOpened) {
			this.activateCurrentSegment();
		}
	};

	ProwlerScrolling.prototype.activateCurrentSegment = function () {
		var offset = 100,
			faqHeight = document.querySelector('.faqs').offsetHeight;

		
		if (window.pageYOffset >= (this.itemSpecifics - offset) && window.pageYOffset <= this.sellerDescription) {
			this.setActive(0);
		}

		if (window.pageYOffset >= (this.sellerDescription - offset) && window.pageYOffset <= this.sellerInformation) {
			this.setActive(1);
		}

		if (window.pageYOffset >= (this.sellerInformation - offset) && window.pageYOffset <= this.shippingPayments) {
			this.setActive(2);
		}

		if (window.pageYOffset >= (this.shippingPayments - offset) && window.pageYOffset <= this.faqs) {
			this.setActive(3);
		}
		
		if (window.pageYOffset >= (this.faqs - offset)) {
			this.setActive(4);
		}

		if (window.pageYOffset >= (this.faqs + faqHeight + 50)) {
			this.resetSegments();
		}
	};

	ProwlerScrolling.prototype.setActive = function (target) {
		this.resetSegments();
		this.prowlerNav.children[target].getElementsByTagName('a')[0].setAttribute('class', 'active');
	};

	ProwlerScrolling.prototype.resetSegments = function () {
		var anchors = this.prowlerNav.getElementsByTagName('a');

		for (var i = 0, len = anchors.length; i < len; i = i + 1) {
			anchors[i].setAttribute('class', '');
		}
	};


	var ResizeIframe = function (elm) {
		this._init();
	};

	ResizeIframe.prototype._init = function (elm) {
		var self = this;

		window.addEventListener('load', function (e) {
			self.setHeight();
		}, false);
	};

	ResizeIframe.prototype.setHeight = function (elm) {
		var element = document.querySelector('iframe'),
		    height = element.contentWindow.document.documentElement.offsetHeight; 

		element.style.height = height + 'px';
	};

	var SearchBoxDefaultText = function () {
		this.element = document.querySelector('.searchbox-input');
		this._init();
	};

	SearchBoxDefaultText.prototype._init = function (elm) {
		this.element.addEventListener('click', function (e) {
			var inputFieldValue = this.getAttribute('value');

			if (inputFieldValue === "I'm looking for...") {
				this.setAttribute('value', '');
			}
		}, false);

		this.element.addEventListener('blur', function (e) {
			var inputFieldValue = this.getAttribute('value');

			if (!inputFieldValue) {
				this.setAttribute('value', "I'm looking for...");
			}
		}, false);
	};


	var BidBoxPrice = function () {
		this.element = document.querySelectorAll('.bid_input');

		this._init();
	};

	BidBoxPrice.prototype._init = function () {
		for (var i = 0, len = this.element.length; i < len; i = i + 1) {
			this._bind(this.element[i]);
		}
	};

	BidBoxPrice.prototype._bind = function (elm) {
		var self = this;
		elm.addEventListener('click', function (e) {
			var context = this.parentNode.querySelector('.bid_price');

			$(this).addClass('active');
			context.style.visibility = 'visible';
		}, false);

		elm.addEventListener('blur', function (e) {
			var context = this.parentNode.querySelector('.bid_price');

			$(this).removeClass('active');
			context.style.visibility = 'hidden';
		}, false);
	};

	var BlockEmptyAnchorTags = function () {
		this._init();
	};

	BlockEmptyAnchorTags.prototype._init = function () {
		var anchors = document.getElementsByTagName('a');
		for (var i = 0, len = anchors.length; i < len; i = i + 1) {
			this.checkAnchor(anchors[i]);
		}
	};

	BlockEmptyAnchorTags.prototype.checkAnchor = function (elm) {
		elm.addEventListener('click', function (e) {
			console.log(e.toElement.href);
			if (!e.toElement.href) {
				e.preventDefault();	
			}
		}, false);
	};

	//new BlockEmptyAnchorTags();
	new BidBoxPrice();
	new ResizeHeroImage();
	new ResizeIframe();
	new ViewItemGallery();
	new ProwlerScrolling();