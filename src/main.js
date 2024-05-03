import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from 'vue-router'

import MainPage from "@/pages/MainPage.vue";
import GenrePage from "@/pages/GenrePage.vue";
import AlbumsPage from "@/pages/AlbumsPage.vue";
import PerformersPage from "@/pages/PerformersPage.vue";
import LibraryAlbumsPage from "@/pages/LibraryAlbumsPage.vue";
import FavouritesPage from "@/pages/FavouritesPage.vue";
import Account from "@/pages/Account.vue";
import SubscribesPage from "@/pages/SubscribesPage.vue";
import SettingsPage from "@/pages/SettingsPage.vue";
import PlaylistPage from "@/pages/PlaylistPage.vue";
import RegistrationPage from "@/pages/RegistrationPage.vue";

const app = createApp(App)

const routes = [
    { path: '/', name: 'Main', component: MainPage },
    { path: '/genres', name: 'Genre', component: GenrePage },
    { path: '/albums', name: 'Albums', component: AlbumsPage },
    { path: '/performers', name: 'Performers', component: PerformersPage },
    { path: '/favourite-albums', name: 'FavouriteAlbums', component: LibraryAlbumsPage },
    { path: '/favourites', name: 'Favourites', component: FavouritesPage },
    { path: '/account', name: 'Account', component: Account },
    { path: '/subscribes', name: 'Subscribes', component: SubscribesPage },
    { path: '/settings', name: 'Settings', component: SettingsPage },
    { path: '/playlist', name: 'Playlist', component: PlaylistPage },
    { path: '/registration', name: 'Registration', component: RegistrationPage },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

app.use(router)
app.mount('#app')
