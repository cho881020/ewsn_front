import styled from "styled-components";

export const Backdrop = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div<{ $width?: string }>`
  position: fixed;
  top: 50%;
  left: 50%;
  background-color: #fff;
  z-index: 101;
  transform: translate(-50%, -50%);
  width: ${({ $width }) => ($width ? $width : "335px")};
  border-radius: 8px;
  box-shadow: 0px 4px 77px 0px rgba(0, 0, 0, 0.1);
  text-align: center;
  padding-top: 24px;
  overflow: hidden;
`;
