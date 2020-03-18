import React, { Component } from "react";
import PropTypes from "prop-types";
import Post from "../components/post/Post";
import StaticProfile from "../components/profile/StaticProfile";
import withStyles from "@material-ui/core/styles/withStyles";
import PostSkeleton from "../util/PostSkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";

//MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

const styles = theme => ({
  ...theme.spreadThis
});
class user extends Component {
  state = {
    postIdParam: null
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const postId = this.props.match.params.postId;

    if (postId)
      this.setState({
        postIdParam: postId
      });

    this.props.getUserData(handle);
    // axios
    //   .get(`/user/${handle}`)
    //   .then(res => {
    //     this.setState({
    //       profile: res.data.user
    //     });
    //   })
    //   .catch(err => console.log(err));
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.match !== this.props.match) {
      const postId = nextProps.match.params.postId;
      if (postId) this.setState({ postIdParam: postId, openDialog: true });
    }
  }

  render() {
    const { profile, posts, loading } = this.props.data;
    const { postIdParam } = this.state;

    const postsMarkup = loading ? (
      <PostSkeleton />
    ) : posts === null || posts.length === 0 ? (
      <Typography align="center" color="secondary" variant="body1">
        No posts from user
      </Typography>
    ) : !postIdParam ? (
      posts.map(post => <Post key={post.postId} post={post} />)
    ) : (
      posts.map(post => {
        if (post.postId !== postIdParam)
          return <Post key={post.postId} post={post} />;
        else return <Post key={post.postId} post={post} openDialog />;
      })
    );
    return (
      <Grid container spacing={10}>
        <Grid item sm={4} xs={12}>
          {profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={profile} />
          )}
        </Grid>
        <Grid item sm={8} xs={12}>
          {postsMarkup}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const MapStateToProps = state => ({
  data: state.data
});

export default connect(MapStateToProps, { getUserData })(
  withStyles(styles)(user)
);
