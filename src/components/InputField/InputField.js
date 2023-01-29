import React, { useState } from 'react';

const InputField = ({ label, name, type, placeholder, date, onSubmit, value }) => {

    const [dataValue, setDataValue] = useState('');

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (!value) return;
    //     onSubmit(value);
    //     setValue('');
    // }


    const handleChange = (event) => {
        setDataValue(event.target.value);


    };

    return (
        <div>
            <div className="form-control w-full max-w-xs">
                <label htmlFor={name} className="label">
                    <span className="label-text">{label}</span>
                </label>
                <input type={type}
                    name={name}
                    value={(date ? date : dataValue) || value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="input input-bordered input-sm w-full max-w-xs" />
            </div>
        </div>
    );
};

export default InputField;