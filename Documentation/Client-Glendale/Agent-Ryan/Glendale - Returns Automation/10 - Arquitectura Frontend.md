---
tags: [glendale, arquitectura, angular, frontend]
up: "[[00 - Índice]]"
documento: Arquitectura Frontend
version: 1.0
fecha: 2026-04-08
estado: activo
---

# Arquitectura Frontend — Glendale Returns Agent

Propuesta de arquitectura Angular 19 basada en la metodología **Gentleman Programming** (Clean Architecture + Scope Rule) para el dashboard del agente Ryan.

---

## Principio rector: Scope Rule

> Código usado por **1 sola vista** → va local dentro de esa feature.
> Código usado por **2 o más vistas** → va en `shared/` o `core/`.

---

## Vistas del sistema

| Vista | Ruta | Descripción |
|---|---|---|
| **Summary** | `/` | Dashboard principal con KPIs, gráfica y transacciones activas |
| **Run History** | `/run-history` | Tabla completa de devoluciones con filtros y paginación |
| **Transaction Details** | `/run-history/:id` | Detalle de una devolución: timeline, emails, fotos |

---

## Estructura de carpetas

```
src/
├── app/
│   │
│   ├── (summary)/                          ← Feature: vista principal
│   │   └── summary/
│   │       ├── components/
│   │       │   ├── kpi-cards/              ← 4 cards: Total, Auto-approved, Manual review, Active
│   │       │   ├── trend-chart/            ← Gráfica de línea: Received / Processed / Approved
│   │       │   ├── secondary-metrics/      ← Panel derecho con barras de progreso
│   │       │   ├── process-flow/           ← Timeline horizontal de 3 etapas
│   │       │   ├── active-transactions/    ← Lista de devoluciones activas
│   │       │   └── donut-chart/            ← Gráfica dona por tipo de devolución
│   │       ├── services/
│   │       │   └── summary.service.ts      ← Lógica y queries específicas de Summary
│   │       ├── models/
│   │       │   └── summary.model.ts        ← KpiData, TrendPoint, ProcessStage
│   │       └── summary.component.ts        ← Container component
│   │
│   ├── (run-history)/                      ← Feature: historial completo
│   │   └── run-history/
│   │       ├── components/
│   │       │   └── returns-table/          ← Tabla con 10 columnas + badges
│   │       ├── services/
│   │       │   └── run-history.service.ts  ← Paginación, búsqueda, filtro por mes, export CSV
│   │       ├── models/
│   │       │   └── run-history.model.ts    ← RunHistoryFilter, PaginatedResponse
│   │       └── run-history.component.ts    ← Container component
│   │
│   ├── (transaction-details)/              ← Feature: detalle de transacción
│   │   └── transaction-details/
│   │       ├── components/
│   │       │   ├── transaction-fields/     ← Grid de campos de la devolución
│   │       │   ├── items-list/             ← Sub-sección ítems (tbl_item_list)
│   │       │   ├── processing-timeline/    ← Timeline 3 etapas con flags de estado
│   │       │   ├── email-communications/   ← Bandeja de correos enviados (expandible)
│   │       │   └── return-photos/          ← Tabla de fotos con descarga
│   │       ├── services/
│   │       │   └── transaction-details.service.ts
│   │       ├── models/
│   │       │   └── transaction-details.model.ts  ← EmailRecord, TimelineStage, ReturnPhoto
│   │       └── transaction-details.component.ts  ← Container component
│   │
│   ├── core/                               ← Servicios singleton globales
│   │   ├── services/
│   │   │   └── returns-api.service.ts      ← Todas las llamadas HTTP a la API
│   │   └── interceptors/
│   │       └── auth.interceptor.ts         ← Headers de autenticación
│   │
│   ├── shared/                             ← Solo código usado en 2+ features
│   │   ├── components/
│   │   │   ├── status-badge/               ← Badge coloreado por estado (usado en Run History Y Transaction Details)
│   │   │   ├── page-header/                ← Header con título + botones (usado en todas las vistas)
│   │   │   ├── month-selector/             ← Filtro de mes (usado en Summary Y Run History)
│   │   │   └── empty-state/                ← Estado vacío genérico (usado en múltiples lugares)
│   │   ├── pipes/
│   │   │   ├── return-status.pipe.ts       ← Convierte número a texto: 0 → "Pending – Missing Info"
│   │   │   └── return-type.pipe.ts         ← Convierte código a label legible
│   │   └── models/
│   │       ├── return.model.ts             ← ReturnItem, ReturnStatus enum, ReturnType enum
│   │       └── api-response.model.ts       ← Wrapper genérico ApiResponse<T>
│   │
│   ├── app.component.ts
│   ├── app.config.ts                       ← provideRouter, provideHttpClient
│   └── app.routes.ts                       ← Rutas lazy con loadComponent
│
├── assets/
└── styles/
    ├── _variables.scss                     ← Colores de badges, espaciados
    ├── _mixins.scss                        ← Breakpoints responsive
    └── styles.scss
```

---

## Modelos principales

### `return.model.ts` (shared)

```typescript
export enum ReturnStatus {
  PendingMissingInfo = 0,
  PendingCompleteInfo = 1,
  NeedsAttention = 2,
  Approved = 3,
  Rejected = 'rejected'
}

export enum ReturnType {
  DamagedGoods = 'Damaged Goods',
  ManufacturerDefect = 'Manufacturer Defect',
  WrongItem = 'Wrong Item',
  Refund = 'Refund',
  MissingItem = 'Missing Item'
}

export interface ReturnItem {
  userId: string;           // RTN-00-001
  firstName: string;
  lastName: string;
  orderNo: string;
  returnCurrentDate: string;
  status: ReturnStatus;
  returnType: ReturnType;
  emailAddress: string;
  address: string;
  comments: string;
  invoiceNo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReturnItemDetail extends ReturnItem {
  exchangeItem?: string;
  items: ReturnLineItem[];
}

export interface ReturnLineItem {
  itemName: string;
  quantityReturned: number;
  reasonForReturn: string;
}
```

### `summary.model.ts` (local de summary)

```typescript
export interface KpiData {
  totalReturns: number;
  autoApprovedPct: number;
  manualReviewPct: number;
  activeReturns: number;
}

export interface TrendPoint {
  date: string;
  received: number;
  processed: number;
  approved: number;
}

export interface ProcessStageCount {
  inQueue: number;
  inValidation: number;
  approvedInExecution: number;
}

export interface ReturnTypeCount {
  type: ReturnType;
  count: number;
}
```

---

## Rutas (`app.routes.ts`)

```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./(summary)/summary/summary.component')
        .then(m => m.SummaryComponent)
  },
  {
    path: 'run-history',
    loadComponent: () =>
      import('./(run-history)/run-history/run-history.component')
        .then(m => m.RunHistoryComponent)
  },
  {
    path: 'run-history/:id',
    loadComponent: () =>
      import('./(transaction-details)/transaction-details/transaction-details.component')
        .then(m => m.TransactionDetailsComponent),
    resolve: { returnData: transactionDetailResolver }
  },
  {
    path: '**',
    redirectTo: ''
  }
];
```

---

## Patrón Container / Presentational aplicado

Cada vista sigue el mismo patrón:

```
SummaryComponent (Container)        ← maneja lógica, llama SummaryService
  ├── KpiCardsComponent              ← recibe kpiData via input(), solo UI
  ├── TrendChartComponent            ← recibe trendData via input(), solo UI
  ├── ProcessFlowComponent           ← recibe stageCounts via input(), solo UI
  ├── ActiveTransactionsComponent    ← recibe returns[] via input(), emite navigateToDetail
  └── DonutChartComponent            ← recibe returnTypeCounts via input(), solo UI
```

```typescript
// Container — orquesta todo
@Component({ selector: 'app-summary', standalone: true, ... })
export class SummaryComponent {
  private summaryService = inject(SummaryService);

  kpiData = signal<KpiData | null>(null);
  trendData = signal<TrendPoint[]>([]);
  activeReturns = signal<ReturnItem[]>([]);
  isLoading = signal(false);

  ngOnInit() { this.loadDashboard(); }
}

// Presentational — solo recibe y muestra
@Component({ selector: 'app-kpi-cards', standalone: true, ... })
export class KpiCardsComponent {
  data = input.required<KpiData>();
}
```

---

## Status badge — colores (shared)

```scss
// _variables.scss
--badge-pending-missing:  #B8511D;  // Naranja — Pending Missing Info
--badge-pending-complete: #803FE0;  // Morado  — Pending Complete Info
--badge-needs-attention:  #BC2A2A;  // Rojo    — Needs Attention
--badge-approved:         #217E25;  // Verde   — Approved
--badge-rejected:         #BC2A2A;  // Rojo    — Rejected
```

---

## Capas (Clean Architecture)

| Capa | Archivos | Responsabilidad |
|---|---|---|
| **Entities** | `shared/models/*.model.ts` | Tipos de negocio puros: `ReturnItem`, `ReturnStatus`, `ReturnType` |
| **Use Cases** | `(feature)/services/*.service.ts` | Lógica específica de cada vista (filtros, paginación, cálculo de KPIs) |
| **Interface Adapters** | Components, Pipes, `core/interceptors/` | Adaptar datos del API al formato que necesita la UI |
| **Frameworks** | `core/services/returns-api.service.ts`, Angular | Llamadas HTTP, routing, rendering |

---

## API Service (`core/services/returns-api.service.ts`)

Único punto de contacto con el backend:

```typescript
@Injectable({ providedIn: 'root' })
export class ReturnsApiService {
  private http = inject(HttpClient);
  private base = '/api';

  // Summary
  getKpis(month?: string): Observable<KpiData> { ... }
  getTrend(month?: string): Observable<TrendPoint[]> { ... }
  getActiveReturns(): Observable<ReturnItem[]> { ... }
  getReturnTypeCounts(month?: string): Observable<ReturnTypeCount[]> { ... }

  // Run History
  getReturns(filter: RunHistoryFilter): Observable<PaginatedResponse<ReturnItem>> { ... }
  exportCsv(filter: RunHistoryFilter): Observable<Blob> { ... }

  // Transaction Details
  getReturnById(id: string): Observable<ReturnItemDetail> { ... }
  getEmailHistory(id: string): Observable<EmailRecord[]> { ... }
  getReturnPhotos(id: string): Observable<ReturnPhoto[]> { ... }
}
```

---

## Checklist de inicio de desarrollo

- [ ] Crear proyecto Angular 19: `ng new glendale-returns-agent --standalone`
- [ ] Configurar `app.config.ts` con `provideRouter`, `provideHttpClient`
- [ ] Crear estructura de carpetas según arquitectura
- [ ] Definir modelos en `shared/models/`
- [ ] Implementar `ReturnsApiService` en `core/`
- [ ] Crear `status-badge`, `page-header`, `month-selector` en `shared/components/`
- [ ] Implementar feature **Summary** (container + 5 presentational components)
- [ ] Implementar feature **Run History** (container + tabla + paginación)
- [ ] Implementar feature **Transaction Details** (container + 4 secciones)
- [ ] Conectar con Figma MCP para referencias visuales exactas

---

## Referencias

- Diseño en Figma: [Dashboard 2025](https://www.figma.com/design/CQMuS8UwmOhzkwTQxU8xvx/Dashboard-2025?node-id=17633-20405)
- Vistas detalladas: [[08 - Vistas de la Plataforma]]
- Flujo del agente: [[02 - Comportamiento del Agente]]
- Sistemas integrados: [[03 - Sistemas Involucrados]]

---
← [[09 - Historial de Versiones]]
