import * as React from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";

const Quill = dynamic(() => import("@/utils/Quill"), { ssr: false }); // client 사이드에서만 동작되기 때문에 ssr false로 설정

interface Props {
  value: string;
  onChange: (e: string) => void;
}

const Editor = ({ value, onChange }: Props) => {
  return (
    <EditorContainer>
      <Quill value={value} onChange={(e: string) => onChange(e)} />
    </EditorContainer>
  );
};

export default Editor;

const EditorContainer = styled.div`
  width: 100%;
  margin: 0 auto 40px;
`;
