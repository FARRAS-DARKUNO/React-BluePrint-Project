import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Props, { FieldProps, FileProps, SearchProps } from "./Interface";

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
        <div className={`mx-${style.spaceX} my-${style.spaceY} w-${style.width}`}>
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

const FileUploader: React.FC<Props<FileProps>> = ({
    htmlFor = 'default',
    id = "file-input",
    placeholder = 'File, Image, Document',
    title = 'Title Field',
    helperText = 'Click to upload or drag and drop',
    required = false,
    magic = {
        accept: '',
        selectedFile: null,
        setSelectedFile: undefined,
        isConvertBase64: false
    },
    style = {
        width: 'full',
        spaceX: 0,
        spaceY: 0,
        textSize: 'sm',
        roundedSize: 'xl'
    }
}) => {
    const [file, setFile] = useState<File | null>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {


        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0])

            if (magic.setSelectedFile && !magic.isConvertBase64) {
                magic.setSelectedFile(event.target.files[0]);
            }
            if (magic.isConvertBase64 && magic.setSelectedFile) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result as string;
                    magic.setSelectedFile?.(base64String);
                };
                reader.readAsDataURL(event.target.files[0]); // Konversi file ke Base64
            }
        }
    };

    const handleClick = () => {
        const inputElement = document.getElementById('file-input') as HTMLInputElement;
        if (inputElement) {
            inputElement.click();
        }
    };

    return (
        <div className={`flex flex-col items-start mx-${style.spaceX} my-${style.spaceY} w-${style.width}`}>
            <label
                htmlFor={htmlFor}
                className="block mb-2 text-sm font-semibold text-text-light dark:text-text-dark ml-2"
            >
                {title}
            </label>
            <div
                className={`flex flex-col border-dashed rounded-${style.roundedSize || 'xl'}  items-center justify-center w-full cursor-pointer border-2
                 border-secondary-light dark:border-secondary-dark bg-background dark:bg-background-dark hover:bg-gray-100 dark:hover:bg-gray-600`
                }
                onClick={handleClick}
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                        className="w-10 h-10 mb-4 text-text-light dark:text-text-dark"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                    </svg>
                    {file ? (
                        <>
                            {file.type.startsWith('image/') ? (
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt="Preview"
                                    className="mb-2 max-h-48"

                                />
                            ) : (
                                <p className="mb-2 text-sm text-text-light dark:text-text-dark">
                                    Selected file: <span className="font-semibold">{file.name}</span>
                                </p>
                            )}
                        </>
                    ) : (
                        <>
                            <p className="mb-2 text-sm text-text-light dark:text-text-dark font-semibold">
                                {helperText}
                            </p>
                            <p className="text-xs text-text-light dark:text-text-dark">
                                {placeholder}
                            </p>
                        </>
                    )}
                </div>
                <input
                    id={id}
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept={magic.accept}
                    required={required}
                />
            </div>
        </div>
    );
};

const SearchBar: React.FC<Props<SearchProps>> = ({
    htmlFor = 'search',
    id = 'default',
    placeholder = 'Search value...',
    title = '',
    helperText = '',
    required = false,
    magic = {
        searchTerm: '',
        setSearchTerm: undefined,
        regex: undefined,
        onSearch: undefined
    },
    style = {
        width: 'full',
        spaceX: 0,
        spaceY: 0,
        textSize: 'sm',
        roundedSize: 'full',
    },
}) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (magic.setSearchTerm) {
            magic.setSearchTerm(value);
        }


    };

    return (
        <div className={`flex items-start flex-col  mx-${style.spaceX} my-${style.spaceY} w-${style.width}`}>
            {title && (
                <label
                    htmlFor={htmlFor}
                    className="block mb-2 text-sm font-semibold text-text-light dark:text-text-dark ml-2"
                >
                    {title}
                </label>
            )}
            <div className="flex items-center w-full">
                <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        id={id}
                        className={`bg-background-light dark:bg-background-dark border border-secondary-light dark:border-secondary-dark text-gray-900 
                        text-sm rounded-${style.roundedSize || 'full'}  block w-full ps-10 p-2.5 `}
                        placeholder={placeholder}
                        value={magic.searchTerm}
                        onChange={handleInputChange}
                        required={required}
                    />
                </div>
                <button
                    type="button"
                    onClick={magic.onSearch}
                    className={`p-2.5 ms-2 text-sm font-medium text-white bg-primary-light dark:bg-primary-dark rounded-${style.roundedSize || 'full'} `}
                >
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                    <span className="sr-only">Search</span>
                </button>
            </div>
            {helperText && (
                <p className="mt-1 ml-2 text-sm text-secondary-light dark:text-secondary-dark">{helperText}</p>
            )}
        </div>
    );
};


const Input = {
    Field,
    FileUploader,
    SearchBar
};

export default Input;
