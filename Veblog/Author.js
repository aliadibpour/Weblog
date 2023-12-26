import React from 'react';
import { GET_ATHORS } from './cms';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styles from '.styleses//Athour.module.css';
import  spinnergi  from './spinnergif.gif';

const Author = () => {
    const athors = useQuery(GET_ATHORS)
    if (athors.error) return <p>network connection is low</p>
    return (
        <div style={{position:'fixed'}}>
            {
                !athors.loading ?
                    athors.data.athor.map(item =>
                        <Link to={`/author/${item.slug}`} className={styles.card}>{console.log(item)}
                        <div style={{ borderBottom:'solid 1px gray', padding:'20px' , borderRadius:'3px'}}>
                            <img src={item.profile.url}  alt='profile' style={{width:'4rem' , borderRadius:'100px' , height:'4rem' ,float:'right', position:'relative',bottom:'.7rem'}}/>
                            <p style={{textDecoration:'none', color:'black',padding:'7px',font:'caption',fontSize:'13px'}}>{item.name}</p>
                        </div>
                        </Link>
                    ) :
                    <img src={spinnergi} style={{ height: '100%', marginLeft:'25rem',marginTop:'5rem',borderRadius:'20px'}} />
            }
        </div>
    );
};

export default Author;