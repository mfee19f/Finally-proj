import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import '../styles/navstyle.css'
// 要使用能有active css效果的NavLink元件
import { NavLink } from 'react-router-dom'

function MyNavbar(props) {
  const { auth, setAuth, track, cartCount } = props

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="primary"
        variant="dark"
        // fixed="top"
      >
        <Navbar.Brand href="#home">
          <div className="ronglogo">
            <img
              src="http://localhost:3000/image/logo.svg"
              alt=""
            />
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto mt-3">
            {/* 利用as屬性來作選單link的整合 */}
            {/* 參考：https://react-bootstrap.github.io/components/navs/#nav-link-props */}
            {/* 首頁 */}
            <Nav.Link as={NavLink} exact to="/">
              <p>首頁</p>
            </Nav.Link>
            {/* 設計師 */}
            <Nav.Link
              as={NavLink}
              exact
              to="/product/detail"
            >
              <p>設計師</p>
            </Nav.Link>
            {/* 作品集 */}
            <Nav.Link as={NavLink} exact to="/product">
              <p>作品集</p>
            </Nav.Link>
            {/* 聯繫我們 */}
            <Nav.Link as={NavLink} to="/member">
              <p>聯繫我們</p>
            </Nav.Link>
            {/* {auth && (
              <Nav.Link as={NavLink} to="/member">
                <p>聯繫我們</p>
              </Nav.Link>
            )} */}
            {/* 合作邀約 */}
            <Nav.Link as={NavLink} to="/productcategory">
              <p>合作邀約</p>
            </Nav.Link>
            {/* 設計新知 */}
            <Nav.Link as={NavLink} to="/student">
              <p>設計新知</p>
            </Nav.Link>
            {/* 調整版面用 */}
            <Nav.Link
              as={NavLink}
              to="/about"
              className="rocky-mobile"
            >
              <p className="rocky-hide">123</p>
            </Nav.Link>
          </Nav>
          <Nav className="mt-3 mr-3">
            <Nav.Link href="#deets">
              <p>
                <i className="far fa-user"></i>
              </p>
            </Nav.Link>
            <Nav.Link href="#deets">
              <p>
                <i className="far fa-heart"></i>
              </p>
            </Nav.Link>
            <div className="cart-circle mt-2">
              <div className="cart-number ">
                <p>{track ? track : 0}</p>
              </div>
            </div>
            <Nav.Link eventKey={2} href="#memes">
              <p>
                <i className="fas fa-shopping-cart"></i>
              </p>
            </Nav.Link>
            <div className="cart-circle mt-2">
              <div className="cart-number ">
                <p>{cartCount ? cartCount : 0}</p>
              </div>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default MyNavbar
