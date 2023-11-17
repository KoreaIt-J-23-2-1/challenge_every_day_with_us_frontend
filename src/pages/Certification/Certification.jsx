import React, { useState } from 'react';
import Challengedefault from '../../components/ChallengeLayout/ChallengeDefault';
import ChallengeTimeLayout from '../../components/ChallengeLayout/ChallengeTimeLayout';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as S from './Style';

function Certification(props) {
    const [ selectedComponent, setSelectedComponent ] = useState(<Challengedefault />);
    const handleComponentChange = (e) => {
        const value = e.target.value;
        if (value === 'Timelayout') {
            setSelectedComponent(<ChallengeTimeLayout />);
        } else {
            setSelectedComponent(<Challengedefault />);
        }
    }

    return (
        <div>
            <div css={S.ChallengeArea}>
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

export default Certification;
