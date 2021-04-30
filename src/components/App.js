import React from 'react';
import SearchBar from './SearchBar';
import MovieList from './MovieList';
import axios from 'axios';

class App extends React.Component {

    state = {
        movies: [],

        searchQuery: ""
    }

    // Fetch ile API bağlanma
    // async componentDidMount() {
    //    // npx json-server --watch src/api/movies.json --port 3002
    //     const baseURL = "http://localhost:3002/movies"
    //     const response = await fetch(baseURL);
    //     console.log(response);
    //     const data = await  response.json();
    //     console.log(data);
    //     this.setState({movies:data});
    // }

    // Axios ile json çekme
    async componentDidMount() {
        const baseURL = "http://localhost:3002/movies";
        const response = await axios.get(baseURL);
        console.log(response);
        this.setState({ movies: response.data });
    }

    // deleteMovie = (movie) => {
    //     const newMovieList = this.state.movies.filter(
    //         m => m.id !== movie.id
    //     );
    //     this.setState(state => (
    //         { movies: newMovieList }
    //     ))
    // }

    // Fetch API 
/*  deleteMovie = async (movie) => {
        const baseURL = `http://localhost:3002/movies/${movie.id}`;
        await fetch(baseURL,
            { method: "DELETE" }
        )

        const newMovieList = this.state.movies.filter(
            m => m.id !== movie.id
        );

        this.setState(state => (
            { movies: newMovieList }
        ))
    }
    */

    // Axios API
    deleteMovie = async (movie) => {
        const baseURL = `http://localhost:3002/movies/${movie.id}`;
        axios.delete(baseURL)

        const newMovieList = this.state.movies.filter(
            m => m.id !== movie.id
        );

        this.setState(state => (
            { movies: newMovieList }
        ))
    }
  
    searchMovie = (event) => {
        console.log(event.target.value)
        this.setState({ searchQuery: event.target.value })
    }
    render() {

        let filteredMovies = this.state.movies.filter(
            (movie) => {
                return movie.name.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1
            }
        )

        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <SearchBar
                            searchMovieProp={this.searchMovie}
                        />
                    </div>
                </div>
                <MovieList
                    movies={filteredMovies}
                    deleteMovieProp={this.deleteMovie} />
            </div>
        )
    }
}

export default App;