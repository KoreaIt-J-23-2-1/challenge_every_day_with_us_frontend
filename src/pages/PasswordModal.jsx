import React, { useState } from 'react';

function PasswordModal({ isOpen, onClose }) {
    const [password, setPassword] = useState('');

    const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    };

    const handleSubmit = () => {
    onClose();
    };

    return (
    isOpen && (
        <div>
        <div>
            <h2>비밀번호 입력</h2>
            <input type="password" placeholder="비밀번호" value={password} onChange={handlePasswordChange} />
            <button onClick={handleSubmit}>확인</button>
            <button onClick={onClose}>취소</button>
        </div>
        </div>
    )
    );
}

export default PasswordModal;