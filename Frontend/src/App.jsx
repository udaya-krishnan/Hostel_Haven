

import { BrowserRouter ,Route,Routes} from 'react-router-dom'
import UserRoute from './Routes/UserRoutes/UserRoute'

function App() {
 

  return (
   <>
   <BrowserRouter>
      <Routes>
        <Route path={'/*'} element={<UserRoute/>} />
      </Routes>
   </BrowserRouter>
   </>
  )
}

export default App
