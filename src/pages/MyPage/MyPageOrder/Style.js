import { css } from '@emotion/react';

export const SLayout = css`
    width: 930px;
    *::-webkit-scrollbar {
        width: 2px;
    }
    *::-webkit-scrollbar-thumb {
        background-color: #dbdbdb
    }
`;

export const SOrderHeader = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0px 0px 150px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

export const SBaseLayout = css`
  overflow-y: auto;
  scroll-behavior: smooth;
  max-height: 600px;
  margin: 20px 30px;
  padding-right: 15px;

`;

export const SItemContainer = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  transform: scale(0.95);
  background-color: rgba(0, 0, 0, 0.02);
  cursor: pointer;

  &:hover {
    transform: scale(0.98);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

export const SItemHeader = css`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
`;

export const SItemDetail = css`
  font-size: 16px;
  margin-bottom: 8px;
  color: #555;
`;

export const SItemPrice = css`
  font-size: 20px;
  font-weight: bold;
  margin: 4px 0px 12px;
  color: #e44d26;
`;
