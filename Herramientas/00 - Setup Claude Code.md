---
tags: [herramientas, setup, claude, mcp, rtk, angular, skills]
documento: Manual de Instalación
version: 2.0
fecha: 2026-04-08
estado: activo
---

# Setup Claude Code — Herramientas de Desarrollo

Manual de instalación e implementación de las herramientas integradas con Claude Code para maximizar productividad y reducir consumo de tokens.

---

## Índice

1. [[#1. Claude Code (CLI)]]
2. [[#2. RTK — Rust Token Killer]]
3. [[#3. Context7 MCP]]
4. [[#4. Figma MCP]]
5. [[#5. Linear MCP]]
6. [[#6. Skills personalizados]]
   - [[#6.1 commit]]
   - [[#6.2 angular-component]]
   - [[#6.3 angular-service]]
   - [[#6.4 angular-form]]
   - [[#6.5 angular-route]]
   - [[#6.6 code-review]]
   - [[#6.7 css-component]]
   - [[#6.8 debug-angular]]
   - [[#6.9 gentleman-architecture]]
7. [[#7. Verificación final]]

---

## 1. Claude Code (CLI)

Claude Code es el CLI oficial de Anthropic. Es el punto de entrada para todo lo demás.

### Instalación

```bash
npm install -g @anthropic-ai/claude-code
```

### Verificar instalación

```bash
claude --version
```

### Archivos de configuración relevantes

| Archivo | Ruta | Propósito |
|---|---|---|
| `settings.json` | `C:\Users\<usuario>\.claude\settings.json` | MCPs, preferencias globales |
| `CLAUDE.md` | `C:\Users\<usuario>\.claude\CLAUDE.md` | Instrucciones globales para el agente |
| `CLAUDE.md` | Raíz del proyecto | Instrucciones específicas del proyecto |

---

## 2. RTK — Rust Token Killer

Proxy CLI que reduce el consumo de tokens LLM entre **60–90%** al filtrar y comprimir outputs de comandos antes de que lleguen al contexto del asistente.

### Requisitos previos — Rust

1. Descargar el instalador desde https://rustup.rs
2. Ejecutar el `.exe` y en el primer menú elegir opción `1` (Quick install via Visual Studio Community installer)
3. Esperar que instale Visual C++ Build Tools
4. Cuando regrese al menú de Rust, elegir opción `1` para proceder con instalación estándar
5. Cerrar y abrir una terminal nueva para actualizar el PATH

### Instalación de RTK

> ⚠️ No usar `cargo install rtk` desde crates.io — existe otra librería con el mismo nombre ("Rust Type Kit").

```bash
cargo install --git https://github.com/rtk-ai/rtk
```

Tarda varios minutos mientras compila.

### Verificar instalación

```bash
rtk --version   # debe mostrar rtk 0.x.x
rtk gain        # debe mostrar "No tracking data yet"
```

### Inicialización para Claude Code

```bash
rtk init -g
```

En Windows usa modo `--claude-md` automáticamente (los hooks solo funcionan en macOS/Linux). Modifica `C:\Users\<usuario>\.claude\CLAUDE.md` con instrucciones para que Claude Code use `rtk` en todas las sesiones.

### Uso básico

Prefija cualquier comando con `rtk`:

```bash
rtk git status
rtk git diff
rtk git log --oneline -20
rtk cargo test
rtk npm test
rtk gh pr list
```

### Ver estadísticas de ahorro

```bash
rtk gain
rtk gain --history
```

### Comandos con mayor ahorro

| Categoría | Ahorro típico |
|---|---|
| Tests (vitest, playwright, cargo test) | 90–99% |
| Builds (tsc, next build, lint) | 70–87% |
| Git (diff, log, status) | 59–80% |
| GitHub CLI (gh pr, gh run) | 26–87% |
| Package managers (npm, pnpm) | 70–90% |
| Archivos (ls, grep, find) | 60–75% |

---

## 3. Context7 MCP

Proporciona documentación actualizada de frameworks y librerías directamente en el contexto del asistente. Evita que Claude use documentación desactualizada de su entrenamiento.

### Instalación

Agregar al archivo `C:\Users\<usuario>\.claude\settings.json`:

```json
{
  "mcpServers": {
    "context7": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    }
  }
}
```

> No requiere instalación previa de paquete — `npx` lo descarga automáticamente.

### Uso

En cualquier prompt de Claude Code, agregar al final:

```
use context7
```

Ejemplo:

```
Crea un componente Angular 19 con signals para manejar un formulario reactivo. use context7
```

Claude buscará la documentación oficial más reciente de Angular 19 antes de responder.

### Cuándo usarlo

- Preguntas sobre versiones recientes de frameworks (Angular 19, React 19, Next.js 15, etc.)
- Cuando Claude da respuestas con APIs desactualizadas
- Al trabajar con librerías que cambian frecuentemente

---

## 4. Figma MCP

Permite a Claude Code leer y manipular archivos de Figma directamente desde el chat.

### Figma MCP en Claude Code (CLI / VSCode)

Requiere un **Personal Access Token** de Figma.

**Obtener el token:**
1. Ir a Figma → Settings → Security → Personal access tokens
2. Generar un nuevo token con permisos de lectura

**Configurar en** `C:\Users\<usuario>\.claude\settings.json`:

```json
{
  "mcpServers": {
    "figma": {
      "type": "http",
      "url": "https://mcp.figma.com/mcp",
      "headers": {
        "Authorization": "Bearer TU_TOKEN_AQUI"
      }
    }
  }
}
```

### TalkToFigma en Claude Desktop (app)

Configurar en `C:\Users\<usuario>\AppData\Roaming\Claude\claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "TalkToFigma": {
      "command": "npx",
      "args": ["@sethdouglasford/mcp-figma@latest"]
    }
  }
}
```

### Uso

Una vez configurado, puedes pedirle a Claude:

```
Analiza este archivo de Figma y genera el componente Angular correspondiente
[pega el link del archivo de Figma]
```

---

## 5. Linear MCP

Integración con Linear para gestión de issues y proyectos directamente desde Claude Code.

### Configuración

Linear MCP se conecta vía OAuth desde claude.ai. No requiere configuración manual en `settings.json`.

**Activar:**
1. Ir a claude.ai → Settings → Integrations
2. Conectar Linear con tu cuenta
3. Verificar con: `claude mcp list` — debe aparecer `claude.ai Linear: ✓ Connected`

### Uso

```
Lista los issues del equipo de frontend en Linear
Crea un issue para el bug de autenticación con prioridad alta
```

---

## 6. Skills personalizados

Los skills son prompts reutilizables invocables con `/nombre-skill` directamente en el chat de Claude Code.

### Ubicación

```
C:\Users\<usuario>\.claude\skills\
```

Cada skill es una carpeta con un archivo `SKILL.md` dentro.

### Skills instalados actualmente

| Skill | Comando | Prioridad | Propósito |
|---|---|---|---|
| commit | `/commit` | Alta | Conventional Commits automáticos |
| angular-component | `/angular-component` | Alta | Componentes standalone con signals |
| angular-service | `/angular-service` | Alta | Servicios HttpClient tipados |
| angular-form | `/angular-form` | Media | Formularios reactivos con validaciones |
| angular-route | `/angular-route` | Media | Rutas con lazy loading y guards |
| code-review | `/code-review` | Media | Revisión de código antes de commit |
| css-component | `/css-component` | Baja | Estilos SCSS encapsulados |
| debug-angular | `/debug-angular` | Baja | Diagnóstico de errores Angular 19 |
| gentleman-architecture | `/gentleman-architecture` | Alta | Arquitectura Clean/Hexagonal con Scope Rule |
| rtk | `/rtk` | — | Guía RTK Token Killer |
| stitch | `/stitch` | — | Diseño UI con Google Stitch → Figma |
| skill-creator | `/skill-creator` | — | Crear nuevos skills |
| simplify | `/simplify` | — | Refactoring y calidad de código |

### Flujo de trabajo típico

```
/angular-component → /angular-service → /css-component → /code-review → /commit
```

### Crear un nuevo skill

```bash
/skill-creator
```

O manualmente: crear carpeta en `~/.claude/skills/nombre-skill/` con un archivo `SKILL.md`.

---

### 6.1 commit

**Comando:** `/commit`
**Cuándo usarlo:** Antes de cada `git commit` para generar el mensaje correcto.

Analiza el diff staged y genera un mensaje en formato **Conventional Commits**:

| Tipo | Uso |
|---|---|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de bug |
| `refactor` | Cambio sin nueva funcionalidad |
| `style` | Solo cambios de formato o CSS |
| `test` | Agregar o modificar tests |
| `docs` | Cambios en documentación |
| `chore` | Mantenimiento, dependencias |

**Formato generado:**
```
feat(auth): add JWT refresh token logic
fix(dashboard): correct null check on returns list
refactor(returns): extract threshold validation to service
```

**Reglas:**
- Descripción siempre en **inglés**, en **imperativo**
- Máximo 72 caracteres en la primera línea
- Sin punto al final

---

### 6.2 angular-component

**Comando:** `/angular-component`
**Cuándo usarlo:** Al crear cualquier componente nuevo en Angular 19.

Genera los 3 archivos del componente (`.ts`, `.html`, `.scss`) siguiendo patrones modernos:

**Patrones que aplica:**
- `standalone: true` siempre
- `input()` e `input.required()` en lugar de `@Input()`
- `output()` en lugar de `@Output() EventEmitter`
- `@if`, `@for`, `@switch` en lugar de `*ngIf`, `*ngFor`
- `signal()`, `computed()`, `effect()` para estado interno
- `inject()` en lugar de constructor injection

**Ejemplo de uso:**
```
/angular-component
Nombre: return-card
Propósito: tarjeta que muestra el resumen de una devolución
Inputs: returnId (number, requerido), status (string), amount (number)
Outputs: viewDetail (click en la tarjeta)
```

---

### 6.3 angular-service

**Comando:** `/angular-service`
**Cuándo usarlo:** Al crear un servicio para consumir APIs o compartir estado entre componentes.

Genera el servicio con:
- `HttpClient` tipado con genéricos
- `catchError` en todos los observables
- Manejo de errores HTTP por código (401, 404, 500)
- Opcionalmente: estado reactivo con signals (`signal()`, `computed()`, `.asReadonly()`)

**Dos modos:**
1. **Solo HTTP** — métodos CRUD que retornan `Observable<T>`
2. **Estado compartido** — signals globales que múltiples componentes consumen

---

### 6.4 angular-form

**Comando:** `/angular-form`
**Cuándo usarlo:** Al crear formularios con validación en el frontend.

Genera componente con `ReactiveFormsModule`:
- `FormBuilder` con validadores (required, minLength, email, pattern, etc.)
- Método `getError(field)` para mostrar mensajes de error por campo
- `markAllAsTouched()` al intentar submit inválido
- Soporte para modo edición con `patchValue()`
- Botón submit deshabilitado mientras `isLoading()` es true

**Validadores disponibles:**
`required`, `minlength`, `maxlength`, `min`, `max`, `email`, `pattern`, validadores personalizados

---

### 6.5 angular-route

**Comando:** `/angular-route`
**Cuándo usarlo:** Al agregar nuevas rutas, proteger con autenticación, o precargar datos.

Genera:
- Rutas con `loadComponent` (lazy loading obligatorio)
- Guards como funciones `CanActivateFn` (no clases)
- Resolvers como funciones `ResolveFn` (no clases)
- Configuración de `provideRouter()` en `app.config.ts`
- `withComponentInputBinding()` para recibir params de URL como `input()`

**Estructura generada:**
```
app.routes.ts          ← definición de rutas
guards/auth.guard.ts   ← guard de autenticación
resolvers/x.resolver.ts ← precarga de datos
```

---

### 6.6 code-review

**Comando:** `/code-review`
**Cuándo usarlo:** Antes de hacer commit, para validar que el código cumple buenas prácticas.

Revisa el diff actual y clasifica los hallazgos en tres niveles:

| Nivel | Descripción |
|---|---|
| 🔴 Crítico | Bloquea el commit (credenciales, null references, `any`, subscripciones sin cleanup) |
| 🟡 Importante | Patrones deprecated, falta de `catchError`, `OnPush` faltante |
| 🟢 Sugerencias | Nombrado, DRY, accesibilidad, estilos filtrados |

Siempre entrega solución, no solo el problema.

---

### 6.7 css-component

**Comando:** `/css-component`
**Cuándo usarlo:** Al crear o revisar los estilos SCSS de un componente.

Genera estilos con:
- `:host` como selector raíz (encapsulamiento Angular)
- CSS custom properties (`var(--nombre)`) para colores y espaciados
- BEM simplificado para elementos internos (`&__header`, `&--loading`)
- Mixins de breakpoints para responsive (`@include mobile`, `@include tablet`)
- Estados visuales: hover, disabled, loading skeleton, error

**Variables CSS estándar generadas:**
```scss
--color-primary, --color-surface, --color-border
--spacing-xs, --spacing-sm, --spacing-md, --spacing-lg
--font-size-sm, --font-size-base, --font-size-lg
--radius-sm, --radius-md, --radius-lg
```

---

### 6.8 debug-angular

**Comando:** `/debug-angular`
**Cuándo usarlo:** Cuando hay errores en consola, comportamiento inesperado, o algo no funciona en Angular.

Diagnostica los errores más comunes:

| Error | Causa típica |
|---|---|
| `ExpressionChangedAfterItHasBeenCheckedError` | Estado modificado después del ciclo de detección |
| `NullInjectorError: No provider for X` | Servicio sin `providedIn` o no registrado |
| Signals no actualizan el template | Mutación del objeto en lugar de reemplazo |
| Lazy loading silencioso | Path incorrecto o nombre de clase equivocado |
| CORS en desarrollo | Falta `proxy.conf.json` o `provideHttpClient()` |
| Memory leak | `subscribe()` sin `takeUntilDestroyed()` |
| `@if`/`@for` no funciona | Sintaxis vieja `*ngIf`/`*ngFor` todavía en uso |

**Herramienta recomendada:** Instalar extensión **Angular DevTools** en Chrome/Edge para inspeccionar signals y change detection en tiempo real.

---

### 6.9 gentleman-architecture

**Comando:** `/gentleman-architecture`
**Cuándo usarlo:** Al iniciar un proyecto nuevo, agregar una feature, decidir dónde va un archivo, o revisar que la arquitectura sea escalable.

Metodología de **Alan Buscaglia** (@GentlemanProgramming), Google Developer Expert en Angular. Combina Clean Architecture, Arquitectura Hexagonal, SOLID y la Scope Rule.

**La Scope Rule — regla central:**

| ¿Cuántas features lo usan? | ¿Dónde va? |
|---|---|
| Solo 1 feature | Dentro de esa feature (local) |
| 2 o más features | En `shared/` (global) |

**Estructura de proyecto:**

```
src/app/
├── (auth)/               ← feature group
│   ├── login/
│   │   ├── components/   ← componentes locales de login
│   │   ├── services/     ← servicios locales de login
│   │   └── models/
│   └── shared/           ← compartido SOLO dentro de (auth)
├── (dashboard)/          ← feature group
│   └── returns/
│       ├── components/
│       ├── services/
│       └── models/
├── core/                 ← servicios singleton globales, interceptors
└── shared/               ← SOLO para código usado en 2+ features
```

**Patrón Container / Presentational:**

- **Container component** — maneja lógica, llama servicios, orquesta datos
- **Presentational component** — solo UI, recibe datos por `input()`, emite eventos por `output()`

**Capas de Clean Architecture:**

| Capa | En Angular | Responsabilidad |
|---|---|---|
| Entities | `models/`, interfaces | Reglas de negocio puras |
| Use Cases | `services/` | Orquestar lógica |
| Interface Adapters | Components, Interceptors | Adaptar datos entre capas |
| Frameworks | Angular, HttpClient | Detalles técnicos externos |

**Recursos oficiales:**
- Libro gratuito: https://the-amazing-gentleman-programming-book.vercel.app/es
- Agentes de arquitectura: https://github.com/Gentleman-Programming/gentleman-architecture-agents

---

## 7. Verificación final

Ejecuta estos comandos para confirmar que todo está funcionando:

```bash
# Claude Code
claude --version

# RTK
rtk --version
rtk gain

# MCPs conectados
claude mcp list

# Context7 (prueba)
# En Claude Code escribe: "¿Qué hay de nuevo en Angular 19? use context7"
```

### Estado esperado de MCPs

```
claude.ai Linear:  ✓ Connected
figma:             ✓ Connected  (en settings.json)
context7:          ✓ Connected  (en settings.json)
```

---

## Notas

- El archivo `settings.json` acepta múltiples MCPs — agregar cada uno dentro del objeto `mcpServers`
- RTK en Windows usa modo `--claude-md` (sin hooks de shell) — funciona igual pero no de forma transparente
- Context7 siempre requiere escribir `use context7` en el prompt para activarse
- Los skills se cargan automáticamente — no requieren reiniciar Claude Code
