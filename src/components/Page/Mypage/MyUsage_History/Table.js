import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import fire from "../../Register/LoginFire";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
    width: "100%",
  },
  container: {
    maxHeight: 200,
  },
});

function createData(EP, info_1, info_2, lilac, daisy, clover) {
  console.log("createData");
  return {
    EP,
    info_1,
    info_2,
    detail: [
      { customerId: "Lilac", amount: lilac }, // amout -> EP.Lilac.Ticket
      { customerId: "Daisy", amount: daisy }, // amout -> EP.Daisy.Ticket
      { customerId: "Clover", amount: clover }, // amout -> EP.Clover.Ticket
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  console.log("Row");
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.EP}
        </TableCell>
        <TableCell align="right"></TableCell>
        <TableCell align="right"></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                세부사항
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>타입</TableCell>
                    <TableCell align="right">신청여부</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.detail.map((detailRow) => (
                    <TableRow key={detailRow.date}>
                      <TableCell>{detailRow.customerId}</TableCell>
                      <TableCell align="right">{detailRow.amount}</TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    info_1: PropTypes.string.isRequired,
    info_2: PropTypes.string.isRequired,
    detail: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.string.isRequired,
        customerId: PropTypes.string.isRequired,
      })
    ).isRequired,
    EP: PropTypes.number.isRequired,
  }).isRequired,
};

// 여기서 오류 찾음 !!!!!!!! 초기값 때문에 그럼

export default function CollapsibleTable(props) {
  const { User, UserID, UserHistory } = props;
  const [row, setRow] = useState([]);

  async function searchHistory(UserID, UserHistory) {
    let testrow = [];
    const db = fire.firestore();
    for (let i in UserHistory) {
      let ticket = [];
      console.log(UserHistory[i] + "회차");

      const searchData = await db
        .collection("Flosting_" + UserHistory[i])
        .where("ID", "==", UserID)
        .get();
      try {
        searchData.forEach((doc) => {
          // console.log(doc.data());
          ticket[0] = doc.data().Lilac.Ticket;
          ticket[1] = doc.data().Daisy.Ticket;
          ticket[2] = doc.data().Clover.Ticket;
          console.log(ticket);
        });
      } catch (err) {
        console.log(err);
      }
      testrow[i] = createData(
        UserHistory[i] + "회차",
        "정보 1",
        "정보 2",
        ticket[0] ? "신청" : "미신청",
        ticket[1] ? "신청" : "미신청",
        ticket[2] ? "신청" : "미신청"
      );
    }
    setRow(testrow);
  }

  useEffect(() => {
    // 여기서 rows db 처리
    console.log("effect");
    searchHistory(UserID, UserHistory);
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>회차</TableCell>
            <TableCell align="right">정보 1</TableCell>
            <TableCell align="right">정보 2</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {console.log("mainFunction")}
          {row.map((row) => (
            <Row key={row.EP} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
