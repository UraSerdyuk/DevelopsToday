import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getPost } from "../../api/api";
import Nav from "../components/nav";
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
import CardActions from "@material-ui/core/CardActions";

import { updatePost, createComment } from "../../api/api";
import OutlinedCard from "../components/card";

const useStyles = makeStyles((theme) => ({
  root: { width: "100%", margin: "10px" },
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

const Post = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [id, setId] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const router = useRouter();

  const { pid } = router.query;
  const buttonValidate = !title.length || !body.length;
  const classes = useStyles();

  const init = async () => {
    const post = await getPost(pid);
    const { title, body, comments } = post;

    setTitle(title);
    setBody(body);
    setId(id);
    setComments(comments);
  };

  useEffect(() => {
    init();
  }, []);

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
            Post id : {pid}
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
                        value={title}
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
                      />
                      <TextareaAutosize
                        aria-label="minimum height"
                        rowsMin={5}
                        value={body}
                        placeholder="Body"
                        onChange={(e) => {
                          setBody(e.target.value);
                        }}
                      />
                    </CardContent>
                  </div>
                  <Button
                    className={classes.cardButton}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      updatePost({ id: pid, title: title, body: body });
                      setTimeout(() => {
                        init();
                      }, 2000);
                    }}
                    disabled={buttonValidate}
                  >
                    Update
                  </Button>
                </Card>
              </Grid>
            ))}

            <Card className={classes.root}>
              <CardContent>
                <TextField
                  style={{ width: "80%" }}
                  id="filled-basic"
                  label="Comment"
                  variant="filled"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
                <Button
                  className={classes.cardButton}
                  variant="contained"
                  color="primary"
                  variant="outlined"
                  onClick={() => {
                    createComment({ postId: pid, body: comment });
                  }}
                  disabled={!comment}
                >
                  Add comment
                </Button>
              </CardContent>
            </Card>

            {comments.map((comments) => {
              return <OutlinedCard comments={comments} />;
            })}
          </Grid>
        </main>
      </Container>
    </>
  );
};

export default Post;
