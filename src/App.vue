<script setup>
import 'boxicons'
import Genre from "@/components/genre.vue";
import TopChartMusic from "@/components/topChartMusic.vue";
import NewInTrend from "@/components/newInTrend.vue";
import MusicPlayer from "@/components/musicPlayer.vue";
import Sidebar from "@/components/Sidebar.vue";
import MainPage from "@/components/MainPage.vue";
import Profile from "@/components/Profile.vue";

</script>

<template>
  <div class="container">
    <Sidebar />
    <main>
      <header>
        <div class="nav-links">
          <button class="menu-btn" id="menu-open">
            <box-icon name='menu'  color='#ffffff'></box-icon>
          </button>
          <a href="#">Музыка</a>
          <a href="#">Подписки</a>
        </div>
        <div class="search">
          <box-icon name='search' color='#ffffff' ></box-icon>
          <input type="text" placeholder="Поиск по аудиозаписям">
        </div>
      </header>
      <MainPage />
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
}

.container main header{
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.container main header .nav-links{
  display: flex;
  align-items: center;
  gap: 20px;
}

.container main header .nav-links a{
  text-transform: uppercase;
  color: #919191;
  transition: all 0.3s ease;
}

.container main header .search{
  display: flex;
  align-items: center;
  gap: 6px;
  width: 70%;
  background-color: #1d1d1d;
  border: 1px solid #464748;
  padding: 10px;
  border-radius: 8px;
}

.container main header .search input{
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  color: #fff;
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

  .container main .playlist .genres{
    width: 30%;
  }

  .container main .playlist .genres .items{
    grid-template-columns: 1fr;
  }

  .container main .playlist .genres .items .item{
    padding: 10px;
  }

  .container main .playlist .genres .items .item p{
    font-size: 12px;
  }

  .container main .playlist .genres .items .item:nth-child(6),
  .container main .playlist .music-list .items .item .info > p{
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

  .container main .playlist .genres{
    display: none;
  }

  .container main .playlist .music-list{
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

  .container .sidebar{
    position: absolute;
    left: -100%;
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

  .container main .playlist{
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
  .container main .playlist{
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
