# vue3-empty-project

Template para especiales interactivos en vue.js v3

![title](captura.png)

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Codigos para ARC

Genera una carpeta nota-ln con dos archivos, _critical-css.html_ con estilos estaticos para la apertura de la nota y _body.html_ con el resto de los html y contenido dinamico.

```sh
npm run nota-ln
```

### Deploy to S3 (http://especialess3.lanacion.com.ar)

Modificar el archivo _deploy_opts.js_ para definir la ruta de deploy, se generan dos archivos html para pegar el codigo en ARC

```sh
npm run deploy
```

### Node version

```sh
20.0.9
```
