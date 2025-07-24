import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import * as monaco from 'monaco-editor';

(self as any).MonacoEnvironment = {
  getWorkerUrl: function (moduleId: string, label: string) {
    return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
      self.onmessage = function() {};
    `)}`;
  },
};

monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
  noSemanticValidation: true,
  noSyntaxValidation: true,
});

monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
  noSemanticValidation: true,
  noSyntaxValidation: true,
});

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
