import React, { Component } from 'react';
import './App.css'
import Search from './Search';
import ListBooks from './ListBooks';
import {Route} from 'react-router-dom';

class BooksApp extends Component {

  render() {
    return (
      <div>
        <Route exact path='/' component={ ListBooks }/>
        <Route exact path='/Search' component={ Search }/>
      </div>
    )
  }
}

export default BooksApp
