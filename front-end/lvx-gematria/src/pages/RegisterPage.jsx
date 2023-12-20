import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import SignUp from "../components/SignUp";
import LogIn from "../components/LogIn";

import Button from "react-bootstrap/esm/Button";

export const RegisterPage = () => {
  const { user, setUser } = useOutletContext();
  const [existingUser, setExistingUser] = useState(true);
  const [signupSuccessful, setSignupSuccessful] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleSignupSuccess = () => {
    setSignupSuccessful(true);
    setExistingUser(true);
  }
    return (
      <>
        <h1 style={{color: "white"}}>Register Page</h1>
        {existingUser && !signupSuccessful ? (
          <>
            <SignUp setUser={setUser} onSignupSuccess={handleSignupSuccess} />
            <Button
              variant="warning"
              onClick={() => setExistingUser(!existingUser)}
            >
              Already have an account
            </Button>
          </>
        ) : (
          <>
            <LogIn setUser={setUser} />
            <Button
              variant="warning"
              onClick={() => setExistingUser(!existingUser)}
            >
              Don't have an account
            </Button>
          </>
        )}
      </>
    );
  };
