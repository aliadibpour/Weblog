import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styles from "./styleses/Nav.module.css";

const Nav = () => {
  let user = localStorage.getItem('user')
  //localStorage.clear()
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#" style={{marginLeft:'5rem'}}>Veblog</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
           <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              {
                !user &&<div>
              <Link to="/login"  className={styles.login}><a style={{color:'white'}} class="nav-item nav-link active" href="#">عضویت<span class="sr-only">(current)</span></a></Link>
              <Link to='/Signin' className={styles.singin} ><a style={{color:'white'}} class="nav-item nav-link" href="#">ورود</a></Link>
                  </div>
              }
              {
                user &&
                <div>
                    <Link to='/Profile' className={styles.user}>{user}</Link>
                    <Link to='/Postblog' className={styles.post}>پست بلاگ</Link>
                </div>
              }
           </div>
  </div>
</nav>
        </div>
    );
};

export default Nav;