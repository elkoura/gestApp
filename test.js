var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var Cat = mongoose.model('Cat', { name: String });
console.log("tesssssssst");
var kitty = new Cat({ name: 'mchaa' });
kitty.save(function (err) {
  if (err) // ...
  console.log('meow');
});

Cat.find(function (err, kittens) {
  if (err) return console.error(err);
  console.log(kittens)
})

Cat.find({ name: /^mch/ }, function (err, mchach) {
  if (err) return console.error(err);
  console.log("hado li smithom mchach :"+mchach)
})
