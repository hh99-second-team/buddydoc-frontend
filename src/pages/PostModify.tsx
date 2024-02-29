import React, { useState } from 'react';
import { PostCreateType } from '../types/commonTypes';
import { useLocation, useParams } from 'react-router-dom';
import PostModifyCreateForm from '../components/common/PostModifyCreateForm';
import api from '../services/api';

const PostModify = () => {
  const params = useParams();
  const location = useLocation();

  const [inputVal, setInputVal] = useState<PostCreateType>(location.state.post);

  const handleSubmit = async () => await api.updatePost(params.postId!, inputVal);

  return <PostModifyCreateForm inputVal={inputVal} setInputVal={setInputVal} handleSubmit={handleSubmit} />;
};

export default PostModify;
