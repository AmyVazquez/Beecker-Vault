/**
 * Container: TransactionDetailsComponent
 *
 * Vista de detalle de una devolución individual.
 * Lee los datos pre-cargados por el resolver y carga emails y fotos en paralelo.
 *
 * Composición de la vista:
 *   - Transaction Fields     → Todos los campos de la devolución + tabla de ítems
 *   - Processing Timeline    → Timeline de 3 etapas con flags del PDD
 *   - Email Communications   → Historial de correos expandible
 *   - Return Photos          → Tabla de fotos con selección y descarga
 *
 * El resolver ya garantiza que returnData está disponible al entrar a esta vista.
 * Emails y fotos se cargan en paralelo al inicializar el componente.
 */
import { Component, input, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ReturnsApiService } from '../../core/services/returns-api.service';
import { ReturnItemDetail } from '../../shared/models/return.model';
import { EmailRecord } from '../../shared/models/email.model';
import { ReturnPhoto } from '../../shared/models/photo.model';

import { TransactionFieldsComponent } from './components/transaction-fields/transaction-fields.component';
import { ProcessingTimelineComponent } from './components/processing-timeline/processing-timeline.component';
import { EmailCommunicationsComponent } from './components/email-communications/email-communications.component';
import { ReturnPhotosComponent } from './components/return-photos/return-photos.component';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';

@Component({
  selector: 'app-transaction-details',
  standalone: true,
  imports: [
    CommonModule,
    StatusBadgeComponent,
    TransactionFieldsComponent,
    ProcessingTimelineComponent,
    EmailCommunicationsComponent,
    ReturnPhotosComponent
  ],
  templateUrl: './transaction-details.component.html',
  styleUrl: './transaction-details.component.scss'
})
export class TransactionDetailsComponent implements OnInit {
  private api    = inject(ReturnsApiService);
  private router = inject(Router);

  /**
   * Datos pre-cargados por el resolver.
   * El nombre 'returnData' debe coincidir con la clave en `resolve: { returnData: ... }`
   * definida en app.routes.ts.
   */
  returnData = input.required<ReturnItemDetail>();

  // ── Estado de carga ────────────────────────────────────────────────────────

  isLoadingEmails = signal(false);
  isLoadingPhotos = signal(false);

  // ── Datos secundarios ──────────────────────────────────────────────────────

  emails = signal<EmailRecord[]>([]);
  photos = signal<ReturnPhoto[]>([]);

  // ── Lifecycle ──────────────────────────────────────────────────────────────

  ngOnInit(): void {
    const id = this.returnData().userId;
    this.loadSecondaryData(id);
  }

  // ── Carga de datos ─────────────────────────────────────────────────────────

  /**
   * Carga emails y fotos en paralelo para reducir el tiempo de espera.
   * Si alguna de las dos falla, la otra sigue funcionando.
   * @param id userId de la devolución (formato RTN-00-001)
   */
  private loadSecondaryData(id: string): void {
    this.isLoadingEmails.set(true);
    this.isLoadingPhotos.set(true);

    // Emails
    this.api.getEmailHistory(id).subscribe({
      next: (emails) => {
        this.emails.set(emails);
        this.isLoadingEmails.set(false);
      },
      error: () => this.isLoadingEmails.set(false)
    });

    // Fotos
    this.api.getReturnPhotos(id).subscribe({
      next: (photos) => {
        this.photos.set(photos);
        this.isLoadingPhotos.set(false);
      },
      error: () => this.isLoadingPhotos.set(false)
    });
  }

  // ── Handlers ───────────────────────────────────────────────────────────────

  /** Regresa a la tabla de Run History */
  onBack(): void {
    this.router.navigate(['/run-history']);
  }
}
