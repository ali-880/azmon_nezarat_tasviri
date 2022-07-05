/*eslint-disable*/
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import styles from "assets/jss/material-dashboard-react/components/footerStyle.js";
import { Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";
const useStyles = makeStyles(styles);
export default function Footer(props) {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <NavLink to='/'>
                 <Typography variant='subtitle1'>صفحه اصلی</Typography>
              </NavLink>
            </ListItem>
          </List>
        </div>
        <Typography variant='subtitle2' className={classes.right}>
          بخش ادمین سایت چت دانشگاه شهرکرد
        </Typography>
      </div>
    </footer>
  );
}
