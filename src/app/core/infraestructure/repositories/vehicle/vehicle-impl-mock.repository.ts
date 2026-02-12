import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { ApiResponse, Vehicle } from '@core/domain/entities';
import { VehicleRepository } from '@core/domain/repositories/vehicle/vehicle.repository';
import { VehicleFilter } from '@core/application/ports/vehicle/vehicle-filter.interface';

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
