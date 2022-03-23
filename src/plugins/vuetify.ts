import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#7B2CBF',
                secondary: '#9D4EDD',
                accent: '#C77DFF'
            },
        },
    },
})