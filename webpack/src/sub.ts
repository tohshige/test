import $ from 'jquery';
import Vue from 'vue';
import Component from 'vue-class-component';


@Component({
  template: `
      <div>
        <h2>{{message}}</h2>
        <p>賛成! {{count}}</p>
        <p>反対! {{count1}}</p>
        <p>
          <button @click="onClick">Add +1</button>
          <button @click="onClick1">Add -1</button>
        </p>
      </div>`,
  props   : ['message']
})
export default class MyComponent extends Vue {
  count = 0;
  count1 = 0;
  message;

  onClick() {
    this.count = this.count + 1;
    this.count > 2 ? this.message = 'over !!':'';
    

  }

  onClick1() {
    this.count = this.count - 1;
  }
}
