/// <reference types="@angular/localize" />

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {register as registerSwiperElements} from 'swiper/element/bundle';
import { register } from 'swiper/element/bundle';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';


registerSwiperElements();
register();

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
