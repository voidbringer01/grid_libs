import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-widget-frame',
  standalone: false,
  templateUrl: './widget-frame.component.html',
  styleUrls: ['./widget-frame.component.scss']
})
export class WidgetFrameComponent {
  @Input() title = '';
  @Input() editMode = false;
  @Input() instanceId = '';
  @Output() removed = new EventEmitter<string>();

  onRemove(): void {
    this.removed.emit(this.instanceId);
  }
}
