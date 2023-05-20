
interface MensagemProps{
    mensagem: string;
}

const Mensagem: React.FC<MensagemProps> = (props: MensagemProps) => {
    return(
        <div>
            { props.mensagem }
        </div>
    )
}


const MeuComponente = () => {
    return(
        <div>
            <Mensagem mensagem="Componente"/>
        </div>
    )
}

export default MeuComponente;