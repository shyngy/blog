import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styles from './Frame.module.css';
import { useAppDispatch } from '../../store/hooks';
import { setUserData } from '../../store/userSlice';
import { FrameComponentProps, FrameFieldValues } from './types';

interface FrameProps {
  title: string;
  Component: React.FC<FrameComponentProps>;
}

const Frame: React.FC<FrameProps> = ({ title, Component }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const dispatchUserData = (user: any) => {
    dispatch(setUserData(user));
  };
  const formData = useForm<FrameFieldValues>({
    mode: 'onSubmit',
  });

  return (
    <form className={styles.form}>
      <h2>{title}</h2>
      <Component navigate={navigate} formData={formData} dispatchUserData={dispatchUserData} />
    </form>
  );
};

export default Frame;
