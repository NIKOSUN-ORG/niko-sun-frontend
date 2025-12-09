# 🌞 Niko Sun Frontend

<div align="center">

![Niko Sun Logo](public/NikoSun_logo.png)

**Plataforma descentralizada de inversión en energía solar renovable**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Syscoin](https://img.shields.io/badge/Syscoin-Testnet-orange?style=flat-square)](https://syscoin.org/)

[🌐 Demo en Vivo](https://niko-sun-frontend-fi4c.vercel.app/) | [English](./README.en.md) | Español
</div>

---

## 📖 Descripción

**Niko Sun** es una plataforma Web3 que permite a los usuarios invertir en proyectos de energía solar mediante la compra de tokens ERC-1155. Los inversores reciben dividendos proporcionales basados en la energía generada por los paneles solares.

### ¿Cómo funciona?

1. 🔌 **Conecta tu wallet** - MetaMask, Coinbase o cualquier wallet compatible
2. 🔍 **Explora proyectos** - Descubre proyectos solares disponibles para inversión
3. 💰 **Compra tokens** - Invierte en proyectos con tSYS (Syscoin testnet)
4. ⚡ **Genera energía** - Tus tokens representan participación en la generación solar
5. 🎁 **Reclama dividendos** - Recibe recompensas proporcionales a tus tokens

---

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+
- pnpm (recomendado) o npm
- Wallet compatible (MetaMask, Coinbase, etc.)

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/AlesxanDer1102/niko-sun-frontend.git
cd niko-sun-frontend

# Instalar dependencias
pnpm install

# Ejecutar en desarrollo
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Configuración

1. **Dirección del Contrato** - Actualiza en `types/Abi.ts`:
   ```typescript
   export const SOLAR_TOKEN_ADDRESS = "0x6e9fd4C2D15672594f4Eb4076d67c4D77352A512"
   ```

2. **Red** - Configurada para Syscoin Testnet en `rainbowKitConfig.tsx`

---

## 📁 Estructura del Proyecto

```
niko-sun-frontend/
├── app/
│   ├── page.tsx              # Landing page con proyectos
│   ├── dashboard/page.tsx    # Portfolio del usuario
│   ├── admin/page.tsx        # Panel de administración
│   ├── metrics/page.tsx      # Métricas (solo owner)
│   ├── globals.css           # Estilos y animaciones
│   ├── layout.tsx            # Layout con sidebar
│   └── provider.tsx          # Providers Web3
├── components/
│   ├── Header.tsx            # Cabecera con wallet
│   ├── Sidebar.tsx           # Navegación lateral
│   ├── Footer.tsx            # Pie de página
│   ├── AdminPanel.tsx        # Panel de administración
│   ├── ProjectCard.tsx       # Tarjeta de proyecto
│   ├── ProjectList.tsx       # Lista de proyectos
│   ├── ProjectMetrics.tsx    # Métricas globales
│   ├── UserBalance.tsx       # Portafolio del usuario
│   └── Toast.tsx             # Sistema de notificaciones
├── hooks/
│   └── useSolarContract.ts   # Hooks del contrato
├── types/
│   └── Abi.ts                # ABI del contrato
└── public/
    └── NikoSun_logo.png      # Logo del proyecto
```

---

## 🔧 Contrato Inteligente

### SolarTokenV3Optimized

El contrato utiliza el estándar **ERC-1155** con patrón **Ownable** para la gestión de permisos.

#### Roles

| Rol | Permisos |
|-----|----------|
| **Owner** | Pausar/despausar, crear proyectos para otros, ver métricas globales |
| **Project Creator** | Depositar dividendos, actualizar energía, retirar ventas, gestionar su proyecto |
| **Inversor** | Comprar tokens, reclamar dividendos, ver su portafolio |

#### Funciones Principales

```solidity
// Cualquier usuario
createProject(name, totalSupply, priceWei, minPurchase)
mint(projectId, amount) payable
claimRevenue(projectId)
claimMultipleOptimized(projectIds[])

// Solo Project Creator
depositRevenue(projectId, energyKwhDelta) payable
withdrawSales(projectId, recipient, amount)
setProjectStatus(projectId, active)
updateEnergy(projectId, energyKwhDelta)

// Solo Owner
pause() / unpause()
createProjectFor(creator, name, totalSupply, priceWei, minPurchase)
```

---

## 🛠️ Tecnologías

| Tecnología | Versión | Uso |
|------------|---------|-----|
| [Next.js](https://nextjs.org/) | 16 | Framework React |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Tipado estático |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Estilos |
| [wagmi](https://wagmi.sh/) | 2.x | Hooks Ethereum |
| [viem](https://viem.sh/) | 2.x | Cliente Ethereum |
| [RainbowKit](https://www.rainbowkit.com/) | 2.x | Conexión wallets |
| [Lucide React](https://lucide.dev/) | - | Iconos |

---

## 📜 Scripts

```bash
pnpm dev          # Servidor de desarrollo
pnpm build        # Build de producción (usa webpack)
pnpm start        # Servidor de producción
pnpm lint         # Linter ESLint
```

> **Nota**: El build usa `--webpack` debido a incompatibilidades de Turbopack con algunas dependencias de WalletConnect.

---

## 🚢 Despliegue

### Vercel (Recomendado)

1. Sube tu código a GitHub
2. Importa el proyecto en [Vercel](https://vercel.com)
3. Vercel detectará Next.js automáticamente
4. ¡Despliega!

### Variables de Entorno (Opcional)

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=tu_project_id
```

---

## 🐛 Solución de Problemas

### Error: Módulos no encontrados

```bash
rm -rf .next node_modules
pnpm install
pnpm dev
```

### Wallets Soportadas

- ✅ MetaMask
- ✅ Coinbase Wallet
- ✅ Brave Wallet
- ✅ Trust Wallet
- ✅ Cualquier wallet inyectada

---

## 🎨 Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| 🟢 Primary | `#10b981` | Energía renovable |
| 🟠 Secondary | `#f97316` | Sol y energía |
| 🟡 Accent | `#fbbf24` | Luz solar |

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

---

<div align="center">

**Construido con ❤️ para un futuro sostenible**

[⬆ Volver arriba](#-niko-sun-frontend)

</div>
