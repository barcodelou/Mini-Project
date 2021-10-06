import React, { useState, useRef } from "react";
import styles from "./index.module.css";
import { gql, useMutation } from "@apollo/client";

const getSign = gql`
  mutation MyMutation(
    $password: String = ""
    $name: String = ""
    $email: String = ""
  ) {
    insert_login(objects: { email: $email, name: $name, password: $password }) {
      returning {
        password
        email
        name
        id
      }
    }
  }
`;

export default function NameForm() {
  const baseData = {
    nama: "",
    email: "",
    password: "",
  };
  const baseError = {
    nama: "",
    email: "",
  };
  const suratKesungguhan = useRef("");
  const [data, setData] = useState(baseData);
  const [errorMassage, setErrorMassage] = useState(baseError);
  const [mutate, { data: dataMutation }] = useMutation(getSign);
  const regexNama = /^[A-Za-z ]*$/;
  const regexEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "nama") {
      if (!regexNama.test(value)) {
        setErrorMassage({
          ...errorMassage,
          [name]: "Nama Lengkap Harus Berupa Huruf",
        });
      } else {
        setErrorMassage({ ...errorMassage, [name]: "" });
      }
    }
    if (name === "email") {
      if (!regexEmail.test(value)) {
        setErrorMassage({ ...errorMassage, [name]: "Email Tidak Sesuai" });
      } else {
        setErrorMassage({ ...errorMassage, [name]: "" });
      }
    }
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    if (errorMassage.nama !== "" || errorMassage.email !== "") {
      console.log("HEREEE");
      alert(`Data Pendaftar Tidak Sesuai`);
    } else {
      console.log("HEREE1");
      alert(`Data Pendaftar "${data.nama}" Berhasil Diterima`);
      console.log(data);
      mutate({
        variables: {
          name: data.nama,
          email: data.email,
          password: data.password,
        },
      });
      resetForm();
    }
    e.preventDefault();
  };

  const resetForm = () => {
    setData(baseData);
    setErrorMassage(baseError);
  };
  return (
    <>
    <br/>
    <br/>
    <br/>
    <br/>
      <h1 style={{ textAlign: "center" }}>Sign Up</h1>
      <form onSubmit={handleSubmit} className={styles.centerForm}>
        <label>
          Nama Lengkap:
          <input
            required
            className={styles.input}
            type="text"
            name="nama"
            value={data.nama}
            onChange={handleChange}
          />
        </label>
        <label>
          Email: <br />
          <input
            required
            className={styles.input}
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password: <br />
          <input
            required
            className={styles.input}
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
          />
        </label>
        <br />

        <ul>
          {Object.keys(errorMassage).map((key) => {
            if (errorMassage[key] !== "") {
              return (
                <li className={styles.errorMassage} key={key}>
                  {errorMassage[key]}
                </li>
              );
            }
            return null;
          })}
        </ul>
        <br />
        <br />
        <input type="submit" value="Submit" />
        <button className={styles.buttonReset} onClick={resetForm}>
          Reset
        </button>
      </form>
    </>
  );
}
