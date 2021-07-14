import React from "react";
import SNSLink from "../../SNSLink";
import Footer from "../../Footer";

function EditSubmit(props) {
  // 1. 신청 유무 파악하기
  // 2. 이미 신청했으면 막기

  return (
    <div>
      <SNSLink />
      <Footer />
    </div>
  );
}

export default EditSubmit;
