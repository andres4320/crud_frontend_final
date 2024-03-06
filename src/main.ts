/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

// Combina las configuraciones de la aplicación y las de Toastr
const combinedConfig = {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []), // Mantén los proveedores existentes si los hay
    provideAnimations(), // Proveedores de animaciones requeridos
    provideToastr(), // Proveedores de Toastr
  ],
};

bootstrapApplication(AppComponent, combinedConfig)
  .catch((err) => console.error(err));