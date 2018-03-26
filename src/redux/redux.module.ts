import { ProvidersModule } from './../providers/providers.module';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './reducers';
import { effects } from './effects';

@NgModule({
  imports:[
    ProvidersModule,
    EffectsModule.forRoot(effects),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ maxAge: 5 }),
  ],
})

export class ReduxModule { }
