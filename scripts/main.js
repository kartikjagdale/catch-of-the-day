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
  loadSamples: function(){
    this.setState({
      fishes: require('./sample-fishes')
    });
  },

  getInitialState: function(){
    return {
      fishes: {},
      order: {}
    }
  },

  addFish: function(fish){
    // Set the new fish in Fishes Object
    var timeStamp = (new Date()).getTime();
    this.state.fishes['fish-' + timeStamp] = fish;
    // set the State
    this.setState({ fishes: this.state.fishes });
  },
  renderFish: function(key){
    return <Fish key={key} index={key} details={this.state.fishes[key]} />
  },
  render: function(){
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Days of our Lives" />
          <ul className="list-of-fishes">
            {Object.keys(this.state.fishes).map(this.renderFish)}          
          </ul>
        </div>
        <Order />
        <Inventory addFish={this.addFish} loadSamples= {this.loadSamples} />
      </div>
    )
  }
})


/*
Fish
*/


var Fish = React.createClass({
  render: function(){
    var details = this.props.details;
    return (
      <li className="menu-fish">
        <img src= {details.image} alt={details.name}/>
        <h3 className="fish-name">
          {details.name}
          <span className="price">{helpers.formatPrice(details.price)}</span>
        </h3>
        <p>{details.desc}</p>
      </li>
    )
  }
})


/*
  Add Fish Form
  <AddFishForm />
*/

var AddFishForm = React.createClass({
  createFish: function(event){
    //1. Prevent form from submitting
    event.preventDefault();
    //2. Take Data from form and create an object
    var fish = {
      name:  this.refs.name.value,
      price: this.refs.price.value,
      status: this.refs.status.value,
      desc: this.refs.desc.value,
      image: this.refs.image.value
    }
    //3. Add the fish to App state. (Tricky)
    this.props.addFish(fish);
    // 4. Reset the form
    this.refs.fishForm.reset();
  },

  render: function() {
    return (
      <form className="fish-edit" ref="fishForm" onSubmit={this.createFish}>
        <input type="text" ref="name" placeholder="Fish Name"/>
        <input type="text" ref="price" placeholder="Fish Price" />
        <select ref="status">
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea type="text" ref="desc" placeholder="Desc"></textarea>
        <input type="text" ref="image" placeholder="URL to Image" />
        <button type="submit">+ Add Item </button>
      </form>
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
      <div>
        <h2>Inventory</h2>
        <AddFishForm  addFish={this.props.addFish}/>
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
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