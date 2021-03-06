import { useState, useEffect, useRef, useMemo } from 'react';
import './charList.scss';
import useMarvelService from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import { toHaveStyle } from '@testing-library/jest-dom/dist/matchers';

const setContent = (process, Component, newItemLoading) => {
    switch(process) {
        case 'waiting': 
            return <Spinner/>
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>
        case 'confirmed':
            return <Component/>
        case 'error':
            return <ErrorMessage/>
        default: 
            throw new Error('Unexpected process state')
    }
}   

const  CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);
    const { getAllCharacters, setProcess, process} = useMarvelService()

    useEffect(() => {
        onRequest(offset, true)
    }, [])
    const onRequest = (offset, initial) => {
        initial ? setItemLoading(false) : setItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true
        }

        setCharList(charList => [...charList, ...newCharList])
        setItemLoading(() => false)
        setOffset(offset => offset + 9)
        setCharEnded(charEnded => ended)

        
    }

  

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    function renderItems(arr) {

        const items = arr.map((item, i) => {
            let isNotAvailable = null;
            if(item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                isNotAvailable = true;
            }
            
            return (
                <CSSTransition timeout={500} classNames={'char__item'}
                key={item.id}>
                    <li className="char__item"
                    onClick={() => {props.onCharSelected(item.id);  focusOnItem(i);}} 
                    tabIndex={0}
                    ref={el => itemRefs.current[i] = el} onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            props.onCharSelected(item.id);
                            focusOnItem(i);
                        }
                    }}>
                        <img src={item.thumbnail} alt={item.name} style={isNotAvailable ? {objectFit: 'contain'} : null}/>
                        <div className="char__name">{item.name}</div>
                </li>
                </CSSTransition>
            )
        });
        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )
    }

    const elements = useMemo(() => {
        return setContent(process, () => renderItems(charList), newItemLoading)
    }, [process])
    return (
        <div className="char__list">
            {elements}
            <button className="button button__main button__long" disabled={newItemLoading} onClick={() => onRequest(offset)} style={{'display': charEnded ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;