import { Router } from "@angular/router";
import { VehicleItem } from "@core/domain/mappers/vehicle.mapper";
import { computed, inject, Injectable, signal } from "@angular/core";
import { catchError, EMPTY, finalize, Observable, tap } from "rxjs";
import { GetVehiclesUseCase } from "@core/application/use-cases/vehicle/get-vehicles.usecase";
import { ApiResponse, FORMAT_STATES } from "@core/domain/entities";
import { VehicleFilter } from "@core/application/ports/vehicle/vehicle-filter.interface";
//TODO: Este servicio se puede eliminar y pasar toda la lógica al store, pero lo dejo así para mostrar un ejemplo de servicio con signals y rxjs
@Injectable({ providedIn: 'root' })
export class HomeService {
  private readonly _router = inject(Router);
  private readonly _getVehiclesUseCase = inject(GetVehiclesUseCase);
  private _allData = signal<VehicleItem[]>([]);
  private _searchTerm = signal<string>('');

  data = computed(() => {
    const search = this._searchTerm().toLowerCase().trim();
    if (!search) return this._allData();

    return this._allData().filter(vehicle =>
      vehicle.description.toLowerCase().includes(search)
    );
  });

  isLoading = signal<boolean>(false);
  isError = signal<boolean>(false);
  valueFilters = signal<VehicleFilter>({ format: FORMAT_STATES.JSON });

  totalElements = computed(() => this._allData().length);
  filteredCount = computed(() => this.data().length);
  isEmptyData = computed(() => this.data().length === 0);

  loadVehicles(): Observable<ApiResponse<VehicleItem>> {
    this.isLoading.set(true);
    return this._getVehiclesUseCase.execute(this.valueFilters())
      .pipe(
        tap(response => {
          this._allData.set(response.Results);
          this.isError.set(false);
        }),
        catchError(() => {
          this._allData.set([]);
          this.isError.set(true);
          return EMPTY;
        }),
        finalize(() => {
          this.isLoading.set(false);
        })
      );
  }

  navigateToDetailWithId(id: number): void {
    this._router.navigate(['/home', id]);
  }
}
