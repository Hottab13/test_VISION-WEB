import React, { createElement, useState } from 'react';
import { Comment, Tooltip, Avatar, Form, Button, Input,List } from 'antd';
import moment from 'moment';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
//import { AppStateType } from '../../../../redux/ReduxStore';
import { useSelector } from 'react-redux';

const { TextArea } = Input;


 export const Demo = (props) => {
  const Editor = ({ onChange, onSubmit, submitting, value }) => {
    return <>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
          Add Comment
        </Button>
      </Form.Item>
    </>
  }
   //const name =props.fullName.fullName;
  const [likes, setLikes] = useState(props.like);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  
  const postUser=useSelector((state )=>state.postsPage.postUser)
  //const posts=useSelector((state )=>state.postsPage.posts)
  //const name=postUser.fullName

  const like = () => {

    setLikes(props.like+1);
    setDislikes(0);
    setAction('liked');
  };

  const dislike = () => {
    setLikes(props.like-1);
    setDislikes(1);
    setAction('disliked');
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to">Ответить</span>,
  ];

  return (
    
    <Comment
      actions={actions}
      author={<a>{postUser?.fullName}</a>}
      avatar={
        <Avatar
          src={postUser?.photos.small}
          alt={postUser?.fullName}
        />
      }
      content={
        <p>
          {props.messen}
        </p>
      }
      datetime={
        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment().fromNow()}</span>
        </Tooltip>
      }
    />
  );
};

 /* let mapStateToProps = (state) =>{
    return{
      //posts:state.postsPage.posts
      postsPage:state.postsPage.postUser
    }
  }

//export default connect (mapStateToProps, null) (AppMyPostsComment)
/************************************** */