import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import { PropTypes } from "prop-types";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";


import "./charInfo.scss";

const CharInfo = (props) => {


  const [char, setChar] = useState(null);

  const {error, loading, getCharacter, clearError} = useMarvelService();

  useEffect(() => {
    updateChar()
  }, [props.charId])


  const updateChar = () => {
    clearError();
    const { charId } = props;
    if (!charId) {
      return;
    }

      getCharacter(charId)
      .then(onCharLoaded)
  };

  const onCharLoaded = (char) => {
    setChar(char);
  };




    const skeleton = char || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;


    return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
    ) 

}

const View = ({ char }) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    let charImg = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' || 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif') {
        charImg = {'objectFit' : 'contain'}
    }
  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={charImg} />
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
        {comics.length > 0 ? null : 'Does not have comics'}
        {
            comics.map((item, i) => {
                // eslint-disable-next-line
                if(i>9) return
                const url = item.resourceURI.split("/").pop();
                return (
                    <Link to={`/comics/${url}`} key={i} className="char__comics-item">
                        {item.name}
                    </Link>
                    
                )
            })
        }
        
      </ul>
    </>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.number
}

export default CharInfo;
