import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Post from "../components/post/Post";
import Profile from "../components/profile/Profile";
import PostSkeleton from "../util/PostSkeleton";

//MUI
import Grid from "@material-ui/core/Grid";

//Redux
import { connect } from "react-redux";
import { getPosts } from "../redux/actions/dataActions";

const styles = theme => ({
  ...theme.spreadThis
});
export class home extends Component {
  state = {
    posts: null
  };
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    const {
      data: { posts, loading }
    } = this.props;
    let recentPostsMarkup = !loading ? (
      posts.map(post => <Post post={post} key={post.postId} />)
    ) : (
      <PostSkeleton />
    );
    return (
      <Grid container spacing={10}>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
        <Grid item sm={8} xs={12}>
          {recentPostsMarkup}
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getPosts })(withStyles(styles)(home));
