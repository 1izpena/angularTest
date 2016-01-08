(function($) {
  'use strict';

  function transitionEnd() {
    var el = document.createElement('mm');

    var transEndEventNames = {
      WebkitTransition: 'webkitTransitionEnd',
      MozTransition: 'transitionend',
      OTransition: 'oTransitionEnd otransitionend',
      transition: 'transitionend'
    };

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return {
          end: transEndEventNames[name]
        };
      }
    }
    return false;
  }

  $.fn.emulateTransitionEnd = function(duration) {
    var called = false;
    var $el = this;
    $(this).one('mmTransitionEnd', function() {
      called = true;
    });
    var callback = function() {
      if (!called) {
        $($el).trigger($transition.end);
      }
    };
    setTimeout(callback, duration);
    return this;
  };

  var $transition = transitionEnd();
  if (!!$transition) {
    $.event.special.mmTransitionEnd = {
      bindType: $transition.end,
      delegateType: $transition.end,
      handle: function(e) {
        if ($(e.target).is(this)) {
          return e.
          handleObj.
          handler.
          apply(this, arguments);
        }
      }
    };
  }

  var MetisMenu2 = function(element, options) {
    this.$element = $(element);
    this.options = $.extend({}, MetisMenu2.DEFAULTS, options);
    this.transitioning = null;

    this.init();
  };

  MetisMenu2.TRANSITION_DURATION = 350;

  MetisMenu2.DEFAULTS = {
    toggle: true,
    doubleTapToGo: false,
    preventDefault: true,
    activeClass: 'active',
    collapseClass: 'collapse',
    collapseInClass: 'in',
    collapsingClass: 'collapsing',
    onTransitionStart: false,
    onTransitionEnd: false
  };

  MetisMenu2.prototype.init = function() {
    var $this = this;
    var activeClass = this.options.activeClass;
    var collapseClass = this.options.collapseClass;
    var collapseInClass = this.options.collapseInClass;

    this
      .$element
      .find('li.' + activeClass)
      .has('ul')
      .children('ul')
      .attr('aria-expanded', true)
      .addClass(collapseClass + ' ' + collapseInClass);

    this
      .$element
      .find('li')
      .not('.' + activeClass)
      .has('ul')
      .children('ul')
      .attr('aria-expanded', false)
      .addClass(collapseClass);

    //add the 'doubleTapToGo' class to active items if needed
    if (this.options.doubleTapToGo) {
      this
        .$element
        .find('li.' + activeClass)
        .has('ul')
        .children('a')
        .addClass('doubleTapToGo');
    }

    this
      .$element
	.find('ul.cgroups')
        .has( "li" )
        .has('a')
	.on('click.metisMenu2', function(e) {
	    var self = $(this);
		
            var target = $( e.target );	
 	    if ( target.is( "a.ng-binding" ) ) {

		var $parent = self.parent('li');
		var $list = $parent.children('ul');
		if($this.options.preventDefault){
		  e.preventDefault();
			 
		}



		if ($parent.hasClass(activeClass) && !$this.options.doubleTapToGo) {
		    var self2 = self.parent('li').parent('ul').find('li.activeChannels');
	 	    var self3 = self.parent('li').parent('ul').find('li.activeChannelsPublic');
		
		    /* para conocer si tiene esos elementos 	
		    self.append( "<li>" +
	 			 ( self3.length ? "Yes" : "No" ) +
	 			 "</li>" );
		    */
		    var $parent2 = self2;
		    var $list2 = $parent2.children('ul');
		    $this.show($list2);
		    self2.attr('aria-expanded',true);
				
		
	/************************************/

		} else {
		  $this.show($list);
		  self.attr('aria-expanded',true);
		}
	}

	

      });




    this
      .$element
      .find('li')
      .has('ul')
      .children('a')
      .on('click.metisMenu3', function(e) {
        var self = $(this);
        var $parent = self.parent('li');
        var $list = $parent.children('ul');
        if($this.options.preventDefault){
          e.preventDefault();

        }
        if ($parent.hasClass(activeClass) && !$this.options.doubleTapToGo) {
          $this.hide($list);
          self.attr('aria-expanded',false);
        } else {
          $this.show($list);
          self.attr('aria-expanded',true);
        }

        if($this.options.onTransitionStart) {
          $this.options.onTransitionStart();
        }

        //Do we need to enable the double tap
        if ($this.options.doubleTapToGo) {
          //if we hit a second time on the link and the href is valid, navigate to that url
          if ($this.doubleTapToGo(self) && self.attr('href') !== '#' && self.attr('href') !== '') {
            e.stopPropagation();
            document.location = self.attr('href');
            return;
          }
        }
      });
  };

  MetisMenu2.prototype.doubleTapToGo = function(elem) {
    var $this = this.$element;
    //if the class 'doubleTapToGo' exists, remove it and return
    if (elem.hasClass('doubleTapToGo')) {
      elem.removeClass('doubleTapToGo');
      return true;
    }
    //does not exists, add a new class and return false
    if (elem.parent().children('ul').length) {
      //first remove all other class
      $this
        .find('.doubleTapToGo')
        .removeClass('doubleTapToGo');
      //add the class on the current element
      elem.addClass('doubleTapToGo');
      return false;
    }
  };

  MetisMenu2.prototype.show = function(el) {
    var activeClass = this.options.activeClass;
    var collapseClass = this.options.collapseClass;
    var collapseInClass = this.options.collapseInClass;
    var collapsingClass = this.options.collapsingClass;
    var $this = $(el);
    var $parent = $this.parent('li');
    if (this.transitioning || $this.hasClass(collapseInClass)) {
      return;
    }

    $parent.addClass(activeClass);

    if (this.options.toggle) {
      this.hide($parent.siblings().children('ul.' + collapseInClass).attr('aria-expanded', false));
    }

    $this
      .removeClass(collapseClass)
      .addClass(collapsingClass)
      .height(0);

    this.transitioning = 1;
    var complete = function() {
      if(this.transitioning && this.options.onTransitionEnd) {
        this.options.onTransitionEnd();
      }
      $this
        .removeClass(collapsingClass)
        .addClass(collapseClass + ' ' + collapseInClass)
        .height('')
        .attr('aria-expanded', true);
      this.transitioning = 0;
    };
    if (!$transition) {
      return complete.call(this);
    }
    $this
      .one('mmTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(MetisMenu2.TRANSITION_DURATION)
      .height($this[0].scrollHeight);
  };

  MetisMenu2.prototype.hide = function(el) {
    var activeClass = this.options.activeClass;
    var collapseClass = this.options.collapseClass;
    var collapseInClass = this.options.collapseInClass;
    var collapsingClass = this.options.collapsingClass;
    var $this = $(el);

    if (this.transitioning || !$this.hasClass(collapseInClass)) {
      return;
    }

    $this.parent('li').removeClass(activeClass);
    $this.height($this.height())[0].offsetHeight;

    $this
      .addClass(collapsingClass)
      .removeClass(collapseClass)
      .removeClass(collapseInClass);

    this.transitioning = 1;

    var complete = function() {
      if(this.transitioning && this.options.onTransitionEnd) {
        this.options.onTransitionEnd();
      }
      this.transitioning = 0;
      $this
        .removeClass(collapsingClass)
        .addClass(collapseClass)
        .attr('aria-expanded', false);
    };

    if (!$transition) {
      return complete.call(this);
    }
    $this
      .height(0)
      .one('mmTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(MetisMenu2.TRANSITION_DURATION);
  };

  function Plugin(option) {
    return this.each(function() {
      var $this = $(this);
      var data = $this.data('mm');
      var options = $.extend({},
        MetisMenu2.DEFAULTS,
        $this.data(),
        typeof option === 'object' && option
      );

      if (!data) {
        $this.data('mm', (data = new MetisMenu2(this, options)));
      }
      if (typeof option === 'string') {
        data[option]();
      }
    });
  }

  var old = $.fn.metisMenu2;

  $.fn.metisMenu2 = Plugin;
  $.fn.metisMenu2.Constructor = MetisMenu2;

  $.fn.metisMenu2.noConflict = function() {
    $.fn.metisMenu2 = old;
    return this;
  };

})(jQuery);








