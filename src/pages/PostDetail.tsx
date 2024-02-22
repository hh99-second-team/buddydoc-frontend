import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
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

const PostDetail = () => {
  const location = useLocation().state;
  const post = location.post;
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const testHtml =
    '<p>안녕하세요. AXYZ는 문자가 가지는 뜻 그대로 사용자 자신이 중심이 되는 시스템과 하나의 선이라는 연속성에 기반하여 기존과 다른 획기적인 일정관리 시스템을 만들기 위하여 모인 팀입니다. 저희가 제작하고자 하는 앱은 시스템과 UI 모두 기존에 존재하지 않았던 새로운 작동방식을 가진 새로운 시스템에 가깝습니다.</p><p><br></p><p>2024년 1분기에 모집한 프로젝트에서도 굉장히 많은 분들께서 지원해주셨고 그 때 함께하지 못한 분들 또한 지원해주셔도 무방합니다! 이미 개발 중인 프로젝트인 만큼 저희 팀과 함께하실 열정 넘치시는 분들은 많은 관심 부탁드립니다 감사합니다 :)</p><p><br></p><p>[1분기 모집 공고]</p><p><br></p><p>[https://holaworld.io/study/655d65aec003f400134c6b1a](링크 1)</p><p><br></p><p>[https://holaworld.io/study/6534d651c003f4001342bea0](링크 2)</p><p><br></p><p>⏱️** 우대역량**</p><p>-1회 이상의 개발 프로젝트 경험이 있으신 분</p><p>-예상 활동 기간(약 4개월) 동안 프로젝트에 몰입하여 참여 가능하신 분</p><p><br></p><p>⏱️ 업무 형태</p><p>-프로젝트 기간 : 3월 초 ~ 6월 말 예정</p><p>-유연하고 자유롭게 근무하며, 주 1회 회의를 통해 진행상황 팔로업 (기본적으로 비대면)</p><p><br></p><p>⏱️ 지원 절차</p><p>-지원서 제출 마감 기한 : 2024/03/03</p><p>-지원서 (구글 폼 참조)</p><p>-추가 문의사항 : 1jhjeon@gmail.com</p><p><br></p><p>현재 팀 구성 현황</p><p>운영 및 PM 2명</p><p>프론트엔드 3명</p><p>백엔드 5명</p><p>디자인 3명</p>';

  return (
    <Layout>
      <DetailHeader post={post} />
      <GatherInfo post={post} />
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
      <PostViewer>
        <Viewer initialValue={testHtml} />
      </PostViewer>
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
