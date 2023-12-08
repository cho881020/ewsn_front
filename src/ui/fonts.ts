import styled, { css } from "styled-components";

export const Title = styled.h1<{ level?: string; color?: string }>`
  font-size: 40px;
  font-weight: 700;
  line-height: 52px;
  letter-spacing: -0.6px;
  color: ${({ color }) => (color ? color : "#0d0d0d")};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${({ level }) =>
    level === "dis4" &&
    css`
      font-size: 36px;
      line-height: 48px;
    `}
  ${({ level }) =>
    level === "dis3" &&
    css`
      font-size: 32px;
      line-height: 42px;
    `}
  ${({ level }) =>
    level === "dis2" &&
    css`
      font-size: 28px;
      line-height: 38px;
      letter-spacing: -1px;
    `}
  ${({ level }) =>
    level === "dis1" &&
    css`
      font-size: 24px;
      line-height: 32px;
      letter-spacing: -1px;
    `}
  ${({ level }) =>
    level === "head1" &&
    css`
      font-size: 20px;
      line-height: 28px;
      letter-spacing: -1px;
    `}
  ${({ level }) =>
    level === "sub3" &&
    css`
      font-size: 16px;
      line-height: 22px;
    `}
  ${({ level }) =>
    level === "sub2" &&
    css`
      font-size: 14px;
      line-height: 20px;
    `}
  ${({ level }) =>
    level === "sub1" &&
    css`
      font-size: 12px;
      line-height: 18px;
      letter-spacing: 0;
    `}
`;

export const Content = styled.p<{
  level?: string;
  color?: string;
  opacity?: string;
}>`
  font-size: 16px;
  line-height: 22px;
  font-weight: 400;
  letter-spacing: -0.6px;
  opacity: ${({ opacity }) => (opacity ? opacity : "1")};
  color: ${({ color }) => (color ? color : "#000")};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${({ level }) =>
    level === "body2l" &&
    css`
      font-size: 16px;
      line-height: 28px;
    `}
  ${({ level }) =>
    level === "body1" &&
    css`
      font-size: 14px;
      line-height: 20px;
    `}
  ${({ level }) =>
    level === "body1l" &&
    css`
      font-size: 14px;
      line-height: 24px;
    `}
  ${({ level }) =>
    level === "cap2" &&
    css`
      font-size: 12px;
      line-height: 18px;
      letter-spacing: 0;
    `}
  ${({ level }) =>
    level === "cap2l" &&
    css`
      font-size: 12px;
      line-height: 20px;
      letter-spacing: 0;
    `}
  ${({ level }) =>
    level === "cap1" &&
    css`
      font-size: 11px;
      line-height: 17px;
      letter-spacing: 0;
    `}
  ${({ level }) =>
    level === "cap1b" &&
    css`
      font-size: 11px;
      line-height: 17px;
      letter-spacing: 0;
      font-weight: 700;
    `}
`;
