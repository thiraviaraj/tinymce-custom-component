import { Component } from '@angular/core';
import { EditorComponent, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EditorComponent],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ],
  template: `
  <h1>TinyMCE Calendar Plugin Demo (Angular 20)
</h1>
  <editor
    [init]="init"
  />
  `
})
export class AppComponent {
  init: EditorComponent['init'] = {
    plugins: 'asyncComponent lists link image table code help wordcount',
    toolbar: 'asyncActions calendar | undo redo | styles | bold italic | alignleft aligncenter alignright | bullist numlist | link image | code help',
    menubar: 'file edit view insert format tools table help',
    content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }',
            
    external_plugins: {
      asyncComponent: '/assets/plugins/asyncComponent.js'
    },
    calendar_options: { format: 'Y-m-d H:i' },
    asyncComponent_options: {
      component: 'calendar',
      props: {
        format: 'Y-m-d H:i'
      }
    },
    height: 400,
    skin_url: '/tinymce/skins/ui/oxide',
    content_css: '/tinymce/skins/content/default/content.css',
  };

  // Removed ngOnInit dynamic script loading, as plugin is loaded globally
}