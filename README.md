# Real Word Vue 3

```
git remote add origin git@github.com:marnelfr/vuejs.git
git branch -M main
git push -u origin main
```


## Install Vue CLI
```
yarn global add @vue/cli
```
Once installed, we've got the **vue** command that 
can be used to created our project
```
vue create project-name
```
While creating our project,
- I selected manually the features
- I selected then
  - Choose Vue version
  - Babel
  - Router
  - Vuex
  - Linter / Formatter
- Next, I selected 3.x (Preview)
- I used history mode for the router
- Then selected **ESLint + Prettier** and **Lint on save**
- And finally choosed **Dedicated config files**

We can use the vue ui that's very useful
```
vue ui
```


## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).




## Starting with vue concepts
- **v-bind**: use to dynamically bind an attribute to an expression.
````html
<a v-bind:href="url">Click here!</a>
<!-- or simply do -->
<a :href="url">Click here!</a>
`````
In case we want to bind two variable to an expression:
````html
<img :src="url" :alt="`${firstName} ${lastName}`" />
`````

- **v-if**: use to dynamically add an element in the DOM
    - **v-else-if**
    - **v-else**
````html
<a v-if="isActive" :href="url">Click here!</a>
````

- **v-show**: use to dynamically show an element in the DOM
````html
<a v-show="isVisible" :href="url">Click here!</a>
````

- **v-for**: for iteration
````html
<li v-for="detail in details">{{ detail }}</li>
<li v-for="(size, index) in sizes" :key="index">{{ size }}</li>
<div v-for="variant in variants" :key="variant.id">{{ variant.color }}</div>
````

- **v-on**: for event listener
````html
<button v-on:click="cart++" class="button">Add to Cart</button>
<!-- shorcut -->
<button @click="cart++" class="button">Add to Cart</button>
````

### Working with style
````html
<a :style="{backgroundColor: variant.color}" :href="url">I choose the {{ variant.color }}</a>
````
We can otherwise set an data that will be used:
````javascript
const app = Vue.createApp({
  data() {
    return {
      style: {
        'background-color': 'red'
      }
    }
  },
  methods: {
    updateColor(newColor) {
      // this.color = newColor
      this.style.backgroundColor = newColor
    }
  }
})
````
Then we can use it here:
````html
<a :style="style" :href="url">I choose the {{ variant.color }}</a>
````

We can merge additionnal classes to defined one:
````html
<img :class="[inStock ? '' : 'out-of-stock-img']" :src="url">I choose the {{ variant.color }}</img>
<!-- or -->
<img :class="{'out-of-stock-img': !inStock}" :src="url">I choose the {{ variant.color }}</img>
````

## Computed properties
````javascript
const app = Vue.createApp({
  data() {
    brand: "Nel's SL",
    product: "SimeG",
    selectedVariant: 0,
    variants: [
      { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
      { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 },
    ]
  },
  computed: {
    title() {
        return this.brand + ' ' + this.product
    },
    image() {
        return this.variants[this.selectedVariant].image
    }
  }
})
````
``computed properties`` are built based on our data and their value is updated when one of the
properties they are based on, changes. Their can be used as data in template:
````html
<div class="product-info">
  <h1>{{ title }}</h1>
</div>
````

## Components and props
We can create component doing
````javascript
// In /components/ComponentName.js
app.component('compenent-name', {
  props: {
    props1: {
      type: String,
      required: true
    }
    //...
  },
  template: '/*the html template of the component*/',
  data() {return {}},
  methods: {
    addToCart() {
      // Will be completed in the next section
    }
  },
  computed: {}
})
````
Once created, we can use it in other template:
````html
<component-name :props1="valueProps1"></compenent-name>
````

## Communicating events
To send data to our component parents vue, we emit event in our methods doing this:
````javascript
//----
addToCart() {
this.$emit('event-name', this.props1)
}
//----
````
The component which emit that event should listen to it in order to performe some 
operation or call one of the parent's method:
````html
<component-name @event-name="updateCart" :props1="valueProps1"></compenent-name>
````
Our ``updateCart(props1Value)`` will receive the argument send through the second
argument of ``this.$emit()``


## Forms & v-model
When working with form, 
- We can use **v-model** to two ways binding.
- Using **v-model.type** cast to the **type** specified
- **@submit.prevent="onSubmit"** is used to prevent the default submition and provide
the method (**onSubmit** here) used to submit the form

````html
<form @submit.prevent="onSubmit">
  <input v-model="name">
  <input v-model.number="age">
</form>
````


## Anatomy of a Single file component

```html
<!-- The skeleton of the component [HTML] -->
<template>
  <header>
    <p> {{ total }} </p>
    <button @click="total += 1">Increment</button>
  </header>
</template>
<!-- The brain of the component given him, his functionality [JS] -->
<script>
  export default {
    data() {
      return {
        total: 0
      }
    }
  };
</script>
<!-- the make up of the component [CSS]-->
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scope>
  p {
    color: blue;
  }
</style>
```

**App.vue** is the parent of every component in our vue app.
So when want to apply a style or display an html element to our app, 
we should consider adding it to the **App.vue** file.