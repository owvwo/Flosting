import React from "react";
import EnrollmentForm from "./components/EnrollmentForm";
import { useEffect, useState } from "react";
import fire from "../Register/LoginFire";

function Submit() {
  const Use2r = [
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
  const [User, setUser] = useState(Use2r);

  const db = fire.firestore();
  const user = fire.auth().currentUser;

  useEffect(() => {
    // console.log(User);
    const s_id = user.email.split("@");
    setID(s_id[0]);
    db.collection("회원정보")
      .where("ID", "==", s_id[0])
      .get()
      .then((querySnapshot) => {
        // console.log(querySnapshot.size);
        if (querySnapshot) {
          querySnapshot.forEach((doc) => {
            setUser(doc.data().User);
          });
        } else {
          console.log("데이터없어");
        }
      });
  }, []);

  return (
    <div>
      <EnrollmentForm User={User} ID={ID} />
    </div>
  );
}

export default Submit;
