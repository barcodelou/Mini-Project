import React, { useState, useRef,useEffect } from 'react';
import styles from "./index.module.css"
import { gql,useLazyQuery} from "@apollo/client";

const getLogin=gql`
query MyQuery($_eq: String = "", $_eq1: String = "") {
    login(where: {email: {_eq: $_eq}, password: {_eq: $_eq1}}) {
      name
      email
      password
    }
  }
  `


export default function NameForm() {
  
  const baseData = {
    email: "",
    password: ""
  }
  const baseError = {
    email: ""
  }
  const [data, setData] = useState(baseData);
  const [temp, setTemp] = useState("");
  const [errorMassage, setErrorMassage] = useState(baseError);
  const [login,{data:dataLogin,error}]=useLazyQuery(getLogin)
  const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

  useEffect(()=>{
    console.log(dataLogin?.login)
    if(dataLogin?.login.length===1){
      // localStorage.setItem('user',dataLogin?.login.name)
      // const temp=localStorage.getItem('user')
      console.log(dataLogin?.login)
      console.log(temp)
      localStorage.setItem('user',temp)
      const simpan=localStorage.getItem('user')
      console.log("data yang disimpan="+simpan)
      console.log(localStorage.getItem('login'))
      alert(`Login accept`)
    }
    else{
      console.log("false")
    
    }
  },[dataLogin])

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "email") {
      if (!regexEmail.test(value)) {
        setErrorMassage({...errorMassage, [name]: 'Email Tidak Sesuai'})
      } else {
        setErrorMassage({...errorMassage, [name]: ''})
      }
    }
    setData({...data, [name]: value});
  };

  const handleSubmit = e => {
    if (errorMassage.email !== '') {
      console.log("HEREEE")
      
      console.log(dataLogin)
    } else {
      console.log("HEREE1")
      
    login({variables:{
        _eq: data.email,
        _eq1: data.password
    }})
    setTemp(data.email)


      resetForm()
    }
    e.preventDefault();
    
  };

  const resetForm = () => {
    setData(baseData);
    setErrorMassage(baseError);
  }
  return (
    <div className="rot">
        <br/>
        <br/>
        <br/>
    <h1 style={{"textAlign":"center"}}>Login</h1>
    <form onSubmit={handleSubmit} className={styles.centerForm}>

      <label>
        Email: <br/>
        <input
          required
          className={styles.input}
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
      </label>
      <br/>
      <label>
        Password: <br/>
        <input
          required
          className={styles.input}
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
        />
      </label>
      <br/>
      
      <ul>
        {Object.keys(errorMassage).map(key => {
          if (errorMassage[key] !== "") {
            return <li className={styles.errorMassage} key={key}>{errorMassage[key]}</li>
          }
          return null
        })}
      </ul>
      <br/>
      <input type="submit" value="Submit" />
   
    </form>
    </div>
  );
};