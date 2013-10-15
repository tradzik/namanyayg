/*
jQuery Waypoints - v2.0.3
Copyright (c) 2011-2013 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
(function(){var t=[].indexOf||function(t){for(var e=0,n=this.length;e<n;e++){if(e in this&&this[e]===t)return e}return-1},e=[].slice;(function(t,e){if(typeof define==="function"&&define.amd){return define("waypoints",["jquery"],function(n){return e(n,t)})}else{return e(t.jQuery,t)}})(this,function(n,r){var i,o,l,s,f,u,a,c,h,d,p,y,v,w,g,m;i=n(r);c=t.call(r,"ontouchstart")>=0;s={horizontal:{},vertical:{}};f=1;a={};u="waypoints-context-id";p="resize.waypoints";y="scroll.waypoints";v=1;w="waypoints-waypoint-ids";g="waypoint";m="waypoints";o=function(){function t(t){var e=this;this.$element=t;this.element=t[0];this.didResize=false;this.didScroll=false;this.id="context"+f++;this.oldScroll={x:t.scrollLeft(),y:t.scrollTop()};this.waypoints={horizontal:{},vertical:{}};t.data(u,this.id);a[this.id]=this;t.bind(y,function(){var t;if(!(e.didScroll||c)){e.didScroll=true;t=function(){e.doScroll();return e.didScroll=false};return r.setTimeout(t,n[m].settings.scrollThrottle)}});t.bind(p,function(){var t;if(!e.didResize){e.didResize=true;t=function(){n[m]("refresh");return e.didResize=false};return r.setTimeout(t,n[m].settings.resizeThrottle)}})}t.prototype.doScroll=function(){var t,e=this;t={horizontal:{newScroll:this.$element.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.$element.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};if(c&&(!t.vertical.oldScroll||!t.vertical.newScroll)){n[m]("refresh")}n.each(t,function(t,r){var i,o,l;l=[];o=r.newScroll>r.oldScroll;i=o?r.forward:r.backward;n.each(e.waypoints[t],function(t,e){var n,i;if(r.oldScroll<(n=e.offset)&&n<=r.newScroll){return l.push(e)}else if(r.newScroll<(i=e.offset)&&i<=r.oldScroll){return l.push(e)}});l.sort(function(t,e){return t.offset-e.offset});if(!o){l.reverse()}return n.each(l,function(t,e){if(e.options.continuous||t===l.length-1){return e.trigger([i])}})});return this.oldScroll={x:t.horizontal.newScroll,y:t.vertical.newScroll}};t.prototype.refresh=function(){var t,e,r,i=this;r=n.isWindow(this.element);e=this.$element.offset();this.doScroll();t={horizontal:{contextOffset:r?0:e.left,contextScroll:r?0:this.oldScroll.x,contextDimension:this.$element.width(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:r?0:e.top,contextScroll:r?0:this.oldScroll.y,contextDimension:r?n[m]("viewportHeight"):this.$element.height(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};return n.each(t,function(t,e){return n.each(i.waypoints[t],function(t,r){var i,o,l,s,f;i=r.options.offset;l=r.offset;o=n.isWindow(r.element)?0:r.$element.offset()[e.offsetProp];if(n.isFunction(i)){i=i.apply(r.element)}else if(typeof i==="string"){i=parseFloat(i);if(r.options.offset.indexOf("%")>-1){i=Math.ceil(e.contextDimension*i/100)}}r.offset=o-e.contextOffset+e.contextScroll-i;if(r.options.onlyOnScroll&&l!=null||!r.enabled){return}if(l!==null&&l<(s=e.oldScroll)&&s<=r.offset){return r.trigger([e.backward])}else if(l!==null&&l>(f=e.oldScroll)&&f>=r.offset){return r.trigger([e.forward])}else if(l===null&&e.oldScroll>=r.offset){return r.trigger([e.forward])}})})};t.prototype.checkEmpty=function(){if(n.isEmptyObject(this.waypoints.horizontal)&&n.isEmptyObject(this.waypoints.vertical)){this.$element.unbind([p,y].join(" "));return delete a[this.id]}};return t}();l=function(){function t(t,e,r){var i,o;r=n.extend({},n.fn[g].defaults,r);if(r.offset==="bottom-in-view"){r.offset=function(){var t;t=n[m]("viewportHeight");if(!n.isWindow(e.element)){t=e.$element.height()}return t-n(this).outerHeight()}}this.$element=t;this.element=t[0];this.axis=r.horizontal?"horizontal":"vertical";this.callback=r.handler;this.context=e;this.enabled=r.enabled;this.id="waypoints"+v++;this.offset=null;this.options=r;e.waypoints[this.axis][this.id]=this;s[this.axis][this.id]=this;i=(o=t.data(w))!=null?o:[];i.push(this.id);t.data(w,i)}t.prototype.trigger=function(t){if(!this.enabled){return}if(this.callback!=null){this.callback.apply(this.element,t)}if(this.options.triggerOnce){return this.destroy()}};t.prototype.disable=function(){return this.enabled=false};t.prototype.enable=function(){this.context.refresh();return this.enabled=true};t.prototype.destroy=function(){delete s[this.axis][this.id];delete this.context.waypoints[this.axis][this.id];return this.context.checkEmpty()};t.getWaypointsByElement=function(t){var e,r;r=n(t).data(w);if(!r){return[]}e=n.extend({},s.horizontal,s.vertical);return n.map(r,function(t){return e[t]})};return t}();d={init:function(t,e){var r;if(e==null){e={}}if((r=e.handler)==null){e.handler=t}this.each(function(){var t,r,i,s;t=n(this);i=(s=e.context)!=null?s:n.fn[g].defaults.context;if(!n.isWindow(i)){i=t.closest(i)}i=n(i);r=a[i.data(u)];if(!r){r=new o(i)}return new l(t,r,e)});n[m]("refresh");return this},disable:function(){return d._invoke(this,"disable")},enable:function(){return d._invoke(this,"enable")},destroy:function(){return d._invoke(this,"destroy")},prev:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e>0){return t.push(n[e-1])}})},next:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e<n.length-1){return t.push(n[e+1])}})},_traverse:function(t,e,i){var o,l;if(t==null){t="vertical"}if(e==null){e=r}l=h.aggregate(e);o=[];this.each(function(){var e;e=n.inArray(this,l[t]);return i(o,e,l[t])});return this.pushStack(o)},_invoke:function(t,e){t.each(function(){var t;t=l.getWaypointsByElement(this);return n.each(t,function(t,n){n[e]();return true})});return this}};n.fn[g]=function(){var t,r;r=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(d[r]){return d[r].apply(this,t)}else if(n.isFunction(r)){return d.init.apply(this,arguments)}else if(n.isPlainObject(r)){return d.init.apply(this,[null,r])}else if(!r){return n.error("jQuery Waypoints needs a callback function or handler option.")}else{return n.error("The "+r+" method does not exist in jQuery Waypoints.")}};n.fn[g].defaults={context:r,continuous:true,enabled:true,horizontal:false,offset:0,triggerOnce:false};h={refresh:function(){return n.each(a,function(t,e){return e.refresh()})},viewportHeight:function(){var t;return(t=r.innerHeight)!=null?t:i.height()},aggregate:function(t){var e,r,i;e=s;if(t){e=(i=a[n(t).data(u)])!=null?i.waypoints:void 0}if(!e){return[]}r={horizontal:[],vertical:[]};n.each(r,function(t,i){n.each(e[t],function(t,e){return i.push(e)});i.sort(function(t,e){return t.offset-e.offset});r[t]=n.map(i,function(t){return t.element});return r[t]=n.unique(r[t])});return r},above:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset<=t.oldScroll.y})},below:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset>t.oldScroll.y})},left:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset<=t.oldScroll.x})},right:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset>t.oldScroll.x})},enable:function(){return h._invoke("enable")},disable:function(){return h._invoke("disable")},destroy:function(){return h._invoke("destroy")},extendFn:function(t,e){return d[t]=e},_invoke:function(t){var e;e=n.extend({},s.vertical,s.horizontal);return n.each(e,function(e,n){n[t]();return true})},_filter:function(t,e,r){var i,o;i=a[n(t).data(u)];if(!i){return[]}o=[];n.each(i.waypoints[e],function(t,e){if(r(i,e)){return o.push(e)}});o.sort(function(t,e){return t.offset-e.offset});return n.map(o,function(t){return t.element})}};n[m]=function(){var t,n;n=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(h[n]){return h[n].apply(null,t)}else{return h.aggregate.call(null,n)}};n[m].settings={resizeThrottle:100,scrollThrottle:30};return i.load(function(){return n[m]("refresh")})})}).call(this);

/*! responsive-nav.js v1.0.20 by @viljamis, http://responsive-nav.com, MIT license */
var responsiveNav=function(h,g){var v=!!h.getComputedStyle;h.getComputedStyle||(h.getComputedStyle=function(a){this.el=a;this.getPropertyValue=function(b){var c=/(\-([a-z]){1})/g;"float"===b&&(b="styleFloat");c.test(b)&&(b=b.replace(c,function(a,b,c){return c.toUpperCase()}));return a.currentStyle[b]?a.currentStyle[b]:null};return this});var d,f,e,n=g.createElement("style"),p,q,l=function(a,b,c,d){if("addEventListener"in a)try{a.addEventListener(b,c,d)}catch(e){if("object"===typeof c&&c.handleEvent)a.addEventListener(b,
function(a){c.handleEvent.call(c,a)},d);else throw e;}else"attachEvent"in a&&("object"===typeof c&&c.handleEvent?a.attachEvent("on"+b,function(){c.handleEvent.call(c)}):a.attachEvent("on"+b,c))},k=function(a,b,c,d){if("removeEventListener"in a)try{a.removeEventListener(b,c,d)}catch(e){if("object"===typeof c&&c.handleEvent)a.removeEventListener(b,function(a){c.handleEvent.call(c,a)},d);else throw e;}else"detachEvent"in a&&("object"===typeof c&&c.handleEvent?a.detachEvent("on"+b,function(){c.handleEvent.call(c)}):
a.detachEvent("on"+b,c))},w=function(a){if(1>a.children.length)throw Error("The Nav container has no containing elements");for(var b=[],c=0;c<a.children.length;c++)1===a.children[c].nodeType&&b.push(a.children[c]);return b},m=function(a,b){for(var c in b)a.setAttribute(c,b[c])},r=function(a,b){a.className+=" "+b;a.className=a.className.replace(/(^\s*)|(\s*$)/g,"")},s=function(a,b){a.className=a.className.replace(RegExp("(\\s|^)"+b+"(\\s|$)")," ").replace(/(^\s*)|(\s*$)/g,"")},u=function(a,b){var c;
this.options={animate:!0,transition:350,label:"Menu",insert:"after",customToggle:"",openPos:"relative",jsClass:"js",init:function(){},open:function(){},close:function(){}};for(c in b)this.options[c]=b[c];r(g.documentElement,this.options.jsClass);this.wrapperEl=a.replace("#","");if(g.getElementById(this.wrapperEl))this.wrapper=g.getElementById(this.wrapperEl);else throw Error("The nav element you are trying to select doesn't exist");this.wrapper.inner=w(this.wrapper);f=this.options;d=this.wrapper;
this._init(this)};u.prototype={destroy:function(){this._removeStyles();s(d,"closed");s(d,"opened");d.removeAttribute("style");d.removeAttribute("aria-hidden");t=d=null;k(h,"resize",this,!1);k(g.body,"touchmove",this,!1);k(e,"touchstart",this,!1);k(e,"touchend",this,!1);k(e,"keyup",this,!1);k(e,"click",this,!1);k(e,"mouseup",this,!1);f.customToggle?e.removeAttribute("aria-hidden"):e.parentNode.removeChild(e)},toggle:function(){!0===p&&(q?(s(d,"opened"),r(d,"closed"),m(d,{"aria-hidden":"true"}),f.animate?
(p=!1,setTimeout(function(){d.style.position="absolute";p=!0},f.transition+10)):d.style.position="absolute",q=!1,f.close()):(s(d,"closed"),r(d,"opened"),d.style.position=f.openPos,m(d,{"aria-hidden":"false"}),q=!0,f.open()))},handleEvent:function(a){a=a||h.event;switch(a.type){case "touchstart":this._onTouchStart(a);break;case "touchmove":this._onTouchMove(a);break;case "touchend":case "mouseup":this._onTouchEnd(a);break;case "click":this._preventDefault(a);break;case "keyup":this._onKeyUp(a);break;
case "resize":this._resize(a)}},_init:function(){r(d,"closed");p=!0;q=!1;this._createToggle();this._transitions();this._resize();l(h,"resize",this,!1);l(g.body,"touchmove",this,!1);l(e,"touchstart",this,!1);l(e,"touchend",this,!1);l(e,"mouseup",this,!1);l(e,"keyup",this,!1);l(e,"click",this,!1);f.init()},_createStyles:function(){n.parentNode||g.getElementsByTagName("head")[0].appendChild(n)},_removeStyles:function(){n.parentNode&&n.parentNode.removeChild(n)},_createToggle:function(){if(f.customToggle){var a=
f.customToggle.replace("#","");if(g.getElementById(a))e=g.getElementById(a);else throw Error("The custom nav toggle you are trying to select doesn't exist");}else a=g.createElement("a"),a.innerHTML=f.label,m(a,{href:"#",id:"nav-toggle"}),"after"===f.insert?d.parentNode.insertBefore(a,d.nextSibling):d.parentNode.insertBefore(a,d),e=g.getElementById("nav-toggle")},_preventDefault:function(a){a.preventDefault?(a.preventDefault(),a.stopPropagation()):a.returnValue=!1},_onTouchStart:function(a){a.stopPropagation();
this.startX=a.touches[0].clientX;this.startY=a.touches[0].clientY;this.touchHasMoved=!1;k(e,"mouseup",this,!1)},_onTouchMove:function(a){if(10<Math.abs(a.touches[0].clientX-this.startX)||10<Math.abs(a.touches[0].clientY-this.startY))this.touchHasMoved=!0},_onTouchEnd:function(a){this._preventDefault(a);if(!this.touchHasMoved)if("touchend"===a.type){this.toggle(a);var b=this;d.addEventListener("click",b._preventDefault,!0);setTimeout(function(){d.removeEventListener("click",b._preventDefault,!0)},
f.transition+100)}else{var c=a||h.event;3!==c.which&&2!==c.button&&this.toggle(a)}},_onKeyUp:function(a){13===(a||h.event).keyCode&&this.toggle(a)},_transitions:function(){if(f.animate){var a=d.style,b="max-height "+f.transition+"ms";a.WebkitTransition=b;a.MozTransition=b;a.OTransition=b;a.transition=b}},_calcHeight:function(){for(var a=0,b=0;b<d.inner.length;b++)a+=d.inner[b].offsetHeight;a="#"+this.wrapperEl+".opened{max-height:"+a+"px}";v&&(n.innerHTML=a)},_resize:function(){"none"!==h.getComputedStyle(e,
null).getPropertyValue("display")?(m(e,{"aria-hidden":"false"}),d.className.match(/(^|\s)closed(\s|$)/)&&(m(d,{"aria-hidden":"true"}),d.style.position="absolute"),this._createStyles(),this._calcHeight()):(m(e,{"aria-hidden":"true"}),m(d,{"aria-hidden":"false"}),d.style.position=f.openPos,this._removeStyles())}};var t;return function(a,b){t||(t=new u(a,b));return t}}(window,document);

$(function() {
	var NMNY = function() {

		var initWaypoint = function() {
			$('html').addClass('appeared');

			$('.work__item').waypoint(function() {
			  $(this).addClass('work__item--show');
			}, { offset: '60%' });

			$('.process__item').waypoint(function() {
			  $(this).addClass('process__item--show');
			}, { offset: '60%' });

			$('.contact-box').waypoint(function() {
				$(this).addClass('contact-box--show');
			}, { offset: '60%' });
		},

		smoothScroll = function(e) {
			var destination = 0,
	    	hashTop = $(this.hash).offset().top,
	    	docHeight = $(document).height(),
	    	winHeight = $(window).height();

		    e.preventDefault ? e.preventDefault() : e.returnValue = false;

		    if(history.pushState) {
		    	history.pushState('', 'Namanayay Goel | ' + this.hash.substring(1), this.hash + '');
		    }

		    if ( hashTop > docHeight - winHeight ) {
		    	destination = docHeight - winHeight;
		    } else {
		    	destination = hashTop;
		    }

		     $('html,body').animate({ scrollTop:destination }, 500,'swing' );
		},

		mobileNav = function() {
			$('.masthead').toggleClass('masthead__nav--open');
			$('.main-nav').toggleClass('nav--open');
		}

		uiBindings = function() {
			$(window).resize(function() {
				if ($(window).width() > 800) {
					initWaypoint();
				}
			});

			$('a[href^="#"]').on('click', smoothScroll );

			$('.js-menu-toggle').on('click', mobileNav);
		},

		init = function() {
			initWaypoint();
			uiBindings();
		};

		return {
			init: init,
			initWaypoint: initWaypoint
		}
	}

	NMNY().init();
});