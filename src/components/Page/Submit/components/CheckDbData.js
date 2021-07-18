import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import fire from "../../Register/LoginFire";

const CheckDbData = (props) => {
  const { User, ID } = props;
  const [DocID, setDocID] = useState("");
  const db = fire.firestore();
  useEffect(() => {
    db.collection("Flosting_7")
      .where("ID", "==", ID)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot) {
          querySnapshot.forEach((doc) => {
            setDocID(doc.id);
            console.log(doc.id);
          });
        }
      });
  }, []);

  const resetSubmit = () => {
    db.collection("Flosting_7")
      .doc(DocID)
      .delete()
      .then(() => {
        console.log("삭제 완료");
      })
      .catch((error) => {
        console.log("Error removing document : ", error);
      });
  };
  return (
    <div>
      <Dialog
        open={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"이미 신청하셨습니다"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            신청서를 수정하시겠습니까?
            <br />
            수락하시면 신청페이지로 넘어감
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/my" style={{ textDecoration: "none" }}>
            <Button type="button" color="primary">
              DisAgree
            </Button>
          </Link>
          <Link to="/Submit/EP2" style={{ textDecoration: "none" }}>
            <Button
              type="button"
              color="primary"
              onClick={resetSubmit}
              autoFocus
            >
              Agree
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CheckDbData;
