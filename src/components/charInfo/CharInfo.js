import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelServices';
import './charInfo.scss';
import setContent from '../../utils/setContent'; 

const CharInfo = (props) => {
    const [char, setChar] = useState(null);
    const { getCharacter, clearError, process, setProcess} = useMarvelService();

    const updateChar = () => {
        const {charId} = props;
        if (!charId) {
            return
        }
        clearError();
        getCharacter(charId)
        .then(onCharLoaded)
        .then(() => setProcess('confirmed'))
        
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
        return (
            <div className="char__info">
                {setContent(process, View,char)}
            </div>
        )
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = data;
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