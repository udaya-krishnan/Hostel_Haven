

import { BrowserRouter ,Route,Routes} from 'react-router-dom'
import UserRoute from './Routes/UserRoutes/UserRoute'
import HostRoutes from './Routes/HostRoutes/HostRoutes'
import AdmnRoutes from './Routes/AdminRoutes/AdmnRoutes'

function App() {
 
  return (
   <>
   <BrowserRouter>
      <Routes>
        <Route path={'/*'} element={<UserRoute/>} />
        <Route path={'/host/*'} element={<HostRoutes/>}/>
        <Route path={'/admin/*'} element={<AdmnRoutes/>}/>
      </Routes>
   </BrowserRouter>
   </>
  )
}

export default App
