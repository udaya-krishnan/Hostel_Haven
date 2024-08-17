

import { BrowserRouter ,Route,Routes} from 'react-router-dom'
import UserRoute from './Routes/UserRoutes/UserRoute'
import HostRoutes from './Routes/HostRoutes/HostRoutes'

function App() {
 

  return (
   <>
   <BrowserRouter>
      <Routes>
        <Route path={'/*'} element={<UserRoute/>} />
        <Route path={'/host/*'} element={<HostRoutes/>}/>
      </Routes>
   </BrowserRouter>
   </>
  )
}

export default App
