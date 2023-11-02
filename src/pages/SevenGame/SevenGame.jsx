import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const Layout = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 200px;
  background-image: url("777.avif");
  background-size: cover;
  height: 872px;

  & button {
    margin-left: 160px;
    margin-top: 20px;
    width: 100px;
    height: 40px;
    border: 2px solid yellow;
    background-color: transparent;
    color: white;
    font-weight: 900;
    cursor: pointer;
  }
`;

const NumberBox = css`
    display: flex;
    justify-content: flex-start;

    & div {
      display: flex;
      font-size: 100px;
      border: 5px solid yellow;
      background-color: #ffff;
      height: 130px;
      width: 130px;
      color: red;
    }

    & p {
      margin: 0px 30px;
    }
`;

function SevenGame() {
  const [numbers, setNumbers] = useState([]);

  const generateNumbers = () => {
    const newNumbers = [];
    while (newNumbers.length < 3) {
      const randomNumber = Math.floor(Math.random() * 5) + 1;
      newNumbers.push(randomNumber);
    }
    setNumbers(newNumbers);
  };

  return (
    <div css={Layout}>
      <div css={NumberBox}>
        <div>
          <p>{numbers[0]}</p>
        </div>
        <div>
          <p>{numbers[1]}</p>
        </div>
        <div>
          <p>{numbers[2]}</p>
        </div>
      </div>
      <button onClick={generateNumbers}>
        SPIN
      </button>
    </div>
  );
}

export default SevenGame;
