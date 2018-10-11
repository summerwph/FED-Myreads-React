import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as BooksAPI from './utils/BooksAPI';
import Book from './Book';


class Search extends Component {
  state = {
    query: '', //query string
    books: [], // my books
    searchResult: [] // search result
  }

  componentDidMount() {
      BooksAPI.getAll().then((books) => {
        this.setState({ books })
      })
  }

//When the user type to update query, will call submitQuery function
  updateQuery = (query) => {
    this.setState({ query: query.trim() }, this.submitQuery)
  }

//Resposible for submiting query string to server and fetch corresponding data
  submitQuery() {
    //Check if query string is not empty
    if(this.state.query) {
      BooksAPI.search(this.state.query).then((result) => {
        //if response result got error, set search result to emtpy array
        if (result.error) {
            console.log('No matching search results')
            return this.setState({ searchResult: [] })
        } else {
            // Matching the book status if the book is exsited in my bookshelf
            let mybook
            result.map(b => {
              mybook = this.state.books.filter(B => B.id === b.id);
              if (mybook[0]) {b.shelf = mybook[0].shelf;}
            });
            // console.log(result)
            return this.setState({ searchResult: result })
        }
      })
    } else {
      return this.setState({ searchResult: [] })
    }
  }

// When user add the book to my bookshelf {currentlyReading, wantToRead, reed}
  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(books => {
      book.shelf = shelf;
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([ book ])
      }))
    })
  }


	render() {
      const {query, searchResult } = this.state

		return (
		<div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className='close-search'>Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
          <div className="search-books-results">
            <ol className="books-grid">
            {
                searchResult.map((book, key) => <Book updateBook={this.updateBook} book={book} key={key}/>)
            }
            </ol>
          </div>
    </div>

		)
	}
}

export default Search
