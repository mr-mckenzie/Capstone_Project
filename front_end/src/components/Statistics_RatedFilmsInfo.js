import StatisticsFunctions from "../services/StatisticsFunctions"
import ExternalServices from "../services/ExternalServices";
import Avatar from '@mui/material/Avatar';

const RatedFilmsInfo = ({ratedFilms}) => {


    const mostWatchedGenres = StatisticsFunctions.getArrayOfGenresByMostWatched(ratedFilms)
    const highestRatedGenres = StatisticsFunctions.getArrayOfGenresByRating(ratedFilms)
    const mostWatchedActors = StatisticsFunctions.getArrayOfActorsByMostWatched(ratedFilms)
    const highestRatedActors = StatisticsFunctions.getArrayOfActorsByRating(ratedFilms)
    const mostWatchedKeywords = StatisticsFunctions.getArrayOfKeywordsByMostWatched(ratedFilms)
    const higestRatedKeywords = StatisticsFunctions.getArrayOfKeywordsByRating(ratedFilms)
    const mostWatchedCountries = StatisticsFunctions.getArrayOfCountriesByMostWatched(ratedFilms)
    const highestRatedCountries = StatisticsFunctions.getArrayOfCountriesByRating(ratedFilms)
    const mostWatchedLanguages = StatisticsFunctions.getSpokenLanguagesByMostWatched(ratedFilms)
    const highestRatedLanguages = StatisticsFunctions.getSpokenLanguagesByRating(ratedFilms)

    const mapMostWatched = (array) => {
        return array.map( element => {
            return (element[4][0] ? 
            <p><Avatar src={ExternalServices.getFullActorImageURLByPath( element[4] )}/> {element[0]} - {element[2]}</p> 
            :
            <p> {element[0]} - {element[2]}</p>
            )
        } )
    }

    const mapHighestRated = (array) => {
        return array.map( element => {
            return (element[4][0] ? 
            <p> <Avatar src={ExternalServices.getFullActorImageURLByPath( element[4] )}/> {element[0]} - {Math.round(element[3]*100)/100}</p> 
            : 
            <p>{element[0]} - {Math.round(element[3]*100)/100}</p>)
        } )
    }

    const maxNumberOfEntries = 15

    return (

        <div className="wishlist_container">
            <div className = "wishlist_card">
                <p>Films watched: {ratedFilms.length} </p>
                <p>Total minutes watched: {StatisticsFunctions.getTotalRuntime(ratedFilms)}</p>
                <p>Total hours watched: {StatisticsFunctions.getTotalRuntime(ratedFilms) / 60}</p>
            </div>
                { ratedFilms.length>0 ? 
                <>
                <div className = "wishlist_card">
                    <div>
                        <p>Most watched actors:</p> 
                        {mapMostWatched(mostWatchedActors.slice(0,maxNumberOfEntries))}
                    </div> 
                </div>

                <div className = "wishlist_card">
                    <div>
                        <p>Higest rated actors: </p> 
                        {mapHighestRated(highestRatedActors.slice(0,maxNumberOfEntries))}
                    </div>
                </div>

                <div className = "wishlist_card">
                    <div>
                        <p>Most watched genres:</p> 
                        {mapMostWatched(mostWatchedGenres.slice(0,maxNumberOfEntries))}
                    </div> 
                </div>

                <div className = "wishlist_card">
                    <div>
                        <p>Higest rated genres: </p> 
                        {mapHighestRated(highestRatedGenres.slice(0,maxNumberOfEntries))}
                    </div>
                </div>

                <div className = "wishlist_card">
                    <div>
                        <p>Most watched keywords:</p> 
                        {mapMostWatched(mostWatchedKeywords.slice(0,maxNumberOfEntries))}
                    </div> 
                </div>

                <div className = "wishlist_card">
                    <div>
                        <p>Higest rated keywords: </p> 
                        {mapHighestRated(higestRatedKeywords.slice(0,maxNumberOfEntries))}
                    </div>
                </div> 

                <div className = "wishlist_card">
                    <div>
                        <p>Most watched countries:</p> 
                        {mapMostWatched(mostWatchedCountries.slice(0,maxNumberOfEntries))}
                    </div> 
                </div>

                <div className = "wishlist_card">
                    <div>
                        <p>Higest rated countries: </p> 
                        {mapHighestRated(highestRatedCountries.slice(0,maxNumberOfEntries))}
                    </div>
                </div> 

                <div className = "wishlist_card">
                    <div>
                        <p>Most watched languages:</p> 
                        {mapMostWatched(mostWatchedLanguages.slice(0,maxNumberOfEntries))}
                    </div> 
                </div>

                <div className = "wishlist_card">
                    <div>
                        <p>Higest rated languages: </p> 
                        {mapHighestRated(highestRatedLanguages.slice(0,maxNumberOfEntries))}
                    </div>
                </div> 
            </>
            : 
            <></>}
        </div>
    )
}
export default RatedFilmsInfo