/**
 * Resolver: transactionDetailResolver
 *
 * Pre-carga los datos de una devolución antes de que el componente
 * TransactionDetails se renderice. Esto evita que la vista aparezca en blanco
 * mientras espera los datos del API.
 *
 * Si la devolución no existe (404) o hay un error, redirige a /run-history
 * en lugar de mostrar la vista con un error.
 *
 * Los datos pre-cargados quedan disponibles en el componente mediante:
 *   this.route.snapshot.data['returnData']
 * O con withComponentInputBinding() configurado en app.config.ts,
 * directamente como input: returnData = input<ReturnItemDetail>()
 */
import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';

import { ReturnsApiService } from '../../core/services/returns-api.service';
import { ReturnItemDetail } from '../../shared/models/return.model';

export const transactionDetailResolver: ResolveFn<ReturnItemDetail> =
  (route: ActivatedRouteSnapshot) => {
    const api    = inject(ReturnsApiService);
    const router = inject(Router);

    // El parámetro :id corresponde al userId (ej: RTN-00-001)
    const id = route.paramMap.get('id') ?? '';

    return api.getReturnById(id).pipe(
      catchError(() => {
        // Si falla la carga, regresa a Run History sin mostrar error
        router.navigate(['/run-history']);
        return EMPTY;
      })
    );
  };
