"use strict";

var video = document.querySelector("video");
var playBtn = document.getElementById("play");
var playBtnIcon = playBtn.querySelector("i");
var muteBtn = document.getElementById("mute");
var muteBtnIcon = muteBtn.querySelector("i");
var volumeRange = document.getElementById("volume");
var currentTime = document.getElementById("currentTime");
var totalTime = document.getElementById("totalTime");
var timeline = document.getElementById("timeline");
var fullScreenBtn = document.getElementById("fullScreen");
var fullScreenIcon = fullScreenBtn.querySelector("i");
var videoContainer = document.getElementById("videoContainer");
var videoControls = document.getElementById("videoControls");
var controlsTimeout = null;
var controlsMovementTimeout = null;
var volumeValue = 0.5;
video.volume = volumeValue; //default volume

var handlePlayClick = function handlePlayClick(e) {
  if (video.paused) {
    //비디오가 멈춘 상태에서 버튼을 누르면 플레이
    video.play();
  } else {
    //재생 중 상태에서 버튼을 누르면 멈춤
    video.pause();
  }
  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};
var handleMute = function handleMute(e) {
  if (video.muted) {
    //음소거된 상태에서 버튼을 누르면 음소거가 풀림
    video.muted = false;
  } else {
    //음소거 되지 않은 상태에서 버튼을 누르면 음소가됨
    video.muted = true;
  }
  muteBtnIcon.classList = video.muted ? "fas fa-volume-mute" : "fas fa-volume-up";
  volumeRange.value = video.muted ? 0 : volumeValue;
};
var handleVolumeInput = function handleVolumeInput(event) {
  var value = event.target.value;
  volumeValue = value;
  video.muted = volumeValue === "0" ? true : false;
  muteBtn.innerText = video.muted ? "Unmute" : "Mute";
  video.volume = volumeValue;
};
var formatTime = function formatTime(seconds) {
  return new Date(seconds * 1000).toISOString().substring(14, 19);
};
var handleLoadedMetadata = function handleLoadedMetadata() {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};
var handleTimeUpdate = function handleTimeUpdate() {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};
var handleTimelineInput = function handleTimelineInput(event) {
  var value = event.target.value;
  video.currentTime = value;
};
var handleFullScreen = function handleFullScreen() {
  var isFullScreen = document.fullscreenElement;
  if (isFullScreen) {
    document.exitFullscreen();
    fullScreenIcon.classList = "fas fa-expand";
  } else {
    videoContainer.requestFullscreen();
    fullScreenIcon.classList = "fas fa-compress";
  }
};
var hideControls = function hideControls() {
  return videoControls.classList.remove("showing");
};
var handleMouseMove = function handleMouseMove() {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoControls.classList.add("showing");
  controlsMovementTimeout = setTimeout(hideControls, 3000);
};
var handleMouseLeave = function handleMouseLeave() {
  controlsTimeout = setTimeout(hideControls, 2000);
};
var changeVideoTime = function changeVideoTime(seconds) {
  video.currentTime += seconds;
};
playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeInput);
video.readyState ? handleMetadata() : video.addEventListener("loadeddata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
timeline.addEventListener("input", handleTimelineInput);
fullScreenBtn.addEventListener("click", handleFullScreen);
video.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);
video.addEventListener("click", handlePlayClick);
document.addEventListener("keyup", function (event) {
  if (event.code === "Space") {
    handlePlayClick();
  }
  if (event.code === "ArrowRight") {
    changeVideoTime(5);
  }
  if (event.code === "ArrowLeft") {
    changeVideoTime(-5);
  }
});