import { Component } from '@angular/core';

@Component({
  selector: 'app-text-widget',
  standalone: false,
  template: `
    <div class="text-container">
      <textarea *ngIf="editing" [(ngModel)]="content" (blur)="editing = false" class="editor"></textarea>
      <div *ngIf="!editing" class="content" (dblclick)="startEdit()">{{ content }}</div>
      <div class="hint" *ngIf="!editing">Double-click to edit</div>
    </div>
  `,
  styles: [`
    .text-container {
      height: 100%;
      padding: 8px;
      display: flex;
      flex-direction: column;
    }
    .content {
      flex: 1;
      overflow: auto;
      line-height: 1.6;
      color: #333;
      white-space: pre-wrap;
    }
    .editor {
      flex: 1;
      width: 100%;
      border: 1px solid #3f51b5;
      border-radius: 4px;
      padding: 8px;
      font-family: inherit;
      font-size: 0.9rem;
      resize: none;
      outline: none;
    }
    .hint {
      font-size: 0.7rem;
      color: #aaa;
      text-align: right;
      margin-top: 4px;
    }
  `]
})
export class TextWidgetComponent {
  editing = false;
  content = 'This is a text widget. Double-click to edit the content. You can add notes, descriptions, or any markdown-like text here.';

  startEdit(): void {
    this.editing = true;
  }
}
