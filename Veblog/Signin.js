import React, { useState } from 'react';
import { GET_ATHORS } from './cms';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './styleses/Sing.module.css';

const Signin = () => {
    const athors = useQuery(GET_ATHORS)
    let [p, setp] = useState(false)
    const [data, setdata] = useState({
        name:'',
        pass:''
    })

    const btnclick = () => {
        if (data.name, data.pass) {
            if (!athors.loading) {
                let index = athors.data.athor.findIndex(e => e.slug == data.name)
                console.log(index)
                if (index < 0) {
                    alert('fullname isnt ture')
                }
                else {
                    let ps = athors.data.athor[index].password
                    let checking = ps == data.pass
                    if (checking) {
                        setp(true)
                        localStorage.setItem('user', athors.data.athor[index].slug)
                        alert('welcome to your account')
                    }
                    else {
                        alert('password is false')
                    }
                }
            }
            else {
             setp('net conection have erorr')   
            }
        }
        else {
            alert('fill form')
        }
    }
    console.log(athors);
    return (
        <div className={styles.sing}>
            <form>
            <div class="form-group">
                        <label for="exampleInputEmail1">نام کامل</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={data.name}
                        onChange={e => setdata({...data, name: e.target.value})} />
            </div>
                     <div class="form-group">
                     <label for="exampleInputPassword1">رمز عبور</label>
                     <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" value={data.pass}
                      onChange={e => setdata({...data, pass:e.target.value})}/>
                        </div>
                   <Link to='/'><button type="submit" class="btn btn-primary" onClick={btnclick}>ورود</button></Link>
            </form>
        </div>
    );
};

export default Signin;