import img from './error.gif'

const ErrorMessage = () => {
    return (
        <img alt = "error" src={img} style={{display: 'block', widows: 250, height: 250, objectFit: 'contain', margin: '0 auto'}}/>
    )
}

export default ErrorMessage;