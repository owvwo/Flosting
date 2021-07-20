import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";
import { NavLink, Redirect } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  .title {
    margin-top: 15px;
    font-size: 2rem;
    font-weight: bolder;
  }
  .subtitle {
    font-weight: bold;
    margin-top: 10px;
  }
  img {
    width: 100%;
  }
  .submitBtn {
    width: 80%;
    height: 3rem;
    background-color: ;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    margin: 0,
  },
}));

function NoticeItem(props) {
  const { Title, Date } = props;

  const classes = useStyles();
  return (
    <Container>
      <ListItem alignItems="flex-start" button>
        <NavLink to="/subevent/notice">
          <ListItemText
            primary={Title}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                ></Typography>
                {Date}
              </React.Fragment>
            }
          />
        </NavLink>
      </ListItem>
      <Divider variant="middle"></Divider>
    </Container>
  );
}

export default NoticeItem;
