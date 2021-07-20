import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import { Divider } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";

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

function EventItem(props) {
  const { Img, Title, Date } = props;
  const classes = useStyles();
  return (
    <Container>
      <ListItem alignItems="flex-start" button>
        <Link to="/subevent/event">
          <ListItemText
            primary={Title}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  <img src={Img} />
                </Typography>
                {Date}
              </React.Fragment>
            }
          />
        </Link>
      </ListItem>
      <Divider variant="middle"></Divider>
    </Container>
  );
}

export default EventItem;
