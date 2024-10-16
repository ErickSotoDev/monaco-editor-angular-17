import { Component, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as monaco from 'monaco-editor';

@Component({
  selector: 'app-diff-editor',
  template: `<div #editorContainer style="height:500px;"></div>`,
  standalone: true
})
export class DiffEditorComponent implements AfterViewInit {
  @ViewChild('editorContainer', { static: true }) editorContainer!: ElementRef;
  @Input() originalText: string = '';
  @Input() modifiedText: string = '';

  private diffEditor!: monaco.editor.IStandaloneDiffEditor;

  ngAfterViewInit(): void {
    this.defineCustomTheme();
    this.initializeDiffEditor();
  }

  private defineCustomTheme() {
    // Definir tema personalizado
    monaco.editor.defineTheme('myCustomTheme', {
      base: 'vs', // vs (claro), vs-dark (oscuro), hc-black (alto contraste)
      inherit: true, // hereda de la base
      rules: [
        { token: 'comment', foreground: 'ffa500', fontStyle: 'italic' },
        { token: 'keyword', foreground: '0000ff', fontStyle: 'bold' },
        { token: 'identifier', foreground: '1e90ff' },
        { token: 'string', foreground: '008000' },
        { token: 'number', foreground: 'ff4500' }
      ],
      colors: {
        'editor.background': '#f0f0f0', // color de fondo del editor
        'editor.lineHighlightBackground': '#d3d3d3', // color de la línea resaltada
        'editor.selectionBackground': '#add8e6', // color de la selección de texto
        'editorCursor.foreground': '#ff0000', // color del cursor
        'editor.foreground': '#000000', // color del texto
        'editorGutter.background': '#dcdcdc', // fondo de la gutter (área de números de línea)
      }
    });
  }

  private initializeDiffEditor() {
    const container = this.editorContainer.nativeElement;

    this.diffEditor = monaco.editor.createDiffEditor(container, {
      enableSplitViewResizing: true,
      renderSideBySide: true,
      theme: 'myCustomTheme' // Aplicar el tema personalizado
    });

    const originalModel = monaco.editor.createModel(this.originalText, 'text/plain');
    const modifiedModel = monaco.editor.createModel(this.modifiedText, 'text/plain');

    this.diffEditor.setModel({
      original: originalModel,
      modified: modifiedModel
    });
  }
}
