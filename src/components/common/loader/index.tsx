
interface LoaderProps {
    show: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ show}) => {
    if(!show){
        return<></>
    }
    return (
        <div id="loader" style={{
            background: 'rgba(255,255,255,0.5)',
            width: '100%',
            height: '100%',
            zIndex: 99999,
            position: 'absolute',
            left: '20%',
            top: '30%'
        }}>
            <div style={{
                position: 'absolute',
                left: '25%',
                top: '10%'
            }}>
<div className="loadingio-spinner-rolling-am5ajrs83eb"><div className="ldio-6z169f2xp9">
<div></div>
</div></div>

            </div>

        </div>
    )
}