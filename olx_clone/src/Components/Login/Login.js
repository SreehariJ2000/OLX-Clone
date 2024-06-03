import React from 'react';
import { useState ,useContext} from 'react';
import Logo from '../../olx-logo.png';
import './Login.css';

import { useHistory } from 'react-router-dom';
import { FirebaseContext } from '../../Store/FirebaseContext';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {firebase} =useContext(FirebaseContext)
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  
  const history = useHistory();

  const handlechange = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      return;
    }
    setPasswordError('');

    if (!email.includes('@') || !email.includes('.')) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');

    firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
      history.push('/')
    }).catch((error)=>{alert(error.message)})
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handlechange}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          {emailError && <p className="error">{emailError}</p>}
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          {passwordError && <p className="error">{passwordError}</p>}
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
}

export default Login;
