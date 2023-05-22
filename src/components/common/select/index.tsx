import React from 'react';

interface SelectProps {
  label: string;
  columnClasses?: string;
  value: string;
  onChange: (value: string) => void;
  id: string;
  children: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({
  label,
  columnClasses,
  value,
  onChange,
  id,
  children,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    onChange(selectedValue);
  };

  return (
    <div className={`field ${columnClasses}`}>
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <div className="control">
        <div className="select">
          <select id={id} value={value} onChange={handleChange}>
            {children}
          </select>
        </div>
      </div>
    </div>
  );
};