// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)


// require("jquery3")
// require("popper")
// require("bootstrap")


require("js/jquery-3.3.1.slim.min")
require("js/popper.min")
require("js/bootstrap.min")

require("vendors/js/vendor.bundle.base")
require("vendors/js/vendor.bundle.addons")

require("js/shared/chart")
require("js/shared/misc")
require("js/shared/off-canvas")
require("js/demo_1/dashboard")