import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Landing from './components/Landing.js';
import Library from './components/Library.js';
import Album from './components/Album.js';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Bloc Jams</h1>
            <nav className="App-nav">
              <Link className="App-nav-title"to="/">Landing</Link>
              <Link className="App-nav-title"to="/library">Library</Link>

            </nav>
        </header>
        <main>
        <Route exact path="/" component={Landing} />
        <Route path="/library" component={Library} />
        <Route path="/album/:slug" component={Album} />
        </main>
      </div>
    );
  }
}

export default App;
