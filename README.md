# 🚀 CodigoFacil CRM

Sistema de gestión de relaciones con clientes (CRM) moderno y completo para **CodigoFacil.com**.

## 📋 Características

### ✅ **VERSIÓN 1.0 - DASHBOARD BÁSICO**
- 🎨 **Dashboard moderno** con métricas en tiempo real
- 📊 **Estadísticas clave**: clientes, leads, ventas, conversiones
- 🔔 **Actividad reciente** y notificaciones
- 📱 **Responsive design** - Mobile-first
- 🎭 **Logo CodigoFacil** personalizado
- 🧭 **Navegación completa** con sidebar

## 🛠️ Stack Tecnológico

- **Frontend**: Next.js 16 + React 19 + TypeScript 5.7
- **UI**: Tailwind CSS 4 + Shadcn/UI + Radix UI  
- **Base de Datos**: Turso (SQLite distribuido)
- **ORM**: Drizzle ORM + Drizzle Kit
- **Auth**: NextAuth.js v5
- **Estado**: TanStack Query
- **Testing**: Jest + Testing Library

## 🚀 Instalación Rápida

```bash
# 1. Instalar dependencias
npm install

# 2. Desarrollo local  
npm run dev

# 3. Abrir en el navegador
http://localhost:3000
```

## 📁 Estructura del Proyecto

```
codigofacil-crm/
├── src/
│   ├── app/
│   │   ├── dashboard/           # Dashboard principal
│   │   │   ├── page.tsx        # Vista del dashboard
│   │   │   └── layout.tsx      # Layout con sidebar
│   │   ├── layout.tsx          # Layout raíz
│   │   ├── page.tsx            # Redirect a dashboard
│   │   └── globals.css         # Estilos globales
│   ├── components/
│   │   ├── ui/                 # Componentes Shadcn/UI
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   └── avatar.tsx
│   │   ├── logo.tsx            # Logo CodigoFacil
│   │   ├── sidebar.tsx         # Navegación lateral
│   │   ├── header.tsx          # Header con búsqueda
│   │   ├── dashboard-stats.tsx # Métricas del dashboard
│   │   └── recent-activity.tsx # Actividad reciente
│   └── lib/
│       └── utils.ts            # Utilidades (cn, formatters)
├── package.json                # Dependencias Next.js 16
├── tailwind.config.ts          # Configuración Tailwind
├── tsconfig.json              # TypeScript config
└── next.config.ts             # Next.js config
```

## 🎨 Componentes UI Incluidos

### 📊 **Dashboard Stats**
- Métricas clave con iconos
- Badges de cambio (aumentos/disminuciones)
- Cards responsivos
- Animaciones hover

### 🔔 **Recent Activity**
- Timeline de actividades
- Estados con colores (éxito, warning, error)
- Avatares con iniciales
- Timestamps formateados

### 🧭 **Sidebar Navigation**
- Logo CodigoFacil personalizado
- Navegación completa del CRM
- Estados activos
- Responsive mobile

### 🎭 **Logo CodigoFacil**
- Variantes: icon, text, full
- Tamaños: sm, md, lg
- SVG avanzado con gradientes
- Tema consistente (azul)

## 📱 Responsive Design

- **Mobile First**: Optimizado para móviles
- **Breakpoints**: sm, md, lg, xl, 2xl
- **Navigation**: Sidebar colapsible en mobile
- **Grid**: Adaptive grid layouts
- **Touch**: Optimizado para touch

## 🎯 Próximas Funcionalidades

### 🗄️ **FASE 2: Database & CRUD**
- [ ] Setup Turso + Drizzle
- [ ] Schema: clients, leads, contacts
- [ ] CRUD completo de clientes
- [ ] CRUD completo de leads
- [ ] Búsqueda avanzada

### 🔐 **FASE 3: Authentication**
- [ ] NextAuth.js v5 setup
- [ ] Login/Register pages
- [ ] Roles y permisos
- [ ] Session management

### 📈 **FASE 4: Advanced Features**
- [ ] Analytics avanzados
- [ ] Reportes exportables
- [ ] Email integration
- [ ] Calendar system
- [ ] Pipeline de ventas

## 🧪 Scripts Disponibles

```bash
npm run dev          # Desarrollo local
npm run build        # Build producción
npm run start        # Servidor producción
npm run lint         # ESLint
npm test            # Tests Jest
npm run test:watch  # Tests en modo watch
npm run test:coverage # Cobertura de tests
```

## 🌟 **STATUS: VERSIÓN 1.0 LISTA**

✅ **Dashboard Funcional**: Métricas, actividades, navegación  
✅ **UI Moderna**: Shadcn/UI + Tailwind CSS 4  
✅ **Logo Personalizado**: CodigoFacil branding completo  
✅ **Responsive**: Mobile-first design  
✅ **TypeScript**: Completamente tipado  
✅ **Next.js 16**: Última versión con App Router  

**¡El CRM básico está listo para usar! 🎉**

## 📞 Contacto CodigoFacil

- 🌐 **Web**: codigofacil.com
- 📧 **Email**: info@codigofacil.com  
- 📱 **WhatsApp**: +506 8646-2423
- 📍 **Ubicación**: Guápiles, Limón, Costa Rica

---

**Made with ❤️ by CodigoFacil Team**