# Coding with real world Vue3 App

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



## Routing
- Routes can have ``aliases``. But we shouldn't use them if we care about CEO:
``{path: "/create", alias: "/created"}``
- A route path can be redirected to another one: ``{path: "/show-it", redirect: {name: 'event-show'}}``
- A route can receive route-parameters: ``/user/:username``
- Route params can be accessed in a template through ``$route.params.username``
- We can access route params as props. For that, simply add ``props: true`` to our route definition
- Rather than hard coding route link, we can access them through their **name** and provide their **params**
and receive the ``props`` inside the component:
````javascript
// defining a route in router/index.js
{
  path: "/show/:id",
  name: "event-show",
  component: () => import(/* webpackChunkName: "event-show" */ "../views/EventShow.vue"),
  props: true
}
Using **webpackChunkName** split our index.html in order to only pre-load the needed components.

// using a route inside NavBar.vue
<router-link class="event-link" :to="{ name: 'event-show', params: { id: 1 } }">Event Show</router-link>
````
`````html
<!--inside EventShow.vue-->
<template>
  <h1>Event show page #{{ id }}</h1>
</template>
<script>
  export default {
    props: ['id'],
  }
</script>
`````


## API calls with Axios
To install: ```npm install axios```\
It's include many features such as:
- GET, POST, PUT, and DELETE requests
- Add authentication to each request
- Set timeouts if requests take too long
- Configure defaults for every request
- Handle errors and cancel requests properly
- Properly serialize and deserialize requests & responses
- ...
Usage example:
````javascript
import axios from 'axios'

axios.get('url').then(response => {
  // access response.data and use it...
}).catch(error =>  {
  // handle the error
})
````
Since every component has a lifecycle such as 
- beforeCreate, created
- beforeMount, mounted
- beforeUpdate, updated
- beforeUnmount, unmounted
- errorCaptured
- renderTracked
- renderTriggered

We can make our **API Call** in the **created** hook.

## Reorganizing our code into a service layer
````javascript
// in @/services/EventService.js
import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://my-json-server.typicode.com/marnelfr/vuejs',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getEventList() {
    return apiClient.get('/events')
  }
}
````
We can then import our service and use it this way:
````javascript
EventService.getEventList().then().catch()
````


## Routing

for path: localhost/events?page=7
```$router.query.page```

for path: localhost/events/:page
```$router.params.page```


for path: localhost/events?e=3
````javascript
const routes = [
	{
		path: '/',
		props: (route) => ({ newName: route.query.e})
	}
]
````
We can receive the e value through **newName** in our template

```vue.watchEffect(callback)```
When **reactive objects** that are accessed inside the callback change, the callback is run again.\
In a vue component, props and our data are reactive.

```response.headers['x-total-count']``` returns the total record from the API called event if there is an limit.



## Nested routes
We can create nested routes using a ``layout``, a ``router-view`` and ``children`` 
attributes while defining our routes.
- We define a PATH leading to the **layout** view.
- Our layout contains the **router-view** that will be fulled by the template of nested routes. It can send props to them
- Our PATH (can receive props) have the **children** attribute, an array, containing the nested routes that can't receive props

````html
<!-- Layout.vue -->
<template>
  <div>
    <div class="nav">
      <router-link 
        :to="{ name: 'EventDetails', params: { id } }"
      >Details</router-link>
      <router-link 
        :to="{ name: 'EventRegister', params: { id } }"
      >Register</router-link>
    </div>

    <!-- Sending props to the nested templates -->
    <router-view :event="event" />
  </div>
</template>
````
````javascript
const routes = [
  {
    path: '/event/:id',
    name: 'EventLayout',
    component: () =>
      import(/* webpackChunkName: "details" */ '@/views/event/Layout.vue'),
    props: true,
    children: [
      {
        path: '', //will be loaded at the route of the parent path
        name: 'EventDetails',
        component: () =>
          import(/* webpackChunkName: "details" */ '@/views/event/Details.vue'),
      },
      {
        path: 'register',
        name: 'EventRegister',
        component: () =>
          import(
            /* webpackChunkName: "details" */ '@/views/event/Register.vue'
          ),
      }
    ],
  },
]
````

Our nested route can even be defined without the params. 
They will then use the id parameter present in the url.
````html
<router-link 
  :to="{ name: 'EventDetails'}"
>Details</router-link>
````


## Redirect and Aliases
We can add **alias** to our route but we should if we care
about SEO since they will then be to page path in our app leading to 
the same page. Google could think of a cheating. 
````javascript
const routes = [
  {
    path: "/about",
    component: "About",
    name: "About"
    alias: "/about-us"
  }
]
````

Instead of adding an alias to our route, we can redirect another path (then route)
to it.
````javascript
const routes = [
  {
    path: "/about",
    component: "About",
    name: "About"
  },{
    path: "/about-us",
    redirect: {name: "About"}
  },{
    path: "/event/:id",
    name: "EventDetails"
  },{
    path: "/event-details/:id",
    // We can omit providing the param here
    redirect: to => ({name: 'EventDetails', params: {id: to.params.id}})
  },{
    path: "/eventing/:afterEventId(.*)",
    // We can proceed this way in case we've got more than just one param 
    redirect: to => ({path: '/event/' + to.params.afterEventId})
  }
]


## Programmatic Navigation
We can use **this.$router.push** to redirect programmatically.
````javascript
this.$router.push('/about')
this.$router.push({path: '/about'})
this.$router.push({name: 'About'})
this.$router.push({name: 'Event', params: {id: this.event.id}})
this.$router.push({name: 'Event', query: {id: this.event.id}})
````

Even route-link used actually call the **this.$router.push**.
`````html
<router-link :to="{name: 'EventDetails', params: {id: 5}}"></router-link>
`````
This correspond to 
````javascript
this.$router.push({name: 'EventDetails', params: {id: 5}})
````

We can even navigate without pushing an history entry into the browser. 
This is done using the **this.$router.replace** method.
````javascript
// Will replace the current page by the EventDetails page.
this.$router.replace({name: 'EventDetails', params: {id: 5}})
````

``this.$router.go(1)`` is used to call the browser's **forward button**
``this.$router.go(-1)`` is used to call the browser's **back button**
