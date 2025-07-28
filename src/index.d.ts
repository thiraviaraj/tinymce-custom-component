// Type definitions for tinymce-async-component
// Project: https://github.com/thiraviarajb/tinymce-async-component
// Definitions by: Thiraviaraj <https://github.com/thiraviarajb>

declare module 'tinymce-async-component' {
    interface AsyncAction {
      type: 'choiceitem';
      value: string;
      text: string;
      icon?: string;
    }
  
    interface AsyncResult {
      type: string;
      [key: string]: any;
    }
  
    interface AsyncHandler {
      (editor: any, selectedText: string | null): Promise<AsyncResult>;
    }
  
    interface AsyncRenderer {
      (result: AsyncResult): string | null;
    }
  
    interface ErrorRenderer {
      (error: Error, actionType: string): string;
    }
  
    interface PluginConfig {
      pluginName?: string;
      buttonName?: string;
      buttonText?: string;
      buttonTooltip?: string;
      calendarButton?: boolean;
      actions?: AsyncAction[];
      handlers?: { [key: string]: AsyncHandler };
      renderers?: { [key: string]: AsyncRenderer };
      errorRenderer?: ErrorRenderer;
      onBeforeAction?: (actionType: string, selectedText: string | null, editor: any) => void;
      onAfterAction?: (actionType: string, result: AsyncResult, editor: any) => void;
      onError?: (error: Error, actionType: string, editor: any) => void;
      onLog?: (message: string, type: string) => void;
    }
  
    interface PluginInstance {
      getMetadata(): { name: string; url: string };
      performAction(actionType: string): Promise<void>;
      isLoading(): boolean;
      getConfig(): PluginConfig;
    }
  
    interface TinyMCEAsyncComponent {
      createPlugin(userConfig?: PluginConfig): (editor: any, url: string) => PluginInstance;
      defaultConfig: PluginConfig;
      version: string;
    }
  
    const plugin: TinyMCEAsyncComponent;
    export = plugin;
  }