
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";
import SinglePage from '../pages/SinglePage';
const Page404 = lazy(() => import('../pages/404'))
const MainPage = lazy(() => import('../pages/MainPage'));
const CommicsPage = lazy(() => import('../pages/CommicsPage'));
// const SingleComicPage = lazy(() => import('../pages/singleComicLayout/SingleComicPage'));
// const SinglePage = lazy(() => import('../pages/SinglePage'));
const SingleComicLayout = lazy(() => import('../pages/singleComicLayout/SingleComicPage'));
const SingleCharacterLayout = lazy(() => import('../pages/singleCharacterLayout/SingleCharacterLayout.js'));

const App = () => {
   
    return (
        <Router>
            <div className="app">
            <AppHeader/>
            <main>
                <Suspense fallback={<Spinner/>}>
                    <Routes>
                        <Route path="/" element={ <MainPage />}>
                        </Route>
                        <Route path="/commics" element={<CommicsPage/>}>
                            
                        </Route>
                        <Route path="/commics/:id" element={<SinglePage Component={SingleComicLayout} dataType='comics'/>}/>
                        <Route path="/characters/:id" element={ <SinglePage Component={SingleCharacterLayout} dataType='character'/>}/>
                        <Route path="*" element={<Page404/>}></Route>
                    </Routes>
                </Suspense>
            </main>
        </div>
        </Router>
    ) 
}

export default App;