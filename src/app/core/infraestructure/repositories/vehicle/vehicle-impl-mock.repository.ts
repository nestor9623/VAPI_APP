import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { VehicleRepository } from '../../../domain/repositories/vehicle/vehicle.repository';
import { ApiResponse, Vehicle } from '../../../domain/entities/index';
import { VehicleFilter } from '../../../application/ports/vehicle/vehicle-filter.interface';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class VehicleImplMockRepository implements VehicleRepository {
  private readonly BASE_URL = `${environment.apiUrl}/GetAllMakes`;
  constructor(private readonly http: HttpClient) { }
  getVehicleTypesByBrand(id: number): Observable<ApiResponse<Vehicle>> {
    return this.http.get<ApiResponse<Vehicle>>(
      '/assets/mocks/vehicle/getVehicleTypes.json',
      {
        params: { format: 'json' },
      }
    );
  }

  getVehicleModelsByBrand(id: number): Observable<ApiResponse<Vehicle>> {
    return this.http.get<ApiResponse<Vehicle>>(
      '/assets/mocks/vehicle/getVehicleModels.json'
    );
  }

  getVehicles(filters: VehicleFilter): Observable<ApiResponse<Vehicle>> {
    return this.http.get<ApiResponse<Vehicle>>(
      '/assets/mocks/vehicle/getVehicleBrands.json',
      {
        params: { format: filters.format },
      }
    );
  }

}
