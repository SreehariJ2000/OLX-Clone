import React, { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../Store/FirebaseContext';
import { useHistory,Link } from 'react-router-dom';

export default function Signup() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { firebase } = useContext(FirebaseContext);

  const handlechange = (e) => {
    e.preventDefault();

    // Validation for username
    if (username.trim() === '') {
      setUsernameError('Username is required.');
      return;
    }
    setUsernameError('');

    // Validation for email
    if (!email.includes('@') || !email.includes('.')) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');

    // Validation for phone
    if (!phone.match(/^\d{10}$/)) {
      setPhoneError('Please enter a valid 10-digit phone number.');
      return;
    }
    setPhoneError('');

    // Validation for password
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      return;
    }
    setPasswordError('');

    // Creating user account
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user.updateProfile({ displayName: username })
          .then(() => {
            firebase.firestore().collection('user').add({
              id: result.user.uid,
              username: username,
              phone: phone
            })
              .then(() => {
                history.push("/login");
              });
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="OLX Logo" />
        <form onSubmit={handlechange}>
          <label htmlFor="username">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {usernameError && <p className="error">{usernameError}</p>}
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p className="error">{emailError}</p>}
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="tel"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {phoneError && <p className="error">{phoneError}</p>}
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p className="error">{passwordError}</p>}
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
