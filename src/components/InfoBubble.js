import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      backgroundColor: "#4d4d4d",
      color: "white",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      margin: "2rem",
      height: "2rem",
      paddingRight: "10px",
      paddingLeft: "10px",
      padding: "3px",
    },
    "& > * > strong": {
      marginLeft: "0.5rem",
    },
  },
}));

export default function SimplePaper({ label, value }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        {label}: <strong>{value}</strong>
      </Paper>
    </div>
  );
}
