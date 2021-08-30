import React, { useState } from "react";
import styled from "styled-components";
import firebase from "firebase/app";
import fire from "../../Register/LoginFire";
import "firebase/auth";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

const Container = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 400;
  h1 {
    font-size: 2rem;
  }
`;
const db = fire.firestore();
// const db = firebase.firestore();
const storage = fire.storage();
const storageRef = storage.ref();
function DeleteUser(props) {
  const user = props.User;
  const userDoc = props.회원정보docId;
  const onGoing = props.onGoing;
  const Ukey = props.Ukey;
  const userNick = props.userNick;
  const userUid = user.uid;
  console.log(userUid);
  const [open, setOpen] = useState(false);

  const onClick = () => {
    // console.log(user);

    // const user = firebase.auth().currentUser;
    // console.log("current user " + user);
    deleteProfie(userUid);
    authStateListener();
    setOpen(true);
  };

  const onComfirm = async () => {
    var onGoingDoc;
    var lilacDoc;
    var daisyDoc;
    var cloverDoc;
    deleteUser();
    // 매칭기간 중에 회원 탈퇴 할 경우 무조건 거절 처리

    // lilac matched db 삭제
    // userOne Search
    await db
      .collection(onGoing + "lilac")
      .where("userOne.Unique_key", "==", Ukey)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          lilacDoc = doc.id;
        });
      });

    //userTwo Search
    await db
      .collection(onGoing + "lilac")
      .where("userTwo.Unique_key", "==", Ukey)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          lilacDoc = doc.id;
        });
      });

    // daisy matched db 삭제
    // userOne Search
    await db
      .collection(onGoing + "daisy")
      .where("userOne.Unique_key", "==", Ukey)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          daisyDoc = doc.id;
        });
      });

    //userTwo Search
    await db
      .collection(onGoing + "daisy")
      .where("userTwo.Unique_key", "==", Ukey)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          daisyDoc = doc.id;
        });
      });

    // clover matched db 삭제
    // userOne Search
    await db
      .collection(onGoing + "clover")
      .where("userOne.Unique_key", "==", Ukey)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          cloverDoc = doc.id;
        });
      });

    //userTwo Search
    await db
      .collection(onGoing + "clover")
      .where("userTwo.Unique_key", "==", Ukey)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          cloverDoc = doc.id;
          // doc.data().stage = "end";
          // doc.data().거절한사람 = userNick;
        });
      });

    // 매칭 종료 설정
    await db
      .collection(onGoing + "lilac")
      .doc(lilacDoc)
      .update({
        stage: "end",
        거절한사람: userNick,
      });

    await db
      .collection(onGoing + "daisy")
      .doc(daisyDoc)
      .update({
        stage: "end",
        거절한사람: userNick,
      });

    await db
      .collection(onGoing + "clover")
      .doc(cloverDoc)
      .update({
        stage: "end",
        거절한사람: userNick,
      });

    // FLosting_onging 컬렉션 서치
    await db
      .collection("Flosting_" + onGoing)
      .where("User.Unique_key", "==", Ukey)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          onGoingDoc = doc.id;
        });
      });
    // 현재 신청내역 삭제
    await db
      .collection("Flosting_" + onGoing)
      .doc(onGoingDoc)
      .delete()
      .then(() => {
        console.log("Onging 신청내역 삭제 완료");
      })
      .catch((err) => {
        console.log("신청내역 삭제 오류");
      });

    // 회원정보 삭제
    await db
      .collection("회원정보")
      .doc(userDoc)
      .delete()
      .then(() => {
        console.log("회원 정보 삭제 완료");
      })
      .catch((err) => {
        console.error("회원정보 삭제 오류");
      });
  };

  return (
    <div>
      <button onClick={onClick}>회원탈퇴</button>
      {props.프사 === null ? (
        <div></div>
      ) : (
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">회원 탈퇴</DialogTitle>
          <DialogContent>
            <label htmlFor="contained-button-file">
              <div></div>
            </label>
            <DialogContentText>탈퇴하면 재가입 안됨</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              component="span"
              onClick={onComfirm}
            >
              탈퇴하기
            </Button>
            <Button
              variant="outlined"
              color="primary"
              component="span"
              onClick={() => {
                setOpen(false);
              }}
            >
              취소하기
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

export default DeleteUser;

function authStateListener() {
  // [START auth_state_listener]
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      currentUser();
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
  // [END auth_state_listener]
}
function currentUser() {
  // [START auth_current_user]
  const user = firebase.auth().currentUser;
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    // ...
  } else {
    // No user is signed in.
  }
  // [END auth_current_user]
}

function getUserProfile() {
  // [START auth_get_user_profile]
  const user = firebase.auth().currentUser;
  if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;

    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
    const uid = user.uid;
  }
  // [END auth_get_user_profile]
}
function deleteUser() {
  // [START auth_delete_user]
  const user = firebase.auth().currentUser;

  user
    .delete()
    .then(() => {
      // User deleted.
    })
    .catch((error) => {
      // An error ocurred
      // ...
    });
  // [END auth_delete_user]
}

async function deleteProfie(userUid) {
  // var listRef = storageRef.child(`profileImage/${userUid}/`);
  // console.log(listRef);
  // const ref = storageRef.storage().ref(`profileImage/${userUid}`);
  // console.log(ref);
  // storageRef.listAll().then((listResults) => {
  //   const promises = listResults.items.map((item) => {
  //     return item.delete();
  //   });
  //   Promise.all(promises);
  // });
  // var changedImageRef = storageRef.child(`profileImage/${userUid}/`);
  // changedImageRef.listAll().then((listResults) => {
  //   const promises = listResults.items.map((item) => {
  //     return item.delete();
  //   });
  //   Promise.all(promises);
  // });
  // var secondDesertRef = storageRef.child(`profileImage/registerImage/`);
  // Delete the file
  // changedImageRef
  //   .delete()
  //   .then(function () {
  //     console.log("등록이미지 삭제 완료");
  //     // File deleted successfully
  //   })
  //   .catch(function (error) {
  //     console.log("first Uh-oh, an error occurred!");
  //     // Uh-oh, an error occurred!
  //   });
  // secondDesertRef
  //   .delete()
  //   .then(function () {
  //     console.log("변경이미지 삭제 완료");
  //     // File deleted successfully
  //   })
  //   .catch(function (error) {
  //     console.log("second Uh-oh, an error occurred!");
  //     // Uh-oh, an error occurred!
  //   });
}
