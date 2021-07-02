import React from "react";

const NicName = (props) => {
  const handleChange = (event) => {
    props.setNicName(event.target.value);
  };

  return (
    <div>
      <label>닉네임을 설정해주세요!</label>
      {console.log(props.nicName)}
      <input
        type="text"
        onChange={handleChange}
        placeholder="닉네임"
        required
      ></input>
    </div>
  );
};

export default NicName;
