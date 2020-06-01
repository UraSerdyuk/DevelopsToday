import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import UpdateIcon from "@material-ui/icons/Update";

import Nav from "./components/nav";
import { getPosts } from "../api/api";

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
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  button: {},
  buttonBlock: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: "10px",
  },
}));

const axios = require("axios");

const LatestPast = (props) => {
  const [data, setData] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    getPostsData();
  }, []);

  const getPostsData = async () => {
    try {
      const response = await getPosts();
      setData(response);
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = async (id) => {
    try {
      const res = await axios.delete(
        `https://simple-blog-api.crew.red/posts/${id}`
      );
      const response = await getPosts();
      setData(response);
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
            Blog !!!
          </Typography>
        </Toolbar>
        <main>
          <Grid container spacing={4}>
            {data.map(({ title, id, body }) => (
              <Grid item key={title} xs={12} md={6}>
                <Card className={classes.card}>
                  <Link href="/posts/[pid]" as={`/posts/${id}`}>
                    <a>
                      <div className={classes.cardDetails}>
                        <CardContent>
                          <Typography component="h2" variant="h5">
                            {title}
                          </Typography>
                          <Typography variant="subtitle1" paragraph>
                            {body}
                          </Typography>
                        </CardContent>
                      </div>
                    </a>
                  </Link>
                  <div className={classes.buttonBlock}>
                    {/* <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      startIcon={<UpdateIcon />}
                      onClick={() => {
                        // deletePost(id);
                      }}
                    >
                      Update
                    </Button> */}

                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      startIcon={<DeleteIcon />}
                      onClick={() => {
                        deletePost(id);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
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
