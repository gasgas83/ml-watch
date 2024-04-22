import { reactive, ref } from 'vue'


let data = reactive({
  texto: 'Este string viene del store',
  datos: null,
  redesText: '¿Qué tan cerca estás de las ideas de Milei? - Contestá 18 preguntas para medir tu nivel de Milei en sangre',
  redesHash: '#elecciones2023'
})

const getData = async () => { 
  // const response = await fetch("https://especialess3.lanacion.com.ar/data_jsons/political_compass/resultados.json"); //json directo
  const response = await fetch("https://olcreativa.lanacion.com.ar/dev/get_url/api.php?key2=1duOTInE5NgRfpcI5Q_quSTSeXPDHyzLQvlFDTK4nOFY&gid=374578617&output=json"); //api spreadsheet
 
  data.datos = await response.json();
}

getData()

// const getData = ref(null);
// async fetch('https://especialess3.lanacion.com.ar/data_jsons/political_compass/resultados.json')
//   .then(response => response.json())
//   .then(data => getData.value = data);


export const store = data
