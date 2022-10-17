import React from 'react';
import { Link } from 'react-router-dom';

import LabelInput from '../LabelInput';
import styles from './Frame.module.css';
import { signUp } from '../../api/auth';
import { setUserData } from '../../store/userSlice';
import { FrameComponentProps, FrameFieldItems } from './types';

const SignUp: React.FC<FrameComponentProps> = ({
  formData: {
    handleSubmit,
    setError,
    register,
    watch,
    formState: { errors },
    reset,
  },

  dispatchUserData,
  navigate,
}) => {
  const onSubmit = handleSubmit((data) => {
    signUp({ username: data.username, email: data.email, password: data.password })
      .then((res) => {
        document.cookie = `token=${res.user.token}`;
        dispatchUserData(setUserData(res.user));
        navigate('/');
      })
      .catch((res) => {
        Object.keys(res.errors).forEach((name) => {
          setError(name as FrameFieldItems, { message: res.errors[name] });
        });
      });
  });
  React.useEffect(() => () => reset(), [reset]);
  return (
    <>
      <LabelInput
        register={register('username', {
          required: 'Username is required',
          minLength: { value: 3, message: 'Your username needs to be at least 3 characters.' },
          maxLength: {
            value: 20,
            message: 'Your username needs to be at not more 20 characters. ',
          },
        })}
        name="Username"
        type="text"
        error={errors.username?.message}
      />
      <LabelInput
        register={register('email', {
          required: 'Email is required',
          minLength: { value: 3, message: 'Your email needs to be at least 3 characters.' },
          maxLength: { value: 20, message: 'Your email needs to be at not more 20 characters. ' },
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'invalid email address',
          },
        })}
        name="Email address"
        type="email"
        error={errors.email?.message}
      />
      <LabelInput
        register={register('password', {
          required: 'Password is required',
          minLength: { value: 3, message: 'Your password needs to be at least 3 characters.' },
          maxLength: {
            value: 40,
            message: 'Your password needs to be at not more 20 characters. ',
          },
        })}
        name="Password"
        type="password"
        error={errors.password?.message}
      />
      <LabelInput
        register={register('repeatPassword', {
          required: 'Repeat password is required',
          validate: (val: string) => {
            if (watch('password') !== val) {
              return 'Your passwords do no match';
            }
          },
        })}
        name="Repeat Password"
        type="password"
        placeholder="Password"
        error={errors.repeatPassword?.message}
      />
      <label className={styles.checkboxLabel} htmlFor="agree">
        <input
          className={errors.agree?.type && styles.errorCheckbox}
          {...register('agree', {
            required: true,
          })}
          id="agree"
          type="checkbox"
        />
        <span style={{ color: errors.agree?.type && 'red' }}>
          I agree to the processing of my personal information
        </span>
      </label>
      <button onClick={onSubmit} className="button" type="submit">
        Sign up
      </button>
      <p className={styles.linkText}>
        Already have an account?
        <Link to="/sign-in"> Sign In.</Link>
      </p>
    </>
  );
};

export default SignUp;
