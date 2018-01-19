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
        <header>
          <h1>Bloc Jams</h1>
            <nav>
              <Link to="/">Landing</Link>
              <Link to="/library">Library</Link>

            </nav>
        </header>
        <main>
        <Route exact path="/" component={Landing} />
        <Route path="/library" component={Library} />
        <Route path="/album" component={Album} />
        </main>
      </div>
    );
  }
}

export default App;