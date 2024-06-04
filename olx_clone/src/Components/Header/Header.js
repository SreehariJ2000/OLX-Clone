import React, { useContext } from 'react';
import { AuthContext, FirebaseContext } from '../../Store/FirebaseContext';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { useHistory } from 'react-router-dom';

function Header({ onSearch }) { // Receive onSearch as a prop
  const { user } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();

  const handleSellClick = () => {
    history.push('/create');
  };

  const handleLoginClick = () => {
    if (!user) {
      history.push('/login');
    }
  };

  const handleSearch = (e) => {
    onSearch(e.target.value); // Update search query in Home component
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo />
        </div>
        <div className="placeSearch">
          <Search />
          <input type="text" />
          <Arrow />
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car, mobile phone and more..."
              onChange={handleSearch} // Call handleSearch on input change
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff" />
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow />
        </div>
        <div className="loginPage">
          <span onClick={handleLoginClick}>{user ? user.displayName : 'Login'}</span>
          {user && <span onClick={() => {
            firebase.auth().signOut();
            history.push("/login");
          }}>Logout</span>}
          <hr />
        </div>
        <div className="sellMenu">
          <SellButton />
          <div className="sellMenuContent">
            <SellButtonPlus style={{ cursor: 'pointer' }} />
            <span onClick={handleSellClick} style={{ cursor: 'pointer' }}>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
