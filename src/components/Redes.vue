<script setup>
import { defineProps } from 'vue'
import { store } from '../stores/store.js'

const props = defineProps(['mode'])

let shareApp = type => {
    let urlNota = location.href
    let url = encodeURIComponent(urlNota)


    if (type == 'fb') {
        const urlShare = `https://www.facebook.com/sharer/sharer.php?u=${url}`
        window.open(urlShare, '_blank', 'width=555,height=400')
    } else if (type == 'tw') {
        const urlShare = `https://twitter.com/share?url=${url}&text=${store.redesText}&store.redesHashs=${store.redesHash || ''}&via=lanacion&size=large`
        window.open(urlShare, '_blank', 'width=555,height=400')
    } else if (type == 'wh') {
        const urlShare = `https://wa.me/?text=${store.redesText} --> ${url}`
        window.open(urlShare, '_blank')
    } else if (type == 'mobile') {
        if (navigator.share) {
            navigator
                .share({
                    title: '¿Qué tan cerca estás de las ideas de Milei?',
                    text: 'Contestá 18 preguntas para medir tu nivel de Milei en sangre',
                    url: location.href
                })
                .then(() => console.log('Successful share'))
                .catch(error => console.log('Error sharing', error))
        }
    }

}

</script>

<template>
    <div class="redes-container" :class="[props.mode]">
        <div class="redes">
            <div class="red fb" @click="shareApp('fb')" title="Compartir en Facebook">
                <svg version="1.1" id="redFacebook" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 200 110"
                    style="enable-background:new 0 0 200 110;" xml:space="preserve">

                    <g id="facebook">
                        <path fill="#fff" class="st0" d="M26.7,36.8c-1.6,0-3.2,0-4.8,0c0-3.9,0-7.8,0-11.8c-0.8,0-1.5,0-2.3,0c0-1.4,0-2.7,0-4.2c0.7,0,1.5,0,2.2,0
		c0-0.8,0-1.5,0-2.2c0-0.6,0-1.2,0.2-1.8c0.4-2.1,1.8-3.4,3.9-3.6c1.4-0.1,2.8,0,4.3,0c0,1.3,0,2.6,0,4c-0.8,0-1.5,0-2.3,0
		c-0.9,0-1.3,0.3-1.3,1.3c0,0.7,0,1.5,0,2.3c1.2,0,2.4,0,3.7,0c-0.1,1.4-0.3,2.8-0.4,4.2c-1.1,0-2.1,0-3.2,0
		C26.7,29,26.7,32.9,26.7,36.8z" />
                    </g>
                </svg>
            </div>
            <div class="red tw" @click="shareApp('tw')" title="Compartir por X">
                <svg version="1.1" id="redTwitter" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 200 110"
                    style="enable-background:new 0 0 200 110;" xml:space="preserve">

                    <g id="x">
                        <path fill="#fff" id="path1009" class="st0" d="M4.8,39.6l9.4,12.5L4.8,62.3h2.1l8.3-8.9l6.7,8.9h7.2l-9.9-13.2l8.8-9.5h-2.1l-7.6,8.2
			l-6.1-8.2H4.8z M8,41.2h3.3l14.7,19.6h-3.3L8,41.2z" />
                    </g>

                </svg>
            </div>
            <div class="red wh" @click="shareApp('wh')" title="Compartir por WhatsApp">
                <svg version="1.1" id="redWathsapp" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 200 110"
                    style="enable-background:new 0 0 200 110;" xml:space="preserve">
                    <g id="whatsapp">
                        <path fill="#fff" id="Path_2670" class="st0" d="M125.1,11.2c-7.4,0-13.4,6-13.4,13.4l0,0c0.1,2.4,0.8,4.8,2,7l-2.4,7.2l7.4-2.4
		c2,1.1,4.2,1.7,6.5,1.7c7.4,0,13.4-6,13.4-13.4S132.6,11.2,125.1,11.2z M125.1,35.9c-2.2-0.1-4.4-0.7-6.2-1.9l-4.2,1.4l1.4-4.1
		c-1.3-2-2.1-4.3-2.2-6.7c0-6.2,5.1-11.3,11.3-11.3c6.2,0,11.3,5.1,11.3,11.3C136.4,30.9,131.4,35.9,125.1,35.9
		C125.2,35.9,125.1,35.9,125.1,35.9z" />
                        <path fill="#fff" id="Path_2671" class="st0" d="M119.5,19c0.2-0.1,0.4-0.2,0.6-0.2h1.1c0.2,0,0.3,0.2,0.4,0.3c0.1,0.3,1,2.4,1.1,2.6
		c0.2,0.3,0.1,0.6,0,0.9c-0.3,0.4-0.9,1-0.9,1c-0.1,0.1-0.2,0.4,0,0.5c0.5,0.8,1.1,1.6,1.8,2.2c0.8,0.7,1.6,1.2,2.6,1.6
		c0.6,0.2,0.7-0.1,0.9-0.3c0.2-0.3,0.9-1.1,0.9-1.1c0.2-0.2,0.5-0.3,0.7-0.1c0.5,0.2,2.7,1.3,2.7,1.3c0.2,0,0.3,0.2,0.3,0.3
		c0.1,0.7-0.1,1.5-0.6,2.1c-0.9,0.8-2.1,1.2-3.3,1c-1.9-0.4-3.7-1.3-5.2-2.5c-1.5-1.3-2.7-2.8-3.7-4.6c-0.4-0.7-0.6-1.5-0.5-2.3
		C118.3,20.6,118.7,19.7,119.5,19z" />
                    </g>

                </svg>

            </div>
            <div class="red share-mobile" @click="shareApp('mobile')">
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px" y="0px" viewBox="0 0 56.9 64.9" style="enable-background:new 0 0 56.9 64.9;"
                    xml:space="preserve">

                    <g id="Grupo_2037" transform="translate(0 0)">
                        <g>
                            <defs>
                                <rect id="SVGID_1_" y="0" width="56.9" height="64.9" />
                            </defs>
                            <clipPath id="SVGID_00000076579662090922279700000016194133369503262647_">
                                <use xlink:href="#SVGID_1_" style="overflow:visible;" />
                            </clipPath>

                            <g id="Grupo_2036" transform="translate(0 0)"
                                style="clip-path:url(#SVGID_00000076579662090922279700000016194133369503262647_);">
                                <path id="Trazado_1177" fill="#fff" class="st1" d="M45.8,42.7c-2.9,0-5.7,1.2-7.8,3.2l-16.7-9.7c1.1-2.6,1.1-5.6,0.1-8.2l15.4-10.5
				c3.6,5,10.5,6.1,15.5,2.5s6.1-10.5,2.5-15.5c-3.6-5-10.5-6.1-15.5-2.5c-3.8,2.7-5.5,7.6-4.2,12.1L19.5,24.8
				c-4-4.6-11-5.2-15.6-1.2s-5.2,11-1.2,15.6s11,5.2,15.6,1.2c0.4-0.3,0.7-0.6,1-1l16.6,9.6c-2.6,5.5-0.3,12.1,5.3,14.7
				c5.5,2.6,12.1,0.3,14.7-5.3c2.6-5.5,0.3-12.1-5.3-14.7C49.1,43.1,47.4,42.7,45.8,42.7 M45.8,3.8c4,0,7.3,3.3,7.3,7.3
				s-3.3,7.3-7.3,7.3s-7.3-3.3-7.3-7.3l0,0C38.5,7,41.8,3.8,45.8,3.8 M11.1,39.3c-4,0-7.3-3.3-7.3-7.3s3.3-7.3,7.3-7.3
				s7.3,3.3,7.3,7.3l0,0C18.4,36.1,15.1,39.3,11.1,39.3 M45.8,61.1c-4,0-7.3-3.3-7.3-7.3c0-4,3.3-7.3,7.3-7.3c4,0,7.3,3.3,7.3,7.3
				l0,0C53.1,57.8,49.8,61.1,45.8,61.1" />
                            </g>
                        </g>
                    </g>
                </svg>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.redes-container {
    margin: 0 auto;
    max-width: 900px;

    div.redes {
        display: flex;
        justify-content: center;
        margin-top: 30px;

        div.red {
            width: 40px;
            height: 40px;
            overflow: hidden;
            border: 1px solid #fff;
            border-radius: 50%;
            position: relative;
            margin: 0 5px;
            cursor: pointer;
            transition: all 0.2s ease-in;

            svg {
                width: 150px;
                position: absolute;
                top: 0px;
                left: 0px;
                transition: all 0.2s ease-in
            }

            &.tw svg {
                top: -19px;
                left: 7px;
            }

            &.wh svg {
                top: 0px;
                left: -74px;
            }

            &:hover {
                background-color: #fff;

                svg path {
                    fill: #000;
                }
            }

            &.share-mobile {

                display: none;

                svg {
                    top: 9px;
                    left: 8px;
                    width: 18px;
                }
            }

            @media (max-width: 640px) {
                display: none;

                &.share-mobile {
                    display: block;
                }
            }
        }
    }

    &.light {
        div.redes div.red {
            background-color: #fff;
            border: 1px solid #000;

            svg path {
                fill: #000;
            }

            &:hover {
                background-color: #000;

                svg path {
                    fill: #fff;
                }
            }
        }
    }
}
</style>