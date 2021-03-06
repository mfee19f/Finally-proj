// import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import conf, {IMG_PATH, UPLOAD_AVATAR, TEST_AVATAR} from './config';
import axios from 'axios';

function App() {

  let [imgSrc, setImgSrc] = useState('');
  let [myName, setMyName] = useState('');
  console.log({conf});

  const doUpload = async ()=>{
    const fd = new FormData(document.form1);
    const r = await axios.post(UPLOAD_AVATAR, fd);

    console.log(r.data);
    setImgSrc(r.data.filename);
  };

  const mySubmit = async (e)=>{
    e.preventDefault();

    // 2. urlencoded
    const usp = new URLSearchParams(new FormData(document.fake_form));
    // console.log(usp.toString());
    const r = await fetch(TEST_AVATAR, {
      method: 'POST',
      body: usp.toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const data = await r.json();
    console.log(data);




  };

  return <>
    <form name="fake_form" onSubmit={mySubmit}>
      <img src={imgSrc ? (IMG_PATH + '/' + imgSrc) : ''} alt="" width="300px" id="img01" />
      <button type="button" className="btn btn-success" onClick={e=>document.querySelector('#avatar').click()}>上傳大頭貼</button>

      <input type="hidden" className="form-control" name="avatar" value={imgSrc} />

      <div className="mb-3">
        <label htmlFor="my_name" className="form-label">name</label>
        <input type="text" className="form-control"  name="name" value={myName}
               onChange={e=>{setMyName(e.target.value)}}
        />
      </div>


      <button type="submit" className="btn btn-primary" >Submit</button>
    </form>
    <form name="form1" style={{display: 'none'}}>
      <input type="file" id="avatar" name="avatar" accept="image/*" onChange={doUpload} />
    </form>
  </>;
}

export default App;
