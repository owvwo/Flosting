import { React, useEffect, useState } from "react";
import SelectSearch from "react-select-search";
import styled from "styled-components";
import fuzzySearch from "../Register/fuzzySearch";
import { Schools } from "../Register/Schools";
const Container = styled.div`
  margin: 1rem;
`;

const SchoolList = styled.ol`
  border: 1px solid red;
  width: 10rem;
  margin-bottom: 0.3rem;
  border-radius: 4px;
`;

const CurrentEvent = styled.div`
  border: 1px solid red;
  width: 10rem;
  margin-bottom: 0.3rem;
  border-radius: 4px;
`;

function EventPeriod(props) {
  //   const { EP_School_Name, EP_Num, EP_Start_Day, EP_End_Day, EP_Result_Day } =
  //     props;

  const [EP, setEP] = useState();
  const [School, setSchool] = useState();
  const [EP_Start_Day, setEP_Start_Day] = useState();
  const [EP_End_Day, setEP_End_Day] = useState();
  const [Result, setResult] = useState();
  const [Create, SetCreate] = useState(false);
  const [schoolList, setSchoolList] = useState([]);
  const [event, setEvent] = useState({
    EP: 0,
    School: [],
    StartDay: 0,
    EndDay: 0,
    ResultDay: 0,
  });
  const handleEP = (event) => {
    var value = event.target.value;
    setEP(value);
    setEvent(EP.value);
  };

  const handleEPStart = (event) => {
    var value = event.target.value;
    setEP_Start_Day(value);
  };

  const handleEPEnd = (event) => {
    var value = event.target.value;
    setEP_End_Day(value);
  };

  const handleResult = (event) => {
    var value = event.target.value;
    setResult(value);
  };

  const handleCreateEvent = () => {
    console.log("EP : " + EP);
    console.log("SchoolList : " + schoolList);
    console.log("Start Day : " + EP_Start_Day);
    console.log("End Day : " + EP_End_Day);
    console.log("Result : " + Result);

    SetCreate(true);
    console.log(event);
  };

  const handleDeleteEvent = () => {
    SetCreate(false);
  };

  const handleSelectChange = (selected) => {
    setSchool(selected);
  };

  const onAddDetailDiv = () => {
    schoolList.push(School);
    setSchoolList(schoolList);
  };
  const onDeleteDetailDiv = () => {
    // ????????? ?????? ???????????? ???
    schoolList.pop();
    setSchoolList(schoolList);
  };

  return (
    <Container>
      <ol>
        <label>EP_NUM </label>
        <input value={EP} onChange={handleEP}></input>
      </ol>
      <ol>
        <label>?????? ??????</label>
        <SelectSearch
          options={Schools}
          search
          filterOptions={fuzzySearch}
          emptyMessage="Not found"
          placeholder="?????? ??????"
          onChange={handleSelectChange}
        ></SelectSearch>
        {schoolList.map((item, i) => {
          return <SchoolList>{item}</SchoolList>;
        })}
        <button onClick={onAddDetailDiv}>?????? ??????</button>
        <button onClick={onDeleteDetailDiv}>?????? ??????</button>
      </ol>
      <ol>
        <label>?????? ?????? ?????? </label>
        <input value={EP_Start_Day} onChange={handleEPStart}></input>
      </ol>
      <ol>
        <label>?????? ?????? ?????? </label>
        <input value={EP_End_Day} onChange={handleEPEnd}></input>
      </ol>
      <ol>
        <label>?????? ?????? ?????? </label>
        <input value={Result} onChange={handleResult}></input>
      </ol>
      <ol>
        <button onClick={handleCreateEvent}>????????? ??????</button>
        <button onClick={handleDeleteEvent}>????????? ??????</button>
      </ol>
    </Container>
  );
}

export default EventPeriod;
