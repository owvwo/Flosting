import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import { Divider } from "@material-ui/core";
import { NavLink, Redirect } from "react-router-dom";

const Container = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  img {
    width: 100%;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
`;

const NavContainer = styled.div`
  border: solid 2px #f4f4f4;
  border-radius: 10px;
  margin: 0.5rem;
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
      <NavContainer>
        <ListItem alignItems="flex-start" button>
          <NavLink to="/subevent/event">
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
          </NavLink>
        </ListItem>
      </NavContainer>
    </Container>
  );
}

export default EventItem;
