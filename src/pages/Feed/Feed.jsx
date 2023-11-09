import React, { useState } from 'react';
import Challengedefault from '../../components/ChallengeLayout/ChallengeDefault';
import ChallengeTimeLayout from '../../components/ChallengeLayout/ChallengeTimeLayout';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const ChallengeArea = css`
    position: relative;
    display: flex;
    justify-content: center;
    height: 800px;
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

function Feed(props) {
    const [ selectedComponent, setSelectedComponent ] = useState(<Challengedefault />);
    const handleComponentChange = (e) => {
        const value = e.target.value;
        console.log(value);
        if (value === 'Timelayout') {
            setSelectedComponent(<ChallengeTimeLayout />);
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
                        <option value="Default">Default</option>
                        <option value="Timelayout">Timelayout</option>
                    </select>
                </label>
            </div>
        </div>
    );
}

export default Feed;