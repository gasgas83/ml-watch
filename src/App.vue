<script setup>
import { onMounted, reactive, ref, computed } from 'vue'

let searchDefault = 'reloj%20casio'
let searchStorage = 'watches-deleted'
let searchCategory = 'MLA1442'


const queryString = window.location.search; // Get the query string from the URL
const urlParams = new URLSearchParams(queryString);

if (urlParams.get('search')) {
  searchDefault = urlParams.get('search');
  searchStorage = urlParams.get('storage');
  searchCategory = urlParams.get('category');

  if (searchDefault === 'Zenith astra') {
    searchDefault = searchDefault + '&WHEEL_SIZE=[26-26]&BRAND=27710'
  } else if (searchDefault == 'cannondale') {
    searchDefault = searchDefault + '&WHEEL_SIZE=[26-26]&BRAND=2364179'
  }
}

console.log(urlParams.get('search'), urlParams.get('storage'))

let data = reactive({
  datos: null,
  actualOffset: 0,
  allPost: [],
  totalOffsets: 0,
  totalResults: 0,
  watchesDeleted: [],
  cargado: false,
  message: 'Cargando...'
})

let changeData = () => {

  let d = data.datos.results.map(e => {
    data.allPost.push({
      "title": e.title,
      "price": e.price,
      "permalink": e.permalink,
      "thumbnail": e.thumbnail,
      "id": e.id
    })
  })

  if (data.actualOffset < data.totalResults) {
    data.actualOffset = data.actualOffset + 50
    // console.log(data.actualOffset, data.allPost.length)
    fetchData()
  } else {
    data.message = 'Filtrando...'

    let filtered = data.allPost.filter(d => {
      return !data.watchesDeleted.includes(d.id);
    })

    data.allPost = filtered

    data.cargado = true

  }

}

async function getToken() {
  // ML oauth
  const authUrl = "https://api.mercadolibre.com/oauth/token";
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append("client_id", "854702091184758");
  params.append("client_secret", "gHCSsh164uR99auIgU0Ar1ev9xV6FLX5");

  const response = await fetch(authUrl, {
    method: "POST",
    body: params,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const dataAou = await response.json();
  const token = dataAou.access_token;

  console.log('token ', token)

  fetchData(token)


}

async function fetchData(token) {
  try {
    const response = await fetch("https://api.mercadolibre.com/sites/MLA/search?q=" + searchDefault + "&category=" + searchCategory + "&condition=used&offset=" + data.actualOffset, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    data.datos = await response.json();
    data.totalOffsets = data.datos.paging.total / 50;
    data.totalResults = data.datos.paging.total
    // Call your function here passing the data
    changeData(data);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

const totalDeleted = computed(() => {
  return data.watchesDeleted.length
})

const percent = computed(() => {
  return Math.floor(100 * data.actualOffset / data.totalResults) + '%'
})

// methods

const getDataStorage = () => {
  if (localStorage.getItem(searchStorage) == null) {
    localStorage.setItem(searchStorage, JSON.stringify(data.watchesDeleted))
  } else {
    data.watchesDeleted = JSON.parse(
      localStorage.getItem(searchStorage)
    )
    console.log(data.watchesDeleted)
  }
}

const getPrice = (price) => {
  let p = price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  p = p.slice(0, p.indexOf('.00'));
  p = p.replace(/,/g, '.');

  return p
}

const deleteItem = (id) => {
  data.watchesDeleted.push(id)
  data.allPost = data.allPost.filter(item => item.id !== id);
  localStorage.setItem(searchStorage, JSON.stringify(data.watchesDeleted))
}



onMounted(() => { // mounted
  getDataStorage();
  getToken()
  // fetchData();
})

</script>

<template>
  <div class="list">
    <div class="total">Deleted: <b>{{ totalDeleted }}</b> | Total no deleted:<b>{{ data.allPost.length }}</b></div>
    <div class="item" v-for="item in data.allPost" v-if="data.cargado" :key="item.id">
      <img :src="item.thumbnail" alt="">
      <p><a :href="item.permalink" target="_blank">{{ item.title }}</a></p>
      <div class="bottom-card">
        <div class="price">{{ getPrice(item.price) }}</div>
        <button @click="deleteItem(item.id)">Eliminar</button>
      </div>

    </div>

    <div v-else style="padding-top:40vh">{{ data.message }} {{ percent }}</div>
  </div>
</template>

<style lang="scss">
div.list {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-around;
  font-family: Arial, Helvetica, sans-serif;

  div.total {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #fff;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    text-align: center;
  }

  div.item {
    width: 15%;
    padding: 20px;
    margin-bottom: 30px;
    transition: all 0.3s ease-in-out;
    display: flex;
    flex-direction: column;

    @media (max-width: 650px) {
      width: 50%;
    }

    &:hover {
      background-color: #f7f7f7;
    }

    img {
      width: 100%;
    }
  }

  div.item div.bottom-card {
    display: flex;
    margin-top: auto;

    button {
      margin-left: auto;
    }
  }
}
</style>
