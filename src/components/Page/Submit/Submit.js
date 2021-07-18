import React from "react";
import EnrollmentForm from "./components/EnrollmentForm";
import { useEffect, useState } from "react";
import fire from "../Register/LoginFire";
import { Redirect } from "react-router-dom";

function Submit(props) {
  const dbUser = [
    {
      Age: "",
      Gender: "",
      Manner: "",
      Nick: "",
      Phone: "",
      Univ: "",
    },
  ];
  const [ID, setID] = useState("");
  const [User, setUser] = useState(dbUser);

  const db = fire.firestore();
  const user = props.User;
  useEffect(() => {
    if (user) {
      const s_id = user.email.split("@");
      setID(s_id[0]);
      db.collection("회원정보")
        .where("ID", "==", s_id[0])
        .get()
        .then((querySnapshot) => {
          if (querySnapshot) {
            querySnapshot.forEach((doc) => {
              setUser(doc.data().User);
            });
          } else {
            console.log("데이터없어");
          }
        });
    }
  }, [user]);

  if (!JSON.parse(localStorage.getItem("user"))) {
    return <Redirect to="/login" />;
  } else {
    return (
      <div>
        <EnrollmentForm User={User} ID={ID} />
      </div>
    );
  }
}
export default Submit;
