import styled from "styled-components";
import COLORS from "@/ui/colors";

const Textarea = styled.textarea<{
  maxWidth?: string;
  padding?: string;
  height?: string;
}>`
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth || "100%"};
  height: ${({ height }) => height || "100%"};
  padding: ${({ padding }) => padding || "12px"};
  background: #fff;
  border: 1px solid ${COLORS.LINE03};
  border-radius: 4px;
  color: ${COLORS.TEXT01};
  font-size: 16px;
  line-height: 28px;
  letter-spacing: -0.6px;
  resize: none;
  outline: none;
  white-space: pre-wrap;

  &::placeholder {
    color: ${COLORS.TEXT04};
  }
`;

export default Textarea;
