import { Injectable } from '@angular/core';
import { TemplateConfig } from '../template-config/config.interface';

@Injectable( {
    providedIn: 'root'
} )
export class ConfigService {

    public templateConf: TemplateConfig;

    constructor () {
        this.setConfigValue();
    }

    setConfigValue() {
        this.templateConf = {
            layout: {
                variant: 'Light', // options:  Dark, Light & Transparent
                dir: 'ltr', //Options: ltr, rtl
                sidebar: {
                    collapsed: false, //options: true, false
                    size: 'sidebar-md', // Options: 'sidebar-lg', 'sidebar-md', 'sidebar-sm'
                    //backgroundColor: "linear- gradient( ${ start }, ${ end }"
                    //backgroundColor: 'linear-gradient( blue, red)',
                    backgroundColor: "", // Options: 'black', 'pomegranate', 'king-yna', 'ibiza-sunset', 'flickr', 'purple-bliss', 'man-of-steel', 'purple-love', "primary-cyan"
                    backgroundImage: true, // Options: true, false | Set true to show background image
                    backgroundImageURL: 'linear-gradient( blue, red)',
                    //'assets/img/sidebar-bg/01.jpg'
                }
            }
        }
    }



}
