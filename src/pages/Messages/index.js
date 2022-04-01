import React, { useEffect } from 'react';
import { makeStyles } from "@mui/styles";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from 'services';

const useStyles = makeStyles(() => ({
  background: {
    height: "100vh",
    backgroundColor: "white",
    color: "black",
    display: "flex",
  },
}));

const Messages = () => {
  const styles = useStyles();
  // eslint-disable-next-line
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading)
      return;
    if (!user)
      return navigate("/");
    // eslint-disable-next-line
  }, [user, loading]);

  return (
    <div className={styles.background}>
      This is Messages
    </div>
  );
}

export default Messages;