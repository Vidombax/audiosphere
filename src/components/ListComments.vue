<script setup>
import {inject, onMounted, ref} from "vue";
import Comment from "@/components/Comment.vue";
import axios from "axios";

const {closeCommentSong, props} = inject('musicPlayer');

const idMusic = ref(0);
const comment = ref('');
const comments = ref([]);

const loadCommentSong = async () => {
  try {
    const response = await axios.get(`api/get-comments/${idMusic.value}`);
    comments.value = response.data;
  }
  catch (err) {
    console.error(err);
  }
}

const createComment = async () => {
  try {
    const response = await axios.post(`api/create-comment`, {
      idMusic: idMusic.value,
      comment: comment.value,
      idUser: Number(localStorage.getItem('id')),
    });
    comments.value = [];
    comment.value = '';
    await loadCommentSong();
  }
  catch (err) {
    console.error(err);
  }
}

onMounted(async () => {
  idMusic.value = props.idMusic;
  await loadCommentSong();

  const textarea = document.querySelector('textarea');
  if (textarea) {
    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        createComment();
      }
    });
  }
})
</script>

<template>
  <div class="listSongs">
    <div class="header">
      <box-icon name='chevron-right' type='solid' color='#ffffff' style="cursor: pointer" @click="closeCommentSong()"></box-icon>
    </div>
    <div class="items">
      <Comment v-for="item in comments" :key="item.id"
               :name-user="item.name" :comment-user="item.comment"
               :id-user="item.id_user" :img-user="item.profile_picture"
      />
    </div>
    <div class="writing">
      <textarea maxlength="50" placeholder="Напишите что-нибудь" v-model="comment"></textarea>
      <box-icon name='send' type='solid' color='#ffffff' @click="createComment"></box-icon>
    </div>
  </div>
  <div class="blackout">

  </div>
</template>

<style scoped>

.listSongs {
  padding: 15px;
  width: 325px;
  background-color: #17171c;
  position: absolute;
  left: 7.5%;
  height: 50vh;
}

.listSongs .header {
  display: flex;
  float: right;
  margin-bottom: 10px;
}

.listSongs .items {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 300px;
  width: 300px;
  overflow-y: auto;
}

.blackout {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.45);
  width: 26px;
  height: 60vh;
}

.writing {
  display: flex;
  justify-content: center;
  gap: 12px;
  align-items: center;
}

.writing textarea {
  padding: 6px;
  width: 260px;
  background-color: #1d1d1d;
  border: 2px solid #464748;
  border-radius: 4px;
  color: white;
}

@media screen and (min-width: 1550px) {
  .listSongs {
    height: 65vh;
    left: 5.8%;
    width: 425px;
    margin-top: 0;
  }
  .blackout {
    height: 65vh;
  }
  .listSongs .header {
    margin-bottom: 0;
  }
  .listSongs .items {
    width: 370px;
    height: 500px;
    margin-top: -10px;
  }
}

@media screen and (max-width: 1540px) {
  .listSongs {
    width: 325px;
    left: 7.3%;
    margin-top: 0;
    height: 59vh;
  }
  .blackout {
    height: 60vh;
  }
  .listSongs .header {
    margin-bottom: 0;
  }
  .listSongs .items {
    position: relative;
    top: -15%;
    left: -16%;
    width: 350px;
    height: 310px;
    margin-top: -10px;
    margin-bottom: -100px;
  }
  .writing {
    position: relative;
    left: -6%;
    top: -10%;
  }
}
</style>