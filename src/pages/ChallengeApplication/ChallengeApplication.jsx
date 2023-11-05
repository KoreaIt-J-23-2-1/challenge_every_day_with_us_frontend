import React, { useState } from 'react';
import Challengedefault from '../../components/ChallengeLayout/ChallengeDefault';
import ChallengeLayout1 from '../../components/ChallengeLayout/ChallengeLayout1';
import ChallengeLayout2 from '../../components/ChallengeLayout/ChallengeLayout2';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const ChallengeArea = css`
    position: relative;
    display: flex;
    justify-content: center;
    height: 700px;
    margin: 20px;
    border: 5px solid #dbdbdb;
    font-weight: 600;

    & label {
        position: absolute;
        margin: 10px;
        right: 0px;
    }

    & select {
        margin-left: 10px;
        width: 200px;
    }
`;

function ChallengeApplication(props) {
    const [ selectedComponent, setSelectedComponent ] = useState(<Challengedefault />);
    const handleComponentChange = (e) => {
        const value = e.target.value;
        console.log(value);
        if (value === 'component1') {
            setSelectedComponent(<ChallengeLayout1 />);
        } else if (value === 'component2') {
            setSelectedComponent(<ChallengeLayout2 />);
        } else {
            setSelectedComponent(<Challengedefault />);
        }
    }

    return (
        <div>
            <div css={ChallengeArea}>
                {selectedComponent}
                <label>
                    Select Layout
                    <select onChange={handleComponentChange}>
                        <option value="default">Challengedefault</option>
                        <option value="component1">Component1</option>
                        <option value="component2">Component2</option>
                    </select>
                </label>
            </div>
        </div>
    );
}

export default ChallengeApplication;