import React,{useContext} from 'react';
import { AuthContext, FirebaseContext } from '../../Store/FirebaseContext';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { useHistory } from 'react-router-dom';
function Header() {
  const {user} = useContext(AuthContext);
  const {firebase}=useContext(FirebaseContext)
  const history=useHistory()

  const handleSellClick = () => {
    history.push('/create');
  };

  const handleLoginClick = () => {
    if (!user) {
      history.push('/login');
    }
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
         
          <span onClick={handleLoginClick}>{user ? user.displayName   : 'Login'}</span>
          
          {user && <span onClick={()=>{
            firebase.auth().signOut();
            history.push("/login")
          }}>Logout</span>}
          <hr />
        </div>

        <div className="sellMenu">
      <SellButton />
      <div className="sellMenuContent">
        <SellButtonPlus onClick={handleSellClick} style={{ cursor: 'pointer' }} />
        <span onClick={handleSellClick} style={{ cursor: 'pointer' }}>SELL</span>
      </div>
    </div>
      </div>
    </div>
  );
}

export default Header;
