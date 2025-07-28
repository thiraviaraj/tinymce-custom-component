(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.tinymcePluginCalendar = {}));
})(this, (function (exports) { 'use strict';

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
