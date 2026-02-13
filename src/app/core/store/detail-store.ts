import { signalStore, withState, withMethods, patchState, withHooks } from '@ngrx/signals';
import { VehicleItem } from '@core/domain/mappers/vehicle.mapper';
import { DetailState } from './app-state';
import { effect, isDevMode } from '@angular/core';

export function debugStore() {
  return withHooks({
    onInit(store) {
      if (!isDevMode()) return;

      effect(() => {
        console.log(`[DetailStore]`, {
          modelos: store["modelos"](),
          tipos: store["tipos"](),
          loading: store["loading"](),
          error: store["error"](),
        });
      });

    }
  });
}

export const DetailStore = signalStore(
  { providedIn: 'root' },
  withState<DetailState>({
    modelos: [],
    tipos: [],
    error: false,
  }),
  withMethods((store) => ({
    setModelos(modelos: VehicleItem[]) {
      patchState(store, { modelos });
    },
    setTipos(tipos: VehicleItem[]) {
      patchState(store, { tipos });
    },
    setError(error: boolean) {
      patchState(store, { error });
    },
    reset() {
      patchState(store, { modelos: [], tipos: [], error: false });
    },
  })),
  debugStore()
);
