import '../styles/Home.css'
import { Carousel } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { CONNECT } from '../road'
import { IMG_PATH } from '../road'
import { Link } from 'react-router-dom'

function Home(props) {
  const { setTrack, setCartCount } = props
  let [data, setData] = useState({})
  // {
  //   id: '1',
  //   image: 'BUY ! MINI.jpeg',
  //   name: 'BUY ! MINI',
  //   painter: 'DAVID KRACOV',
  //   price: 4800,
  //   tags: 'papercuts',
  //   track: 'false',
  //   created_at: '2021.10.26 22:00:00',
  // },
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
    ;(async () => {
      const r = await fetch(CONNECT)
      const obj = await r.json()
      setData(obj)
      // console.log(obj.rows)
    })()
  }, [])

  return (
    <>
      {/* 輪播牆 */}
      <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://imgur.com/gPu95gv.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            {/* <h3></h3>
            <p></p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://imgur.com/rkT1Fuu.jpg"
            alt="Second slide"
          />

          <Carousel.Caption>
            {/* <h3></h3>
            <p></p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://imgur.com/AilapBW.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            {/* <h3></h3>
            <p></p> */}
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      {/* <!-- 輪播牆下面字的區塊 --> */}
      <div className="word-block">
        <div className="top-part">發現您的下一件設計品</div>
        <div className="middle-part">
          <div className="top">
            <Link to="/#" className="a-size">
              設計師
            </Link>
          </div>
          <div className="middle">
            <Link to="/#" className="a-size">
              作品集
            </Link>
          </div>
          <div className="bottom a-size">
            <Link to="/#" className="a-size">
              想邀約
            </Link>
          </div>
        </div>
        <div className="bottom-part">
          <div className="discover">
            探索我們的精選設計師
          </div>
        </div>
      </div>
      {/* <!-- 探索設計師欄位部分 --> */}
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card p-1 card-color">
              <img
                src="./image/David Kracov.jpeg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <p className="card-text">David Kracov</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card p-1 card-color">
              <img
                src="./image/Angelo Accardi.jpeg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <p className="card-text">Angelo Accardi</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card p-1 card-color">
              <img
                src="./image/Calman Shemi.jpeg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <p className="card-text">Calman Shemi </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card p-1 card-color">
              <img
                src="./image/Plum.jpeg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <p className="card-text">Plum</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card p-1 card-color">
              <img
                src="./image/YOEL BENHARROUCHE.jpeg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <p className="card-text">
                  Yoel Benharrouche
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card p-1 card-color">
              <img
                src="./image/Gumm.jpeg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <p className="card-text">Gumm</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card p-1 card-color">
              <img
                src="./image/Randy Cooper.jpeg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <p className="card-text">Randy Cooper</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card p-1 card-color">
              <img
                src="./image/Clem$.jpeg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <p className="card-text">Clem$</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- 設計師列表下面的字，CSS跟輪播牆下面字的區塊一樣 --> */}
      <div className="word-block">
        <div className="top-part">按這裡</div>
        <div className="middle-part">
          <div className="top"></div>
          <div className="middle">
            <Link to="/#" className="a-size">
              看更多設計師
            </Link>
          </div>
          <div className="bottom"></div>
        </div>
        <div className="bottom-part">
          <div className="discover">精選作品</div>
        </div>
      </div>
      {/* <!-- 精選作品欄位 --> */}
      <div className="container">
        <div className="row">
          {data.rows
            ? data.rows.map((v, i) => {
                return (
                  <div
                    className="col-12 col-sm-6 col-md-4 col-lg-3"
                    key={i}
                  >
                    <div className="card p-1 card-color">
                      <div data-aos="zoom-in">
                        <img
                          src={IMG_PATH + '/' + v.image}
                          className="card-img-top"
                          alt="..."
                        />
                        <div className="card-body">
                          <div className="card-text name-large iii">
                            {v.name}
                          </div>
                          <div className="card-text">
                            {v.painter}
                          </div>
                          <div className="card-text">
                            NT$ {v.price}
                          </div>
                          <i className="fas fa-shopping-cart cart-color"></i>
                          <span className="rocky-love">
                            123
                          </span>
                          <i className="fas fa-heart cart-color"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            : ''}
        </div>
      </div>
      {/* <!-- 作品欄位下面的字 --> */}
      <div className="word-block">
        <div className="top-part">按這裡</div>
        <div className="middle-part">
          <div className="top"></div>
          <div className="middle">
            <Link to="./product" className="a-size">
              看更多作品
            </Link>
          </div>
          <div className="bottom"></div>
        </div>
        <div className="bottom-part">
          <div className="discover hide">
            要隱藏的字要隱藏的字要隱藏的字要隱藏的字
          </div>
        </div>
      </div>
      {/* <!-- 最下面的圖片 --> */}
      <div className="container set-center">
        <figure className="figure">
          <img
            src="./image/artist-painting.jpeg"
            className="figure-img img-fluid rounded"
            alt="..."
          />
          <figcaption className="figure-caption text-right">
            TRUNK For Designer And Artist
          </figcaption>
        </figure>
      </div>
    </>
  )
}

export default Home
