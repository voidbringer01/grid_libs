import { Component } from '@angular/core';

@Component({
  selector: 'app-chart-widget',
  standalone: false,
  template: `
    <div class="chart-container">
      <div class="bar-chart">
        <div class="bar-wrapper" *ngFor="let bar of bars">
          <div class="bar" [style.height.%]="bar.value" [title]="bar.label + ': ' + bar.value"></div>
          <div class="bar-label">{{ bar.label }}</div>
        </div>
      </div>
      <div class="chart-title">Monthly Sales</div>
    </div>
  `,
  styles: [`
    .chart-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 8px;
    }
    .bar-chart {
      display: flex;
      align-items: flex-end;
      gap: 4px;
      flex: 1;
      padding: 8px 0;
    }
    .bar-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
      height: 100%;
      justify-content: flex-end;
    }
    .bar {
      width: 100%;
      background: linear-gradient(180deg, #3f51b5, #7986cb);
      border-radius: 4px 4px 0 0;
      min-height: 4px;
      transition: height 0.3s ease;
    }
    .bar-label {
      font-size: 0.6rem;
      color: #666;
      margin-top: 4px;
    }
    .chart-title {
      text-align: center;
      font-size: 0.75rem;
      color: #666;
      margin-top: 4px;
    }
  `]
})
export class ChartWidgetComponent {
  bars = [
    { label: 'Jan', value: 65 },
    { label: 'Feb', value: 45 },
    { label: 'Mar', value: 80 },
    { label: 'Apr', value: 55 },
    { label: 'May', value: 90 },
    { label: 'Jun', value: 70 },
    { label: 'Jul', value: 85 },
  ];
}
