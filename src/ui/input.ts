import styled, { css } from "styled-components";
import COLORS from "@/ui/colors";

const Input = styled.input<{
  $maxWidth?: string;
  padding?: string;
  red?: boolean;
  height?: string;
  center?: boolean;
  $noneBorder?: boolean;
}>`
  text-align: ${({ center }) => center && "center"};
  outline: none;
  width: 100%;
  max-width: ${({ $maxWidth }) => $maxWidth || "100%"};
  padding: ${({ padding }) => padding || "11px 12px"};
  height: ${({ height }) => height || "44px"};
  background: #fff;
  border: 1px solid ${({ red }) => (red ? COLORS.RED : COLORS.LINE03)};
  border-radius: 4px;
  color: ${COLORS.TEXT01};
  font-size: 16px;
  line-height: 22px;
  &::placeholder {
    color: ${COLORS.TEXT04};
  }
  ${({ $noneBorder }) =>
    $noneBorder &&
    css`
      border: none;
    `}
`;

export default Input;
