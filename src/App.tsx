import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/home'
import Room from './components/Room'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/room/:id' element={<Room />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
