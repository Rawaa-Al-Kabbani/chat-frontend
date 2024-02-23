import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Room from './components/Room'
import { WebsocketProvider, socket } from './contexts/WebsocketContext'
import HomePage from './pages/home'
import SignUpUser from './components/SignUpUser'
import SignInUser from './components/SignInUser'

function App() {
  return (
    <WebsocketProvider value={socket}>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/room/:id' element={<Room />} />
            <Route path='/sign_up' element={<SignUpUser />} />
            <Route path='/sign_in' element={<SignInUser />} />
          </Routes>
        </div>
      </BrowserRouter>
    </WebsocketProvider>
  )
}

export default App
