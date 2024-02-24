import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '../styles/GlobalStyles';
import * as Dialog from '@radix-ui/react-dialog';
import DetailHeader from '../components/feature/postDetail/DetailHeader';
import GatherInfo from '../components/feature/postDetail/GatherInfo';
import Button from '../components/common/Button';
import styled from 'styled-components';
import ApplicationModal from '../components/feature/postDetail/ApplicationModal';
import NoteModal from '../components/feature/postDetail/NoteModal';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import api from '../services/api';
import { useQuery } from 'react-query';
import { PostDetailData } from '../types/commonTypes';

const PostDetail = () => {
  const params = useParams();

  const { isLoading, data } = useQuery<PostDetailData>('postDetail', () => api.getPostDetail(params.id!), {
    enabled: true, // true일 경우에만 최초 렌더링 시에 데이터를 불러옵니다.
  });
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  if (!isLoading) console.log(data);

  return (
    <Layout>
      {!isLoading && <DetailHeader post={data!} />}
      {!isLoading && <GatherInfo post={data!} />}
      <ButtonSet>
        <Dialog.Root open={isApplicationModalOpen} onOpenChange={setIsApplicationModalOpen}>
          <Dialog.Trigger asChild>
            <Button size="half" color="primary">
              신청하기
            </Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <ApplicationModal setIsOpen={setIsApplicationModalOpen} />
          </Dialog.Portal>
        </Dialog.Root>
        <Dialog.Root open={isNoteModalOpen} onOpenChange={setIsNoteModalOpen}>
          <Dialog.Trigger asChild>
            <Button size="half" color="black">
              문의하기
            </Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <NoteModal setIsOpen={setIsNoteModalOpen} />
          </Dialog.Portal>
        </Dialog.Root>
      </ButtonSet>
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
