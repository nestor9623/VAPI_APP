import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { VehicleRepository } from '../../../domain/repositories/vehicle/vehicle.repository';
import { ApiResponse, Vehicle } from '../../../domain/entities/index';
import { VehicleFilter } from '../../../application/ports/vehicle/vehicle-filter.interface';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class VehicleRRMMImplRepository implements VehicleRepository {
  private readonly BASE_URL = `${environment.apiUrl}/GetAllMakes`;
  private readonly BASE_VEHICLE_TYPES = `${environment.apiUrl}/GetVehicleTypesForMakeId`;
  private readonly BASE_VEHICLE_MODELS = `${environment.apiUrl}/GetModelsForMakeId`;

  constructor(private readonly http: HttpClient) { }
  getVehicleTypesByBrand(id: number): Observable<ApiResponse<Vehicle>> {
    return this.http.get<ApiResponse<Vehicle>>(
      `${this.BASE_VEHICLE_TYPES}/${id}`
    );
  }

  getVehicleModelsByBrand(id: number): Observable<ApiResponse<Vehicle>> {
    return this.http.get<ApiResponse<Vehicle>>(
      `${this.BASE_VEHICLE_MODELS}/${id}`
    );
  }

  getVehicles(filters: VehicleFilter): Observable<ApiResponse<Vehicle>> {
    return this.http.get<ApiResponse<Vehicle>>(
      `${this.BASE_URL}`,
      {
        params: { format: filters.format },
      }
    );
  }

}
