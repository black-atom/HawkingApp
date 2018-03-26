import { ProvidersModule } from './../providers/providers.module';
import { NgModule } from '@angular/core';
import { StoreModule, ActionReducer } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { localStorageSync } from 'ngrx-store-localstorage';

import { reducers } from './reducers';
import { effects } from './effects';

function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: ['login','atendimentos', 'monitoramentos'],
    rehydrate: true,
  })(reducer);
}
const metaReducers: [any] = [localStorageSyncReducer];

@NgModule({
  imports:[
    ProvidersModule,
    EffectsModule.forRoot(effects),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({ maxAge: 5 }),
  ],
})

export class ReduxModule { }
