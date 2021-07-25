import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Lilac_Table from "./Lilac_Table";
import Table from "./Table";
import fire from "../../Register/LoginFire";
import { forEach } from "property-expr";

const Colortheme = createMuiTheme({
  palette: {
    primary: {
      main: "#E0BCC1",
    },
  },
  typography: {
    fontSize: 10,
    fontWeightRegular: 700,
    fontFamily: "Noto Sans KR",
  },
});

const Container = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 400;

  h1 {
    font-size: 1.5rem;
  }
`;

const Usage_main = (props) => {
  const docID = props.DocID;
  const db = fire.firestore();

  const [lilacCheck, setLilacCheck] = useState("");
  const [daisyCheck, setDaisyCheck] = useState("");
  const [cloverCheck, setCloverCheck] = useState("");
  const [userHistory, setUserHistory] = useState();
  // console.log(docID);

  useEffect(() => {
    var docRef = db.collection("회원정보").doc(docID);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data().My_Usage_History);
          setUserHistory(doc.data().My_Usage_History);
          // console.log(userHistory[0]);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, [docID]);

  // useEffect(() => {
  //   console.log(userHistory[0]);
  // }, [userHistory]);

  return (
    <ThemeProvider theme={Colortheme}>
      <Container>
        <h1>내 이용내역</h1>
        {/* <Lilac_Table Type="Lilac"></Lilac_Table> */}
        <Table
          lilac={lilacCheck}
          daisy={daisyCheck}
          clover={cloverCheck}
        ></Table>
        {/* <Lilac_Table Type="Daisy"></Lilac_Table> */}
        {/* <Lilac_Table Type="Clover"></Lilac_Table> */}
      </Container>
    </ThemeProvider>
  );
};

export default Usage_main;
