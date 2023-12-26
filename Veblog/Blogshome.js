import React from 'react';
import { useQuery } from "@apollo/client";
import { GET_BLOGS } from "./cms";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import  spinnergif  from './spinnergif.gif';
import styles from "./styleses/Blog.module.css";

const Blogshome = () => {
    const data = useQuery(GET_BLOGS)
    if (data.error) return  <p>network connection is low</p>
    return (
        <div>
                  {
      !data.loading ?
        data.data.blogs.map(item =>
          <div class="card" className={styles.card} style={{
            width: '18rem', display:'inline-block', marginLeft: '3rem', textAlign: 'right', marginTop:'5rem'
          }}>
              <Link to={`author/${item.athors.slug}`}>
              <img src={item.athors.profile.url} style={{width:'2.5rem', borderRadius:'120px' , height:'2.4rem' , display:'inline-block', float:'right' , margin:'.4rem'}}  />
              <p style={{ display: 'inline-block', marginTop: '15px', color: 'black', font: 'caption', fontWeight:'500' }}>{item.athors.name}</p>
                </Link>
  <img class="card-img-top" style={{height:'11rem'}} src={item.coverphoto.url} alt="Card image cap"/>
  <div class="card-body">
                <h5 class="card-title" style={{whiteSpace:'nowrap', fontSize:"17px"}}>{item.title.slice(0,35)}</h5>
                <p style={{ color: 'gray', fontSize: 'small' }} className={styles.paragh}>{item.counter.slice(0, 60) + '...'}</p>
                <p style={{fontSize:'11px', textAlign:'left', display:'inline-block', position:'relative', right:'5.5rem',color:'gray',fontWeight:'100'}}>{item.data}</p>
                <Link to={`/${item.slug}`}><a class="btn btn-success" style={{ color: 'white', display:'inline-block' }}>خواندن مقاله</a></Link>
  </div>
</div>
          )
          : <img src={spinnergif} style={{ height: '100%', marginLeft:'25rem',marginTop:'5rem',borderRadius:'20px'}} />
      }
        </div>
    );
};

export default Blogshome;