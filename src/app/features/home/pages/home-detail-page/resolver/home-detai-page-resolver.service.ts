import { inject, Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import { VehicleItem } from '@core/domain/mappers/vehicle.mapper';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { GetVehicleTypesByIdUseCase } from '@core/application/use-cases/vehicle/get-vehicle-types-by-id.usecase';
import { GetVehicleModelsByIdUseCase } from '@core/application/use-cases/vehicle/get-vehicle-models-by-id.usecase';
import { DetailStore } from '@core/store/detail-store';

export interface VehicleDetailData {
  models: VehicleItem[];
  types: VehicleItem[];
}

@Injectable({ providedIn: 'root' })
export class HomeDetailResolver implements Resolve<VehicleDetailData | null> {
  private readonly _detailStore = inject(DetailStore);
  private readonly _getVehicleModelsUseCase = inject(GetVehicleModelsByIdUseCase);
  private readonly _getVehicleTypesUseCase = inject(GetVehicleTypesByIdUseCase);
  private readonly _router = inject(Router);

  resolve(route: ActivatedRouteSnapshot): Observable<VehicleDetailData | null> {
    const id = route.paramMap.get('id');

    if (!id) {
      this._navigateToHome();
      return of(null);
    }

    const vehicleId = Number(id);

    if (isNaN(vehicleId)) {
      this._navigateToHome();
      return of(null);
    }

    return forkJoin({
      types: this._getVehicleTypesUseCase.execute(vehicleId),
      models: this._getVehicleModelsUseCase.execute(vehicleId),
    }).pipe(
      map(({ models, types }) => {
        this._detailStore.setModelos(models.Results);
        this._detailStore.setTipos(types.Results);
        return {
          models: models.Results,
          types: types.Results
        };
      }),
      catchError((error) => {
        console.error('Error al cargar datos del vehículo:', error);
        this._detailStore.reset();
        this._navigateToHome();
        return of(null);
      })
    );
  }

  private _navigateToHome(): void {
    this._router.navigate(['/home']);
  }
}
