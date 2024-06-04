import React,{useState} from 'react';

import Header from '../Components/Header/Header';
import Banner from '../Components/Banner/Banner';

import Posts from '../Components/Posts/Posts';
import Footer from '../Components/Footer/Footer';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <div className="homeParentDiv">
      <Header onSearch={setSearchQuery} /> {/* Pass the function to update search query */}
      <Banner />
      <Posts searchQuery={searchQuery} /> {/* Pass the search query to Posts */}
      <Footer />
    </div>
  );
}

export default Home;
 
