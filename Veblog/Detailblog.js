import React, { createContext, useState } from 'react';
import { GET_BLOGS } from './cms';
import { useQuery } from '@apollo/client';
import Form from './Form';
import styles from './styleses/Deb.module.css';
const Detailblog = (props) => {
    const data = useQuery(GET_BLOGS)
    const [cmt, setcmt] = useState([])
    const cmthandler = (comments) => {
        setcmt([...cmt,comments])
        return cmt
    }
    if(data.error) return <p>network connection is low</p>
    return (
        <div className={styles.det}>
            {
                !data.loading ?
                    <div className={styles.div}>{console.log(data)}
                        <p style={{float:'right', display:'inline-block'}}>:نویسنده</p>
                        <p style={{ float: 'right' }}>{data.data.blogs[data.data.blogs.findIndex(item => item.slug == props.match.params.id)].athors.name}</p>
                            <h5 class="card-title">
                                {data.data.blogs[data.data.blogs.findIndex(item => item.slug == props.match.params.id)].title}</h5>
    <img class="card-img-top" src={data.data.blogs[data.data.blogs.findIndex(item => item.slug == props.match.params.id)].coverphoto.url} alt="Card image cap" />
                <div class="card-body">
                            <p class="card-text" className={styles.counter}>
                                {data.data.blogs[data.data.blogs.findIndex(item => item.slug == props.match.params.id)].counter}</p>
                            <Form slug={data.data.blogs[data.data.blogs.findIndex(item => item.slug == props.match.params.id)].slug} cmt={cmthandler} />
                        </div>
                        {
                            data.data.blogs[data.data.blogs.findIndex(item => item.slug == props.match.params.id)].comments.map(cm =>
                                <div class="card" className={styles.cmtt}>
                                    <h5 class="card-header">{cm.name}</h5>
                                 <div class="card-body">
                                        <h5 class="card-title">{cm.gmail}</h5>
                                        <p class="card-text">{cm.counter}</p>
                                    </div>
                                </div>
                            )
                        }
                        {
                            cmt.length > 0 &&
                            cmt.map(item =>
                                <div class="card" className={styles.cmtt}>
                                <h5 class="card-header">{item.name}</h5>
                             <div class="card-body">
                                    <h5 class="card-title">{item.email}</h5>
                                    <p class="card-text">{item.comment}</p>
                                </div>
                            </div>
                                )
                            }
              </div>
                    :
                    <p>loading...</p>
            }
        </div>
    );
};

export default Detailblog;