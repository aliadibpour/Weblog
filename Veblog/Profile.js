import React, { useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { GET_ATHORS,GET_BLOGS } from './cms';
import { useQuery } from '@apollo/client';
import styles from "./styleses/Pf.module.css";

const Profile = () => {
    let user = localStorage.getItem('user');
    const blogs = useQuery(GET_BLOGS);
    const athors = useQuery(GET_ATHORS);

    const logout = () => {
        localStorage.removeItem('user')
    }
    const I = () => {
        if (!athors.loading && !blogs.loading) {
            let posts = []
            for (let index = 0; index < blogs.data.blogs.length; index++) {
                if (blogs.data.blogs[index].athors.slug == athors.data.athor[athors.data.athor.findIndex(item => item.slug == user)].slug) {
                    posts.push(index)
                    console.log(posts);
                }
            }
            return posts
        }
    }
    if (athors.loading) {<p>loading...</p>}
    return (
        <div className={styles.div}>
            {
                !athors.loading ?
                    <div className={styles.pr}>
                        {console.log(athors)}
                        <p>{athors.data.athor[athors.data.athor.findIndex(item => item.slug == user)].name}</p>
                        <img src={athors.data.athor[athors.data.athor.findIndex(item => item.slug == user)].profile.url}width='350rem' />
                        <p className={styles.para}>{athors.data.athor[athors.data.athor.findIndex(item => item.slug == user)].describtion}</p>
                        <p style={{color:'black' , marginTop:'2rem'}}>مقالات</p>
                        {
                            !blogs.loading &&
                                I().length > 0 ?
                                I().map(item =>
                                    <div className={styles.ps} style={{marginLeft:'1rem'}}>
                                <img class="card-img-top" style={{height:'11rem',marginRight:'5px',borderRadius:'5px'}} src={blogs.data.blogs[item].coverphoto.url} alt="Card image cap"/>
                                <div class="card-body">
                                <h5 class="card-title" style={{whiteSpace:'nowrap', fontSize:"17px",marginTop:'2rem'}}>{blogs.data.blogs[item].title.slice(0,35)}</h5>
                                <p style={{ color: 'gray', fontSize: 'small',marginTop:'1rem' }}>{blogs.data.blogs[item].counter.slice(0, 160) + '...'}</p>
                                <p style={{fontSize:'11px', textAlign:'left', display:'inline-block', position:'relative', right:'5rem',color:'gray'}}>{blogs.data.blogs[item].data}</p>
                                <Link to={`/${blogs.data.blogs[item].slug}`}><a class="btn btn-success" style={{ color: 'white', fontWeight: 'bold', display:'inline-block' }}>خواندن مقاله</a></Link>
                                    </div>
                                    </div>
                                )
                                :
                                <p>no post</p>
                        }
                        <br/>
                            <Link to='/' className={styles.btn}><button onClick={logout} class='btn btn-primary'>خروج از حساب کاربری</button></Link>
                            <Link to='/' className={styles.btn}><button class='btn btn-success' style={{marginLeft:'1rem'}}>خانه</button></Link>
                    </div>
                    :
                    <p>network conection is low</p>
            }
        </div>
    );
};

export default Profile;