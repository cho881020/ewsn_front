import styled from "styled-components";
import COLORS from "@/ui/colors";

interface Style {
  height?: string;
  width?: string;
  $small?: boolean;
  $middle?: boolean;
  $active?: boolean;
}

export const Btn = styled.button<Style>`
  min-width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "56px"};
  font-size: ${({ $small, $middle }) =>
    $small ? "12px" : $middle ? "14px" : "16px"};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${COLORS.PRIMARY};
  border: 1px solid ${COLORS.PRIMARY};
  border-radius: 4px;
  color: #fff;
  font-weight: 700;
  line-height: 140%;
  text-align: center;
`;

export const BtnActive = styled(Btn)`
  background-color: ${({ $active }) => !$active && "rgba(24,24,24,40%)"};
  border: ${({ $active }) => !$active && "1px solid rgba(24,24,24, 0.1)"};
`;

export const BtnWhite = styled(Btn)`
  background-color: #fff;
  color: ${COLORS.TEXT01};
`;

export const BtnGray = styled(Btn)`
  border: 1px solid ${COLORS.SECONDARY};
  background-color: ${COLORS.SECONDARY};
  color: ${COLORS.TEXT02};
`;
