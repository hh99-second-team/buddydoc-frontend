import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '../../styles/GlobalStyles';
import * as Dialog from '@radix-ui/react-dialog';
import DetailHeader from './components/DetailHeader';
import GatherInfo from './components/GatherInfo';
import Button from '../../components/Button';
import styled from 'styled-components';
import ApplicationModal from './components/ApplicationModal';
// import NoteModal from '../components/feature/postDetail/NoteModal';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import api from '../../api';
import { useQuery } from 'react-query';
import { PostDetailType } from '../../types';
import { isLoginOpenState } from '../../store/atomDefinitions';
import { useRecoilState } from 'recoil';
import { getDayDiff } from '../../utils';

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

      {getDayDiff(data?.deadLine!) <= 0 && Number(localStorage.getItem('userId')) !== data?.user.userId && (
        <ButtonSet>
          <Dialog.Root open={isApplicationModalOpen} onOpenChange={setIsApplicationModalOpen}>
            <Button size="full" color="primary" onClick={handleApplicationBtn}>
              신청하기
            </Button>
            <Dialog.Portal>
              <ApplicationModal postId={postId!} setIsOpen={setIsApplicationModalOpen} positionList={data?.position!} />
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
    font-size: 1.3rem;
    line-height: 1.7;
  }
`;

export default PostDetail;
