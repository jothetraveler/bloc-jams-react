import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';
import styles from './Library.css';

class Library extends Component {
  constructor(props){
    super(props);
    this.state = { albums: albumData };
  }

   render() {
    return (
      <section className="Library">
        {
          this.state.albums.map( (album, index) =>
            <Link id="album-info" to={`/album/${album.slug}`} key={index}>
              <img id="album-cover" src={album.albumCover} alt={album.title} />
                <section className="album-details">
                  <div id="title">{album.title} /</div>
                  <div id="artist">{album.artist} /</div>
                  <div id="song-length">{album.songs.length} selections</div>
                </section>
            </Link>
          )
        }
      </section>
      )
    }
  }
export default Library;
