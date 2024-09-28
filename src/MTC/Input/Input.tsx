import { Sizing } from "../../utils/type"

export interface Props {
    type?: React.HTMLInputTypeAttribute
    htmlFor?: string
    id?: string
    placeholder?: string
    title?: string
    style?: {
        width?: Sizing
        spaceX?: number
        spaceY?: number
    }
}

const Field: React.FC<Props> = ({
    type = 'text',
    htmlFor = 'default',
    id = 'default',
    placeholder = 'Input Field',
    title = 'Title Field',
    style = {
        width: 'full',
        spaceX: 0,
        spaceY: 0
    }
}) => {
    return (
        <div className={`mx-${style?.spaceX} my-${style?.spaceY}`}>
            <label
                htmlFor={htmlFor}
                className="block mb-2 text-sm font-medium text-text-light dark:text-text-dark"
            >
                {title}
            </label>
            <input
                type={type}
                id={id}
                name="first_name"
                className={
                    `bg-background-light dark:bg-background-dark border border-gray-300 text-gray-900  focus:ring-primary focus:border-primary
                     dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                    text-sm rounded-lg block ${'w-' + style.width} p-2.5 
                   `
                }
                placeholder={placeholder}
                required
            />
        </div>
    )
}

const Input = {
    Field
}

export default Input