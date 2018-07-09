import React, {Component} from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';
import styles from './Album.css';

class Album extends Component{
  constructor(props){
    super(props);

  const album = albumData.find(album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      isPlaying: false,
      volume: 1,
     };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
    };

    componentDidMount() {
       this.eventListeners= {
         timeupdate: e => {
           this.setState({ currentTime: this.audioElement.currentTime });
       },
         durationchange: e => {
           this.setState({ duration: this.audioElement.duration });
       }
     }
       this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
       this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    }

   componentWillUnmount() {
     this.audioElement.src = null;
     this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
     this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
   }

    play(){
      this.audioElement.play();
      this.setState({ isPlaying: true });
    }

    pause(){
      this.audioElement.pause();
      this.setState({ isPlaying: false });
    }

    setSong(song){
      this.audioElement.src = song.audioSrc;
      this.setState({ currentSong: song });
    }

    handleSongClick(song){
      const isSameSong = this.state.currentSong === song;
      if (this.state.isPlaying && isSameSong){
        this.pause();
      }
      else {
        if(!isSameSong) {
          this.setSong(song);
        }
        this.play();
    }
  }

      handlePrevClick(){
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        const newIndex = Math.max(0, currentIndex - 1);
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play(newSong);
      }

      handleNextClick(){
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        const newIndex = Math.min(this.state.album.songs.length, currentIndex + 1);
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play(newSong);
      }

      handleTimeChange(e){
        const newTime = this.audioElement.duration * e.target.value;
        this.audioElement.currentTime = newTime;
        this.setState({ currentTime: newTime });
      }

      handleVolumeChange(e){
        const newVolume = e.target.value/100;
        this.audioElement.volume = newVolume;
        this.setState({ volume: newVolume});
      }

      formatTime(time){
        return time ? `${Math.floor(time / 60)}:${Number(time % 60 / 100).toFixed(2).substr(2,3)}` : '-:--';

      }

      buttonFormat(){
        if (this.state.isPlaying === true && this.state.currentSong === 'song'){
        {styles.something}
      }
          else if(this.state.isPlaying === false && this.state.currentSong === 'song'){
          {styles.something}
        }
          else{
          {styles.something}
        }

      }

  render(){
    return (
      <div>
      <section className='album'>
        <section id='album-info'>
          <img id="album-cover-art" src={this.state.album.albumCover} alt="album cover"/>
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <table id="song-list">
           <colgroup>
             <col id="song-number-column" />
             <col id="song-title-column" />
             <col id="song-duration-column" />
           </colgroup>
           <tbody>
             {this.state.album.songs.map( (song, index) =>
               <tr className="song" key={index} onClick={() => this.handleSongClick(song)}>
                <td>
                 <button>
                   <span className="song-number">{index+1}</span>
                   <span className="ion-play"></span>
                   <span className="ion-pause"></span>
                 </button>
                </td>
                <td className="song-title">{song.title}</td>
                <td className="song-duration">{song.duration}</td>
              </tr>
            )
          }
           </tbody>
         </table>
         </section>

         <section id="player-bar">
         <PlayerBar
           isPlaying={this.state.isPlaying}
           currentSong={this.state.currentSong}
           handleSongClick={() => this.handleSongClick(this.state.currentSong)}
           handlePrevClick={() => this.handlePrevClick()}
           handleNextClick={() => this.handleNextClick()}
           duration={this.audioElement.duration}
           currentTime={this.audioElement.currentTime}
           handleTimeChange={(e) => this.handleTimeChange(e)}
           handleVolumeChange={(e) => this.handleVolumeChange(e)}
           formatTime={(time) => this.formatTime(time)}
         />
      </section>
      </div>
    );
  }
}

export default Album;
