import { useState } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
// import ComicsHeader from '../comicsHeader/ComicsHeader';
import AppBanner from '../appBanner/AppBanner';
import ComicsList from "../comicsList/ComicsList";
import decoration from '../../resources/img/vision.png';

const App = () => {
    const [selectedChar, setChar] = useState(null)
    // state = {
    //     selectedChar: null
    // }

    const onCharSelected = (id) => {
        setChar(id);
        // this.setState({
        //     selectedChar: id
        // })
    }
    return (
        <div className="app">
            <AppHeader/>
            <main>
                {/* <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onCharSelected={onCharSelected}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/> */}

                {/* <ErrorBoundary>

                </ErrorBoundary> */}
                <AppBanner/>
                <ComicsList/>
            </main>
        </div>
    ) 
}

export default App;