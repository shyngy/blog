import { UseFormReturn } from 'react-hook-form/dist/types/form';
import { NavigateFunction } from 'react-router-dom';

export interface FrameComponentProps {
  formData: UseFormReturn<FrameFieldValues>;
  dispatchUserData: (user: any) => void;
  navigate: NavigateFunction;
}

export type FrameFieldValues = {
  username: string;
  password: string;
  repeatPassword: string;
  email: string;
  agree: boolean;
  image: string;
};

export type FrameFieldItems = keyof FrameFieldValues;
