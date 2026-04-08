/**
 * Container component: TransactionDetails
 *
 * Vista de detalle completo de una devolución.
 * Los datos principales vienen pre-cargados por el resolver (no hay llamada en ngOnInit).
 * Las secciones de emails y fotos se cargan de forma independiente al entrar a la vista.
 *
 * 4 secciones según el PDD (08 - Vistas de la Plataforma):
 *   1. Transaction details  — campos principales + ítems
 *   2. Processing timeline  — 3 etapas con flags de estado
 *   3. Email communications — historial de correos enviados
 *   4. Return photos        — fotos adjuntas del cliente
 */
import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ReturnsApiService } from '../../core/services/returns-api.service';
import { ReturnItemDetail } from '../../shared/models/return.model';
import { EmailRecord } from '../../shared/models/email.model';
import { ReturnPhoto } from '../../shared/models/photo.model';

import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';
import { TransactionFieldsComponent } from './components/transaction-fields/transaction-fields.component';
import { ProcessingTimelineComponent } from './components/processing-timeline/processing-timeline.component';
import { EmailCommunicationsComponent } from './components/email-communications/email-communications.component';
import { ReturnPhotosComponent } from './components/return-photos/return-photos.component';

@Component({
  selector: 'app-transaction-details',
  standalone: true,
  imports: [
    PageHeaderComponent,
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
  private route  = inject(ActivatedRoute);
  private router = inject(Router);
  private api    = inject(ReturnsApiService);

  // ── Datos principales (pre-cargados por el resolver) ───────────────────────

  /** Datos de la devolución — disponibles desde el primer render gracias al resolver */
  returnData = signal<ReturnItemDetail | null>(null);

  // ── Datos de secciones secundarias (se cargan al entrar a la vista) ────────

  emails     = signal<EmailRecord[]>([]);
  photos     = signal<ReturnPhoto[]>([]);
  isLoadingEmails  = signal(false);
  isLoadingPhotos  = signal(false);

  // ── Ciclo de vida ─────────────────────────────────────────────────────────

  ngOnInit(): void {
    // Leer los datos pre-cargados por el resolver
    const data = this.route.snapshot.data['returnData'] as ReturnItemDetail;
    this.returnData.set(data);

    if (data) {
      // Cargar emails y fotos en paralelo al entrar a la vista
      this.loadEmails(data.userId);
      this.loadPhotos(data.userId);
    }
  }

  // ── Navegación ─────────────────────────────────────────────────────────────

  /** Regresa a la vista Run History */
  goBack(): void {
    this.router.navigate(['/run-history']);
  }

  // ── Carga de secciones secundarias ─────────────────────────────────────────

  private loadEmails(userId: string): void {
    this.isLoadingEmails.set(true);
    this.api.getEmailHistory(userId).subscribe({
      next: (data) => {
        this.emails.set(data);
        this.isLoadingEmails.set(false);
      },
      error: () => this.isLoadingEmails.set(false)
    });
  }

  private loadPhotos(userId: string): void {
    this.isLoadingPhotos.set(true);
    this.api.getReturnPhotos(userId).subscribe({
      next: (data) => {
        this.photos.set(data);
        this.isLoadingPhotos.set(false);
      },
      error: () => this.isLoadingPhotos.set(false)
    });
  }
}
