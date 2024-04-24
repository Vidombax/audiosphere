<script setup>

</script>

<template>
  <div class="music-player">
    <div class="top-section">
      <div class="header">
        <h5>Player</h5>
        <box-icon name='playlist' type='solid' color='#ffffff' ></box-icon>
      </div>
      <div class="song-info">
        <img src="../assets/player.png">
        <div class="description">
          <h3>Ripple Echoes</h3>
          <h5>Kael Fischer</h5>
          <p>Лучшее за 2023</p>
        </div>
        <div class="progress">
          <p>02:45</p>
          <div class="active-line"></div>
          <div class="deactive-line"></div>
          <p>01:02</p>
        </div>
      </div>
    </div>

    <div class="player-actions">
      <div class="buttons">
        <box-icon name='repeat' color='#ffffff' ></box-icon>
        <box-icon name='first-page' color='#ffffff' ></box-icon>
        <box-icon name='play-circle' color='#ffffff'></box-icon>
        <box-icon name='last-page' color='#ffffff' ></box-icon>
        <box-icon name='shuffle' color="#ffffff"></box-icon>
      </div>
    </div>

  </div>
</template>

<style scoped>
.container .right-section .music-player{
  color: #fff;
  background-color: #202026;
  border-radius: 6px;
  height: 88%;
  display: flex;
  flex-direction: column;
}

.container .right-section .music-player .top-section{
  padding: 20px;
  height: 86%;
}

.container .right-section .music-player .header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
}

.container .right-section .music-player .song-info{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  text-align: center;
}

.container .right-section .music-player .song-info img{
  width: 280px;
  height: 220px;
}

.container .right-section .music-player .description{
  margin-bottom: 36px;
}

.container .right-section .music-player .description h3{
  font-size: 34px;
  font-weight: 500;
  margin-bottom: 8px;
}

.container .right-section .music-player .description h5{
  font-size: 24px;
  margin-bottom: 4px;
}

.container .right-section .music-player .description p{
  color: #919191;
  font-size: 14px;
  font-weight: bold;
}

.container .right-section .music-player .song-info .progress{
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.container .right-section .music-player .song-info .progress p{
  font-size: 14px;
}

.container .right-section .music-player .song-info .progress .active-line{
  position: relative;
  width: 120px;
  height: 2px;
  background-color: #fff;
  margin-left: 30px;
}

.container .right-section .music-player .song-info .progress .deactive-line{
  width: 80px;
  height: 2px;
  background-color: #919191;
  margin-right: 30px;
}

.container .right-section .music-player .song-info .progress .active-line::before{
  content: "";
  background-color: #25252d;
  height: 10px;
  width: 10px;
  border: 2px solid #fff;
  position: absolute;
  top: -6px;
  left: 120px;
  border-radius: 50%;
}

.container .right-section .music-player .player-actions{
  background-color: #5773ff;
  height: 26%;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  justify-content: center;
}

.container .right-section .music-player .player-actions .buttons{
  display: flex;
  align-items: center;
  gap: 30px;
}

.container .right-section .music-player .player-actions .buttons box-icon{
  font-size: 36px;
}

.container .right-section .music-player .player-actions .buttons .play-button{
  padding: 16px;
  background-color: #fff;
  color: #5773ff;
  border-radius: 18px;
}

.container .right-section .music-player .player-actions .lyrics{
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 8px;
}
</style>
