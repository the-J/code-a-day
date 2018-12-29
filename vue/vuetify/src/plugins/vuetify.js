import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';

Vue.use(Vuetify, {
    iconfont: 'md',
    theme: {
        primary: '#7718e8',
        success: '#009944',
        info: '#63c0df',
        warning: '#f0541e',
        error: '#cf000f'
    }
});
