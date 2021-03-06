import React from 'react';
import ReactPlayer from 'react-player';


class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
      currentSong: this.props.currentSong,
      playing: this.props.playing,
      duration: null,
      currentTime: null,
      progress: 0
    };
    this.togglePlay = this.togglePlay.bind(this);
    this.renderPlayPause = this.renderPlayPause.bind(this);
    this.updatePlaybar = this.updatePlaybar.bind(this);
    this.appear = this.appear.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({currentSong: nextProps.currentSong, playing: nextProps.playing})
  }

  updatePlaybar({ played }) {
    this.setState({progress: played * 100 });
  }

  appear() {
    if(this.state.currentSong.trackUrl === ""){
      return ( {opacity: 0} );
    } else {
      return ( {opacity: 1} );
    }
  }

  renderPlayPause() {
   if(this.state.playing === false){
     return (
       <img onTouchTap={this.togglePlay} src="https://cdn2.iconfinder.com/data/icons/media-and-navigation-buttons-round/512/Button_3-512.png" className="play-button"/>
     );
   } else {
     return (
       <img onTouchTap={this.togglePlay} src="https://cdn2.iconfinder.com/data/icons/media-and-navigation-buttons-square/512/Button_4-512.png" className="play-button"/>
     );
   }
 }

  togglePlay() {
    if(this.state.playing === true){
      this.props.receivePlaying(false);
      this.setState({playing: false});
    } else {
      this.props.receivePlaying(true);
      this.setState({playing: true});
    }
  }

  handleTime(){
    if(this.player !== undefined){
      let curMin, curSec, durMin, durSec;
      this.state.duration = this.player.getDuration();
      this.state.currentTime = this.player.getCurrentTime();
      durMin = Math.floor(this.state.duration / 60);
      curMin = Math.floor(this.state.currentTime / 60);
      durSec = Math.floor(this.state.duration % 60);
      curSec = Math.floor(this.state.currentTime % 60);
      if(durSec < 10) {durSec ='0' + durSec.toString()}
      if(curSec < 10) {curSec ='0' + curSec.toString()}
      return(
        `${curMin}:${curSec} / ${durMin}:${durSec}`
      )
    }
  }

  render() {
    let coverUrl;
    if(this.props.currentSong === undefined) {
      coverUrl = '';
    } else {
      coverUrl = this.props.currentSong.coverUrl
    }
    if(this.state.currentSong !== undefined){
      return (
        <section className="audio-player" style={this.appear()}>
          <ReactPlayer
            ref={player => {
              this.player = player;
            }}
            url={ this.state.currentSong.trackUrl }
            playing={ this.state.playing }
            onProgress={ this.updatePlaybar }
            hidden={true}
            onError={e => console.log('onError', e)}/>
          <section className='progress-bar'>
            <section className='audio-progress'
              style={{width: `${this.state.progress}%`}}>
            </section>
          </section>
          <section className='bottom-part-audio-player'>
            <div className='audio-left'>
              <img className='cover-audio-player' src={coverUrl}/>
              <h1 className="player-song-title">{this.props.currentSong.title}</h1>
            </div>
            <div className='audio-center'>
              <span className="audio-buttons">
                {this.renderPlayPause()}
              </span>
            </div>
            <div className='audio-right'>
              <h1 className="time">{this.handleTime()}</h1>
            </div>
          </section>
        </section>
      );
    } else {
      return(
        <section></section>
      )
    }
  }
}

export default AudioPlayer;
