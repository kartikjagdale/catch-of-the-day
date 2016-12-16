var React       = require('react');
var ReactDom    = require('react-dom');
var ReactRouter = require('react-router');
var Router      = ReactRouter.Router;
var Route       = ReactRouter.Route;
var Navigation  = ReactRouter.Navigation;
var History     = ReactRouter.History; //mixin
var createBrowserHistory = require('history/lib/createBrowserHistory');
var helpers = require('./helpers');
/*
  App
*/
var App = React.createClass({
  render: function(){
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Days of our Lives" />
        </div>
        <Order />
        <Inventory/>
      </div>
    )
  }
})

/*
  Header
*/
var Header = React.createClass({
  render: function() {
    return (
      <header className="top">
        <h1>Catch 
        <span className="ofThe">
          <span className="of">of</span> 
          <span className="the">the</span> 
        </span>
        Day</h1>
        <h3 className="tagline"><span>{this.props.tagline}</span></h3>
      </header>
    )
  }
})

/*
  Order
*/
var Order = React.createClass({
  render: function(){
    return (
      <p>Order</p>
    )
  }
})

/*
  Inventory
*/
var Inventory = React.createClass({
  render: function(){
    return (
      <p>Inventory</p>
    )
  }
})


/*
  StorePicker
  This will make us <StorePicker/>
*/
var StorePicker = React.createClass({
  mixins: [History], 
  goToStore: function(event){
    event.preventDefault();
    // Get The Data from the input
    var storeId = this.refs.storeId.value;
    // Transition from store picker to <App/>
    this.history.pushState(null, '/store/' + storeId);
  },
  render: function() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        {/*My Comment Goes in here*/}
        <h2>Please Enter A Store</h2>
        <input type="text" ref="storeId" required  defaultValue={ helpers.getFunName() }/>
        <input type="Submit"/>
      </form>
    )
  }
});


var NotFound = React.createClass({
  render: function(){
    return (
      <h1>404 Not Found</h1>
    )
  }
})


/*
  Routes
*/
var routes = (
  <Router history={createBrowserHistory()}>
    <Route path="/" component={StorePicker}/>
    <Route path="/store/:storeId" component={App}/>
    <Route path="*" component={NotFound}/>
  </Router>
)


ReactDom.render(routes, document.querySelector('#main'));