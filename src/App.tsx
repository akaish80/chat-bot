import AppContextProvider from './Context/AppContext'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ChatContainer from './Pages/ChatContainer'
import useFetchChats from './hooks/useFetchData'
import './App.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3947';

function App() {
  // const [count, setCount] = useState(0)
  
  const {loading, error, data} =  useFetchChats(`${API_BASE_URL}/chat`)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="main-container">
      <AppContextProvider data={data}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<ChatContainer />} />
            <Route path='/chat/:id' element={<ChatContainer />} />
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </div>
  )
}

export default App
