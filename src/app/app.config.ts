import { ApplicationConfig, InjectionToken, provideBrowserGlobalErrorListeners, Provider } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, HTTP_INTERCEPTORS } from '@angular/common/http';

import { routes } from './app.routes';
import { VehicleImplRepository } from './core/infraestructure/repositories/vehicle/vehicle-impl.repository';
import { VehicleRepository } from './core/domain/repositories/vehicle/vehicle.repository';

export const VEHICLE_REPOSITORY = new InjectionToken<VehicleRepository>(
  'VEHICLE_REPOSITORY'
);

const REPOSITORIES: Provider[] = [
  { provide: VEHICLE_REPOSITORY, useClass: VehicleImplRepository },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    ...REPOSITORIES
  ]
};
