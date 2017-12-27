import $ from 'jquery';
import Vue from 'vue';
import MyComponent from './sub';
import MyComponent1 from './sub1';

new Vue({
  el        : '#app',
  template  :
      `<div class="app">
        <h1>Hello Vue.js!</h1>
        <my-component message="My Counter for TypeScript"></my-component>
        <my-component1 message="My Counter for TypeScript"></my-component1>
      </div>`,

  components: {
    'my-component': MyComponent,
    'my-component1': MyComponent1
  }
});


$(() => {
  $('#app1').html("hello");
  $('#app1').html("hello2");
  
});
