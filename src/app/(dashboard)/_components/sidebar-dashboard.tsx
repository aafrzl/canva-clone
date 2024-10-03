import React from 'react'
import LogoDashboard from './logo-dashboard'
import SidebarRoutes from './sidebar-routes'

export default function SidebarDashboard() {
  return (
    <aside className='hidden lg:flex fixed flex-col w-[300px] left-0 shrink-0 h-full'>
      <LogoDashboard />
      <SidebarRoutes />
    </aside>
  )
}
