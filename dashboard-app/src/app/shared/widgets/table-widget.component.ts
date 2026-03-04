import { Component } from '@angular/core';

@Component({
  selector: 'app-table-widget',
  standalone: false,
  template: `
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th *ngFor="let col of columns">{{ col }}</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of rows">
            <td>{{ row.name }}</td>
            <td>{{ row.status }}</td>
            <td>{{ row.amount }}</td>
            <td [class]="row.trend > 0 ? 'up' : 'down'">{{ row.trend > 0 ? '▲' : '▼' }} {{ row.trend }}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .table-container {
      overflow: auto;
      height: 100%;
      padding: 4px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.8rem;
    }
    th {
      background: #3f51b5;
      color: white;
      padding: 6px 8px;
      text-align: left;
      position: sticky;
      top: 0;
    }
    td {
      padding: 5px 8px;
      border-bottom: 1px solid #eee;
    }
    tr:hover td { background: #f5f5f5; }
    .up { color: #4caf50; }
    .down { color: #f44336; }
  `]
})
export class TableWidgetComponent {
  columns = ['Name', 'Status', 'Amount', 'Trend'];
  rows = [
    { name: 'Product A', status: 'Active', amount: '$1,200', trend: 5.2 },
    { name: 'Product B', status: 'Active', amount: '$890', trend: -2.1 },
    { name: 'Product C', status: 'Inactive', amount: '$450', trend: 1.8 },
    { name: 'Product D', status: 'Active', amount: '$2,100', trend: 12.3 },
    { name: 'Product E', status: 'Active', amount: '$670', trend: -0.5 },
  ];
}
