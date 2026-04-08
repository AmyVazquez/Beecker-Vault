/**
 * Componente compartido: NavbarComponent
 *
 * Barra de navegación superior persistente en todas las vistas del dashboard.
 * Contiene:
 *   - Logo "B" de Beecker
 *   - Identidad del agente: avatar + nombre + subtítulo
 *   - Acciones del lado derecho (se ajustan según la vista activa)
 *
 * Se monta directamente en app.html para que esté siempre visible.
 */
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private router = inject(Router);

  goToRunHistory(): void {
    this.router.navigate(['/run-history']);
  }

  goToSummary(): void {
    this.router.navigate(['/']);
  }
}
