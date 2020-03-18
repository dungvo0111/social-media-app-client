import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";

//redux
import { connect } from "react-redux";
import { makePost, clearErrors } from "../../redux/actions/dataActions";

//MUI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
  ...theme.spreadThis
});

class MakePost extends Component {
  state = {
    open: false,
    body: "",
    errors: {}
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: "", open: false, errors: {} });
    }
  }

  handleOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.props.clearErrors();
    this.setState({
      open: false,
      errors: {}
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.makePost({
      body: this.state.body
    });
  };

  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading },
      user: {
        credentials: { handle }
      }
    } = this.props;

    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="Make a Post!">
          <AddIcon />
        </MyButton>
        <Dialog open={this.state.open} fullWidth maxWidth="sm">
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Create Post</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="Post"
                multiline
                rows="3"
                placeholder={`Whatcha wanna say, ${handle}...`}
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                className={classes.submitButton}
                color="primary"
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

MakePost.propTypes = {
  makePost: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI,
  user: state.user
});

export default connect(mapStateToProps, { makePost, clearErrors })(
  withStyles(styles)(MakePost)
);
