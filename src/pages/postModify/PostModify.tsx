import React, { useState } from 'react';
import { PostCreateType } from '../../types';
import { useLocation, useParams } from 'react-router-dom';
import PostModifyCreateForm from '../postCreate/PostModifyCreateForm';
import api from '../../api';
import { useMutation, useQueryClient } from 'react-query';

const PostModify = () => {
  const { postId } = useParams();
  const location = useLocation();
  const queryClient = useQueryClient();

  const [inputVal, setInputVal] = useState<PostCreateType>(location.state.post);

  // useMutation을 이용하여 수정 작업을 수행합니다.
  const mutation = useMutation(async (postData: PostCreateType) => await api.updatePost(postId!, postData), {
    onSuccess: () => {
      queryClient.setQueryData(['postDetail', postId], inputVal);
    },
  });

  const handleSubmit = async () => {
    await mutation.mutateAsync(inputVal);
  };

  return <PostModifyCreateForm inputVal={inputVal} setInputVal={setInputVal} handleSubmit={handleSubmit} />;
};

export default PostModify;
