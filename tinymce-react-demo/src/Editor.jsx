import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TinyEditor = () => {
  return (
    <Editor
      tinymceScriptSrc="/tinymce/tinymce.min.js"  // 👈 this is important
      init={{
        height: 400,
        plugins: 'calendar',
        external_plugins: {
          calendar: '/tinymce/plugins/calendar/plugin.min.js',
        },
        skin_url: '/tinymce/skins/ui/oxide',
        content_css: '/tinymce/skins/content/default/content.css',
      }}
    />
  );
};

export default TinyEditor;