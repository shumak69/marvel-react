import { Component } from 'react';
import MarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import './randomChar.scss';
// import thor from '../../resources/img/thor.jpeg';
import mjolnir from '../../resources/img/mjolnir.png';
import ErrorMessage from '../errorMessage/ErrorMessage';

class RandomChar extends Component {
    state = {
        char: {},
        loadinig: true,
        error: false
    }

    marvelServices = new MarvelServices();

    componentDidMount() {
        this.updateChar();
    }

    onCharLoaded = (char) => {
        if(char.description.length > 140) {
            char.description = char.description.substring(0, 138) + '...';
        }
        this.setState({char, loadinig: false})
    }

    onError = () => {
        this.setState({loadinig: false, error: true})
    }

    updateChar = () => {
        this.setState(({loadinig: true, error: false}))
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        this.marvelServices
        .getCharacter(id)
        .then(this.onCharLoaded)
        .catch(this.onError)
    }
    render() {
        const {char, loadinig, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loadinig ? <Spinner/> : null;
        const content = !(loadinig || error) ? <View char={char}/> : null;

        return (
            <div className="randomchar">
                {errorMessage} {spinner} {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main" onClick={this.updateChar}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char;
    let isNotAvailable = null;
    if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        isNotAvailable = true;
    }
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={isNotAvailable ? {objectFit: 'contain'} : null}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;