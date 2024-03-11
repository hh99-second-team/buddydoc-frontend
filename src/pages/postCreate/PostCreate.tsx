import React, { useState } from 'react';
import { PostCreateType } from '../../types';
import api from '../../api';
import PostModifyCreateForm from './PostModifyCreateForm';
import { useQueryClient } from 'react-query';

const PostCreate = () => {
  const queryClient = useQueryClient();
  const [inputVal, setInputVal] = useState<PostCreateType>({
    postType: '스터디',
    postTitle: '',
    position: [],
    skillList: [],
    content: '',
    deadLine: new Date(),
    startDate: new Date(),
    period: '',
    memberCount: '',
  });

  const handleSubmit = async () => {
    await api.createPost(inputVal);
    queryClient.invalidateQueries();
  };

  return <PostModifyCreateForm inputVal={inputVal} setInputVal={setInputVal} handleSubmit={handleSubmit} />;
};

export default PostCreate;
