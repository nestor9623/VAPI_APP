# 🚗 VAPIAPP

> **Aplicación de gestión de vehículos** desarrollada con las últimas tecnologías de Angular.

Echa un vistazo : https://vapi-9px020xi5-nestor9623s-projects.vercel.app/home
---
##  Autogenerate
--**IA** : Este fichero readme ha sido autogenerado.
## 🛠️ Tecnologías y Características

- **Angular 21**: Proyecto basado en la versión más reciente, aprovechando las nuevas APIs y mejoras de rendimiento.
- **Signal y SignalStore**: Gestión reactiva del estado de la aplicación usando las nuevas señales de Angular y SignalStore para un flujo de datos eficiente y moderno.
- **Cypress**: Pruebas end-to-end robustas y automatizadas para garantizar la calidad de la aplicación.
- **Test unitarios**: Estructura preparada para pruebas unitarias.
- **SCSS**: Estilos modernos y organizados.
- **Viewport personalizado**: Implementación de un componente de visualización de datos (viewport) en vez de una tabla tradicional, optimizando la experiencia de usuario y el rendimiento en grandes volúmenes de datos.
- **Arquitectura modular**: Separación clara por dominios, features, core, shared y assets.

---

## 📁 Estructura del Proyecto

```
src/
	app/
		core/           # Lógica de dominio, repositorios, entidades, casos de uso
		features/       # Features principales (home, páginas, servicios)
		shared/         # Componentes reutilizables (filtros, header, spinner, viewport)
		assets/         # Recursos estáticos y mocks
		environments/   # Configuración de entornos
	index.html
	main.ts
	styles.scss
public/
cypress/            # Pruebas E2E con Cypress
```

---

## 🚀 Comandos Útiles

### Servidor de desarrollo

```bash
ng serve
```
Accede a [http://localhost:4200/](http://localhost:4200/) para ver la app en acción.

### Generar componentes, servicios, etc.

```bash
ng generate component nombre-componente
ng generate service nombre-servicio
```

### Construir la aplicación

```bash
ng build
```
Los artefactos se generan en la carpeta `dist/`.

### Ejecutar tests unitarios

```bash
ng test
```

### Ejecutar tests E2E (Cypress)

```bash
npx cypress open
```
Las pruebas E2E están ubicadas en la carpeta `cypress/e2e/`.

---

## 🧩 Componentes y Features Destacados

- **Filtro avanzado**: Componente de filtrado reutilizable para búsquedas dinámicas.
- **Header y Spinner**: Componentes visuales reutilizables.
- **Viewport**: Componente propio para visualización de datos, reemplazando la tabla tradicional para mejor rendimiento y UX.
- **Gestión de estado con SignalStore**: Uso de signals y stores para un manejo reactivo y eficiente del estado.

---

## 📝 Notas y Buenas Prácticas

- Estructura basada en buenas prácticas de Angular 21.
- Uso extensivo de tipado y entidades para robustez.
- Separación clara entre lógica de dominio, infraestructura y presentación.
- Mock de datos en `assets/mock/vehicle/` para desarrollo y pruebas.

---

## 📚 Recursos

- [Angular CLI Docs](https://angular.dev/tools/cli)
- [Cypress Docs](https://docs.cypress.io/)
- [Angular Signals](https://angular.dev/reference/signals)

---

<sub>Desarrollado con ❤️ por el equipo VAPIAPP</sub>
