const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

// const adapter = new FileSync('db.json')
const adapter = new FileSync('all.utf8.json')
const db = low(adapter)

// db.defaults({ posts: [] })
//   .write()

// const result = db.get('posts')
//   .push({ name: process.argv[2] })
//   .write()

  // console.log(result)
// const post = db.get('posts')
process.argv[2]?'':'nice';
const post = db.get()
  .find({ itemURL : process.argv[2] })
  .value()

console.log(post)
  