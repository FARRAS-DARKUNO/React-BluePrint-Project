import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Props, { FieldProps } from "./Interface";

const Field: React.FC<Props<FieldProps>> = ({
    htmlFor = 'default',
    id = 'default',
    placeholder = 'Input Field',
    title = 'Title Field',
    helperText = '',
    name = '',
    required = false,
    magic = {
        type: 'text',
        errorMessage: 'Input is invalid',
        inputValue: '',
        setInputValue: undefined,
        regex: undefined,
    },
    style = {
        width: 'full',
        spaceX: 0,
        spaceY: 0,
        textSize: 'sm',
        roundedSize: 'full',
    },
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isValid, setIsValid] = useState(true);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (magic.setInputValue) {
            magic.setInputValue(value);
        }

        if (magic.regex) {
            setIsValid(magic.regex.test(value));
        }
    };

    return (
        <div className={`mx-${style?.spaceX} my-${style?.spaceY}`}>
            <label
                htmlFor={htmlFor}
                className="block mb-2 text-sm font-semibold text-text-light dark:text-text-dark ml-2"
            >
                {title}
            </label>
            <div className="flex items-center w-full">
                <input
                    type={showPassword ? 'text' : magic.type}
                    id={id}
                    name={name}
                    className={`flex-grow bg-background-light dark:bg-background-dark border ${isValid ? 'border-secondary-light' : 'border-red-500'} dark:border-secondary-dark text-text-light dark:text-text-dark 
                        focus:ring-primary focus:border-primary dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500
                        p-2.5 rounded-${style?.roundedSize} text-${style?.textSize}`}
                    placeholder={placeholder}
                    required={required}
                    value={magic.inputValue}
                    onChange={handleInputChange}
                />
                {magic.type === 'password' && (
                    <button
                        className={`flex items-center mx-1 cursor-pointer bg-primary-light hover:bg-slate-500 rounded-${style?.roundedSize} px-4`}
                        onClick={togglePasswordVisibility}
                    >
                        {!showPassword ? (
                            <AiFillEyeInvisible className="text-secondary-light dark:text-secondary-dark" />
                        ) : (
                            <AiFillEye className="text-secondary-light dark:text-secondary-dark" />
                        )}
                    </button>
                )}
            </div>
            {helperText && (
                <p className="mt-1 ml-2 text-sm text-secondary-light dark:text-secondary-dark">{helperText}</p>
            )}
            {!isValid && (
                <p className="mt-1 ml-2 text-sm text-error">{magic.errorMessage}</p>
            )}
        </div>
    );
};

const Input = {
    Field
};

export default Input;
