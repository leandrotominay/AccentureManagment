import { InputHTMLAttributes } from 'react'


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    onChange?: (value) => void;
    label: string;
    columnClasses?: string;
    error?: string;
    mascara?: "cpf" | "cnpj" | "rg" | 'data';
}

export const Input: React.FC<InputProps> = ({
    onChange,
    label,
    columnClasses,
    id,
    error,
    mascara,
    ...inputProps
}: InputProps) => {

    const applyMask = (value: string, mascara: string) => {
        const trimmedValue = value.replace(/\s/g, ""); // Remover espaços em branco
      
        switch (mascara) {
          case "cpf":
            return trimmedValue.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, "$1.$2.$3-$4");
          case "cnpj":
            return trimmedValue.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2}).*/, "$1.$2.$3/$4-$5");
          case "rg":
            return trimmedValue.replace(/^(\d{2})(\d{3})(\d{3})(\d{1}).*/, "$1.$2.$3-$4");
          case "data":
            return trimmedValue
              .replace(/\D/g, "")
              .replace(/^(\d{2})(\d)/g, "$1/$2")
              .replace(/^(\d{2})\/(\d{2})(\d{1})/g, "$1/$2/$3")
              .replace(/\/\//g, "/");
          default:
            return trimmedValue;
        }
      };
      
    
const removeSpacesAndAccents = (value: string) => {
  const normalizedValue = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return normalizedValue;
};

    
        const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            let value = event.target.value;
    
            if (mascara) {
                value = applyMask(value, mascara);
            }
    
            if (mascara === "data") {
                value = value.replace(/[^0-9\/]/g, '');
            } else {
                value = removeSpacesAndAccents(value);
            }
    
            if (mascara && mascara === "cpf" && value.length > 14) {
                return;
            }
    
            if (mascara && mascara === "cnpj" && value.length > 18) {
                return;
            }
    
            if (mascara && mascara === "rg" && value.length > 12) {
                return;
            }
    
            if (mascara && mascara === "data" && value.length > 10) {
                return;
            }
    
            if (onChange) {
                onChange(value);
            }
        }
    
        return (
            <div className={`field column ${columnClasses}`}>
              <label className="label" htmlFor={id}>{label}</label>
              <div className="control">
                <input className="input"
                  id={id} {...inputProps}
                  onChange={onInputChange} />
                {error &&
                  <p className='help is-danger'>{error}</p>
                }
                </div>
            </div>
        )
    }