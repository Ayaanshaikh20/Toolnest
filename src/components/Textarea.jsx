import React from 'react';

export const Textarea = ({ value, onChange, placeholder, rows = 6, readOnly = false, autoFocus = true, className = '', ...props }) => {
  return (
    <textarea
      className={`textarea ${className}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      readOnly={readOnly}
      autoFocus={autoFocus}
      {...props}
    />
  );
};
