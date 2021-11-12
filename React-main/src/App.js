// 使用套件
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import React, { useState, useEffect } from 'react'
// 頁面用元件
import Home from './pages/Home'
import Login from './pages/Login'
import NotFoundPage from './pages/NotFoundPage'
import Product from './pages/Product'
import ProductDetail from './pages/ProductDetail'
//購物車
import Cart from './pages/cart/Cart'
import Transport from './pages/cart/Transport'
import ReceiveCard from './pages/cart/ReceiveCard'
import OrderList from './pages/cart/OrderList'
import CheckOrder from './pages/cart/CheckOrder'
import OrderStep from './pages/cart/OrderStep'
import OrderListJOIN from './pages/cart/OrderListJOIN'
//會員
import Register from './pages/Register'
import Edit from './pages/Edit'
import Membercenter from './pages/Membercenter'
// 組合用元件
import MyNavbar from './components/MyNavbar'
import MyFooter from './components/MyFooter'
import MainContent from './components/MainContent'
import ScrollToTop from './components/ScrollToTop'
import Upload from './pages/Upload'
import Error from './pages/Error'
//import BreadCrumb from './components/BreadCrumb'
// import MultiLevelBreadcrumb from './components/MultiLevelBreadCrumb'
function App() {
  const [auth, setAuth] = useState(false)
  const [buyNumber, setBuyNumber] = useState(1)
  const [track, setTrack] = useState(0)
  const [cartCount, setCartCount] = useState(0)
  const [memberData, setMemberData] = useState({})
  const [id, setID] = useState(0)

  useEffect(() => {
    // 問伺服器是否有會員登入
    // 如果有登入，設定auth為true
    //setAuth(true)
    //請localstorage中的購物車數量
    const myCart = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : []
    const myTrack = localStorage.getItem('track')
      ? JSON.parse(localStorage.getItem('track'))
      : []
    // 設定為陣列的長度(成員數量)
    setTrack(myTrack.length)
    setCartCount(myCart.length)
  }, [])
  useEffect(() => {
    //如果LocalStorage有資料
    if (localStorage.getItem('member')) {
      const myAuth = localStorage.getItem('member')
        ? JSON.parse(localStorage.getItem('member'))
        : []
      // 設定為陣列的長度(成員數量)
      setAuth(true)
      setID(myAuth)
    }
  }, [])

  return (
    <Router>
      <>
        {/* LOGO+標題+導覽列+上方選單 */}
        <MyNavbar
          setAuth={setAuth}
          auth={auth}
          track={track}
          cartCount={cartCount}
          memberData={memberData}
          id={id}
        />
        {/* 主內容區 */}
        <MainContent>
          {/* <MultiLevelBreadcrumb /> */}
          {/* 匹配路由表(路徑單一匹配) */}
          {/* 切換顯示的元件畫面放在這下面 */}
          {/* ScrollToTop是為了讓連到另一頁內容時，頁面回到最上方 */}
          <ScrollToTop>
            <Switch>
              <Route path="/error">
                <Error />
              </Route>
              <Route path="/upload">
                <Upload />
              </Route>
              <Route path="/list/:id">
                <OrderListJOIN auth={auth} />
              </Route>

              <Route path="/member_center/:id">
                <Membercenter
                  auth={auth}
                  memberData={memberData}
                />
              </Route>
              <Route path="/edit/:id">
                <Edit auth={auth} />
              </Route>
              <Route path="/register">
                <Register auth={auth} />
              </Route>
              <Route path="/cart">
                <Cart />
              </Route>
              <Route path="/order-steps">
                <OrderStep
                  auth={auth}
                  setCartCount={setCartCount}
                  cartCount={cartCount}
                />
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
                <Home
                  auth={auth}
                  cartCount={cartCount}
                  setCartCount={setCartCount}
                  track={track}
                  setTrack={setTrack}
                />
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
                <Product
                  auth={auth}
                  cartCount={cartCount}
                  setCartCount={setCartCount}
                  track={track}
                  setTrack={setTrack}
                />
              </Route>
              <Route path="/login">
                {/* 利用props傳入頁面元件狀態 */}
                <Login
                  auth={auth}
                  setAuth={setAuth}
                  memberData={memberData}
                  setMemberData={setMemberData}
                />
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
        <div className="mb-5"></div>
        <MyFooter />
      </>
    </Router>
  )
}

export default App
