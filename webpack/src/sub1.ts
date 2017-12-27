import $ from 'jquery';
import Vue from 'vue';
import Component from 'vue-class-component';

// import fs from 'fs';
// import low from 'lowdb';
// import FileSync from 'lowdb/adapters/FileSync';

// import * as fs from 'fs';
// import data from './all.utf8.json';
import low from 'lowdb' ;
import FileSync from 'lowdb/adapters/FileSync';
import FileAsync from 'lowdb/adapters/FileAsync';
import Memory from 'lowdb/adapters/Memory';

var allData = './all.utf8.json';
// var json = require('../config.json');


// const adapter = new FileAsync('./all.utf8.json')
// const adapter = new FileAsync(allData)
import LocalStorage from 'lowdb/adapters/LocalStorage'

const adapter = new LocalStorage('db')
const db = low(adapter)

db.get('posts')
.push({ title: 'lowdb' })
.write()
// const db = low(adapter)

// db.defaults({ posts: [] })
//   .write()

// const result = db.get('posts')
//   .push({ name: 'test' })
//   .write()

// console.log(result)


//////////////////////////////////////////////////////
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
