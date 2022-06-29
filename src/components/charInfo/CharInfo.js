import { Component } from 'react/cjs/react.production.min';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton'
import MarvelServices from '../../services/MarvelServices';
import './charInfo.scss';
// import thor from '../../resources/img/thor.jpeg';
// import { toHaveFocus } from '@testing-library/jest-dom/dist/matchers';

class CharInfo extends Component {

    state = {
        char: null,
        loadinig: false,
        error: false
    }

    marvelServices = new MarvelServices();

    updateChar = () => {
        const {charId} = this.props;
        if (!charId) {
            return
        }
        this.setState(({loadinig: true, error: false}))
        this.marvelServices.getCharacter(charId)
        .then(this.onCharLoaded)
        .catch(this.onError)
        
    }

    componentDidUpdate(prevProps) {
        if(this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    onCharLoaded = (char) => {
        if(char.description.length > 140) {
            char.description = char.description.substring(0, 138) + '...';
        }
        this.setState({char, loadinig: false})
    }

    componentDidMount() {
        this.updateChar();
    }

    onError = () => {
        this.setState({loadinig: false, error: true})
    }

    render() {
        const {char, loadinig, error} = this.state;

        const skeleton = char || loadinig || error ? null : <Skeleton/>
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loadinig ? <Spinner/> : null;
        const content = !(loadinig || error || !char) ? <View char={char}/> : null;
        return (
            <div className="char__info">
                {skeleton}{errorMessage}{spinner}{content}
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    let items;
    let isNotAvailable = null;
            if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                isNotAvailable = true;
            }
    if(comics.length === 0) {
        items = (
                <li className="char__comics-item" key={0}>
                     There is no comics with this characters
                </li>
        )
    } else {
        items = comics.map((item, i) => {
            if(i >= 10) {
                return;
            } 
            return (
                <li className="char__comics-item" key={i}>
                     {item.name}
                </li>
            )
        })
    }
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={isNotAvailable ? {objectFit: 'contain'} : null}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                 {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {
                    items
                }
                
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.string
}

export default CharInfo;