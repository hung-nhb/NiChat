import React, { useEffect } from 'react';
import { makeStyles } from "@mui/styles";
import { auth } from 'services';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from "react-router-dom";
import Title from 'components/Welcome/Title';
import Login from 'components/Welcome/Login';

const useStyles = makeStyles(() => ({
  background: {
    height: "100vh",
    backgroundColor: "#efb0c9",
    paddingTop: "100px",
    paddingBottom: "100px",
  },
  content: {
    margin: "0 auto",
    width: "980px",
    height: "450px",
    display: "flex",
    flexDirection: "row",

  }
}));

const Welcome = () => {
  const styles = useStyles();
  // eslint-disable-next-line
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading)
      return;
    if (user)
      navigate("/messages");
    // eslint-disable-next-line
  }, [user, loading]);

  return (
    <div className={styles.background}>
      <div className={styles.content}>
        <Title />
        <Login />
      </div>
    </div >
  );
};

export default Welcome;