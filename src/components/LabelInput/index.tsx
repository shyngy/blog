import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './LabelInput.module.css';
import { FrameFieldItems } from '../Auth/types';
import type { ArticleData } from '../Article';

interface LabelInputProps {
  register: UseFormRegisterReturn<FrameFieldItems | keyof ArticleData>;
  name: string;
  type?: string;
  placeholder?: string;
  error?: string;
  isTextarea?: boolean;
}

const LabelInput: React.FC<LabelInputProps> = ({
  isTextarea,
  error,
  register,
  name,
  type = 'text',
  placeholder,
}) => (
  <label className={styles.inputLabel} htmlFor={name}>
    <span className={styles.labelName}>{name}</span>
    {isTextarea ? (
      <textarea
        {...register}
        placeholder={placeholder || name}
        className={error && styles.errorInput}
        id={name.split(' ').join('-')}
      />
    ) : (
      <input
        {...register}
        placeholder={placeholder || name}
        className={error && styles.errorInput}
        id={name.split(' ').join('-')}
        type={type}
      />
    )}

    <span className={styles.labelError}>{error}</span>
  </label>
);

export default LabelInput;
