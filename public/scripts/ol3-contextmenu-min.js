!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.ContextMenu=e()}(this,function(){function e(t){return this.Base=t,this.map=void 0,this.viewport=void 0,this.coordinateClicked=void 0,this.pixelClicked=void 0,this.lineHeight=0,this.items={},this.opened=!1,this.submenu={left:t.options.width-15+"px",lastLeft:""},this.eventHandler=this.handleEvent.bind(this),this}function n(t){return this.Base=t,this.Base.container=this.container=this.createContainer(),this}var i,t="ol-ctx-menu",s="beforeopen",o="open",a="close",r="contextmenu",l={container:t+"-container",separator:t+"-separator",submenu:t+"-submenu",hidden:t+"-hidden",icon:t+"-icon",zoomIn:t+"-zoom-in",zoomOut:t+"-zoom-out",OL_unselectable:"ol-unselectable"},c={width:150,scrollAt:4,eventType:r,defaultItems:!0},h=[{text:"Zoom In",classname:[l.zoomIn,l.icon].join(" "),callback:function(t,e){e=e.getView();e.animate({zoom:+e.getZoom()+1,duration:700,center:t.coordinate})}},{text:"Zoom Out",classname:[l.zoomOut,l.icon].join(" "),callback:function(t,e){e=e.getView();e.animate({zoom:+e.getZoom()-1,duration:700,center:t.coordinate})}}],d={isNumeric:function(t){return/^\d+$/.test(t)},classRegex:function(t){return new RegExp("(^|\\s+) "+t+" (\\s+|$)")},addClass:function(t,e,n){var i=this;if(Array.isArray(t))t.forEach(function(t){i.addClass(t,e)});else for(var s=Array.isArray(e)?e:e.split(/\s+/),o=s.length;o--;)i.hasClass(t,s[o])||i._addClass(t,s[o],n)},_addClass:function(t,e,n){var i=this;t.classList?t.classList.add(e):t.className=(t.className+" "+e).trim(),n&&this.isNumeric(n)&&window.setTimeout(function(){i._removeClass(t,e)},n)},removeClass:function(t,e,n){var i=this;if(Array.isArray(t))t.forEach(function(t){i.removeClass(t,e,n)});else for(var s=Array.isArray(e)?e:e.split(/\s+/),o=s.length;o--;)i.hasClass(t,s[o])&&i._removeClass(t,s[o],n)},_removeClass:function(t,e,n){var i=this;t.classList?t.classList.remove(e):t.className=t.className.replace(this.classRegex(e)," ").trim(),n&&this.isNumeric(n)&&window.setTimeout(function(){i._addClass(t,e)},n)},hasClass:function(t,e){return t.classList?t.classList.contains(e):this.classRegex(e).test(t.className)},toggleClass:function(t,e){var n=this;return Array.isArray(t)?void t.forEach(function(t){n.toggleClass(t,e)}):void(t.classList?t.classList.toggle(e):this.hasClass(t,e)?this._removeClass(t,e):this._addClass(t,e))},$:function(t){return t="#"===t[0]?t.substr(1,t.length):t,document.getElementById(t)},isElement:function(t){return"HTMLElement"in window?!!t&&t instanceof HTMLElement:!!t&&"object"==typeof t&&1===t.nodeType&&!!t.nodeName},find:function(t,e,n){void 0===e&&(e=window.document);var i=Array.prototype.slice,s=[];if(/^(#?[\w-]+|\.[\w-.]+)$/.test(t))switch(t[0]){case"#":s=[this.$(t.substr(1))];break;case".":s=i.call(e.getElementsByClassName(t.substr(1).replace(/\./g," ")));break;default:s=i.call(e.getElementsByTagName(t))}else s=i.call(e.querySelectorAll(t));return n?s:s[0]},offset:function(t){var e=t.getBoundingClientRect(),n=document.documentElement;return{left:e.left+window.pageXOffset-n.clientLeft,top:e.top+window.pageYOffset-n.clientTop,width:t.offsetWidth,height:t.offsetHeight}},getViewportSize:function(){return{w:window.innerWidth||document.documentElement.clientWidth,h:window.innerHeight||document.documentElement.clientHeight}},getAllChildren:function(t,e){return[].slice.call(t.getElementsByTagName(e))},isEmpty:function(t){return!t||0===t.length},emptyArray:function(t){for(;t.length;)t.pop()},removeAllChildren:function(t){for(;t.firstChild;)t.removeChild(t.firstChild)},mergeOptions:function(t,e){var n,i,s={};for(n in t)s[n]=t[n];for(i in e)s[i]=e[i];return s},createFragment:function(t){var e=document.createDocumentFragment(),n=document.createElement("div");for(n.innerHTML=t;n.firstChild;)e.appendChild(n.firstChild);return e},contains:function(t,e){return!!~e.indexOf(t)},getUniqueId:function(){return"_"+Math.random().toString(36).substr(2,9)},isDefAndNotNull:function(t){return null!=t},assertEqual:function(t,e,n){if(t!==e)throw new Error(n+" mismatch: "+t+" != "+e)},assert:function(t,e){if(void 0===e&&(e="Assertion failed"),!t){if("undefined"!=typeof Error)throw new Error(e);throw e}}};e.prototype.init=function(t){this.map=t,this.viewport=t.getViewport(),this.setListeners(),this.Base.Html.createMenu(),this.lineHeight=0<this.getItemsLength()?this.Base.container.offsetHeight/this.getItemsLength():this.Base.Html.cloneAndGetLineHeight()},e.prototype.getItemsLength=function(){var e=this,n=0;return Object.keys(this.items).forEach(function(t){e.items[t].submenu||e.items[t].separator||n++}),n},e.prototype.getPixelClicked=function(){return this.pixelClicked},e.prototype.getCoordinateClicked=function(){return this.coordinateClicked},e.prototype.positionContainer=function(t){var s=this,e=this.map.getSize(),n=e[0],o=e[1]-t[1],e=n-t[0],n=this.Base.container.offsetWidth,i=Math.round(this.lineHeight*this.getItemsLength()),a=d.find("li."+l.submenu+"> div",this.Base.container,!0);n<=e?(this.Base.container.style.right="auto",this.Base.container.style.left=t[0]+5+"px"):(this.Base.container.style.left="auto",this.Base.container.style.right="15px"),i<=o?(this.Base.container.style.bottom="auto",this.Base.container.style.top=t[1]-10+"px"):(this.Base.container.style.top="auto",this.Base.container.style.bottom=0),d.removeClass(this.Base.container,l.hidden),a.length&&(this.submenu.lastLeft=e<2*n?"-"+n+"px":this.submenu.left,a.forEach(function(t){var e=d.getViewportSize(),n=d.offset(t),i=n.height;o-i<0&&(i=i-(e.h-n.top),t.style.top="-"+i+"px"),t.style.left=s.submenu.lastLeft}))},e.prototype.openMenu=function(t,e){this.Base.dispatchEvent({type:o,pixel:t,coordinate:e}),this.opened=!0,this.positionContainer(t)},e.prototype.closeMenu=function(){this.opened=!1,d.addClass(this.Base.container,l.hidden),this.Base.dispatchEvent({type:a})},e.prototype.setListeners=function(){this.viewport.addEventListener(this.Base.options.eventType,this.eventHandler,!1)},e.prototype.removeListeners=function(){this.viewport.removeEventListener(this.Base.options.eventType,this.eventHandler,!1)},e.prototype.handleEvent=function(e){var n=this;this.coordinateClicked=this.map.getEventCoordinate(e),this.pixelClicked=this.map.getEventPixel(e),this.Base.dispatchEvent({type:s,pixel:this.pixelClicked,coordinate:this.coordinateClicked}),this.Base.disabled||(this.Base.options.eventType===r&&(e.stopPropagation(),e.preventDefault()),this.openMenu(this.pixelClicked,this.coordinateClicked),e.target.addEventListener("mousedown",{handleEvent:function(t){n.closeMenu(),e.target.removeEventListener(t.type,this,!1)}},!1))},e.prototype.setItemListener=function(t,e){var n,i=this;t&&"function"==typeof this.items[e].callback&&(n=this.items[e].callback,t.addEventListener("click",function(t){t.preventDefault();t={coordinate:i.getCoordinateClicked(),data:i.items[e].data||null};i.closeMenu(),n(t,i.map)},!1))};function u(t){d.assert("object"==typeof(t=void 0===t?{}:t),"@param `opt_options` should be object type!"),"default_items"in t&&(c.defaultItems=t.default_items),this.options=d.mergeOptions(c,t),this.disabled=!1,this.Internal=new e(this),this.Html=new n(this),i.call(this,{element:this.container})}return n.prototype.createContainer=function(t){var e=document.createElement("div"),n=document.createElement("ul"),i=[l.container,l.OL_unselectable];return t&&i.push(l.hidden),e.className=i.join(" "),e.style.width=parseInt(this.Base.options.width,10)+"px",e.appendChild(n),e},n.prototype.createMenu=function(){var t=[];return"items"in this.Base.options?t=this.Base.options.defaultItems?this.Base.options.items.concat(h):this.Base.options.items:this.Base.options.defaultItems&&(t=h),0!==t.length&&void t.forEach(this.addMenuEntry,this)},n.prototype.addMenuEntry=function(t){var e,n,i=this;t.items&&Array.isArray(t.items)?(t.classname=t.classname||"",d.contains(l.submenu,t.classname)||(t.classname=t.classname.length?" "+l.submenu:l.submenu),e=this.generateHtmlAndPublish(this.container,t),(n=this.createContainer()).style.left=this.Base.Internal.submenu.lastLeft||this.Base.Internal.submenu.left,e.appendChild(n),t.items.forEach(function(t){i.generateHtmlAndPublish(n,t,!0)})):this.generateHtmlAndPublish(this.container,t)},n.prototype.generateHtmlAndPublish=function(t,e,n){var i,s,o,a=!1,r=d.getUniqueId();return"string"==typeof e&&"-"===e.trim()?(i=['<li id="',r,'" class="',l.separator,'">',"<hr></li>"].join(""),s=d.createFragment(i),o=[].slice.call(s.childNodes,0)[0],t.firstChild.appendChild(s),a=!0):(e.classname=e.classname||"",i="<span>"+e.text+"</span>",s=d.createFragment(i),o=document.createElement("li"),e.icon&&(""===e.classname?e.classname=l.icon:-1===e.classname.indexOf(l.icon)&&(e.classname+=" "+l.icon),o.setAttribute("style","background-image:url("+e.icon+")")),o.id=r,o.className=e.classname,o.appendChild(s),t.firstChild.appendChild(o)),this.Base.Internal.items[r]={id:r,submenu:n||0,separator:a,callback:e.callback,data:e.data||null},this.Base.Internal.setItemListener(o,r),o},n.prototype.removeMenuEntry=function(t){var e=d.find("#"+t,this.container.firstChild);e&&this.container.firstChild.removeChild(e),delete this.Base.Internal.items[t]},n.prototype.cloneAndGetLineHeight=function(){var t=this.container.cloneNode(),e=d.createFragment("<span>Foo</span>"),n=d.createFragment("<span>Foo</span>"),i=document.createElement("li"),s=document.createElement("li"),e=(i.appendChild(e),s.appendChild(n),t.appendChild(i),t.appendChild(s),this.container.parentNode.appendChild(t),t.offsetHeight/2);return this.container.parentNode.removeChild(t),e},(i=ol.control.Control)&&(u.__proto__=i),((u.prototype=Object.create(i&&i.prototype)).constructor=u).prototype.clear=function(){var e=this;Object.keys(this.Internal.items).forEach(function(t){e.Html.removeMenuEntry(t)})},u.prototype.close=function(){this.Internal.closeMenu()},u.prototype.enable=function(){this.disabled=!1},u.prototype.disable=function(){this.disabled=!0},u.prototype.getDefaultItems=function(){return h},u.prototype.extend=function(t){d.assert(Array.isArray(t),"@param `arr` should be an Array."),t.forEach(this.push,this)},u.prototype.isOpened=function(){return this.isOpen()},u.prototype.isOpen=function(){return this.Internal.opened},u.prototype.updatePosition=function(t){d.assert(Array.isArray(t),"@param `pixel` should be an Array."),this.isOpen()&&this.Internal.positionContainer(t)},u.prototype.pop=function(){var t=Object.keys(this.Internal.items);this.Html.removeMenuEntry(t[t.length-1])},u.prototype.push=function(t){d.assert(d.isDefAndNotNull(t),"@param `item` must be informed."),this.Html.addMenuEntry(t)},u.prototype.shift=function(){this.Html.removeMenuEntry(Object.keys(this.Internal.items)[0])},u.prototype.setMap=function(t){ol.control.Control.prototype.setMap.call(this,t),t?this.Internal.init(t,this):this.Internal.removeListeners()},u})