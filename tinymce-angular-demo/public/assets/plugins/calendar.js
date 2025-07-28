(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.tinymcePluginCalendar = factory());
})(this, (function () { 'use strict';

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var src$1 = {exports: {}};

	var src = src$1.exports;

	var hasRequiredSrc;

	function requireSrc () {
		if (hasRequiredSrc) return src$1.exports;
		hasRequiredSrc = 1;
		(function (module, exports) {
			(function (global, factory) {
			    factory(exports) ;
			})(src, (function (exports) {
			    // TinyMCE plugin registration
			    (function() {
			      if (typeof window !== 'undefined' && window.tinymce) {
			        tinymce.PluginManager.add('calendar', function (editor, url) {
			            editor.ui.registry.addButton('calendar', {
			              text: '📅 Calendar',
			              onAction: function () {
			                const currentDate = new Date().toLocaleDateString();
			                editor.insertContent(`<strong>${currentDate}</strong>`);
			              }
			            });
			          
			            // Optional: also make it available via menu
			            editor.ui.registry.addMenuItem('calendar', {
			              text: 'Insert Calendar Date',
			              onAction: function () {
			                const currentDate = new Date().toLocaleDateString();
			                editor.insertContent(`<strong>${currentDate}</strong>`);
			              }
			            });
			          
			            return {
			              getMetadata: function () {
			                return {
			                  name: 'Calendar Plugin',
			                  url: 'https://example.com'
			                };
			              }
			            };
			          }); 
			      }
			    })();
			})); 
		} (src$1, src$1.exports));
		return src$1.exports;
	}

	var srcExports = requireSrc();
	var index = /*@__PURE__*/getDefaultExportFromCjs(srcExports);

	return index;

}));
