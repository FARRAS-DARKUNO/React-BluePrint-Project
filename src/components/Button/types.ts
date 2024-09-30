export interface ButtonProps {
    isPassword?: boolean;
    type: 'string' | 'number' | 'decimal' | 'datetime';
    maxLength?: number;
    minLength?: number;
    min?: number;
    max?: number;
}