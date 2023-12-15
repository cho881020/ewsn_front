import { NextPage } from "next";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";

interface IEditor {
  value: string;
}

const ReadQuill: NextPage<IEditor> = ({ value }) => {
  return <CustomReactQuill theme="snow" value={value} readOnly />;
};

export default ReadQuill;

const CustomReactQuill = styled(ReactQuill)`
  .ql-toolbar {
    display: none;
  }
  .ql-snow {
    border: none !important;
  }
`;
