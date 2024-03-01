import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '../styles/GlobalStyles';
import * as Dialog from '@radix-ui/react-dialog';
import DetailHeader from '../components/feature/postDetail/DetailHeader';
import GatherInfo from '../components/feature/postDetail/GatherInfo';
import Button from '../components/common/Button';
import styled from 'styled-components';
import ApplicationModal from '../components/feature/postDetail/ApplicationModal';
// import NoteModal from '../components/feature/postDetail/NoteModal';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import api from '../services/api';
import { useQuery } from 'react-query';
import { PostDetailType } from '../types/commonTypes';
import { isLoginOpenState } from '../store/atomDefinitions';
import { useRecoilState } from 'recoil';

const PostDetail = () => {
  const { postId } = useParams<{ postId: string }>();

  const { isLoading, data } = useQuery<PostDetailType>(['postDetail', postId], () => api.getPostDetail(postId!));

  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [, setIsLoginOpen] = useRecoilState(isLoginOpenState);
  // const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  const handleApplicationBtn = () => {
    if (!localStorage.getItem('isLogin') || localStorage.getItem('isLogin') === 'false') {
      setIsLoginOpen(true);
      return;
    }
    setIsApplicationModalOpen(true);
  };

  return (
    <Layout>
      {!isLoading && <DetailHeader post={data!} />}
      {!isLoading && <GatherInfo post={data!} />}

      {Number(localStorage.getItem('userId')) !== data?.user.userId && (
        <ButtonSet>
          <Dialog.Root open={isApplicationModalOpen} onOpenChange={setIsApplicationModalOpen}>
            <Button size="full" color="primary" onClick={handleApplicationBtn}>
              신청하기
            </Button>
            <Dialog.Portal>
              <ApplicationModal postId={postId!} setIsOpen={setIsApplicationModalOpen} />
            </Dialog.Portal>
          </Dialog.Root>
          {/* <Dialog.Root open={isNoteModalOpen} onOpenChange={setIsNoteModalOpen}>
          <Dialog.Trigger asChild>
            <Button size="half" color="black">
              문의하기
            </Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <NoteModal setIsOpen={setIsNoteModalOpen} />
          </Dialog.Portal>
        </Dialog.Root> */}
        </ButtonSet>
      )}
      <PostViewer>{!isLoading && <Viewer initialValue={data?.content} />}</PostViewer>
    </Layout>
  );
};

const ButtonSet = styled.div`
  display: flex;
  column-gap: 40px;
  padding: 30px 0;
`;

const PostViewer = styled.div`
  div {
    padding: 10px 0;
    min-height: 500px;
    font-size: 1.3rem;
    line-height: 1.7;
  }
`;

export default PostDetail;
