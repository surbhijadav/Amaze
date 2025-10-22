import { Outlet } from 'react-router-dom'

export function PublicLayout() {
  return <Outlet />  // Renders just the child (Login/Register)—no header/footer
}