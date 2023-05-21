import  { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    onChange?: (value) => void;
    readonly?: boolean;
    label: string; 

}

export const Input: React.FC<InputProps> = ({
    onChange,
    readonly,
    label,
    id,
    value,
    ... outrasInputProps

}: InputProps) => {
    return(
        <div className="field">
        <label className="label" htmlFor={id}>{label}</label>
        <div className="control">
        <input className="input" id={id} { ... outrasInputProps} onChange={event => {
            if(onChange){
                onChange(event.target.value)
            }

        }}/>
        </div>
    </div>
    )
}