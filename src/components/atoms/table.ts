import COLORS from "@/ui/colors";
import styled from "styled-components";

const TABLE = styled.table`
  width: 100%;
  max-width: 1180px;
  background-color: #fff;
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
`;

const TD = styled.td<{ $large?: boolean; $small?: boolean; $gray?: boolean }>`
  height: 40px;
  box-sizing: content-box;
  padding: 0 10px;
  width: ${({ $large }) => ($large ? "100%" : "80px")};
  min-width: ${({ $large }) => !$large && "80px"};
  text-align: ${({ $large }) => ($large ? "left" : "center")};
  font-size: ${({ $large, $small }) =>
    $large ? "16px" : $small ? "12px" : "14px"};
  line-height: ${({ $large }) => ($large ? "22px" : "20px")};
  color: ${({ $gray }) => ($gray ? "#8b8b8b" : "#242424")};
  letter-spacing: -0.6px;
`;

const TR = styled.tr``;

export { TABLE, TH, THEAD, TD, TR, TBODY };
