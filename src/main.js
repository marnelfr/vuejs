import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const app = createApp(App).use(store).use(router);

const requireComponent = require.context(
    './components/base',
    false,
    /[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName)

    const componentName = upperFirst(
        camelCase(
            fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
        )
    )

    app.component(
        componentName.replace('Base', ''),
        componentConfig.default || componentConfig
    )
})

// app.component('BaseIcon', BaseIcon);

app.mount("#app");