import { Component } from 'react/cjs/react.production.min';
import './charList.scss';
// import abyss from '../../resources/img/abyss.jpg';
import MarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

// characters
//     .then((res) => res.map(item => {
//         return (
//             <>
//             <li className="char__item">
//             <img src={abyss} alt="abyss"/>
//             <div className="char__name">name</div>
//             </li>
//             </>
//         )
//     }))
class CharList extends Component{
    state = {
        charList: [],
        loading: true,
        error: false
    }
    
    marvelService = new MarvelServices()

    componentDidMount() {
        this.marvelService.getAllCharacters()
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoaded = (charList) => {
        this.setState({
            charList,
            loading: false
        })
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    renderItems(arr) {
        const items = arr.map((item) => {
            let isNotAvailable = null;
            if(item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                isNotAvailable = true;
            }
            return (
                <li className="char__item"
                    key={item.id}
                    onClick={() => this.props.onCharSelected(item.id)}>
                        <img src={item.thumbnail} alt={item.name} style={isNotAvailable ? {objectFit: 'contain'} : null}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }
    render() {
        const {charList, loading, error} = this.state;
        
        const items = this.renderItems(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;
        return (
            <div className="char__list">
                 {errorMessage} {spinner} {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;