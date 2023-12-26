import React, { useState } from 'react';
import axios from 'axios';
import { PostBlog, PublishBlog,publishasset,GET_BLOGS } from './cms';
import { useMutation, useQuery } from '@apollo/client';
import styles from './styleses/Post.module.css';
const Postblog = () => {
  const [net, setnet] = useState(true);
  const [src, setsrc] = useState(null);
  let user = localStorage.getItem('user')
  const [data, setdata] = useState({
    title: '',
    slug: '',
    image: '',
    counter: '',
    date: new Date(),
    st:0
  })
  //api elements
  const [posting, r] = useMutation(PostBlog)
  const [publishing, w] = useMutation(PublishBlog)
  const [pubasses, q] = useMutation(publishasset)
  const [finish, setfin] = useState(false)
  const getblogs = useQuery(GET_BLOGS)
  window.addEventListener('offline', () => {
    setnet(false)
    alert('network connection is off')
  })
  window.addEventListener('online', () => {
    setnet(true)
    alert('back to online')
  })
  const allowed = () => {
    let num = 0;
    if (!getblogs.loading) {
      let rt = getblogs.data.blogs.map(e => e.slug == data.slug)
      console.log(rt);
      for (let index = 0; index < getblogs.data.blogs.length; index++) {
        rt[index] == false && num++
      }
      return num
    }
  }
allowed()
  const imghandler = (e) => {
    setsrc(e.target.files[0])
    const l = e.target.files[0];
    const form = new FormData();
    form.append('fileUpload', l);
    if (net) {
      axios.post('https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clkjfe1cy0uy501ul69la90wu/master/upload', form)
        .then(r => setdata({ ...data, image: r.data.id, st: r.request.status }))
    }
  }

  const btnclick = (e) => {
    e.preventDefault();
    if (data.title && data.slug && data.image && data.counter) {
      if (net) {
        if (allowed() == getblogs.data.blogs.length && !finish) {
          posting({ variables: { title: data.title, counter: data.counter, slug: data.slug, date: data.date, id: data.image,athor:user } })
            .then(r =>  publishing({variables: {id: r.data.createBlog.id}}))
          pubasses({ variables: { id: data.image } })
          .then(setfin(true))
        }
        else {
          alert('id for blog isnt uniqe')
        }
      }
      else {
        alert('network connection is off')
      }
    }
    else {
      alert('fill form')
    }
  }

  if (finish) {
    setInterval(() => {
      window.location.replace(
        '/'
      )
    },3000);
  }
  var slughanding = (e) => {
    let value = e.target.value
    value = value.replace(/[^a-za-z]/ig, '')
    setdata({...data,slug:value})
  }
    return (
        <div className={styles.div}>
            <form>
  <div class="form-group">
    <label for="exampleFormControlInput1">عنوان مقاله</label>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" value={data.title}
              onChange={e => setdata({ ...data, title: e.target.value })} />
    </div>
    <div class="form-group">
    <label for="exampleFormControlInput1">نشانی مقاله</label>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" value={data.slug}
              onChange={slughanding} />
            <p style={{fontSize:'13px', background:'silver',borderRadius:'2px',padding:'5px',display:'inline-block',marginTop:'8px'}}>انگلیسی نوشته شود</p>
  </div>
    <div class="form-group">
    <label for="exampleFormControlFile1">عکس مقاله</label>
            <input type="file" class="form-control-file" id="exampleFormControlFile1" value={null} onChange={imghandler} />
            <p>{data.st == 200 ? 'upload' : 'choose image'}</p>
  </div>
  <div class="form-group">
    <label for="exampleFormControlTextarea1">متن:</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={data.counter}
            onChange={e => setdata({...data,counter:e.target.value})}></textarea>
          </div>
          <button className='btn btn-primary' onClick={btnclick}>ارسال</button>
</form>
        </div>
    );
};

export default Postblog;