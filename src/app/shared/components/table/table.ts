import { CommonModule } from '@angular/common';
import { Component, computed, effect, input, output, signal } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { VehicleItem } from '@core/domain/mappers/vehicle.mapper';


@Component({
  selector: 'vapi-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    ScrollingModule
  ],
  templateUrl: './table.html',
  styleUrls: ['./table.scss']
})
export class TableComponent {
  data = input.required<VehicleItem[]>();

  dataSource = new MatTableDataSource<VehicleItem>();
  isEmptyData = computed(() => this.data().length === 0);

  rowSelected = output<VehicleItem>();
  selectedRow = signal<VehicleItem | null>(null);

  constructor() {
    effect(() => {
      this.dataSource.data = this.data();
    });
  }

  onSelectRow(row: VehicleItem) {
    this.selectedRow.set(row);
    this.rowSelected.emit(row);
  }
}
