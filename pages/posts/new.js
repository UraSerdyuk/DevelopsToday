import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";

import Nav from "../components/nav";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: "url(https://source.unsplash.com/user/erondu)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.7)",
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  card: {
    display: "flex",
    flexDirection: "column",
    height: "300px",
    justifyContent: "space-around",
  },
  cardDetails: {
    flex: 1,
  },
  cardButton: {
    float: "right",
    margin: "10px",
  },
}));

const axios = require("axios");

const LatestPast = (props) => {
  const [input, setInput] = useState("");
  const [bodyInput, setBodyInput] = useState("");
  const buttonValidate = !input.length || !bodyInput.length;
  const classes = useStyles();

  const createPost = async () => {
    try {
      const res = await axios.post("https://simple-blog-api.crew.red/posts", {
        title: input,
        body: bodyInput,
      });
      setInput("");
      setBodyInput("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <CssBaseline />
      <Nav />
      <Container maxWidth="lg">
        <Toolbar className={classes.toolbar}>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            className={classes.toolbarTitle}
          >
            Create New Post
          </Typography>
        </Toolbar>
        <main>
          <Grid container spacing={4}>
            {[{}].map((post) => (
              <Grid item key={post.title} xs={12} md={12}>
                <Card>
                  <div className={classes.cardDetails}>
                    <CardContent className={classes.card}>
                      <TextField
                        id="filled-basic"
                        label="Title"
                        variant="filled"
                        value={input}
                        onChange={(e) => {
                          setInput(e.target.value);
                        }}
                      />
                      <TextareaAutosize
                        aria-label="minimum height"
                        rowsMin={5}
                        value={bodyInput}
                        placeholder="Body"
                        onChange={(e) => {
                          setBodyInput(e.target.value);
                        }}
                      />
                    </CardContent>
                  </div>
                  <Button
                    className={classes.cardButton}
                    variant="contained"
                    color="primary"
                    onClick={createPost}
                    disabled={buttonValidate}
                  >
                    Creaet
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </main>
      </Container>
    </>
  );
};

export default LatestPast;
