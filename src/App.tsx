import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Swal from 'sweetalert2'
import NavigationBar from './components/NavigationBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <NavigationBar />
      <div>
        
      </div>
    </div>
  )
}

export default App
