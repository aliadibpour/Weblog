import React, { useContext, useState } from 'react';
import { SEND_COMMENT, PublishComment } from './cms';
import { useMutation } from '@apollo/client';
import styles from './styleses/Deb.module.css';
const Form = ({ slug, cmt }) => {
  let tt = 'tip';
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [comment, setcomment] = useState('');
  const [net, setnet] = useState(true)
  const [MyMutation, { data, loading, error }] = useMutation(SEND_COMMENT)
  const [pubcm, response] = useMutation(PublishComment)

  const commentarrow = (id) => {
    pubcm({variables: {id:id}})
  }

  const sendcmt = (e) => {
    e.preventDefault()
    if (name && email && comment) {
      if (net) {
        MyMutation({ variables: { name, gmail: email, counter: comment, slug }, })
          .then(r => commentarrow(r.data.createComment.id))
        cmt({
          name,
          email,
          comment
        })
      }
      else {
        alert('اینترنت قطع است')
      }
    }
    else {
      alert('فرم را کامل کنید')
    } 
  }
  window.addEventListener('offline', () => {
    setnet(false)
    alert('network connection is off')
  })
  window.addEventListener('online', () => {
    setnet(true)
    alert('back to online')
  })

    return (
        <div>
        <div>
        <form className={styles.form}>
  <div class="form-group row">
    <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">نام</label>
    <div class="col-sm-10">
      <input type="text" class="form-control form-control-sm" id="colFormLabelSm" placeholder="col-form-label-sm" style={{position:'relative',right:'8rem', width:'20rem'}} value={name} onChange={e => setname(e.target.value)}/>
    </div>
  </div>
  <div class="form-group row">
    <label for="colFormLabel" class="col-sm-2 col-form-label">ایمیل</label>
    <div class="col-sm-10">
      <input type="email" class="form-control" id="colFormLabel" placeholder="col-form-label" value={email} style={{position:'relative',right:'8rem', width:'20rem'}} onChange={e => setemail(e.target.value)}/>
    </div>
  </div>
  <div class="form-group row">
    <label for="colFormLabelLg" class="col-sm-2 col-form-label col-form-label-lg">نظر</label>
    <div class="col-sm-10">
      <input type="text" class="form-control form-control-lg" id="colFormLabelLg" placeholder="col-form-label-lg" style={{position:'relative',right:'8rem', width:'20rem'}} value={comment} onChange={e => setcomment(e.target.value)}/>
    </div>
                            </div>
                            <button class='btn btn-success' onClick={sendcmt}>ارسال</button>
</form>
        </div>
        </div>
    );
};

export default Form;