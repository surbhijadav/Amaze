import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { store } from './store'  // Import from separate store file
import App from './App'  // Your main App component

const queryClient = new QueryClient()  // TanStack Query setup

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>  {/* Redux wraps everything */}
      <QueryClientProvider client={queryClient}>  {/* Data fetching */}
          <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
)