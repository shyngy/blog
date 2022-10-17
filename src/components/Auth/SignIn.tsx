import React from 'react';
import { Link } from 'react-router-dom';
import LabelInput from '../LabelInput';
import styles from './Frame.module.css';
import { signIn } from '../../api/auth';
import { setUserData } from '../../store/userSlice';
import { FrameComponentProps } from './types';

const SignIn: React.FC<FrameComponentProps> = ({
  formData: {
    handleSubmit,
    setError,
    register,
    reset,
    formState: { errors },
  },
  dispatchUserData,
  navigate,
}) => {
  const onSubmit = handleSubmit((data) => {
    signIn({ email: data.email, password: data.password })
      .then((res) => {
        document.cookie = `token=${res.user.token}`;
        dispatchUserData(setUserData(res.user));
        navigate('/');
      })
      .catch(() => {
        const error = { message: 'email or password is invalid' };
        setError('email', error);
        setError('password', error);
      });
  });
  React.useEffect(() => () => reset(), [reset]);
  return (
    <>
      <LabelInput
        register={register('email', {
          required: 'Email is required',
        })}
        name="Email address"
        type="email"
        error={errors.email?.message}
      />
      <LabelInput
        register={register('password', {
          required: 'Password is required',
        })}
        name="Password"
        type="password"
        error={errors.password?.message}
      />
      <button onClick={onSubmit} className="button" type="submit">
        Sign in
      </button>
      <p className={styles.linkText}>
        Don’t have an account?
        <Link to="/sign-up"> Sign Up.</Link>
      </p>
    </>
  );
};

export default SignIn;
