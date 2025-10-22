import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { increment } from '../features/counterSlice'
import type { RootState } from '../store'

export function About() {  // Named export—no change
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <motion.div
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1>About Amaze</h1>
      <p>This is a demo app with React, RTK, and more!</p>
      <p>Global Count: {count}</p>
      <button onClick={() => dispatch(increment())}>Increment Here</button>
    </motion.div>
  )
}