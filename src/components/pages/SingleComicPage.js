import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelServices';
import './singleComicPage.scss';
// import xMen from '../../resources/img/x-men.png';

const SingleComicPage = () => {
    const {comicId} = useParams();
    const [comic, setComic] = useState(null);
    
    const {loading, error, getComics, clearError} = useMarvelService();

    const updateComic = () => {
        clearError();
        getComics(comicId)
        .then(onComicLoaded)
        
    }

    useEffect(() => {
            updateComic();
    }, [comicId])

    const onComicLoaded = (comic) => {
        setComic(comic)
    }
    console.log(comic);
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null;
    return (
        <>
                {errorMessage}{spinner}{content}
        </>
    )
}

const View = ({comic}) => {
    // console.log(comic);
    const {title, description, pageCount, thumbnail, language, price} = comic;
    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">{language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/commics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;