# TinyMCE Async Component Plugin [![Deploy static content to Pages](https://github.com/thiraviaraj/tinymce-custom-component/actions/workflows/static.yml/badge.svg)](https://github.com/thiraviaraj/tinymce-custom-component/actions/workflows/static.yml)

A customizable async component plugin for TinyMCE that provides dropdown actions with loading states, error handling, and extensible async operations.

## Features

- 🔄 **Async Operations**: Perform API calls and long-running operations with proper loading states
- 🎛️ **Smart Button States**: Buttons disable during operations with loading indicators
- 📋 **Dropdown Selection**: Multiple action types with contextual icons and descriptions
- 🔧 **Framework Agnostic**: Works with Angular, React, Vue, and vanilla JavaScript
- 🎨 **Customizable**: Easy to configure and extend with your own actions and handlers
- 📝 **TypeScript Support**: Full TypeScript definitions included

## Installation

```bash
npm install tinymce-async-component
```

## Quick Start

### Basic Usage

```javascript
// Include the plugin
import TinyMCEAsyncComponent from 'tinymce-async-component';

// Initialize TinyMCE with the plugin
tinymce.init({
  selector: '#editor',
  plugins: 'asyncComponent',
  toolbar: 'asyncActions | bold italic',
});
```

### With Custom Configuration

```javascript
import TinyMCEAsyncComponent from 'tinymce-async-component';

// Register custom plugin with configuration
tinymce.PluginManager.add('myAsyncComponent', TinyMCEAsyncComponent.createPlugin({
  buttonText: '🚀 My Actions',
  buttonTooltip: 'Perform custom async operations',
  actions: [
    {
      type: 'choiceitem',
      value: 'translate',
      text: '🌐 Translate Text',
      icon: 'language'
    },
    {
      type: 'choiceitem',
      value: 'summarize',
      text: '📄 Summarize',
      icon: 'new-document'
    }
  ],
  handlers: {
    translate: async function(editor, selectedText) {
      // Your custom async operation
      const response = await fetch('/api/translate', {
        method: 'POST',
        body: JSON.stringify({ text: selectedText }),
        headers: { 'Content-Type': 'application/json' }
      });
      const result = await response.json();
      
      return {
        type: 'translation',
        originalText: selectedText,
        translatedText: result.translation,
        language: result.language
      };
    }
  },
  renderers: {
    translation: function(result) {
      return `
        <div style="border: 1px solid #ddd; padding: 10px; margin: 10px 0; border-radius: 4px;">
          <h4>🌐 Translation (${result.language})</h4>
          <p><strong>Original:</strong> ${result.originalText}</p>
          <p><strong>Translated:</strong> ${result.translatedText}</p>
        </div>
      `;
    }
  }
}));

tinymce.init({
  selector: '#editor',
  plugins: 'myAsyncComponent',
  toolbar: 'myAsyncComponent',
});
```

## Configuration Options

### Plugin Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `pluginName` | string | 'asyncComponent' | Name of the plugin |
| `buttonName` | string | 'asyncActions' | Name of the toolbar button |
| `buttonText` | string | '🔄 Async Actions' | Text displayed on the button |
| `buttonTooltip` | string | 'Perform async operations' | Tooltip for the button |
| `calendarButton` | boolean | true | Whether to include the calendar button |
| `actions` | AsyncAction[] | Default actions | Array of dropdown actions |
| `handlers` | object | Default handlers | Async operation handlers |
| `renderers` | object | Default renderers | Content renderers for results |
| `errorRenderer` | function | Default error renderer | Function to render errors |

### Action Configuration

Each action in the `actions` array should have:

```javascript
{
  type: 'choiceitem',
  value: 'unique_action_id',
  text: 'Display Text',
  icon: 'tinymce-icon-name' // optional
}
```

### Handler Functions

Handler functions receive the editor instance and selected text:

```javascript
async function myHandler(editor, selectedText) {
  // Perform async operation
  const result = await someAsyncOperation(selectedText);
  
  // Return result with type for renderer
  return {
    type: 'my_result_type',
    data: result,
    // ... other properties
  };
}
```

### Renderer Functions

Renderer functions convert results to HTML:

```javascript
function myRenderer(result) {
  return `
    <div class="my-result">
      <h4>${result.title}</h4>
      <p>${result.content}</p>
    </div>
  `;
}
```

## Default Actions

The plugin comes with four default actions:

1. **Fetch Data** (`fetch_data`): Simulates API data fetching
2. **Process Selected Text** (`process_text`): Transforms selected text
3. **Analyze Content** (`analyze_content`): Performs content analysis
4. **Generate Summary** (`generate_summary`): Creates content summaries

## Callbacks

### onBeforeAction
Called before an async operation starts:

```javascript
onBeforeAction: function(actionType, selectedText, editor) {
  console.log(`Starting ${actionType} with text:`, selectedText);
}
```

### onAfterAction
Called after an async operation completes successfully:

```javascript
onAfterAction: function(actionType, result, editor) {
  console.log(`Completed ${actionType} with result:`, result);
}
```

### onError
Called when an async operation fails:

```javascript
onError: function(error, actionType, editor) {
  console.error(`Error in ${actionType}:`, error);
}
```

### onLog
Custom logging function:

```javascript
onLog: function(message, type) {
  // Send to your logging service
  logger.log(type, message);
}
```

## Advanced Usage

### Creating Multiple Plugin Instances

```javascript
// Create different plugins for different purposes
const aiPlugin = TinyMCEAsyncComponent.createPlugin({
  buttonText: '🤖 AI Tools',
  actions: [/* AI-specific actions */],
  handlers: {/* AI handlers */}
});

const apiPlugin = TinyMCEAsyncComponent.createPlugin({
  buttonText: '🌐 API Tools',
  actions: [/* API-specific actions */],
  handlers: {/* API handlers */}
});

tinymce.PluginManager.add('aiTools', aiPlugin);
tinymce.PluginManager.add('apiTools', apiPlugin);
```

### Error Handling

```javascript
handlers: {
  myAction: async function(editor, selectedText) {
    try {
      const response = await fetch('/api/endpoint');
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      // Error will be caught and displayed automatically
      throw new Error(`Failed to process: ${error.message}`);
    }
  }
}
```

### Loading States

The plugin automatically manages loading states, but you can also check the loading state:

```javascript
const pluginInstance = editor.plugins.asyncComponent;
if (pluginInstance.isLoading()) {
  console.log('Operation in progress...');
}
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

### 1.0.0
- Initial release
- Basic async component functionality
- Default actions and handlers
- TypeScript support
- Comprehensive documentation
