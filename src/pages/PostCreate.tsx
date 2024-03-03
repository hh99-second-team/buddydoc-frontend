import React, { useState } from 'react';
import { PostCreateType } from '../types';
import api from '../services/api';
import PostModifyCreateForm from '../components/common/PostModifyCreateForm';

const PostCreate = () => {
  const [inputVal, setInputVal] = useState<PostCreateType>({
    postType: '스터디',
    postTitle: '',
    position: [],
    skillList: [],
    content: '',
    deadLine: new Date(),
    startDate: new Date(),
    period: '',
    memberCount: 0,
  });

  const handleSubmit = async () => {
    await api.createPost(inputVal);
  };

  return <PostModifyCreateForm inputVal={inputVal} setInputVal={setInputVal} handleSubmit={handleSubmit} />;
};

export default PostCreate;
