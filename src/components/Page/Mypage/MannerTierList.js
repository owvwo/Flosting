import React, { Component, useState, useEffect } from 'react';
import styled from 'styled-components';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';


import tier_mi1 from '../../../images/tier_mi1.png';
import tier_zero from '../../../images/tier_zero.png';
import tier_plus1 from '../../../images/tier_plus1.png';

const useStyles = makeStyles((theme) => ({
    nested: {
        paddingLeft: theme.spacing(3),
    },
    CList:{
        padding: 0,
        margin: 0
    }
}));

const TierContent = styled.div`
    display: flex;
    flex-direction : row;

`
const Tiermessage = styled.div`
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 0.8rem;
    margin-left: 10px;
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`
const TierImg = styled.div`
    img{
        width: 30px;
        height: 30px;
    }
`

const MannerTierList = () => {

    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };


    return (
        <List className ={classes.CList}>
            <ListItem className ={classes.CList} button onClick={handleClick}>
                <ListItemText primary="티어 보기" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className ={classes.CList}>
                        <TierContent>
                            <TierImg>
                                <img src={tier_mi1} />
                            </TierImg>
                            <Tiermessage>
                                깨진 씨앗
                            </Tiermessage>
                        </TierContent>
                    </ListItem>
                    <ListItem button className ={classes.CList}>
                        <TierContent>
                            <TierImg>
                                <img src={tier_zero} />
                            </TierImg>
                            <Tiermessage>
                                씨앗
                            </Tiermessage>
                        </TierContent>
                    </ListItem>
                    <ListItem button className ={classes.CList}>
                        <TierContent>
                            <TierImg>
                                <img src={tier_plus1} />
                            </TierImg>
                            <Tiermessage>
                                새싹
                            </Tiermessage>
                        </TierContent>
                    </ListItem>
                </List>
            </Collapse>
        </List>
    );
};

export default MannerTierList;