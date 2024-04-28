<script setup>
import 'boxicons'
import MusicPlayer from "@/components/musicPlayer.vue";
import Sidebar from "@/components/Sidebar.vue";
import Profile from "@/components/Profile.vue";
import Header from "@/components/Header.vue";
</script>

<template>
  <div class="container">
    <Sidebar />
    <main>
      <Header />
      <router-view></router-view>
    </main>
    <div class="right-section">
    <Profile />
    <MusicPlayer />
    </div>
  </div>
</template>

<style>
img{
  object-fit: cover;
  object-position: top;
  border-radius: 8px;
}

.container main{
  padding: 20px 36px;
  margin-left: 65px;
}

.container .right-section{
  padding: 20px 36px 20px 0;
}

.container main header .nav-links button,
.container .sidebar .logo button{
  display: none;
  align-items: center;
  justify-content: center;
  background-color: #1d1d1d;
  border: 1px solid #464748;
  font-size: 20px;
  padding: 4px;
  border-radius: 8px;
  cursor: pointer;
}

.container .right-section .music-player {
  width: 400px;
}

.genres .items .item a img {
  width: 200px;
  height: 200px;
}

@media screen and (max-width: 1560px){
  .container .right-section .music-player {
    margin-left: 5px;
    width: 360px;

  }
  .container main {
    margin-left: 20px;
  }
  .genres .items .item a img {
    width: 150px;
    height: 150px;
  }
}

@media screen and (max-width: 1400px) {

  .container .sidebar .playing .bottom p{
    font-size: 10px;
  }

  .container main header .search{
    width: 50%;
  }

  .container main .trending .left .info h2{
    font-size: 36px;
  }

  .container main .trending img{
    width: 200px;
    height: 180px;
  }

  .container main .albums .genres{
    width: 30%;
  }

  .container main .albums .genres .items{
    grid-template-columns: 1fr;
  }

  .container main .albums .genres .items .item{
    padding: 10px;
  }

  .container main .albums .genres .items .item p{
    font-size: 12px;
  }

  .container main .albums .genres .items .item:nth-child(6),
  .container main .albums .popularAlbums .items .item .info > p{
    display: none;
  }

}

@media screen and (max-width: 1200px) {

  .container main header .search{
    width: 40%;
  }

  .container main .trending .left .info h2{
    font-size: 24px;
  }

  .container main .trending .left .info h5{
    display: block;
    font-size: 12px;
    margin-left: 0;
  }

  .container main .trending .left .info .buttons button{
    padding: 10px 12px;
    font-size: 12px;
  }

  .container main .trending .left .info .buttons i{
    font-size: 14px;
  }

  .container main .albums .genres{
    display: none;
  }

  .container main .albums .popularAlbums{
    width: 100%;
  }

  .container .right-section .music-player{
    height: 88%;
  }

  .container .right-section .music-player .song-info img{
    width: 220px;
    height: 220px;
  }

  .container .right-section .music-player .song-info .description h3{
    font-size: 22px;
  }

  .container .right-section .music-player .song-info .progress{
    margin: 0;
  }

  .container .right-section .music-player .song-info .progress .active-line{
    width: 80px;
  }

  .container .right-section .music-player .song-info .progress .deactive-line{
    width: 40px;
  }

  .container .right-section .music-player .song-info .progress .active-line::before{
    left: 80px;
  }

  .container .right-section .music-player .player-actions .buttons{
    margin-top: 30px;
  }

  .container .right-section .music-player .player-actions .buttons .play-button{
    padding: 10px;
    border-radius: 16px;
  }

}

@media screen and (max-width: 992px) {

  .container{
    grid-template-columns: 3fr 2fr;
  }

  .container main {
    margin-left: 0px;
  }

  .container .sidebar{
    position: absolute;
    left: -100%;
  }

  .container .sidebarNotFixed {
    display: none;
  }

  .container .sidebar .playing{
    display: none;
  }

  .container main header .nav-links a{
    font-size: 13px;
  }

  .container main header .search{
    width: 38px;
  }

  .container main header .search input{
    display: none;
  }

  .container main .trending img{
    width: 120px;
    height: 100px;
    margin-top: 66px;
  }

  .container main .albums{
    margin-top: 40px;
  }

  .container .right-section .music-player{
    height: 87%;
  }

  .container .right-section .music-player .song-info img{
    width: 180px;
    height: 180px;
  }

  .container .right-section .music-player .player-actions .buttons{
    margin-top: 38px;
  }

  .container .right-section .music-player .player-actions .buttons i{
    font-size: 18px;
  }

  .container main header .nav-links button,
  .container .sidebar .logo button{
    display: flex;
  }

}

@media screen and (max-width: 768px) {

  .container{
    grid-template-columns: 1fr;
  }

  .container main .trending,
  .container main .albums{
    display: none;
  }

  .container main header .search{
    width: 40%;
  }

  .container main header .search input{
    display: block;
  }

  .container .right-section{
    padding: 20px 36px;
  }

  .container .right-section .profile{
    justify-content: center;
    margin-bottom: 20px;
  }

  .container .right-section .music-player{
    height: 100%;
  }

  .container .right-section .music-player .song-info img{
    width: 300px;
    height: 190px;
  }

  .container .right-section .music-player .buttons i{
    font-size: 22px;
  }

}
</style>
