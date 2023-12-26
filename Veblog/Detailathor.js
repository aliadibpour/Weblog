import React from 'react';
import { GET_ATHORS, GET_BLOGS } from './cms';
import { useQuery } from '@apollo/client';
import styles from './styleses/Deathor.module.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
const Detailathor = (props) => {
    const athors = useQuery(GET_ATHORS)
    const blogs = useQuery(GET_BLOGS)
    let user = localStorage.getItem('user')
 
    const I = () => {
        if (!athors.loading && !blogs.loading) {
            let posts = []
            for (let index = 0; index < blogs.data.blogs.length; index++) {
                if (blogs.data.blogs[index].athors.slug == athors.data.athor[athors.data.athor.findIndex(item => item.slug == props.match.params.id)].slug) {
                    posts.push(index)
                    console.log(posts);
                }
            }
            return posts
        }
    }

    if(athors.error) return <p>network connection is low</p>
    return (
        <div className={styles.div}>
            {
                !athors.loading ?
                    <div  className={styles.body}>
                    <p>{athors.data.athor[athors.data.athor.findIndex(item => item.slug == props.match.params.id)].name}</p>
                        <img src={athors.data.athor[athors.data.athor.findIndex(item => item.slug == props.match.params.id)].profile.url} alt='profile'  />
                        <p className={styles.bio}>{athors.data.athor[athors.data.athor.findIndex(item => item.slug == props.match.params.id)].describtion}</p>
                        {
                            !blogs.loading &&
                                I().length > 0 ? 
                                I().map(item =>
                                    <div style={{backgroundColor:'white'}} className={styles.post}>
                                <img class="card-img-top" style={{height:'11rem'}} src={blogs.data.blogs[item].coverphoto.url} alt="Card image cap"/>
                                <h5 class="card-title">{blogs.data.blogs[item].title.slice(0,35)}</h5>
                                <p style={{ color: 'gray', fontSize: 'small',marginTop:'10px' }}>{blogs.data.blogs[item].counter.slice(0, 160) + '...'}</p>
                                <p className={styles.date}>{blogs.data.blogs[item].data}</p>
                                <Link to={`/${blogs.data.blogs[item].slug}`}><a class="btn btn-success" style={{ color: 'white', fontWeight: 'bold', display:'inline-block' }}>خواندن مقاله</a></Link>
                                    </div>
                                )
                                :
                                <p>مقاله ای وجود ندارد</p>
                        }
                        <br/> 
                        <Link to='/'><button class='btn btn-success' style={{marginTop:"4rem"}}>خانه</button></Link>
                        </div>
                    :<p>loading...</p>
            }
        </div>
    );
};

export default Detailathor;