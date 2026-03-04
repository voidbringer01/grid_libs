import { Component } from '@angular/core';

@Component({
  selector: 'app-stats-widget',
  standalone: false,
  template: `
    <div class="stats-grid">
      <div class="stat-card" *ngFor="let stat of stats">
        <div class="stat-value">{{ stat.value }}</div>
        <div class="stat-label">{{ stat.label }}</div>
        <div class="stat-change" [class.positive]="stat.change > 0" [class.negative]="stat.change < 0">
          {{ stat.change > 0 ? '+' : '' }}{{ stat.change }}%
        </div>
      </div>
    </div>
  `,
  styles: [`
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
      padding: 8px;
      height: 100%;
    }
    .stat-card {
      background: #f5f5f5;
      border-radius: 8px;
      padding: 12px;
      text-align: center;
    }
    .stat-value {
      font-size: 1.5rem;
      font-weight: bold;
      color: #333;
    }
    .stat-label {
      font-size: 0.75rem;
      color: #666;
      margin-top: 4px;
    }
    .stat-change {
      font-size: 0.75rem;
      margin-top: 4px;
    }
    .positive { color: #4caf50; }
    .negative { color: #f44336; }
  `]
})
export class StatsWidgetComponent {
  stats = [
    { label: 'Revenue', value: '$12.4k', change: 8.2 },
    { label: 'Users', value: '1,234', change: 3.1 },
    { label: 'Orders', value: '456', change: -1.5 },
    { label: 'Conversion', value: '3.6%', change: 0.4 },
  ];
}
