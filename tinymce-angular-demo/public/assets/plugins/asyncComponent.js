(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.tinymcePluginCalendar = factory());
})(this, (function () { 'use strict';

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var src$1 = {exports: {}};

	/**
	 * TinyMCE Async Component Plugin
	 * A customizable async component plugin for TinyMCE with dropdown actions
	 * 
	 * @author Thiraviaraj
	 * @version 1.0.0
	 * @license MIT
	 */
	var src = src$1.exports;

	var hasRequiredSrc;

	function requireSrc () {
		if (hasRequiredSrc) return src$1.exports;
		hasRequiredSrc = 1;
		(function (module, exports) {
			(function (root, factory) {
			  {
			      // CommonJS
			      module.exports = factory();
			  }
			})(typeof self !== 'undefined' ? self : src, function () {

			  // Default configuration
			  const DEFAULT_CONFIG = {
			      pluginName: 'asyncComponent',
			      buttonName: 'asyncActions',
			      buttonText: '🔄 Async Actions',
			      buttonTooltip: 'Perform async operations',
			      calendarButton: true,
			      actions: [
			          {
			              type: 'choiceitem',
			              value: 'fetch_data',
			              text: '📊 Fetch Data',
			              icon: 'browse'
			          },
			          {
			              type: 'choiceitem',
			              value: 'process_text',
			              text: '✏️ Process Selected Text',
			              icon: 'edit-block'
			          },
			          {
			              type: 'choiceitem',
			              value: 'analyze_content',
			              text: '🔍 Analyze Content',
			              icon: 'search'
			          },
			          {
			              type: 'choiceitem',
			              value: 'generate_summary',
			              text: '📝 Generate Summary',
			              icon: 'new-document'
			          }
			      ],
			      // Default async operation handlers
			      handlers: {
			          fetch_data: async function(editor, selectedText) {
			              // Simulate API call
			              await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
			              
			              return {
			                  type: 'data',
			                  data: [
			                      { id: 1, title: 'Sample Item 1', description: 'This is a sample item from the API' },
			                      { id: 2, title: 'Sample Item 2', description: 'Another sample item' }
			                  ],
			                  count: 2
			              };
			          },
			          
			          process_text: async function(editor, selectedText) {
			              await new Promise(resolve => setTimeout(resolve, 800));
			              
			              if (!selectedText || selectedText.trim() === '') {
			                  throw new Error('No text selected. Please select some text and try again.');
			              }
			              
			              return {
			                  type: 'text_replacement',
			                  originalText: selectedText,
			                  processedText: selectedText.toUpperCase(),
			                  wordCount: selectedText.split(' ').length
			              };
			          },
			          
			          analyze_content: async function(editor, selectedText) {
			              await new Promise(resolve => setTimeout(resolve, 1500));
			              
			              const content = selectedText || editor.getContent({ format: 'text' });
			              const words = content.toLowerCase().split(/\s+/);
			              const commonWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
			              const keywords = words
			                  .filter(word => word.length > 3 && !commonWords.includes(word))
			                  .slice(0, 5);
			              
			              return {
			                  type: 'analysis',
			                  sentiment: Math.random() > 0.5 ? 'positive' : 'neutral',
			                  keywords: keywords.length > 0 ? keywords : ['content', 'analysis', 'demo'],
			                  readability: ['excellent', 'good', 'fair'][Math.floor(Math.random() * 3)],
			                  wordCount: words.length
			              };
			          },
			          
			          generate_summary: async function(editor, selectedText) {
			              await new Promise(resolve => setTimeout(resolve, 2000));
			              
			              const summaries = [
			                  'This content discusses various aspects of text processing and analysis.',
			                  'The document contains information about async operations and component integration.',
			                  'This text appears to focus on user interface components and their functionality.',
			                  'The content covers topics related to web development and editor integration.'
			              ];
			              
			              return {
			                  type: 'summary',
			                  summary: summaries[Math.floor(Math.random() * summaries.length)],
			                  confidence: 0.75 + Math.random() * 0.2
			              };
			          }
			      },
			      
			      // Content renderers for different result types
			      renderers: {
			          data: function(result) {
			              return `
                  <div style="border: 1px solid #ddd; padding: 10px; margin: 10px 0; border-radius: 4px; background: #f8f9fa;">
                      <h4 style="margin: 0 0 10px 0; color: #2c3e50;">📊 Fetched Data (${result.count} items)</h4>
                      <ul style="margin: 0; padding-left: 20px;">
                          ${result.data.map(item => `<li><strong>${item.title}</strong>: ${item.description}</li>`).join('')}
                      </ul>
                  </div>
              `;
			          },
			          
			          text_replacement: function(result) {
			              // This will be handled specially - direct replacement
			              return null;
			          },
			          
			          analysis: function(result) {
			              return `
                  <div style="background: #e8f4f8; border: 1px solid #bee5eb; padding: 15px; margin: 10px 0; border-radius: 4px;">
                      <h4 style="margin: 0 0 10px 0; color: #0c5460;">🔍 Content Analysis</h4>
                      <p style="margin: 5px 0;"><strong>Sentiment:</strong> ${result.sentiment}</p>
                      <p style="margin: 5px 0;"><strong>Keywords:</strong> ${result.keywords.join(', ')}</p>
                      <p style="margin: 5px 0;"><strong>Readability:</strong> ${result.readability}</p>
                      <p style="margin: 5px 0;"><strong>Word Count:</strong> ${result.wordCount}</p>
                  </div>
              `;
			          },
			          
			          summary: function(result) {
			              return `
                  <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; margin: 10px 0; border-radius: 4px;">
                      <h4 style="margin: 0 0 10px 0; color: #856404;">📝 Generated Summary</h4>
                      <p style="margin: 5px 0;">${result.summary}</p>
                      <p style="margin: 10px 0 0 0;"><small>Confidence: ${(result.confidence * 100).toFixed(1)}%</small></p>
                  </div>
              `;
			          }
			      },
			      
			      // Error renderer
			      errorRenderer: function(error, actionType) {
			          return `
              <div style="background: #f8d7da; border: 1px solid #f5c6cb; padding: 15px; margin: 10px 0; border-radius: 4px; color: #721c24;">
                  <strong>❌ Error in ${actionType}:</strong> ${error.message || 'Operation failed'}
              </div>
          `;
			      },
			      
			      // Callbacks
			      onBeforeAction: null,    // Called before async operation starts
			      onAfterAction: null,     // Called after async operation completes
			      onError: null            // Called when operation fails
			  };

			  /**
			   * Create the TinyMCE plugin
			   * @param {Object} userConfig - User configuration to override defaults
			   * @returns {Function} - TinyMCE plugin function
			   */
			  function createPlugin(userConfig = {}) {
			      // Merge user config with defaults
			      const config = Object.assign({}, DEFAULT_CONFIG, userConfig);
			      
			      // Deep merge for nested objects
			      if (userConfig.handlers) {
			          config.handlers = Object.assign({}, DEFAULT_CONFIG.handlers, userConfig.handlers);
			      }
			      if (userConfig.renderers) {
			          config.renderers = Object.assign({}, DEFAULT_CONFIG.renderers, userConfig.renderers);
			      }
			      if (userConfig.actions) {
			          config.actions = userConfig.actions;
			      }

			      return function(editor, url) {
			          let isLoading = false;

			          // Utility function to log messages (can be overridden)
			          function log(message, type = 'info') {
			              if (typeof window !== 'undefined' && window.console) {
			                  console.log(`[TinyMCE Async Component] ${message}`);
			              }
			              
			              // Trigger custom logging if available
			              if (config.onLog && typeof config.onLog === 'function') {
			                  config.onLog(message, type);
			              }
			          }

			          // Main async action performer
			          async function performAsyncAction(actionType) {
			              if (isLoading) {
			                  log('Another operation is already in progress', 'warning');
			                  return;
			              }

			              isLoading = true;
			              
			              // Get selected text
			              const selectedText = editor.selection.getContent({ format: 'text' });
			              
			              // Call before action callback
			              if (config.onBeforeAction && typeof config.onBeforeAction === 'function') {
			                  try {
			                      config.onBeforeAction(actionType, selectedText, editor);
			                  } catch (e) {
			                      log(`Error in onBeforeAction: ${e.message}`, 'error');
			                  }
			              }

			              try {
			                  log(`Starting ${actionType} operation`, 'info');
			                  
			                  // Check if handler exists
			                  if (!config.handlers[actionType]) {
			                      throw new Error(`No handler found for action: ${actionType}`);
			                  }

			                  // Execute the async operation
			                  const result = await config.handlers[actionType](editor, selectedText);
			                  
			                  // Handle different result types
			                  if (result && result.type === 'text_replacement') {
			                      // Special handling for text replacement
			                      if (selectedText) {
			                          editor.selection.setContent(`<mark>${result.processedText}</mark>`);
			                      } else {
			                          throw new Error('No text selected for processing');
			                      }
			                  } else if (result && config.renderers[result.type]) {
			                      // Use appropriate renderer
			                      const content = config.renderers[result.type](result);
			                      if (content) {
			                          editor.insertContent(content);
			                      }
			                  } else if (result && typeof result === 'string') {
			                      // Direct HTML content
			                      editor.insertContent(result);
			                  } else {
			                      log(`Unknown result type for ${actionType}`, 'warning');
			                  }
			                  
			                  log(`${actionType} completed successfully`, 'success');
			                  
			                  // Call after action callback
			                  if (config.onAfterAction && typeof config.onAfterAction === 'function') {
			                      try {
			                          config.onAfterAction(actionType, result, editor);
			                      } catch (e) {
			                          log(`Error in onAfterAction: ${e.message}`, 'error');
			                      }
			                  }
			                  
			              } catch (error) {
			                  log(`${actionType} failed: ${error.message}`, 'error');
			                  
			                  // Insert error message
			                  const errorContent = config.errorRenderer(error, actionType);
			                  editor.insertContent(errorContent);
			                  
			                  // Call error callback
			                  if (config.onError && typeof config.onError === 'function') {
			                      try {
			                          config.onError(error, actionType, editor);
			                      } catch (e) {
			                          log(`Error in onError callback: ${e.message}`, 'error');
			                      }
			                  }
			              } finally {
			                  isLoading = false;
			              }
			          }

			          // Register the main async component button
			          editor.ui.registry.addSplitButton(config.buttonName, {
			              text: config.buttonText,
			              tooltip: config.buttonTooltip,
			              
			              onAction: function() {
			                  // Default action when clicking the main button
			                  if (config.actions.length > 0) {
			                      performAsyncAction(config.actions[0].value);
			                  }
			              },
			              
			              onItemAction: function(api, value) {
			                  performAsyncAction(value);
			              },
			              
			              fetch: function(callback) {
			                  callback(config.actions);
			              }
			          });

			          // Optional calendar button
			          if (config.calendarButton) {
			              editor.ui.registry.addButton('calendar', {
			                  text: '📅',
			                  tooltip: 'Insert current date',
			                  onAction: function() {
			                      const currentDate = new Date().toLocaleDateString();
			                      editor.insertContent(`<strong>${currentDate}</strong>`);
			                      log('Calendar date inserted', 'success');
			                  }
			              });
			          }

			          // Return plugin metadata
			          return {
			              getMetadata: function() {
			                  return {
			                      name: 'TinyMCE Async Component Plugin',
			                      url: 'https://github.com/yourusername/tinymce-async-component'
			                  };
			              },
			              
			              // Expose some methods for external access
			              performAction: performAsyncAction,
			              isLoading: function() { return isLoading; },
			              getConfig: function() { return config; }
			          };
			      };
			  }

			  // Auto-register the plugin if TinyMCE is available
			  if (typeof window !== 'undefined' && window.tinymce && window.tinymce.PluginManager) {
			      window.tinymce.PluginManager.add('asyncComponent', createPlugin());
			  }

			  // Export the plugin creator and default config
			  return {
			      createPlugin: createPlugin,
			      defaultConfig: DEFAULT_CONFIG,
			      version: '1.0.0'
			  };
			}); 
		} (src$1));
		return src$1.exports;
	}

	var srcExports = requireSrc();
	var index = /*@__PURE__*/getDefaultExportFromCjs(srcExports);

	return index;

}));
