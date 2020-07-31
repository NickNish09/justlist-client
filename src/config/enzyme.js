const {configure, shallow, mount, render} = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

configure({adapter: new Adapter()});
module.exports = {shallow, mount, render};
