<script setup>
import { onMounted, reactive, ref, computed } from 'vue'

let data = reactive({
  datos: null,
  actualOffset: 50
})

const getData = async () => {
  // const response = await fetch("https://especialess3.lanacion.com.ar/data_jsons/political_compass/resultados.json"); //json directo
  const response = await fetch("https://api.mercadolibre.com/sites/MLA/search?q=reloj%20casio&category=MLA1442&condition=used&offset=" + data.actualOffset); //api spreadsheet

  data.datos = await response.json();

  console.log(data.datos)
}

onMounted(() => { // mounted
  getData()
})

const totalOffsets = computed(() => { //computed
  return data.datos.paging.total / 50;
})

const results = computed(() => { //computed
  if (data.datos) {
    return data.datos.results
  } else {
    return []
  }
})



// const increment = () => {  //metodo
//   counter.count++
// }

// const hideLoader = () => { // los metodos se definen con funciones
//   const loader = document.getElementById('preload_ln')
//   if (loader) loader.style.display = 'none'
// }

</script>

<template>
  <div class="list">
    <div class="item" v-for="item in results">
      <img :src="item.thumbnail" alt="">
      {{ item.title }}
    </div>
  </div>
</template>

<style lang="scss"></style>
