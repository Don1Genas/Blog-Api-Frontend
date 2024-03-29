import {useState} from 'react';
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const LoginForm = (props) => {
    const history = useHistory()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = e => {
        e.preventDefault();
        console.log(formData);
        
        axios.post('https://dwg-blog-app.herokuapp.com/auth', formData)
        .then((res) => {
            console.log(res.data);
            
            if (res.data.token && res.data.user){
                localStorage.setItem('userToken', res.data.token)
                props.setUser(res.data.user)
                history.push('/home')
            } else {
                console.error(res.data)
            }
        })
    };
    return (
        <div >
            <form onSubmit={handleSubmit}>

              <div className='mb-3'>
                <label htmlFor="email" className='form-label'>Email</label> 
                <input 
                type='text'
                className='form-control' 
                id='email' 
                name='email' 
                value={formData.email}
                    onChange={e => setFormData({...formData, [e.target.id]: e.target.value})}
                />
              </div>

               <div className='mb-3'>
                <label htmlFor="password" className='form-label'>Password</label> 
                <input 
                type='password'
                className='form-control' 
                id='password' 
                name='password' 
                value={formData.password}
                onChange={e => setFormData({...formData, [e.target.id]: e.target.value})}
                />
               </div>

               <input type='submit' className='btn btn-info' />
            </form>
        </div>
    );
};

export default LoginForm;