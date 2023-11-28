import styled from "styled-components";

import COLORS from "@/ui/colors";

export const Item = styled.div<{ padding?: string; bg?: string }>`
  padding: ${({ padding }) => (padding ? padding : "20px 12px")};
  border-bottom: 1px solid ${COLORS.LINE03};
  background-color: ${({ bg }) => (bg ? bg : "#fff")};
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  img {
    cursor: pointer;
  }
`;

export const Color = styled.div<{ $color: string }>`
  min-width: 4px;
  height: 20px;
  background-color: ${({ $color }) => $color};
`;
