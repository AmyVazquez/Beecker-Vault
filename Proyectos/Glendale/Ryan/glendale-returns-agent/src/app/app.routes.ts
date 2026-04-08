/**
 * Definición de rutas de la aplicación.
 *
 * Todas las rutas usan lazy loading con loadComponent para que
 * cada vista se cargue solo cuando el usuario la visita.
 * Esto mejora el tiempo de carga inicial del dashboard.
 *
 * Estructura de rutas:
 *   /                   → Summary (vista principal)
 *   /run-history        → Run History (tabla de devoluciones)
 *   /run-history/:id    → Transaction Details (detalle de una devolución)
 *
 * El resolver `transactionDetailResolver` pre-carga los datos de la devolución
 * antes de que el componente se renderice, evitando pantallas en blanco.
 *
 * Para agregar una nueva vista:
 *   1. Crear la carpeta en src/app/(nombre-vista)/
 *   2. Agregar la ruta aquí con loadComponent
 *   3. Si necesita datos pre-cargados, crear un resolver
 */
import { Routes } from '@angular/router';
import { transactionDetailResolver } from './(transaction-details)/transaction-details/transaction-details.resolver';

export const routes: Routes = [
  {
    // Vista principal del dashboard — entrada por defecto
    path: '',
    loadComponent: () =>
      import('./(summary)/summary/summary.component')
        .then(m => m.SummaryComponent)
  },
  {
    // Historial completo de devoluciones con tabla, búsqueda y filtros
    path: 'run-history',
    loadComponent: () =>
      import('./(run-history)/run-history/run-history.component')
        .then(m => m.RunHistoryComponent)
  },
  {
    // Detalle de una devolución específica — se accede desde Run History
    // El parámetro :id corresponde al userId (formato RTN-00-001)
    path: 'run-history/:id',
    loadComponent: () =>
      import('./(transaction-details)/transaction-details/transaction-details.component')
        .then(m => m.TransactionDetailsComponent),
    resolve: {
      // Los datos de la devolución se cargan antes de entrar a la vista
      returnData: transactionDetailResolver
    }
  },
  {
    // Ruta comodín — redirige a Summary si la URL no coincide con ninguna ruta
    path: '**',
    redirectTo: ''
  }
];
