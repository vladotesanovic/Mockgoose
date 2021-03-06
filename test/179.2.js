var should = require('chai').should();
var expect = require('chai').expect;
var Mongoose = require('mongoose').Mongoose;
var mongoose = new Mongoose;
var Mockgoose = require('../built/mockgoose-fix').Mockgoose;
var mockgoose = new Mockgoose(mongoose);
mockgoose.helper.setDbVersion('3.4.3');
mongoose.Promise = global.Promise;

var Cat = mongoose.model('Cat', {
  name: String
});


describe('issue 179 too', function () {
  before(function (done) {
    mockgoose.prepareStorage().then(function () {
      mongoose.connect('mongodb://127.0.0.1:27017/TestingDB', {useMongoClient: true}, function (err) {
        done(err);
      });
    });
  });

  beforeEach(function (done) {
    mockgoose.helper.reset().then(function () {
      done();
    });
  });

  it("should create a cat foo", function (done) {
    Cat.create({
      name: "foo"
    }, function (err, cat) {
      expect(err).to.be.falsy;
      done(err);
    });
  });

  it("should NOT find cat foo", function (done) {
    Cat.findOne({
      name: "foo"
    }, function (err, cat) {
      expect(err).to.be.falsy;
      expect(cat).to.be.null;
      done(err);
    });
  });

});
