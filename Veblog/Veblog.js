import React, { useEffect } from 'react';
import { gql, useApolloClient, useQuery } from '@apollo/client';
import Blog from './Blog';
import Detailathor from './Detailathor';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Detailblog from './Detailblog';
import styles from './styleses/Veblog.module.css';
import Login from './Login';
import Signin from './Signin';
import Profile from './Profile';
import Postblog from './Postblog';
//localStorage.clear()
const Veblog = () => {
    return (
        <div style={{background:'silver'}} className={styles.app}>
            <Switch>
                <Route path='/login' component={Login} />
                <Route path='/Signin' component={Signin} />
                <Route path='/Profile' component={Profile} />
                <Route path='/Postblog' component={Postblog} />
                <Route path='/author/:id' component={Detailathor} />
                <Route path='/:id' component={Detailblog} />
                <Route path='/' component={Blog} />
          </Switch>
        </div>
    );
};

export default Veblog;