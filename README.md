# Carlos & Laura - Página Web de Boda

Página web elegante para la boda de Carlos y Laura, creada con Next.js y desplegada en GitHub Pages.

## 🚀 Inicio Rápido

### Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo (localhost:3000)
npm run dev
```

### Desarrollo Local

Para usar el browser de Cursor y poder interactuar con la página:

1. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

2. La aplicación estará disponible en `http://localhost:3000`

3. Ahora puedes usar el browser de Cursor para navegar e interactuar con la página

### Build para Producción

```bash
# Generar build estático
npm run build
```

El resultado se genera en la carpeta `out/` que es compatible con GitHub Pages.

## 📦 Despliegue en GitHub Pages

### Opción 1: GitHub Actions (Automático) - Recomendado

1. Asegúrate de que el workflow `.github/workflows/deploy.yml` esté en tu repositorio
2. Ve a Settings → Pages en tu repositorio de GitHub
3. Selecciona "GitHub Actions" como fuente
4. Cada vez que hagas push a `main`, se desplegará automáticamente

### Opción 2: Manual

1. Ejecuta `npm run build`
2. La carpeta `out/` contiene los archivos estáticos
3. Sube el contenido de `out/` a la rama `gh-pages` o usa GitHub Pages desde la carpeta `out/`

## 🔧 Configuración de Google Sheets para RSVP

Para que el formulario de confirmación de asistencia funcione con Google Sheets:

### Paso 1: Crear Google Sheet

1. Crea una nueva hoja de Google Sheets
2. En la primera fila, añade estos encabezados:
   - `Nombre` | `Email` | `Pareja` | `Asistencia` | `Fecha`
3. Copia el ID de la hoja desde la URL (el código largo entre `/d/` y `/edit`)

### Paso 2: Crear Google Apps Script

1. Ve a [https://script.google.com](https://script.google.com)
2. Crea un nuevo proyecto
3. Abre el archivo `google-apps-script.js` de este proyecto y copia su contenido
4. Pega el código en el editor de Google Apps Script
5. Reemplaza `'TU_SHEET_ID'` con el ID de tu hoja de Google Sheets
6. Guarda el proyecto (Ctrl+S o Cmd+S)

### Paso 3: Desplegar como Aplicación Web

1. En Google Apps Script, haz clic en "Desplegar" > "Nueva implementación"
2. Tipo: Selecciona "Aplicación web"
3. Configuración:
   - Descripción: "RSVP Web App"
   - Ejecutar como: "Yo"
   - Quién tiene acceso: "Cualquiera"
4. Haz clic en "Desplegar"
5. Copia la URL de la aplicación web (algo como: `https://script.google.com/macros/s/.../exec`)

### Paso 4: Configurar en Next.js

1. Crea un archivo `.env.local` en la raíz del proyecto:
```bash
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/TU_SCRIPT_ID/exec
```

2. Reemplaza la URL con la que copiaste en el paso anterior

3. Reinicia el servidor de desarrollo (`npm run dev`)

### Paso 5: Verificar

1. Abre el formulario RSVP en la página
2. Completa y envía el formulario
3. Verifica que los datos aparezcan en tu Google Sheet

## 📸 Añadir Fotos a la Galería

1. Coloca tus fotos en la carpeta `public/photos/`
2. Abre el archivo `components/Gallery.tsx`
3. En el array `photoList` (línea ~18), añade los nombres de tus fotos:
```typescript
const photoList = [
  'foto1.jpg',
  'foto2.jpg',
  'foto3.jpg',
  // ... más fotos
]
```

Las fotos aparecerán automáticamente en un hermoso grid responsivo con efecto lightbox al hacer clic.

## 🎨 Personalización

### Cambiar la Fecha de la Boda

En `app/page.tsx`, línea 18, cambia:
```typescript
const weddingDate = new Date('2026-12-12T18:00:00').getTime()
```

### Actualizar la Ubicación

Cuando tengas el lugar definitivo, edita `app/page.tsx` en la sección "Detalles del Evento" para actualizar la información del lugar.

### Personalizar Contenido

Puedes modificar:
- `app/page.tsx` - Contenido de todas las secciones
- `app/page.module.css` - Estilos de la página
- `app/globals.css` - Estilos globales y fuentes
- `app/layout.tsx` - Metadata y estructura HTML
- `components/Gallery.tsx` - Componente de galería

### Colores y Estilos

Los colores principales están definidos en `app/globals.css`:
- `--primary-gold`: #d4af37 (dorado)
- `--primary-rose`: #f4e4e4 (rosa claro)
- `--primary-pink`: #e8b4b8 (rosa)

## 🛠️ Tecnologías

- **Next.js 14** - Framework React
- **TypeScript** - Tipado estático
- **CSS Modules** - Estilos modulares
- **Google Apps Script** - Backend para RSVP
- **Google Sheets** - Base de datos para confirmaciones
- **GitHub Pages** - Hosting gratuito

## 📁 Estructura del Proyecto

```
carlos-laura/
├── app/                    # App Router de Next.js
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx             # Página principal
│   ├── globals.css          # Estilos globales
│   └── page.module.css      # Estilos de la página
├── components/              # Componentes reutilizables
│   ├── Gallery.tsx         # Componente de galería
│   └── Gallery.module.css   # Estilos de la galería
├── public/                  # Archivos estáticos
│   └── photos/             # Fotos de la galería
├── google-apps-script.js    # Script para Google Sheets
└── out/                     # Build de producción (generado)
```

## 📝 Notas Importantes

- El proyecto está configurado para export estático (`output: 'export'`) compatible con GitHub Pages
- Las imágenes deben estar optimizadas manualmente ya que Next.js Image no funciona en export estático
- Para usar el browser de Cursor, siempre ejecuta `npm run dev` primero
- El formulario RSVP usa `no-cors` para evitar problemas de CORS, por lo que no se puede verificar la respuesta del servidor
- Asegúrate de que tu Google Apps Script tenga los permisos necesarios para escribir en Google Sheets

## 🎉 ¡Listo!

Tu página web de boda está lista. Solo necesitas:
1. Configurar Google Sheets para el RSVP
2. Añadir tus fotos
3. Personalizar el contenido
4. Desplegar en GitHub Pages

¡Disfruta de tu día especial! 💍
