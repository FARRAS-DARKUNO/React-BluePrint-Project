import React, { useState } from 'react';
import { ButtonProps } from './types'; // Import dari file lokal types.ts


const Button: React.FC<ButtonProps> = ({
    isPassword = false,
    type,
    maxLength = 100, // Default maxLength 100 untuk tipe string atau password
    minLength = 0,   // Default minLength 0 untuk tipe string atau password
    min = 0,         // Default nilai minimum 0 untuk tipe number atau decimal
    max = 100        // Default nilai maksimum 100 untuk tipe number atau decimal
}) => {
    const [inputValue, setInputValue] = useState('');

    // Menentukan input type berdasarkan props
    const inputType = isPassword ? 'password' : type === 'datetime' ? 'datetime-local' : type;

    return (
        <div className="flex flex-col items-start">
            <label htmlFor="inputField" className="mb-2 text-sm font-medium text-gray-700">
                {isPassword ? 'Password' : `Input ${type}`}
            </label>
            <input
                id="inputField"
                type={inputType}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={isPassword ? 'Enter your password' : `Enter a ${type}`}
                // Batas karakter untuk string atau password
                maxLength={isPassword || type === 'string' ? maxLength : undefined}
                minLength={isPassword || type === 'string' ? minLength : undefined}
                // Batas nilai untuk number atau decimal
                min={type === 'number' || type === 'decimal' ? min : undefined}
                max={type === 'number' || type === 'decimal' ? max : undefined}
            />
            {/* Tampilkan error jika panjang input melebihi batas */}
            {maxLength && inputValue.length > maxLength && (
                <p className="text-red-500 text-sm mt-1">
                    Maximum {maxLength} characters allowed
                </p>
            )}
            {minLength && inputValue.length < minLength && inputValue.length > 0 && (
                <p className="text-red-500 text-sm mt-1">
                    Minimum {minLength} characters required
                </p>
            )}
        </div>
    );
};

export default Button;
