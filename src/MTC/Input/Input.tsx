import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Props, { CheckingProps, CounterProps, FieldDropDownProps, FieldProps, FileProps, SearchDropDownProps, SearchProps } from "./Interface";

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
                className="block mb-2 text-sm font-semibold text-field-text dark:text-field-text_dark ml-2"
            >
                {title}
            </label>
            <div className="flex items-center w-full">
                <input
                    type={showPassword ? 'text' : magic.type}
                    id={id}
                    name={name}
                    className={`flex-grow bg-background-light dark:bg-background-dark border ${isValid ? 'border-field-border' : 'border-red-500'} dark:border-field-border_dark text-field-text dark:text-field-text_dark 
                        focus:ring-field-ring placeholder-field-placeholder dark:placeholder-field-placeholder_dark dark:focus:ring-field-ring_dark 
                        p-2.5 rounded-${style?.roundedSize} text-${style?.textSize}`}
                    placeholder={placeholder}
                    required={required}
                    value={magic.inputValue}
                    onChange={handleInputChange}
                />
                {magic.type === 'password' && (
                    <button
                        className={`flex items-center mx-1 cursor-pointer bg-button-primary dark:bg-button-primary_dark hover:bg-slate-500 rounded-${style?.roundedSize} px-4`}
                        onClick={togglePasswordVisibility}
                    >
                        {!showPassword ? (
                            <AiFillEyeInvisible className="text-button-on_button dark:text-button-on_button_dark" />
                        ) : (
                            <AiFillEye className="text-button-on_button dark:text-button-on_button_dark" />
                        )}
                    </button>
                )}
            </div>
            {helperText && (
                <p className="mt-1 ml-2 text-sm text-field-text dark:text-field-text_dark">{helperText}</p>
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
                className="block mb-2 text-sm font-semibold text-field-text dark:text-field-text_dark ml-2"
            >
                {title}
            </label>
            <div
                className={`flex flex-col border-dashed rounded-${style.roundedSize || 'xl'}  items-center justify-center w-full cursor-pointer border-2
                border-field-border dark:border-field-border_dark bg-background dark:bg-background-dark hover:bg-gray-100 dark:hover:bg-gray-600`
                }
                onClick={handleClick}
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                        className="w-10 h-10 mb-4 text-field-border dark:text-field-border_dark"
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
                                <p className="mb-2 text-sm text-field-text dark:text-field-text_dark">
                                    Selected file: <span className="font-semibold">{file.name}</span>
                                </p>
                            )}
                        </>
                    ) : (
                        <>
                            <p className="mb-2 text-sm text-field-text dark:text-field-text_dark font-semibold">
                                {helperText}
                            </p>
                            <p className="text-xs text-field-text dark:text-field-text_dark">
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
        <div className={`flex items-start flex-col mx-${style.spaceX} my-${style.spaceY} w-${style.width}`}>
            {title && (
                <label
                    htmlFor={htmlFor}
                    className="block mb-2 text-sm font-semibold text-field-text dark:text-field-text_dark ml-2"
                >
                    {title}
                </label>
            )}
            <div className="flex items-center w-full">
                <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-field-border dark:text-field-border_dark" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        id={id}
                        className={`bg-background-light dark:bg-background-dark border border-field-border dark:border-field-border_dark text-field-text dark:text-field-text_dark placeholder-field-placeholder dark:placeholder-field-placeholder_dark
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
                    className={`p-2.5 ms-2 text-sm font-medium text-button-on_button dark:to-button-on_button_dark bg-button-primary dark:bg-button-primary_dark rounded-${style.roundedSize || 'full'} `}
                >
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                    <span className="sr-only">Search</span>
                </button>
            </div>
            {helperText && (
                <p className="mt-1 ml-2 text-sm text-field-text dark:text-field-text_dark">{helperText}</p>
            )}
        </div>
    );
};

const SearchDropdown: React.FC<Props<SearchDropDownProps>> = ({
    id = 'search-category',
    placeholder = 'Search value...',
    title = '',
    htmlFor = 'search-dropdown',
    helperText = '',
    required = false,
    magic = {
        setSearchTerm: undefined,
        setSelectedCategory: undefined,
        searchTerm: '',
        selectedCategory: 'All',
        categories: [],
        onSearch: undefined
    },
    style = {
        width: 'full',
        spaceX: 0,
        spaceY: 0,
        textSize: 'sm',
        roundedSize: 'lg',
    },
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleCategorySelect = (category: string) => {
        if (magic.setSelectedCategory) {
            magic.setSelectedCategory(category);
        }
        setIsDropdownOpen(false);
    };

    return (
        <div className={`flex items-start flex-col mx-${style.spaceX} my-${style.spaceY} w-${style.width}`}>
            {title && (
                <label
                    htmlFor={htmlFor}
                    className="block mb-2 text-sm font-semibold text-field-text dark:text-field-text_dark ml-2"
                >
                    {title}
                </label>
            )}
            <div className="flex w-full">
                <label htmlFor="search-dropdown" className="sr-only">Search</label>

                <div className="relative">
                    <button
                        id={id}
                        type="button"
                        onClick={handleDropdownToggle}
                        className={`flex-shrink-0 z-10 inline-flex items-center py-3.5 px-2 text-sm font-medium border truncate max-w-xs rounded-s-${style.roundedSize} rounded-tr-none rounded-br-none
                         text-text-light dark:text-text-dark bg-gray-100  hover:bg-gray-200  dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 `}
                    >
                        <span className="truncate text-xs">{magic.selectedCategory}</span>
                        <svg
                            className="w-2.5 h-2.5 ml-2.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 4 4 4-4"
                            />
                        </svg>
                    </button>
                    {isDropdownOpen && (
                        <div className={`absolute z-10 bg-background-light dark:bg-background-dark divide-y divide-gray-100 rounded-${style.roundedSize || 'lg'} shadow w-max`}>
                            <ul className="py-2 text-sm text-text-light dark:text-text-dark">
                                {magic.categories?.map((category) => (
                                    <li key={category}>
                                        <button
                                            type="button"
                                            className="inline-flex w-max px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-text-light dark:text-text-dark truncate"
                                            onClick={() => handleCategorySelect(category)}
                                        >
                                            <span className="truncate max-w-xs">{category}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="flex w-full">
                    <input
                        type="search"
                        id="search-dropdown"
                        value={magic.searchTerm}
                        onChange={(a) => {
                            if (magic.setSearchTerm) {
                                magic.setSearchTerm(a.target.value);
                            }
                        }}
                        className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-none border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                        placeholder={placeholder}
                        required={required}
                    />
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            if (magic.onSearch) {
                                magic.onSearch();
                            }
                        }}
                        className={`p-2.5 text-sm font-medium text-button-on_button dark:to-button-on_button_dark bg-button-primary dark:bg-button-primary_dark rounded-r-${style.roundedSize} rounded-l-none`}
                    >
                        <svg
                            className="w-4 h-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                        <span className="sr-only">Search</span>
                    </button>
                </div>
            </div>
            {helperText && (
                <p className="mt-1 ml-2 text-sm text-text-light dark:text-text-dark">{helperText}</p>
            )}
        </div>
    );
};

const FieldDropDown: React.FC<Props<FieldDropDownProps>> = ({
    htmlFor = 'default',
    id = 'default',
    placeholder = 'Select an option',
    title = 'Title Field',
    helperText = '',
    name = '',
    required = false,
    magic = {
        type: 'select',
        errorMessage: 'Selection is invalid',
        inputValue: '',
        setInputValue: undefined,
        options: [],
    },
    style = {
        width: 'full',
        spaceX: 0,
        spaceY: 0,
        textSize: 'sm',
        roundedSize: 'full',
    },
}) => {

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (magic.setInputValue) {
            magic.setInputValue(value);
        }
    };

    return (
        <div className={`mx-${style.spaceX} my-${style.spaceY} w-${style.width}`}>
            <label
                htmlFor={htmlFor}
                className="block mb-2 text-sm font-semibold text-field-text dark:text-field-text_dark ml-2"
            >
                {title}
            </label>
            <div className="flex items-center w-full">
                <select
                    id={id}
                    name={name}
                    className={`flex-grow bg-background-light dark:bg-background-dark border border-field-border dark:border-field-border_dark text-field-text dark:text-field-text_dark 
                    focus:ring-field-ring placeholder-field-placeholder dark:placeholder-field-placeholder_dark dark:focus:ring-field-ring_dark 
                    p-2.5 rounded-${style?.roundedSize} text-${style?.textSize}`}
                    value={magic.inputValue}
                    onChange={handleSelectChange}
                    required={required}
                >
                    <option value="" disabled>
                        {placeholder}
                    </option>
                    {magic.options && magic.options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            {helperText && (
                <p className="mt-1 ml-2 text-sm text-field-text dark:text-field-text_dark">{helperText}</p>
            )}
        </div>
    );
};

const Counter: React.FC<Props<CounterProps>> = ({
    htmlFor = 'default',
    id = 'default',
    title = 'Title Field',
    helperText = '',
    required = false,
    magic = {
        inputValue: 0,
        maximum: 10,
        minimum: 0,
        setInputValue: undefined
    },
    style = {
        width: 'full',
        spaceX: 0,
        spaceY: 0,
        textSize: 'sm',
        roundedSize: 'full',
    },
}) => {

    const incrementQuantity = () => {
        if (magic.inputValue! < magic.maximum!) {
            if (magic.setInputValue) {
                console.log('a')
                magic.setInputValue(magic.inputValue! + 1);
            }
        }
    };

    const decrementQuantity = () => {
        if (magic.inputValue! > magic.minimum!) {
            if (magic.setInputValue) {
                magic.setInputValue(magic.inputValue! - 1);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (value >= 1 && value <= 50) {
            if (magic.setInputValue && magic.inputValue) {
                magic.setInputValue(value);
            }
        }
    };

    return (
        <div className={`mx-${style.spaceX} my-${style.spaceY} w-${style.width}`}>
            <label
                htmlFor={htmlFor}
                className="block mb-2 text-sm font-semibold text-field-text dark:text-field-text_dark ml-2"
            >
                {title}
            </label>
            <div className="relative flex items-center max-w-[8rem]">
                <button
                    type="button"
                    id="decrement-button"
                    onClick={decrementQuantity}
                    className={`text-button-on_button dark:to-button-on_button_dark bg-button-primary dark:bg-button-primary_dark border border-gray-300 rounded-l-${style.roundedSize} p-3 h-11`}
                >
                    <svg className="w-3 h-3 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                    </svg>
                </button>
                <input
                    type="text"
                    id={id}
                    value={magic.inputValue}
                    onChange={handleChange}
                    className={`bg-background-light dark:bg-background-dark h-11 text-center text-field-text dark:text-field-text_dark text-sm block w-full py-2.5`}
                    required={required}
                    disabled
                />
                <button
                    type="button"
                    id="increment-button"
                    onClick={incrementQuantity}
                    className={`text-button-on_button dark:to-button-on_button_dark bg-button-primary dark:bg-button-primary_dark border border-gray-300 rounded-r-${style.roundedSize} p-3 h-11`}
                >
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                    </svg>
                </button>
            </div>
            {helperText && (
                <p className="mt-1 ml-2 text-sm text-text-light dark:text-text-dark">{helperText}</p>
            )}
        </div>
    );
};

const Checkbox: React.FC<Props<CheckingProps>> = ({
    id = "helper-checkbox",
    title = 'Title Field',
    helperText = 'fdfdf',
    disable = false,
    magic = {
        isChecked: true,
        setIsChecked: undefined
    },
    style = {
        width: 'full',
        spaceX: 0,
        spaceY: 0,
        textSize: 'sm',
        roundedSize: 'full',
    },
}) => {

    const handleCheckboxChange = () => {
        if (magic.setIsChecked)
            magic.setIsChecked(!magic.isChecked);
    };

    return (
        <div className={`flex mx-${style.spaceX} my-${style.spaceY} w-${style.width}`}>
            <div className="flex items-center h-5">
                <input
                    id={id}
                    aria-describedby="helper-checkbox-text"
                    type="checkbox"
                    checked={magic.isChecked}
                    onChange={handleCheckboxChange}
                    disabled={disable}
                    className="w-4 h-4 text-primary-light dark:text-primary-dark bg-background-light dark:bg-background-dark border-gray-300 rounded dark:border-gray-600"
                />
            </div>
            <div className="ms-2 text-sm">
                {title && (
                    <label htmlFor="helper-checkbox" className="font-medium text-field-text dark:text-field-text_dark">
                        {title}
                    </label>
                )}
                {helperText && (
                    <p id="helper-checkbox-text" className="text-xs font-normal text-field-text dark:text-field-text_dark">
                        {helperText}
                    </p>
                )}
            </div>
        </div>
    );
};

const Input = {
    Field,
    FileUploader,
    SearchBar,
    SearchDropdown,
    FieldDropDown,
    Counter,
    Checkbox
};

export default Input;
