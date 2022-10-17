import React from 'react';
import { editProfile } from '../../api/auth';
import { selectUser, setUserData } from '../../store/userSlice';
import { FrameComponentProps, FrameFieldItems } from './types';
import LabelInput from '../LabelInput';
import { useAppSelector } from '../../store/hooks';

const Profile: React.FC<FrameComponentProps> = ({
  formData: {
    handleSubmit,
    setError,
    register,
    reset,
    setValue,
    formState: { errors },
  },
  dispatchUserData,
  navigate,
}) => {
  const userData = useAppSelector(selectUser);
  const onSubmit = handleSubmit((data) => {
    editProfile({
      email: data.email,
      password: data.password,
      image: data.image,
      username: data.username,
    })
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

  React.useEffect(() => {
    setValue('username', userData.username);
    setValue('email', userData.email);
  }, [userData.username, userData.email, setValue]);

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
        register={register('image', {
          pattern: {
            value:
              /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
            message: 'url is not available',
          },
        })}
        name="Image url"
        type="text"
        error={errors.image?.message}
      />
      <button onClick={onSubmit} className="button" type="submit">
        Save
      </button>
    </>
  );
};

export default Profile;
