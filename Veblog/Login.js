import React, { useState } from 'react';
import { SET_AUTHOR, GET_ATHORS,publishasset, PublishAtuor } from './cms';
import { gql, useMutation, useQuery } from '@apollo/client';
import axios from 'axios';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './styleses/Login.module.css';

const Login = () => {
  const [data, setdata] = useState({
    name: '',
    family: '',
    profile: null,
    password: '',
    describtion: '',
    st: 100,
  });

  const [required, setrequired] = useState({
    requiredname: false,
    requiredpassword:false
})

  let [src, setsrc] = useState(null)
  let slug = data.name + data.family;
  let [finish, setfin] = useState(false)
  let [net, setnet] = useState(true)
  let [i, seti] = useState(false)

  const [publishathors, o] = useMutation(PublishAtuor)
  const [pubpic, r] = useMutation(publishasset)
  const [setauthor, res] = useMutation(SET_AUTHOR)

  window.addEventListener('offline', () => {
    setnet(false)
    alert('network connection is off')
  })

  const getathour = useQuery(GET_ATHORS)
  const allowed = () => {
    let num = 0;
    if (!getathour.loading && getathour.data.athor.length > 0) {
      let rt = getathour.data.athor.map(e => e.slug == slug)
      console.log(rt);
      for (let index = 0; index < getathour.data.athor.length; index++) {
        rt[index] == false && num++
      }
      return num
    }
  }
  console.log(allowed());
   const sending = (e) => {
    e.preventDefault();
       if (data.profile && data.name && data.family && data.describtion && data.password && required.requiredname && required.requiredpassword) {
        if (allowed() == getathour.data.athor.length && net) {
          setauthor({ variables: { name: data.name, describtion: data.describtion, slug: data.name +'-'+ data.family, id: data.profile, password: data.password } })
            .then(r => publishathors({ variables: { slg: r.data.createAthors.id } }))
          .then(seti(true))
          pubpic({ variables: { id: data.profile }})
          .then(localStorage.setItem('user', data.name +'-'+ data.family))
          alert('success in login')
          setfin(true)
        }
        else {
          alert('name and family in not uniqe')
        }
      }
      else if(!data.profile&&data.name&& data.family&& data.describtion&& data.password){
        alert('image upload have wrong')
        console.log(slug);
      }
      else {
        alert('fill form')
      }
  }

if (localStorage.getItem('user') && i) {
    setInterval(() => {
      window.location.replace('/')
    },4000);
  }
  //handing onchange
  const filechange = (e) => {
    const l = e.target.files[0];
    const form = new FormData();
    form.append('fileUpload', l);
    axios.post('https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clkjfe1cy0uy501ul69la90wu/master/upload', form)
      .then(r => setdata({ ...data,profile:r.data.id, st:r.request.status}))
  }

  const namehandler = (e) => {
    let value = e.target.value
    value = value.replace(/[^a-za-z]/ig, '')
    setdata({ ...data, name: value })
    if (data.name.length >= 3) {
      setrequired({...required, requiredname:true})
    }
    else if(data.name.length < 4){
      setrequired({...required, requiredname:false})
    }
  }

  const passhandler = (e) => {
    setdata({ ...data, password: e.target.value })
      let pattern = /[A-Z]/;
    if (pattern.test(data.password) && data.password.length > 5) {
        setrequired({...required, requiredpassword:true})
    }
    else {
      setrequired({...required, requiredpassword:false})
    }
  }
  const familyhanding = (e) => {
    let value = e.target.value;
    value = value.replace(/[^a-za-z]/ig, '')
    setdata({ ...data, family: value })
  }


    return (
      <div className={styles.div}>
            <form>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4">نام</label>
              <input type="email" class="form-control" id="inputEmail4" placeholder="نام" value={data.name} onChange={namehandler}
             />
              <p>{!required.requiredname && ' حداقل سه حروف باشد و انگلیسی باشد'}</p>
    </div>
    <div class="form-group col-md-6">
      <label for="inputPassword4">نام خانوادگی</label>
                        <input type="text" class="form-control" id="inputPassword4" placeholder="نام خانوادگی" style={{display:'block'}} value={data.family} onChange={familyhanding}/>
    </div>
  </div>
  <div class="form-group">
    <label for="inputAddress">رمز حساب کاربری</label>
            <input type="text" class="form-control" id="inputAddress" placeholder="رمز عبور" value={data.password} onChange={passhandler} />
            <p>{!required.requiredpassword && 'بیشتر از پنج حروف باشد همراه کلمات بزرگ انگلیسی'}</p>
  </div>
  <div class="form-group">
    <label for="exampleFormControlFile1">پروفایل</label>
            <input type="file" class="form-control-file" id="exampleFormControlFile1" value={src} onChange={filechange} accept="image/*" />
            <p>{data.st == 100 && 'choose image...'}</p>
            <p>{data.profile}</p>
            <p>{data.st == 200 && 'upload'}</p>
            <p>{data.st == 400 && 'network connection erorr'}</p>
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputCity">بیوگرافی</label>
      <input type="text" class="form-control" id="inputCity" value={data.describtion} onChange={e => setdata({...data, describtion: e.target.value})}/>
    </div>
  </div>
      <Link to='/'><button type="submit" class="btn btn-primary" onClick={sending}>عضویت</button></Link>
        </form>
      </div>
    );
};

export default Login;