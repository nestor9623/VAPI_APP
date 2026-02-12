import { CommonModule } from '@angular/common';
import { HomeService } from './services/home-page.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FilterComponent } from '@shared/components/filter/filter';
import { TableComponent } from '@shared/components/table/table';
import { HeaderComponent } from '@shared/components/header/header';
import { SpinnerComponent } from '@shared/components/spinner/spinner';
import { VehicleItem } from '@core/domain/mappers/vehicle.mapper';


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
export class HomePage implements OnInit {
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _homeVehiclesService = inject(HomeService);

  data = this._homeVehiclesService.data;
  isEmptyData = this._homeVehiclesService.isEmptyData;
  totalElements = this._homeVehiclesService.totalElements;
  filteredCount = this._homeVehiclesService.filteredCount;
  isLoading = this._homeVehiclesService.isLoading;

  ngOnInit(): void {
    this._homeVehiclesService.loadVehicles()
      .pipe(
        takeUntilDestroyed(this._destroyRef))
      .subscribe();
  }

  onSearch(value: string) {
    this._homeVehiclesService.setSearchTerm(value);
  }

  onRowSelected(row: VehicleItem) {
    this._homeVehiclesService.navigateToDetailWithId(row.id);
  }
}
