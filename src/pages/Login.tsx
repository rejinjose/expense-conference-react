import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";
import { auth } from "../firebase";

import {
  FormBox,
  FormContainer,
  Input,
  StyledForm,
  SubmitButton,
  Title,
  ToggleButton,
  ToggleText
} from './Login.styles';



const AuthForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const functions = getFunctions();
  const addRole = httpsCallable(functions, "addRole");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAuth = async (email: string, password: string) => {
  if (isLogin) {
    await signInWithEmailAndPassword(auth, email, password);
  } else {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // Custom Claims (Roles) to work immediately
    await user.getIdToken(true);
    const tokenResult = await user.getIdTokenResult();
    console.log("Role after signup:", tokenResult.claims.role);
  }
};

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await handleAuth(formData.email, formData.password);
      console.log("Authentication successful");  
      navigate("/");
    } catch (error) {
      console.error("Auth error:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer data-name="loginSignupForm">
      <FormBox>
        <Title>{isLogin ? 'Login' : 'Sign Up'}</Title>
        <StyledForm onSubmit={handleSubmit}>
          <Input 
            name="email"
            type="email" 
            placeholder="Email" 
            value={formData.email}
            onChange={handleChange}
            required 
          />
          <Input 
            name="password"
            type="password" 
            placeholder="Password" 
            value={formData.password}
            onChange={handleChange}
            required 
          />
          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Processing...' : (isLogin ? 'Sign In' : 'Register')}
          </SubmitButton>
        </StyledForm>
        
        <ToggleText>
          {isLogin ? (
            <>
              Not a registered user? 
              <ToggleButton onClick={() => setIsLogin(false)} disabled={isSubmitting}>signup</ToggleButton>
            </>
          ) : (
            <>
              Already have an account? 
              <ToggleButton onClick={() => setIsLogin(true)} disabled={isSubmitting}>login</ToggleButton>
            </>
          )}
        </ToggleText>
      </FormBox>
    </FormContainer>
  );
};

export default AuthForm;
