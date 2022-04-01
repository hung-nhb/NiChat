import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { registerWithEmailAndPassword, } from 'helpers/auth';
import {
  TextField, FormControl,
  OutlinedInput, InputAdornment,
  IconButton, Button
} from '@mui/material';
import { Close, Visibility, VisibilityOff } from '@mui/icons-material';
import { toast } from 'react-toastify';

const useStyles = makeStyles(() => ({
  register: {
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

const Register = ({ close }) => {
  const styles = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const register = () => {
    if (!name)
      toast.error("Please enter name!");
    else
      registerWithEmailAndPassword(name, email, password);
  }

  return (
    <div className={styles.register}>
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
        Register
      </div>
      <TextField
        style={{ backgroundColor: "#f5f6f7" }}
        fullWidth
        placeholder="Full Name"
        variant="outlined"
        margin="dense"
        autoComplete='off'
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        style={{ backgroundColor: "#f5f6f7" }}
        fullWidth
        type="email"
        placeholder="Email address"
        variant="outlined"
        margin="dense"
        autoComplete='off'
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormControl fullWidth variant="outlined" margin="dense">
        <OutlinedInput
          style={{ backgroundColor: "#f5f6f7" }}
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter')
              register();
          }}
          placeholder="Password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <Button
        style={{
          marginTop: "20px",
          fontWeight: "bold",
          backgroundColor: "#efb0c9",
        }}
        fullWidth
        variant="contained"
        onClick={register}
      >
        register
      </Button>
    </div>
  );
}

export default Register;