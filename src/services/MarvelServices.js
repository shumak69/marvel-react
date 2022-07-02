import {useHttp} from '../hooks/http.hook';

const  useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp(); 
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=c3ecd3f2735edf45815f66d2ac4a27e4';
    const _baseOffset = 210;
    // getResourse = async (url) => {
    //     let res = await fetch(url);

    //     if(!res.ok) {
    //         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    //     }

    //     return await res.json();
    // }

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);;
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description || 'No description',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage:  char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    return {loading, error, getAllCharacters, getCharacter, clearError}
}

export default useMarvelService;