# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

This is a personal Obsidian note vault used by Beecker for project documentation. There is no codebase, build system, test framework, or package manager unless the user explicitly adds one. Notes are written primarily in Spanish.

## Key Guidelines

- Treat `Bienvenido.md` as the main introduction and first reference point.
- Do not modify `.obsidian/` or `.sixth/` unless explicitly asked — these are application configuration directories.
- Ask for clarification before creating or editing files if the intended format is not clear.
- Preserve Spanish language context when the user writes or documents in Spanish.

## Note Format

Notes in this vault are Markdown files with optional Obsidian-flavored syntax:
- `[[Internal Link]]` — links between notes
- `[[Note|Alias]]` — aliased links
- `#tag` — tags
- YAML frontmatter (`---`) for metadata including fields like `tags`, `cliente`, `documento`, `version`, `fecha`, `estado`

## Vault Structure

- `Proyectos/` — one subfolder per project, each with an `00 - Índice.md` as the project's table of contents
- `Flujo de Estados - Diagrama.md` — shared state flow diagram (referenced across projects)
- PDF attachments may live alongside notes (e.g., `PDD - *.pdf`)

### Active Projects

- **Glendale – Returns Automation** (`Proyectos/Glendale - Returns Automation/`) — automation agent for end-to-end returns processing for Glendale Parade Store LLC. Reads from MySQL, routes by threshold, sends email via Outlook, executes actions in MOM ERP and UPS Web API.

## No Build or Test Commands

This vault has no build, lint, or test commands. If the user adds scripts or code in the future, update this file accordingly.
