/**
 * Resolver: transactionDetailResolver
 *
 * Pre-carga los datos de una devolución antes de que Angular renderice
 * el componente TransactionDetails. Si el registro no existe (404),
 * redirige automáticamente a /run-history.
 *
 * El parámetro :id que viene de la URL corresponde al userId de la devolución
 * en formato RTN-00-001.
 *
 * Para usar el resolver en una ruta:
 *   resolve: { returnData: transactionDetailResolver }
 *
 * Para leer el dato en el componente:
 *   returnData = input.required<ReturnItemDetail>();
 */
import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { ReturnsApiService } from '../../core/services/returns-api.service';
import { ReturnItemDetail } from '../../shared/models/return.model';

export const transactionDetailResolver: ResolveFn<ReturnItemDetail> = (
  route: ActivatedRouteSnapshot
) => {
  const api    = inject(ReturnsApiService);
  const router = inject(Router);

  // Leer el :id de la URL (ej: RTN-00-001)
  const id = route.paramMap.get('id') ?? '';

  return api.getReturnById(id).pipe(
    catchError(() => {
      // Si el registro no existe o el API falla, volver a la tabla
      router.navigate(['/run-history']);
      return EMPTY;
    })
  );
};
