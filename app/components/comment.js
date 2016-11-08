import React from 'react';
import {Link} from 'react-router';
import {likeCommentItem} from '../server';
import {unlikeCommentItem} from '../server';
import {unixTimeToString} from '../util.js';

export default class Comment extends React.Component {

  constructor(props) {
  super(props);
  this.state = props.data;
}

  handleLikeClick(clickEvent) {
  clickEvent.preventDefault();
  if (clickEvent.button === 0) {
  var callbackFunction = (updatedCommentLikeCounter) => {
  this.setState({commentLikeCounter: updatedCommentLikeCounter});
  };

  if (this.didUserLike()) {
  unlikeCommentItem(this.state.feedItemId, this.state.commentIndex, 4, callbackFunction);
  } else {
  likeCommentItem(this.state.feedItemId, this.state.commentIndex, 4, callbackFunction);
  }
  }
  }

  didUserLike() {
  var commentLikeCounter = this.state.commentLikeCounter;
  var liked = false;
  for (var i = 0; i < commentLikeCounter.length; i++) {
  if (commentLikeCounter[i] === 4) {
  liked = true;
  break;
  }
  }
  return liked;

  }

render() {
      var likeButtonText = "Like";
    if (this.didUserLike()) {
    likeButtonText = "Unlike";
    }


    return (
    <div>
    <div className="media-left media-top">
    PIC
    </div>
    <div className="media-body">
      <Link to={"/profile/" + this.props.author._id}>
      {this.props.author.fullName}
      </Link>
      {this.props.children}
    <br /><a href="#" onClick={(e) => this.handleLikeClick(e)}>{likeButtonText}</a>  · <a href="#">Reply</a> ·
    {unixTimeToString(this.props.postDate)}
    </div>
    </div>
    )



}
}
