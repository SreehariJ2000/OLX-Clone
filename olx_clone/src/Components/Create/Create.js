import React, { Fragment,useContext,useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import {FirebaseContext,AuthContext} from '../../Store/FirebaseContext'
import {useHistory} from 'react-router-dom'
const Create = () => {
  const {firebase}=useContext(FirebaseContext)
  const {user}=useContext(AuthContext)
  const history=useHistory()
  const [name,setName]=useState('')
  const [category,setCategory]=useState('')
  const [price,setPrice]=useState('')
  const [image,setImage]=useState('')

  const handleChange=(e)=>{
    e.preventDefault();
             firebase.storage().ref(`/image/${image.name}`).put(image).then((
              {ref}
             )=>{  ref.getDownloadURL().then((url)=>{
              console.log(url)
              firebase.firestore().collection('prod').add({
                name,category,price,url,userId:user.uid
                
              })
              history.push('/')
             })
  })
  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form onSubmit={handleChange}>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e)=>
                setName(e.target.value)
              }
              id="fname"
              name="Name"

              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e)=>
                setCategory(e.target.value)
              }
              
              
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price" 
             value={price}
             onChange={(e)=>
               setPrice(e.target.value)
             }
            />
            
            <br />
          
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image):''}></img>
          
            <br />
            <input type="file"
             
             onChange={(e)=>
               setImage(e.target.files[0])
             }
            />
            <br />
            <button className="uploadBtn" type="submit">upload and Submit</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
