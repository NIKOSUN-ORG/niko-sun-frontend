# Niko Sun Frontend

Plataforma descentralizada de inversión en energía solar renovable construida con Next.js, wagmi, viem y RainbowKit.

## Características

- **Compra de Tokens Solares**: Invierte en proyectos de energía solar comprando tokens
- **Gestión de Portafolio**: Visualiza tus inversiones en tiempo real
- **Métricas en Tiempo Real**: Monitorea la energía generada y pagos distribuidos
- **Panel de Administración**: Crea proyectos, actualiza métricas y gestiona fondos
- **Diseño Responsive**: Interfaz optimizada para móviles, tablets y desktop
- **Tema Verde/Naranja**: Colores relacionados con energía solar y sostenibilidad

## Configuración

### 1. Instalar Dependencias

```bash
npm install
# o
pnpm install
# o
yarn install
```

### 2. Configurar la Dirección del Contrato

Actualiza la dirección del contrato en `types/Abi.ts`:

```typescript
export const SOLAR_TOKEN_ADDRESS = "0xTU_DIRECCION_DEL_CONTRATO_AQUI";
```

### 3. Configurar RainbowKit

Si necesitas cambiar la configuración de la red, edita `rainbowKitConfig.tsx`.

### 4. Ejecutar el Servidor de Desarrollo

```bash
npm run dev
# o
pnpm dev
# o
yarn dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estructura del Proyecto

```
niko-sun-frontend/
├── app/
│   ├── (pages)/
│   │   ├── page.tsx          # Landing page con proyectos
│   │   ├── dashboard/
│   │   │   └── page.tsx      # Portfolio del usuario
│   │   ├── admin/
│   │   │   └── page.tsx      # Panel de administración
│   │   └── metrics/
│   │       └── page.tsx      # Métricas y estadísticas
│   ├── globals.css           # Estilos globales con tema verde/naranja
│   ├── layout.tsx            # Layout principal con sidebar
│   └── provider.tsx          # Providers de wagmi y RainbowKit
├── components/
│   ├── Sidebar.tsx           # Navegación lateral
│   ├── Header.tsx            # Cabecera con wallet connect
│   ├── Footer.tsx            # Footer de la aplicación
│   ├── AdminPanel.tsx        # Panel de administración
│   ├── ProjectCard.tsx       # Tarjeta de proyecto individual
│   ├── ProjectList.tsx       # Lista de proyectos
│   ├── ProjectMetrics.tsx    # Métricas y estadísticas
│   └── UserBalance.tsx       # Balance de tokens del usuario
├── hooks/
│   └── useSolarContract.ts   # Hooks personalizados para el contrato
└── types/
    └── Abi.ts                # ABI del contrato SolarTokenV1
```

## Páginas

### `/` - Landing Page
- Hero section con branding
- Lista de proyectos solares disponibles
- Sección "Cómo Funciona"
- Compra de tokens directamente

### `/dashboard` - Portfolio
- Balance de tokens del usuario por proyecto
- Estadísticas de inversión
- Beneficios recibidos
- Información de energía generada

### `/metrics` - Métricas
- Estadísticas globales de todos los proyectos
- Energía total generada
- Pagos distribuidos
- Métricas por proyecto individual

### `/admin` - Administración
- Crear nuevos proyectos solares
- Actualizar métricas de energía
- Registrar distribuciones de pagos
- Retirar fondos del contrato
- Gestionar estado de proyectos

## Funcionalidades del Contrato

### Usuario Regular

- **Comprar Tokens**: Invierte en proyectos solares activos
- **Ver Balance**: Consulta tus tokens de cada proyecto
- **Ver Métricas**: Monitorea la energía generada por cada proyecto

### Administrador

- **Crear Proyectos**: Define supply total y precio por token
- **Actualizar Métricas**: Registra energía generada (kWh)
- **Registrar Pagos**: Documenta distribuciones a holders
- **Retirar Fondos**: Extrae ETH del contrato
- **Gestionar Estado**: Activa/desactiva proyectos

## Tecnologías

- **Next.js 16**: Framework de React
- **Tailwind CSS 4**: Estilos utility-first
- **wagmi**: React hooks para Ethereum
- **viem**: TypeScript interface para Ethereum
- **RainbowKit**: Conexión de wallets
- **Lucide React**: Iconos

## Paleta de Colores

- **Primary (Verde)**: `#10b981` - Energía renovable
- **Secondary (Naranja)**: `#f97316` - Sol y energía
- **Accent (Amarillo)**: `#fbbf24` - Luz solar
- **Backgrounds**: Gradientes suaves con opacidad baja

## Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run start    # Servidor de producción
npm run lint     # Linter ESLint
```

## Deploy on Vercel

1. Sube tu código a GitHub
2. Importa el proyecto en Vercel
3. Vercel detectará Next.js automáticamente
4. Despliega

Consulta la [documentación de deployment de Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para más detalles.

## Solución de Problemas

### Error: "Module not found" para @metamask/sdk, @walletconnect/ethereum-provider, etc.

Si encuentras errores relacionados con módulos no encontrados, ya están solucionados en la configuración actual:

1. **Limpia la caché de Next.js**:
   ```bash
   rm -rf .next
   ```

2. **Reinicia el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

La configuración actual usa solo conectores básicos (Injected wallets y Coinbase) que no requieren dependencias adicionales. Esto es perfecto para Syscoin Testnet.

### Wallets Soportadas

- **MetaMask** (vía injected wallet)
- **Coinbase Wallet**
- **Brave Wallet**
- **Trust Wallet**
- Cualquier wallet que se inyecte en el navegador

## Notas Importantes

- Asegúrate de que el contrato esté desplegado antes de usar la aplicación
- Los usuarios necesitan una wallet compatible instalada en el navegador
- La red configurada es **Syscoin Testnet** únicamente
- Solo los administradores con el rol correcto pueden acceder a funciones admin
- El proyecto está configurado para trabajar sin WalletConnect Project ID (opcional)
