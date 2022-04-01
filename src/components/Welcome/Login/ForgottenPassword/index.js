import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { sendPasswordReset } from "helpers/auth";
import { TextField, Button } from '@mui/material';
import { Close } from '@mui/icons-material';

const useStyles = makeStyles(() => ({
  forgottenPassword: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
}));

const ForgottenPassword = ({ close }) => {
  const styles = useStyles();
  const [email, setEmail] = useState("");

  const resetPassword = () => {
    sendPasswordReset(email);
    close();
  };

  return (
    <div className={styles.forgottenPassword}>
      <Close
        style={{
          position: "absolute",
          zIndex: 1,
          top: "20px",
          right: "20px",
        }}
        onClick={close}
      />
      <div className={styles.title}>
        Reset Password
      </div>
      <TextField
        style={{ backgroundColor: "#f5f6f7" }}
        fullWidth
        type="email"
        placeholder="Email adress"
        variant="outlined"
        margin="dense"
        autoComplete="off"
        onChange={(e) => setEmail(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter')
            resetPassword();
        }}
      />
      <Button
        style={{
          marginTop: "20px",
          fontWeight: "bold",
          backgroundColor: "#efb0c9",
        }}
        fullWidth
        variant="contained"
        onClick={resetPassword}
      >
        Submit
      </Button>
    </div>
  );
}

export default ForgottenPassword;