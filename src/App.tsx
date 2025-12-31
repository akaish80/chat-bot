import AppContextProvider from './Context/AppContext'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ChatContainer from './Pages/ChatContainer'
import useFetchChats from './hooks/useFetchData'
import { API_BASE_URL } from './config'
import './App.css'

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
