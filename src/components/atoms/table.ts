import COLORS from "@/ui/colors";
import styled from "styled-components";

const TABLE = styled.table`
  max-width: 100%;
  width: 1180px;
  background-color: #fff;
  table-layout: fixed;
`;

const THEAD = styled.thead`
  padding: 24px 0 13px;
  border-bottom: 1px solid ${COLORS.LINE03};
`;

const TBODY = styled.tbody`
  border-bottom: 1px solid ${COLORS.LINE03};
`;

const TH = styled.th<{ $left?: boolean }>`
  text-align: ${({ $left }) => $left && "left"};
  color: #8b8b8b;
  font-size: 12px;
  letter-spacing: 0;
  font-weight: 400;
  padding: 0 10px;
`;

const TD = styled.td<{ $large?: boolean; $small?: boolean; $gray?: boolean }>`
  height: 40px;
  padding: 0 10px;
  width: ${({ $large }) => ($large ? "100%" : "80px")};
  min-width: ${({ $large }) => !$large && "80px"};
  text-align: ${({ $large }) => ($large ? "left" : "center")};
  font-size: ${({ $large, $small }) =>
    $large ? "16px" : $small ? "12px" : "14px"};
  line-height: ${({ $large }) => ($large ? "22px" : "20px")};
  color: ${({ $gray }) => ($gray ? "#8b8b8b" : "#242424")};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const TR = styled.tr<{ $active?: boolean }>`
  max-width: 100%;
  width: 1180px;
  background-color: ${({ $active }) => $active && COLORS.BG};
`;

export { TABLE, TH, THEAD, TD, TR, TBODY };
