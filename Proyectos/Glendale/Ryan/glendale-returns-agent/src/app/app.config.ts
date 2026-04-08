/**
 * Configuración global de la aplicación Angular.
 *
 * Aquí se registran los providers que están disponibles en toda la app.
 * Si en el futuro se agregan nuevas librerías globales (animaciones, i18n, etc.),
 * se configuran aquí.
 *
 * Providers actuales:
 *   - provideRouter: configura el sistema de rutas con lazy loading
 *     + withComponentInputBinding: permite recibir parámetros de ruta como input() en componentes
 *   - provideHttpClient: habilita HttpClient para todas las llamadas al API
 *     + withInterceptorsFromDi: permite registrar interceptors (ej: auth.interceptor.ts)
 */
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Captura errores globales del browser y los reporta en la consola
    provideBrowserGlobalErrorListeners(),

    // Sistema de rutas — withComponentInputBinding permite usar parámetros de URL como input()
    // Ejemplo: en TransactionDetails, el :id llega como input directamente al componente
    provideRouter(routes, withComponentInputBinding()),

    // Cliente HTTP global — withInterceptorsFromDi habilita el auth.interceptor.ts
    // Si se agregan más interceptors en core/interceptors/, se registran en el interceptor mismo
    provideHttpClient(withInterceptorsFromDi())
  ]
};
