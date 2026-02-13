import { VehicleState } from './app-state';
import { FORMAT_STATES } from '@core/domain/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap, catchError, of } from 'rxjs';
import { computed, effect, inject, isDevMode } from '@angular/core';
import { signalStore, withState, withComputed, withMethods, withHooks, patchState } from '@ngrx/signals';
import { VehicleFilter } from '@core/application/ports/vehicle/vehicle-filter.interface';
import { GetVehiclesUseCase } from '@core/application/use-cases/vehicle/get-vehicles.usecase';
import { VehicleItem } from '@core/domain/mappers/vehicle.mapper';

//Defino una función de debug y comprobar la data
export function debugStore() {
  return withHooks({
    onInit(store) {
      if (!isDevMode()) return;

      effect(() => {
        console.log(`[VehicleStore]`, {
          brands: store["brands"](),
          filter: store["filter"](),
          loading: store["loading"](),
          error: store["error"](),
          rowSelected: store["rowSelected"]()
        });
      });

    }
  });
}



export const VehicleStore = signalStore(
  { providedIn: 'root' },
  withState<VehicleState>({
    brands: [],
    filter: { description: '', format: FORMAT_STATES.JSON },
    loading: false,
    error: false,
    rowSelected: null,
  }),
  withComputed(({ brands, filter }) => ({
    filteredBrands: computed(() => {
      const search = filter().description?.toLowerCase().trim() || '';
      if (!search) return brands();
      return brands().filter(b =>
        b.description.toLowerCase().includes(search) ||
        b.id.toString().includes(search)
      );
    }),
    totalCount: computed(() => brands().length),
    isEmpty: computed(() => brands().length === 0),
  })),
  withMethods((store, getVehiclesUseCase = inject(GetVehiclesUseCase)) => ({
    setFilter(filter: VehicleFilter) {
      patchState(store, { filter });
    },
    setSelectedRow(row: VehicleItem | null) {
      patchState(store, { rowSelected: row });
    },
    loadBrands: rxMethod<void>(
      pipe(
        //Cambio solo el loading a true
        tap(() => patchState(store, { loading: true, error: false })),
        switchMap(() =>
          getVehiclesUseCase.execute(store.filter()).pipe(
            //Al recibir la respuesta, actualizo las marcas y seteo loading a false
            tap(response => patchState(store, { brands: response.Results, loading: false })),
            catchError(() => {
              //En caso de error, limpio las marcas, seteo error a true y loading a false
              patchState(store, { brands: [], error: true, loading: false });
              return of(null);
            })
          )
        )
      )
    ),
    reset() {
      patchState(store, {
        brands: [],
        filter: { format: FORMAT_STATES.JSON },
        loading: false,
        error: false,
      });
    },
  })),
  withHooks({
    onInit: ({ loadBrands }) => {
      loadBrands();
    },
  }),
  debugStore()
);
