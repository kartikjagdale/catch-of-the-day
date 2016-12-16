var React = require('react');
var ReactDom = require('react-dom');
/*
  StorePicker
  This will make us <StorePicker/>
*/
var StorePicker = React.createClass({
  render: function() {
    return (
      <form className="store-selector">
        {/*My Comment Goes in here*/}
        <h2>Please Enter A Store</h2>
        <input type="text" ref="storeId" required />
        <input type="Submit"/>
      </form>
    )
  }
});


ReactDom.render(<StorePicker/>, document.querySelector('#main'));