
import './App.css'
import { ThemeProvider } from './components/theme-provider'
import RootLayout from './Layout/RootLayout'
function App() {

  return (
    <div className='p-4 h-screen w-screen '>
      <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme' >
        <RootLayout />
      </ThemeProvider>
    </div>
  )
}

export default App
