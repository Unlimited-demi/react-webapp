import React, { useState } from 'react';
import axios from 'axios';

function ResetPassword({ match }) {
  const [newPassword, setNewPassword] = useState('');

  const resetPassword = () => {
    axios
      .post(`http://127.0.0.1:5000/reset-password/${match.params.resetToken}`, {
        new_password: newPassword,
      })
      .then((response) => {
        console.log(response);
        alert('Password reset successfully.');
        // Redirect to login or home page
      })
      .catch((error) => {
        console.error(error);
        alert('Error resetting password.');
      });
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <label>New Password:</label>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={resetPassword}>Reset Password</button>
    </div>
  );
}

export default ResetPassword;
