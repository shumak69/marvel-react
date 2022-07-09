import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton'
import useMarvelService from '../../services/MarvelServices';
import './charInfo.scss';

const CharInfo = (props) => {
    const [char, setChar] = useState(null);
    const {loading, error, getCharacter, clearError} = useMarvelService();

    const updateChar = () => {
        const {charId} = props;
        if (!charId) {
            return
        }
        clearError();
        getCharacter(charId)
        .then(onCharLoaded)
        
    }

    useEffect(() => {
            updateChar();
    }, [props.charId])

    const onCharLoaded = (char) => {
        if(char.description.length > 140) {
            char.description = char.description.substring(0, 138) + '...';
        }
        setChar(char)
    }

        const skeleton = char || loading || error ? null : <Skeleton/>
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View char={char}/> : null;
        return (
            <div className="char__info">
                {skeleton}{errorMessage}{spinner}{content}
            </div>
        )
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
    charId: PropTypes.number
}

export default CharInfo;