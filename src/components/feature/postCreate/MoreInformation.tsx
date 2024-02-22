import React, { useRef } from 'react';
import styled from 'styled-components';
import Input from '../../common/Input';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

interface inputInterface {
  type: string;
  deadlineDate: Date;
  startDate: Date;
  period: string;
  tableOfOrganization: string;
  positons: string[];
  selectedSkills: string[];
  title: string;
  content: string;
}

interface Props {
  inputVal: inputInterface;
  setInputVal: any;
}

const MoreInformation = ({ inputVal, setInputVal }: Props) => {
  const editorRef = useRef<Editor>(null);

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => setInputVal({ ...inputVal, title: e.target.value });

  const onChangeGetHTML = () => {
    // 에디터에 입력된 내용을 HTML 태그 형태로 취득
    const content = editorRef.current?.getInstance().getHTML();
    // Body에 담기
    setInputVal({ ...inputVal, content });
  };

  return (
    <div>
      <Title>상세 정보 입력</Title>
      <Container>
        <Input
          type="text"
          placeholder="모집 글 제목을 입력해주세요."
          value={inputVal.title}
          onChange={onChangeTitle}
          isValid="none"
        />
        <Editor
          toolbarItems={[
            // 툴바 옵션 설정
            ['heading', 'bold', 'italic', 'strike'],
            ['hr', 'quote'],
            ['ul', 'ol', 'task', 'indent', 'outdent'],
            ['table', 'image', 'link'],
            ['code', 'codeblock'],
          ]}
          height="500px" // 에디터 창 높이
          initialEditType="markdown" // 기본 에디터 타입 (or wysiwyg)
          previewStyle="vertical" // 미리보기 스타일 (or tab) (verttical은 양쪽이 나뉨)
          ref={editorRef} // ref 참조
          onChange={onChangeGetHTML} // onChange 이벤트
        ></Editor>
      </Container>
    </div>
  );
};

const Title = styled.p`
  font-size: 34px;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  row-gap: 40px;
  padding: 40px 0;
`;

export default MoreInformation;
