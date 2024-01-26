import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Room from './components/Room'
import { WebsocketProvider, socket } from './contexts/WebsocketContext'
import HomePage from './pages/home'

function App() {
  return (
    <WebsocketProvider value={socket}>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/room/:id' element={<Room />} />
          </Routes>
        </div>
      </BrowserRouter>
    </WebsocketProvider>
  )
}

export default App
