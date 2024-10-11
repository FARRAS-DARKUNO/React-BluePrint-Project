import { RoundSize, Sizing, TypographySize } from "../../utils/type"


export default interface Props<T> {
    id?: string;
    name?: string;
    title?: string;
    htmlFor?: string;
    placeholder?: string;
    helperText?: string;
    required?: boolean;
    style?: styleProps;
    magic?: T
}


interface styleProps {
    width?: Sizing;
    spaceX?: number;
    spaceY?: number;
    textSize?: TypographySize;
    roundedSize?: RoundSize;
}

export interface FieldProps {
    type?: "number" | "email" | "password" | "text" | "date" | "datetime-local";
    regex?: RegExp;
    setInputValue?: (value: string) => void;
    inputValue?: string;
    errorMessage?: string;
}

export interface FileProps {
    accept?: string
    selectedFile?: string | File | null;
    setSelectedFile?: (value: string | File | null) => void;
    isConvertBase64?: boolean;
}

export interface SearchProps {
    regex?: RegExp;
    setSearchTerm?: (value: string) => void;
    searchTerm?: string;
    onSearch?: () => void
}

export interface SearchDropDownProps {
    setSearchTerm?: (value: string) => void;
    setSelectedCategory?: (value: string) => void;
    regex?: RegExp;
    searchTerm?: string;
    selectedCategory?: string;
    categories?: string[];
    onSearch?: () => void
}


export interface FieldDropDownProps {
    type?: "number" | "email" | "password" | "text" | "date" | "datetime-local";
    regex?: RegExp;
    setInputValue?: (value: string) => void;
    inputValue?: string;
    errorMessage?: string;
    options?: {
        label?: string;
        value?: string | number;
    }[]
}

export interface CounterProps {
    setInputValue?: (value: number) => void;
    inputValue?: number;
    minimum?: number;
    maximum?: number
}