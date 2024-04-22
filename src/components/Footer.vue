<script setup>
import { store } from '../stores/store.js'
import Redes from './Redes.vue'

const credits = [
    {
        role: 'EDICIÓN PERIODÍSTICA',
        staff: [
            {
                name: 'Nicolás Cassese',
                twHandle: 'ccassese'
            }
        ]
    },
    {
        role: 'edición visual',
        staff: [
            {
                name: 'Pablo Loscri',
                twHandle: 'ploscri'
            }
        ]
    },
    {
        role: 'Desarrollo frontend',
        staff: [
            {
                name: 'Gastón de la Llana',
                twHandle: 'gasgas83'
            }
        ]
    },
    {
        role: 'Desarrollo backend',
        staff: [
            {
                name: 'Melisa A. Vera Chavez',
                twHandle: 'MelyVeraChavez'
            },
            {
                name: 'Gabriel Alonso Quiroga',
                twHandle: 'galonso'
            }

        ]
    },
    {
        role: 'Análisis de datos',
        staff: [
            {
                name: 'Bruno Soifer',
                twHandle: 'BrunoSoifer'
            }
        ]
    }
]
</script>

<template>
    <div class="footer">
        <h1 class="footer-title">Créditos</h1>
        <div class="roles">
            <div class="role" v-for="item in credits" :key="item.role">
                <h3>{{ item.role }}</h3>
                <p v-for="person in item.staff" :key="person.string">
                    {{ person.name }}
                    <a :href="'https://twitter.com/' + person.twHandle" target="_blank" v-if="person.twHandle">@{{
                        person.twHandle }}</a>
                </p>
            </div>
        </div>
        <h1 class="footer-title">Compartir</h1>
        <Redes />
        <div id="copyright"> Copyright 2024 - SA LA NACION | Todos los derechos reservados </div>
    </div>
</template>

<style lang="scss">
.footer {
    padding: 1rem;
    // padding-top: 10vh;
    // padding-bottom: 10vh;
    background-color: #000;
    color: white;
    text-align: center;
    border-top: 1px solid #434b56;

    .footer-title {
        margin: 0;
        margin-bottom: 1rem;
        font-family: 'Prumo', Georgia, 'Times New Roman', Times, serif;
        font-size: 20px;
        font-variation-settings: "wght" 50, "opsz" 50;
        line-height: 50px;
        padding-top: 20px;
        color: #fff;
        border-bottom: 1px solid #fff;
        max-width: 170px;
        margin: auto;
        font-weight: normal;
        text-transform: uppercase;
        // display: none;

        @media (max-width: 640px) {
            padding-bottom: 20px;
        }
    }

    .roles {
        display: flex;
        gap: 2rem;
        flex-direction: row;
        justify-content: center;
        line-height: 1.5;
        padding: 10px 0;
        padding-top: 50px;

        @media (max-width: 640px) {
            gap: 20px;
            flex-direction: column;
        }

        .role {
            //display: flex;
            justify-content: center;
            gap: 10px;
            text-align: left;
            border-right: 1px dotted#656565;
            padding-right: 20px;

            &:last-child {
                border: 0;
            }

            @media (max-width: 640px) {
                flex-direction: column;
                gap: 0;
                text-align: center;
                border: 0;
                padding-right: 0;
            }

            h3 {
                font-size: 13px;
                margin: 0;
                text-transform: uppercase;
                font-family: 'Prumo', Georgia, 'Times New Roman', Times, serif;
                font-variation-settings: "wght" 120, "opsz" 20;
                margin-bottom: 10px;
                font-weight: normal;

                @media (max-width: 640px) {
                    font-size: 13px;
                }
            }

            p {
                font-size: 14px;
                margin-top: 5px;
                margin: 0;
                font-family: 'Prumo', Georgia, 'Times New Roman', Times, serif;
                font-variation-settings: "wght" 90, "opsz" 20;
                color: #929292;

                @media (max-width: 640px) {
                    font-size: 14px;
                }

                a {
                    font-weight: 400;
                    color: #c87253;
                    transition: 0.3s ease-in-out;
                    font-size: 14px;

                    &:hover {
                        opacity: 1;
                    }
                }
            }
        }
    }

    #copyright {
        color: #fff;
        font-size: 12px;
        text-align: center;
        margin: 20px 0;
        padding: 20px;
        text-transform: uppercase;
        line-height: 1.4;
        font-family: Arial, Helvetica, sans-serif;

        @media (max-width: 640px) {
            font-size: 11px;
        }
    }
}
</style>
