import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ListTable from './Page/ListTable'
import Orders from './Page/Orders'
import LayoutWeb from './Page/Layout'
import ListCate from './Server/ListCate'
import LayoutAdmin from './Server/LayoutAdmin'
import ListPro from './Server/ListPro'
import ListOder from './Server/ListOder'
import Account from './Server/Account'
import Signin from './Login/Signin'
import PicturesWall from './Login/Signup'
import Check from './Check'
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Signin />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<PicturesWall />} />


        <Route path='/floor/' element={<LayoutWeb />}>
          <Route index path="floor_id=:floor_id" element={<ListTable />}>
          </Route>
        </Route>


        <Route path='/floor/floor_id=:floor_id/table_id=:table_id/order' element={<Orders />} />

        <Route path='/case-manager/' element={<LayoutAdmin />}>
          <Route path='categoris' element={<ListCate />} />
          <Route path='products' element={<ListPro />} />
          <Route path='order' element={<ListOder />} />
          <Route path='account' element={<Account />} />
        </Route>
      </Routes>
    </BrowserRouter >
  )

}
export default App
