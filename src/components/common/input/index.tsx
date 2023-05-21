import { InputHTMLAttributes } from 'react'


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    onChange?: (value) => void;
    label: string;
    columnClasses?: string;
    error?: string;
}

export const Input: React.FC<InputProps> = ({
    onChange,
    label,
    columnClasses,
    id,
    error,
    ...inputProps
}: InputProps) => {

    const onInputChange = (event) => {
        let value = event.target.value;

        if(onChange){
            onChange(value)
        }
    }

    return (
        <div className={`field column ${columnClasses}` }>
            <label className="label" htmlFor={id}>{label}</label>
            <div className="control">
                <input className="input" 
                    id={id} {...inputProps}
                    onChange={onInputChange}/>
                    {error &&
                        <p className='help is-danger'>{ error}</p>
                    }
            </div>
        </div>
    )
}