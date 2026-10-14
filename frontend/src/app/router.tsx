import { createBrowserRouter } from 'react-router-dom'
import { PublicLayout } from '../layouts/PublicLayout'
import { FarmerLayout } from '../layouts/FarmerLayout'
import { BuyerLayout } from '../layouts/BuyerLayout'
import { AdminLayout } from '../layouts/AdminLayout'
import { HomePage } from '../pages/public/HomePage'
import { MarketplacePage } from '../pages/public/MarketplacePage'
import { ListingDetailPage } from '../pages/public/ListingDetailPage'
import { TraceabilityPage } from '../pages/public/TraceabilityPage'
import { MapPage } from '../pages/public/MapPage'
import { ProductionAreasPage } from '../pages/public/ProductionAreasPage'
import { ForFarmersPage } from '../pages/public/ForFarmersPage'
import { LoginPage } from '../pages/public/LoginPage'
import { RegisterPage } from '../pages/public/RegisterPage'
import { FarmerPlaceholderPage } from '../pages/farmer/FarmerPlaceholderPage'
import { BuyerPlaceholderPage } from '../pages/buyer/BuyerPlaceholderPage'
import { AdminPlaceholderPage } from '../pages/admin/AdminPlaceholderPage'
import { NotFoundPage } from '../pages/NotFoundPage'

import { DevPrimitivesPreviewPage } from '../pages/dev/DevPrimitivesPreviewPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'marketplace', element: <MarketplacePage /> },
      { path: 'marketplace/:id', element: <ListingDetailPage /> },
      { path: 'map', element: <MapPage /> },
      { path: 'production-areas', element: <ProductionAreasPage /> },
      { path: 'trace', element: <TraceabilityPage /> },
      { path: 'trace/:code', element: <TraceabilityPage /> },
      { path: 'for-farmers', element: <ForFarmersPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
    ],
  },
  {
    path: '/farmer',
    element: <FarmerLayout />,
    children: [
      { index: true, element: <FarmerPlaceholderPage /> },
      { path: '*', element: <FarmerPlaceholderPage /> },
    ],
  },
  {
    path: '/buyer',
    element: <BuyerLayout />,
    children: [
      { index: true, element: <BuyerPlaceholderPage /> },
      { path: '*', element: <BuyerPlaceholderPage /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminPlaceholderPage /> },
      { path: '*', element: <AdminPlaceholderPage /> },
    ],
  },
  {
    path: '/dev/primitives',
    element: <DevPrimitivesPreviewPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])

