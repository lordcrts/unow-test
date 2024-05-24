import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { EffectsModule } from '@ngrx/effects';
import { SharedEffects } from './shared/store/shared.effects';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './shared/store/app.state';
import { NgxSpinnerModule } from 'ngx-spinner';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideClientHydration(), 
    provideHttpClient(withFetch()), 
    provideAnimationsAsync(),
    importProvidersFrom(
      HttpClientModule, 
      EffectsModule.forRoot([SharedEffects]),
      StoreModule.forRoot(
        appReducer
      ),
      NgxSpinnerModule,
      StoreDevtoolsModule.instrument({
        maxAge: 5,
        autoPause: true,
      }),
    ),
  ]
};
