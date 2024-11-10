import React, { ChangeEvent, forwardRef } from 'react';
import styles from "./TextInput.module.css";
import { ClearIcon } from '../Icons/Icons';

interface TextInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    maxLength?: number;
    defaultValue?: string;
    disabled?: boolean;
    error?: string;
    className?: string;
    name?: string;
    type?: 'text' | 'password' | 'email' | 'number';
    onFocus?: () => void;
    onBlur?: () => void;
    autoComplete?: string;
    required?: boolean;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({
    value,
    onChange,
    placeholder,
    maxLength,
    defaultValue,
    disabled = false,
    error,
    className,
    name,
    type = 'text',
    onFocus,
    onBlur,
    autoComplete,
    required = false
}, ref) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (maxLength && newValue.length > maxLength) return;
        onChange(newValue);
    };

    const handleClear = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onChange('');
    };

    return (
        <div className={`${styles.inputContainer} ${className || ''}`}>
            <input
                ref={ref}
                type={type}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                disabled={disabled}
                className={`${styles.input} ${error ? styles.error : ''}`}
                name={name}
                onFocus={onFocus}
                onBlur={onBlur}
                autoComplete={autoComplete}
                required={required}
                defaultValue={defaultValue}
                style={{
                    paddingRight: value ? '32px' : '8px'
                }}
            />
            {value && !disabled && (
                <button
                    type="button"
                    className={styles.clearButton}
                    onClick={handleClear}
                    aria-label="Clear input"
                    tabIndex={-1}
                >
                    <ClearIcon />
                </button>
            )}
            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
    );
});

TextInput.displayName = 'TextInput';
