module.exports = app => {
  return {
    index: function(req, res) {
      res.render('home', app.models.home)
    }
  }
}
