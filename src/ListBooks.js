import React, { Component } from 'react';
import Shelf from './Shelf';
import * as BooksAPI from './utils/BooksAPI';

import { Link } from 'react-router-dom';

class ListBooks extends Component {
	state = {
	    books:[]
	}

	componentDidMount() {
	    BooksAPI.getAll().then((books) => {
	      this.setState({ books })
	    })
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
		return (
			<div className='list-books'>
				<div className='list-books-title'>
					<h1>MyReeds</h1>
				</div>
				<div className='list-books-content'>
					<div>
						<Shelf updateBook = {this.updateBook} name='Currently Reading' books={this.state.books.filter(b => b.shelf === 'currentlyReading')}/>
						<Shelf updateBook = {this.updateBook} name='Want to Read' books={this.state.books.filter(b => b.shelf === 'wantToRead')}/>
						<Shelf updateBook = {this.updateBook} name='Read' books={this.state.books.filter(b => b.shelf === 'read')}/>
					</div>
				</div>
				<div className='open-search'>
					<Link to='/search'></Link>
				</div>
			</div>
		)
	}
}


export default ListBooks