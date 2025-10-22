import { RouterProvider } from 'react-router-dom'
import {AppRoutes}  from './routes/route'
import { motion } from 'framer-motion'
import './index.css'

function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <RouterProvider router={AppRoutes} />
    </motion.div>

  )
}

export default App  