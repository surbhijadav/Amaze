import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import { gsap } from 'gsap'
import { loginStart, loginSuccess, loginError } from '../features/authSlice'

// Mock API (replace with real)
const loginAPI = async (credentials: { username: string, password: string }) => {
  try {
    if (credentials.username === 'user' && credentials.password === 'pass') {
      return { user: { username: 'user', email: 'user@example.com' }, token: 'mock-token' }
    }
    throw new Error('Invalid credentials')  // Ensure string error
  } catch (error) {
    throw error  // Re-throw for Query to catch
  }
}

// Variants
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }
const inputVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } } }

export function LogIn() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const buttonRef = useRef<HTMLButtonElement>(null)

  const loginMutation = useMutation({
    mutationFn: loginAPI,
    onMutate: () => dispatch(loginStart()),
    onSuccess: (data) => {
      dispatch(loginSuccess(data))
      navigate('/')
    },
    onError: (err: Error) => {
      dispatch(loginError(err.message || 'Login failed'))  // Ensure string, fallback
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    loginMutation.mutate({ username, password })
  }

  const handleRipple = (e: React.MouseEvent) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2
    const ripple = document.createElement('span')
    ripple.style.width = ripple.style.height = `${size}px`
    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`
    ripple.className = 'ripple'
    buttonRef.current.appendChild(ripple)
    gsap.to(ripple, { scale: 1, opacity: 0, duration: 0.6, ease: "power2.out" })
    setTimeout(() => ripple.remove(), 600)
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-indigo-950 to-black"
    >
      <motion.form
        onSubmit={handleSubmit}
        className="bg-black/50 backdrop-blur-md rounded-xl p-8 w-full max-w-md space-y-6"
        variants={inputVariants}
      >
        <motion.h1 className="text-3xl font-bold text-white text-center">
          Welcome Back
        </motion.h1>

        <motion.div className="relative">
          <FaUser className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-black/30 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </motion.div>

        <motion.div className="relative">
          <FaLock className="absolute left-3 top-3 text-gray-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-10 py-3 bg-black/30 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </motion.div>

        <button
          type="submit"
          ref={buttonRef}
          onMouseDown={handleRipple}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? 'Logging in...' : 'Login'}
        </button>

        {loginMutation.isError && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-center"
          >
            {loginMutation.error?.message || 'Login failed'}
          </motion.p>
        )}

        <div className="text-center text-gray-400">
          Don't have an account? <Link to="/register" className="text-blue-400 hover:text-blue-300">Sign up</Link>
        </div>
      </motion.form>
    </motion.div>
  )
}