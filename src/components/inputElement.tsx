import React from 'react';
import classnames from 'classnames';
import styles from '../styles/commonComponent.module.scss';
type Props = {
  value: number | string;
  onchange: (value: string) => void;
  prefix?: React.ReactNode;
  fontSize: number;
  alignLeft?: boolean;
  placeholder?: string;
  disabled?: boolean | undefined;
}
const TextInput: React.FC<Props> = ({
  value,
  onchange,
  prefix,
  fontSize,
  alignLeft,
  placeholder,
  disabled
}) => {
  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    onchange(value)
  }
  return (
    <label>
    <span className={styles.inputContainer}>
      <input 
        className={classnames(styles.inputHtml, {[styles.affix]: !!prefix})} 
        type="text" 
        value={value || ''} 
        placeholder={placeholder}
        disabled={!!disabled}
        style={{
          fontSize: `${(fontSize/37.5).toFixed(8)}rem`,
          textAlign: !!alignLeft ? "left" : undefined
        }}
        onChange={onChangeHandler}
      />
      <span className={styles.prefixEle}>{prefix}</span>
    </span>
    </label>
  )
}

export default TextInput;