import { Outlet, useLocation } from 'react-router-dom'
import { Header } from '../ui/Header'
import { Footer } from '../ui/Footer'

export function FullLayout() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Home page video */}
      {isHome && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="fixed top-0 left-0 w-full h-full object-cover -z-10"
        >
          <source src="/videos/earth2.mp4" type="video/mp4" />
        </video>
      )}

      {/* Background for other pages */}
      {!isHome && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-indigo-950 to-black -z-10"></div>
      )}
     {/* {!isHome && (
        <div className="absolute inset-0 bg-gradient-to-br from-black to-black -z-10"></div>
      )} */}
      {/* Header */}
      <Header />

      {/* Page Content */}
      <main
        className={`relative z-10 flex-1 flex flex-col ${
          !isHome ? 'pt-[80px] pb-10' : 'pb-10'
        }`}
      >
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
