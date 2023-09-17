import React, {useState, useEffect} from "react";
import  { Router, Switch, Route, Link }from "react-router-dom";
import Moviedetail from "./components/moviedetail";
import './App.css';
import Footer from './components/footer'
import Menu from './assets/Menu.png'
import Tv from './assets/tv.png'
import Rating from './assets/Rating.png'
import Play from './assets/play.png'
import Next from './assets/Icon.png'
import Heart from './assets/Heart.png'

function App({movie}) {
  const [searchTerm, setSearchTerm] = useState("")
  const [movieList, setMovieList] = useState([]);

  const getMovies = (searchTerm) => {
    let apiUrl = "https://api.themoviedb.org/3/discover/movie?api_key=a046c138492d6af3e6014d07b4669c1e";
    if (searchTerm) {
      apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=a046c138492d6af3e6014d07b4669c1e&query=${searchTerm}`;
    }

    fetch(apiUrl)
      .then(res => res.json())
      .then(json => setMovieList(json.results))
  };

  useEffect(() => {
    getMovies();
  }, []);

//  const {id} = movie;
//const currentPath = window.location.pathname;
//const link ='';
//console.log(currentPath)
//if (currentPath === '/movies') { 
//  link = `${id}`;
//} else if (currentPath === '/') {
//  link = `movies/${id}`
//} 

return(
  <Router>
<>

<header className="header">
      <div className="container">
                <div className="navbar">
                <div className="logo-item">
                    <img src={Tv} className="logo" alt="movieapp" />
                    <h3 className="text-logo">MovieBox</h3>
                </div>
                <div className="searchBox">
          <input
            className="search"
            type="search"
            value={searchTerm}
            placeholder="What do you want to watch?"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="fa fa-search fa-sm icon" onClick={() => getMovies(searchTerm)}></i>
        </div>

          <div className="signIn logo-item">
                    <h3 className="text-logo">Sign in</h3>
                    <img src={Menu} className="logo" alt="signIn"/>
                </div>
                </div>
                <div className="row">
                    <div className="col-1">
                        <h2>John Wick 3:<br/>Parabellum</h2>
                        <img src={Rating} alt="rating" className="john-rating"/>
                        <p>Lorem ipsum, dolor sit amet consectetur<br/> adipisicing elit. Doloribus sit saepe eius <br/> quam possimus recusandae perspiciatis <br/> delectus quia nihil, maxime dolorum.</p>
                        <button className="btn-trailer"><img src={Play} alt="play" /> Watch Trailer</button>
                    </div>
                </div>
      </div>

  </header>
        <Switch>
        <Route path="/movies/:id" component={Moviedetail}>
            <Moviedetail />
          </Route>
          <Route path="/">
        <section className="small-container">
            <div className="feature-top">
                <h2>Featured Movies</h2>
                <a href="">See more <img src={Next} alt="seeMore" /></a>
            </div>
            <div className="movies-container">
            {movieList.slice(0, 10).map((movie)=>(
            <Link  to={`/movies/${movie.id}`} key={movie.id}>
                <article key={movie.id} className="movie-card"  data-testid="movie-card">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}  
                    data-testid="movie-poster" 
                    alt="movie-poster" 
                    className="movie-image"/>
                    <div className="movie-info">
                    <p className="movie-release-date" data-testid="movie-release-date">{movie.release_date}</p>
                    <h3>{movie.original_title}</h3>
                
                    <img src={Rating} alt="imdb" />
                    </div>
                    <button><img src={Heart} alt='add to favourite' className='add-to-fav'/></button>
                </article>
                </Link>
                
            ))}
            </div>
        </section>
        </Route>
        </Switch>
  <Footer />
  </>
  </Router>
)}

export default App;
