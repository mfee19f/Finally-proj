// 使用套件
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import React, { useState } from 'react'

// 頁面用元件
import Home from './pages/Home'
import Login from './pages/Login'
import ProductBaby from './pages/ProductBaby'
import ProductMen from './pages/ProductMen'
import ProductWomen from './pages/ProductWomen'
import NotFoundPage from './pages/NotFoundPage'
import ProductCategory from './pages/ProductCategory'
import Member from './pages/Member'
import Student from './pages/Student'
import Product from './pages/Product'
import ProductDetail from './pages/ProductDetail'
//購物車
import Cart from './pages/cart/Cart'
import Transport from './pages/cart/Transport'
// import Receive from './pages/cart/Receive'
import ReceiveCard from './pages/cart/ReceiveCard'
import OrderList from './pages/cart/OrderList'
import CheckOrder from './pages/cart/CheckOrder'
import OrderStep from './pages/cart/OrderStep'
//會員
import Add from './pages/Add'
import Edit from './pages/Edit'
// 組合用元件
import MyNavbar from './components/MyNavbar'
import MyFooter from './components/MyFooter'
import MainContent from './components/MainContent'
import ScrollToTop from './components/ScrollToTop'
//import BreadCrumb from './components/BreadCrumb'
// import MultiLevelBreadcrumb from './components/MultiLevelBreadCrumb'

function App() {
  const [auth, setAuth] = useState(false)
  const [buyNumber, setBuyNumber] = useState(1)
  const [track, setTrack] = useState(0)
  const [cartCount, setCartCount] = useState(0)
  return (
    <Router>
      <>
        {/* LOGO+標題+導覽列+上方選單 */}
        <MyNavbar
          auth={auth}
          track={track}
          cartCount={cartCount}
        />
        {/* 主內容區 */}
        <MainContent>
          {/* <MultiLevelBreadcrumb /> */}
          {/* 匹配路由表(路徑單一匹配) */}
          {/* 切換顯示的元件畫面放在這下面 */}
          {/* ScrollToTop是為了讓連到另一頁內容時，頁面回到最上方 */}
          <ScrollToTop>
            <Switch>

            <Route path="/edit/:id">
                <Edit auth={auth}/>
              </Route>
              <Route path="/add" >
                <Add auth={auth}/>
              </Route>
              <Route path="/cart">
                <Cart />
              </Route>

              <Route path="/order-steps">
                <OrderStep auth={auth} />
              </Route>
              <Route path="/check-order">
                <CheckOrder />
              </Route>
              <Route path="/order-list/:id">
                <OrderList />
              </Route>
              <Route path="/receive-card">
                <ReceiveCard />
              </Route>

              <Route path="/transport">
                <Transport />
              </Route>
              <Route exact path="/">
                <Home auth={auth} />
              </Route>
              <Route exact path="/product/detail/:id?">
                <ProductDetail
                  auth={auth}
                  buyNumber={buyNumber}
                  setBuyNumber={setBuyNumber}
                  track={track}
                  setTrack={setTrack}
                  cartCount={cartCount}
                  setCartCount={setCartCount}
                />
              </Route>
              <Route exact path="/product">
                <Product auth={auth} />
              </Route>
              <Route path="/student">
                <Student />
              </Route>
              <Route path="/product/women">
                <ProductWomen />
              </Route>
              <Route path="/product/men">
                <ProductMen />
              </Route>
              {/* 這裡要定義網址參數的屬性名稱 */}
              <Route path="/product/baby/:id?">
                <ProductBaby />
              </Route>
              <Route path="/login">
                {/* 利用props傳入頁面元件狀態 */}
                <Login auth={auth} setAuth={setAuth} />
              </Route>
              <Route path="/productcategory">
                <ProductCategory />
              </Route>
              <Route path="/member">
                <Member auth={auth} />
              </Route>
              {/* 一定要放在所有的Route最後面 */}
              <Route path="*">
                <NotFoundPage />
              </Route>
              {/* end 匹配路由表 */}
            </Switch>
          </ScrollToTop>
        </MainContent>
        {/* 頁尾+版權訊息 */}
        <MyFooter />
      </>
    </Router>
  )
}

export default App
