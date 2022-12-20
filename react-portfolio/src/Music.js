import './Music.css';

import Player from "./components/player.js"
import Track from "./components/track.js"

import Paper from '@mui/material/Paper';

import { useRef, useState, useEffect } from 'react';

import oz from './assets/music/40oz_mixed.mp3'
import dino from './assets/music/dino_sample.mp3'
import stacy from './assets/music/stacy.mp3'
import uv from './assets/music/uv_sample.mp3'
import james from './assets/music/james_is_a_demo.mp3'

function Music() {
  const songs = [oz, dino, stacy, uv, james]
  const songNames = ["40oz Instrumental Cover", "Dino Sample", "Stacy's Mom Instrumental", "Ultraviolet Sample", "James is a Demo"]

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [songName, setSongName] = useState(songNames[0])
  const [songDuration, setSongDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState("0:00")
  const [maxDuration, setMaxDuration] = useState("0:25")

  const [volume, setVolume] = useState(0.6)
  const [mute, setMute] = useState(false)

  const audioElem = useRef();

  useEffect(() => {
    if(mute === true){
      audioElem.current.volume = 0
    } else {
      audioElem.current.volume = volume
    }
    
    const duration = audioElem.current.duration;
    if(isNaN(duration) === false){
      var minutes = Math.floor(duration / 60);
      var seconds = duration - minutes * 60;
      seconds = Math.round(seconds)
      seconds = (seconds < 10) ? '0' + seconds.toString() : seconds.toString();
      const maxD = minutes.toString() + ':' + seconds.toString();
      setMaxDuration(maxD)
    }
    
    if (isPlaying) {
      audioElem.current.play();
    } else {
      audioElem.current.pause();
    }
  })

  const onPlaying = () => {
    const duration = audioElem.current.duration;
    const ct = audioElem.current.currentTime;

    setSongDuration(ct / duration * 100);

    var minutes = Math.floor(ct / 60);
    var seconds = ct - minutes * 60;
    seconds = Math.round(seconds)
    seconds = (seconds < 10) ? '0' + seconds.toString() : seconds.toString();
    const timeStamp = minutes.toString() + ':' + seconds.toString();

    setCurrentTime(timeStamp);

  }

  const onEnd = () =>{
    setIsPlaying(false);
  }

  const ozClick = () =>{
    if(songName === songNames[0]){
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(songs[0])
      setSongName(songNames[0])
      audioElem.current.currentTime = 0;
      setIsPlaying(true);
    }
    
  }
  const dinoClick = () =>{
    if(songName === songNames[1]){
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(songs[1])
      setSongName(songNames[1])
      audioElem.current.currentTime = 0;
      setIsPlaying(true);
    }
  }
  const stacyClick = () =>{
    if(songName === songNames[2]){
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(songs[2])
      setSongName(songNames[2])
      audioElem.current.currentTime = 0;
      setIsPlaying(true);
    }

  }
  const uvClick = () =>{
    if(songName === songNames[3]){
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(songs[3])
      setSongName(songNames[3])
      audioElem.current.currentTime = 0;
      setIsPlaying(true);
    }
  }
  const jamesClick = () =>{
    if(songName === songNames[4]){
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(songs[4])
      setSongName(songNames[4])
      audioElem.current.currentTime = 0;
      setIsPlaying(true);
    }
  }

  const click = () =>{
    setIsPlaying(!isPlaying);
  }
  const backFn = () =>{
    const index = songNames.indexOf(songName)

    setCurrentSong(songs[index === 0 ? songNames.length - 1 : index - 1])
    setSongName(songNames[index === 0 ? songNames.length - 1 : index - 1])
    audioElem.current.currentTime = 0;

  }
  const nextFn = () =>{
    const index = songNames.indexOf(songName)

    setCurrentSong(songs[index === songNames.length - 1 ? 0 : index + 1])
    setSongName(songNames[index === songNames.length - 1 ? 0 : index + 1])
    audioElem.current.currentTime = 0;

  }

  return (
    <div className="Music">
      <Player playFn = {click} 
        playing = {isPlaying} 
        songName = {songName} 
        percentage = {isNaN(songDuration) ? 0:songDuration}
        ct = {currentTime}
        audioElem={audioElem}
        setSongDuration = {setSongDuration}
        backFn = {backFn}
        nextFn = {nextFn}
        maxDuration = {maxDuration}
        volume = {volume}
        setVolume = {setVolume}
        setMute = {setMute}
        mute = {mute}
      />
      <audio 
        src={currentSong}
        ref={audioElem}
        onTimeUpdate={onPlaying}
        onEnded={onEnd}
      />

      <Paper className = "musicPlayer" elevation = {3}>
        <Track title = {songNames[0]} clickFn = {ozClick} playing = {isPlaying} songName = {songName}/>
        <Track title = {songNames[1]} clickFn = {dinoClick} playing = {isPlaying} songName = {songName}/>
        <Track title = {songNames[2]} clickFn = {stacyClick} playing = {isPlaying} songName = {songName}/>
        <Track title = {songNames[3]} clickFn = {uvClick} playing = {isPlaying} songName = {songName}/>
        <Track title = {songNames[4]} clickFn = {jamesClick} playing = {isPlaying} songName = {songName}/>
      </Paper>

      <div className = "holder"/>

    </div>
  );
  }
  
  export default Music;
  