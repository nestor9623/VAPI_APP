import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FilterComponent } from '@shared/components/filter/filter';
import { TableComponent } from '@shared/components/table/table';
import { HeaderComponent } from '@shared/components/header/header';
import { SpinnerComponent } from '@shared/components/spinner/spinner';
import { VehicleItem } from '@core/domain/mappers/vehicle.mapper';
import { VehicleStore } from '@core/store/home-store';

@Component({
  selector: 'vapi-home-page',
  standalone: true,
  imports: [
    CommonModule,
    FilterComponent,
    TableComponent,
    HeaderComponent,
    SpinnerComponent
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage {
  private readonly _router = inject(Router);
  readonly store = inject(VehicleStore);

  onSearch(value: string) {
    this.store.setFilter({ ...this.store.filter(), description: value });
  }

  onRowSelected(row: VehicleItem) {
     this.store.setSelectedRow(row);
     this._router.navigate(['/home', row.id]);
  }
}
