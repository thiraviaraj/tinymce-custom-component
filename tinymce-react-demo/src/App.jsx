import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './App.css';

function App() {
  return (
    <div>
      <h1>TinyMCE Calendar Plugin Demo (React + Vite + TS)</h1>
      <Editor
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        init={{
          external_plugins: {
            asyncComponent: '/plugins/asyncComponent.js'
          },
          plugins: 'asyncComponent lists link image table code help wordcount',
          toolbar: 'asyncActions calendar | undo redo | styles | bold italic | alignleft aligncenter alignright | bullist numlist | link image | code help',
          menubar: 'file edit view insert format tools table help',
          content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }',
          
          calendar_options: { format: 'Y-m-d H:i' }
        }}
      />
    </div>
  );
}

export default App;
