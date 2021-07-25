import React from "react";
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

function createData(EP, info_1, info_2) {
  return {
    EP,
    info_1,
    info_2,
    detail: [
      { customerId: "Lilac", amount: "true" },
      { customerId: "Daisy", amount: "false" },
      { customerId: "Clover", amount: "false" },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

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
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
      })
    ).isRequired,
    EP: PropTypes.string.isRequired,
  }).isRequired,
};

const rows = [
  createData("5회차", "정보1", "정보2"),
  createData("4회차", "정보1", "정보2"),
  createData("3회차", "정보1", "정보2"),
  createData("2회차", "정보1", "정보2"),
  createData("1회차", "정보1", "정보2"),
  // createData("1회차", "정보1", "정보2"),
  // createData("1회차", "정보1", "정보2"),
  // createData("1회차", "정보1", "정보2"),
  // createData("1회차", "정보1", "정보2"),
  // createData("1회차", "정보1", "정보2"),
  // createData("1회차", "정보1", "정보2"),
  // createData("1회차", "정보1", "정보2"),
  // createData("1회차", "정보1", "정보2"),
  // createData("1회차", "정보1", "정보2"),
  // createData("1회차", "정보1", "정보2"),
];

export default function CollapsibleTable() {
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
          {rows.map((row) => (
            <Row key={row.EP} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
