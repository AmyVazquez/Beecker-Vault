---
tags: [herramientas, setup, claude, mcp, rtk]
documento: Manual de Instalación
version: 1.0
fecha: 2026-04-07
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

Los skills son prompts reutilizables invocables con `/nombre-skill`.

### Ubicación

```
C:\Users\<usuario>\.claude\skills\
```

### Skills instalados actualmente

| Skill | Comando | Propósito |
|---|---|---|
| RTK | `/rtk` | Guía de instalación y uso de RTK |
| Stitch | `/stitch` | Prompts para diseño UI con Google Stitch → Figma |
| Skill Creator | `/skill-creator` | Crear nuevos skills |
| Simplify | `/simplify` | Code review y refactoring |

### Crear un nuevo skill

```bash
/skill-creator
```

O manualmente: crear carpeta en `~/.claude/skills/nombre-skill/` con un archivo `SKILL.md`.

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
