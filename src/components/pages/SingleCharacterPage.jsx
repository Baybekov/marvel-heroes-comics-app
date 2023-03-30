import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import AppBanner from "../appBanner/AppBanner";


import './SingleCharacter.scss';




const SingleCharacterLayout = () => {
    const { comicId } = useParams();
    const [comic, setComic] = useState(null);
    const { loading, error, getCharacter, clearError } = useMarvelService();
  
    useEffect(() => {
      updateComic();
    }, [comicId]);
  
    const updateComic = () => {
      clearError();
      getCharacter(comicId).then(onComicLoaded);
    };
  
    const onComicLoaded = (comic) => {
      setComic(comic);
    };
  
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !comic) ? <View comic={comic} /> : null;
  
    return (
      <>
        <AppBanner />
        {errorMessage}
        {spinner}
        {content}
      </>
    );
    
}

const View = ({comic}) => {
    const {name, description, thumbnail} = comic;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={name} className="single-comic__char-img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
        </div>
    )
}






export default SingleCharacterLayout;