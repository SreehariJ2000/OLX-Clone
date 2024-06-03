import React, { useContext, useState, useEffect } from 'react';
import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../Store/FirebaseContext';

function Posts() {
  const { firebase } = useContext(FirebaseContext);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    firebase.firestore().collection('prod').get().then((snap) => {
      const allPost = snap.docs.map((prod) => ({
        ...prod.data(),
        id: prod.id
      }));
      setProduct(allPost);
    });
  }, [firebase]);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {product.map((prod) => (
            <div className="card" key={prod.id}>
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={prod.url} alt={prod.name} />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {prod.price}</p>
                <span className="kilometer">{prod.category}</span>
                <p className="name">{prod.name}</p>
              </div>
              <div className="date">
                <span>{prod.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart />
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name">YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
