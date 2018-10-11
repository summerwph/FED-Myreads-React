import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as BooksAPI from './utils/BooksAPI';
import Book from './Book';


class Search extends Component {
  state = {
    query: '',
    books: [],
    searchResult: []
  }

  componentDidMount() {
      BooksAPI.getAll().then((books) => {
        this.setState({ books })
      })
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() }, this.submitQuery)
  }

  submitQuery() {
    if(this.state.query) {
      BooksAPI.search(this.state.query).then((result) => {
        if (result.error) {
            console.log('No matching search results')
            return this.setState({ searchResult: [] })
        } else {
            result.forEach(b => {
              let f = this.state.books.filter(B => B.id === b.id);
              if (f[0]) {b.shelf = f[0].shelf;}
            });
            // console.log(result)
            return this.setState({ searchResult: result })
        }
      })
    } else {
      return this.setState({ searchResult: [] })
    }
  }

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
