# VUE JS

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
``computed properties`` are built based on our data and their value is updated when on of
properties their are based on change. Their can be used as our data in views:
````html
<div class="product-info">
  <h1>{{ title }}</h1>
</div>
````

## Components and props
We can create component using
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
  template: /*the html template*/,
  data() {return {}},
  methods: {
    addToCart() {
      // Will be completed in the next section
    }
  },
  computed: {}
})
````
Once created, we can use it other template:
````html
<component-name :props1="valueProps1"></compenent-name>
````

## Communicating events
To send data to our component parents vue, we emit event in our methods doing this:
````javascript`
//----
addToCart() {
this.$emit('event-name', this.props1)
}
//----
````
the component which emit that event should listen to it in order to performe some 
operation or call one of the parent's method:
````html
<component-name @event-name="updateCart" :props1="valueProps1"></compenent-name>
````
Our ``updateCart(props1Value)`` will receive the argument send through the second
argument of ``this.$emit()``


## Basic layout of a Vue Component

```html
<template>
  <header>
    <h1>
      {{title}}
    </h1>
  </header>
</template>
<script>
  export default {
    props:
      {
        title: String,
      },
  };
</script>
<style scope >
  h1 {
    color: blue;
  }
</style>
```

That actual component can be call this way:

```html
<header title="Welcome Marnel" />
```

## View component
View component are the building block of a view app. They contain:
- the **template**: by default in **html**. we can add ``lang="pug`` for
  exemple if we want to use the pug language.
- the **script**: by default in **javascript**. We can switch ``ts`` if wanted.
- the **style** bloc that can also be writen in ``scss``.\
  The ``scope`` attribute make the style be applied to the current component only.

But in such of case, we'll have to install the compiler need. To use scss for
exemple, we should consider installing ``sass-loader`` and ``node-sass``.

To know what to install in such of case, take a look at [Vue loader doc](https://vue-loader.vuejs.org/guide/pre-processors.html)


## Routing
- Routes can have ``aliases``
- A route path can be redirected to another one.
- A route can receive route-parameters that can ``/user/:username``
- Route params can be accessed in a template through ``$route.params.username``
- We can access route params as props
````javascript
{
  path: "/show/:id",
  name: "event-show",
  component: () => import(/* webpackChunkName: "event-show" */ "../views/EventShow.vue"),
  props: true
}
````
`````html
<template>
  <h1>Event show page #{{ id }}</h1>
</template>
<script>
  export default {
    props: ['id'],
  }
</script>
`````