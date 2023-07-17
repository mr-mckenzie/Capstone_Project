import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import ExternalServices from '../services/ExternalServices';
import InternalServices, { postFilmToDatabase } from '../services/InternalServices';
import RatingComponent from "./Search_RatingComponent"



// to do with on page styling
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

// this is the main function in this folder
const AutoGrid = ({listOfFilmsFromAPI, wishlist, setWishlist}) => {

    // adding the rating key value pair to api output
    const addRatingKeyValuePair = (filmWithAddedRating, rating = null) => {
        filmWithAddedRating["rating"] = rating
        return filmWithAddedRating
    }
    
    // attempting to add films to a wishlist
    const addToWishlist = (filmIdToAddToWishlist, rating = null) => {
        ExternalServices.getFilmById(filmIdToAddToWishlist)
        .then(wishlistFilm => { 
            const wishlistFilmWithRating = addRatingKeyValuePair(wishlistFilm, rating)
            postFilmToDatabase(wishlistFilmWithRating)
            setWishlist([...wishlist, wishlistFilmWithRating])
        })
    }

    // returning a grid of film titles and posters
    const mapFilms = (filmsToMap) => {
        let mappedFilms = []
        if (filmsToMap && filmsToMap.length > 0) {
            mappedFilms = filmsToMap.map( film => {
                return (
                    <div className="film_container">
                      <p>{film.title}</p>
                      <img src={ExternalServices.getFullPosterURLByPath(film.poster_path)} alt="film poster" className='film_poster'/>
                      <button onClick ={()=>{addToWishlist(film.id)}}>Add to Wishlist</button>
                      <RatingComponent addToWishlist = {addToWishlist} filmId = {film.id}/>
                    </div>
                )
            })
          }
        return mappedFilms
    }

    return (
      <div className="search_results">
        {mapFilms(listOfFilmsFromAPI)}
        <button></button>
      </div>
    );
}

export default AutoGrid