var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');


//load in the React Router
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;
var createBrowserHistory = require('history/lib/createBrowserHistory');
var History = ReactRouter.History;

var helpers = require('./helpers');

//firebase
var Rebase = require('re-base');
var base = Rebase.createClass('https://conqatest.firebaseio.com/');
var Catalyst = require('react-catalyst');



var App = React.createClass({

	mixins: [Catalyst.LinkedStateMixin],

    //before it creates the component, populate with anything that is in these fields
    
  getInitialState : function() {
    return {
      trucks : {}
     
    }
  }, 

  componentDidMount : function() {
    base.syncState(this.props.params.userId + '/trucks', {
      context : this,
      state : 'trucks'
    });

  },
    
   //method to add a fish to the state 
   //give all trucks a unique key
    addTruck : function(truck){

    	var timestamp = (new Date()).getTime();

    	//update the state object and use the timestamp as unique ID

    	this.state.trucks['truck-' + timestamp] = truck;

    	//set the state

    	this.setState({trucks : this.state.trucks});

    },

    removeTruck : function (key){
        if(confirm("Are you sure you want to remove this truck?")){
    	this.state.trucks[key] = null;
    	this.setState({

    		trucks: this.state.trucks
    	});

    	}
    },

  loadSamples : function() {
    this.setState({
      trucks : require('./sample-fishes')
    });
  },

  renderTruck: function(key){

  	return <Truck key={key} index = {key} details={this.state.trucks[key]} addToOrder={this.addToOrder}/>

  },


	render: function() {

		//loop over every Truck in the object
		return(

		<div className="">
			
			<div className = "menu">
				<Header tagline="A test app"/>

				<ul ClassName="list-of-trucks">

				  {Object.keys(this.state.trucks).map(this.renderTruck)}

				</ul>

			</div>
				<Inventory addTruck = {this.addTruck} loadSamples = {this.loadSamples} 
				trucks={this.state.trucks} linkState = {this.linkState} removeTruck={this.removeTruck}/>


		</div>

		)
	}

});

//Truck <Truck/>

var Truck = React.createClass({

	onButtonClick : function(){

		console.log("going to add truck", this.props.index);

		var key= this.props.index;


	},

	render: function(){

		var details = this.props.details;

		console.log(details);




		return (

			<li className = "">
				

				<h3 className=""><i className="fa fa-truck fa-2x"> </i> # : {details.trucknumber}
					<span className=""> - {details.region}
					</span>
				</h3>

				<p>Vat 1 : {details.v1} Litres -  % Full</p> 
				
				<div className='progress'>
				  <div className='progress-bar'
				       role='progressbar'
				       aria-valuenow='70'
				       aria-valuemin='0'
				       aria-valuemax='100'
				      style={{width: '{details.v1}'+'%'}}>
				    <span className='sr-only'>{parseFloat(details.v1*10)} % Complete</span>
 				 </div>
				</div>

				<p>Vat 2 : {details.v2} Litres - {parseFloat(details.v2*10)} % Full</p> 
				
				<div className='progress'>
				  <div className='progress-bar'
				       role='progressbar'
				       aria-valuenow='70'
				       aria-valuemin='0'
				       aria-valuemax='100'
				       style={{width: '40%'}}>
				    <span className='sr-only'>{parseFloat(details.v2*10)} % Complete</span>
 				 </div>
				</div>

				<p>Vat 3 : {details.v3} Litres - {parseFloat(details.v3*10)} % Full</p>
				
				<div className='progress'>
				  <div className='progress-bar'
				       role='progressbar'
				       aria-valuenow='70'
				       aria-valuemin='0'
				       aria-valuemax='100'
				       style={{width: '%'}}>
				    <span className='sr-only'>{parseFloat(details.v3*10)} % Complete</span>
 				 </div>
				</div>

				<p>Vat 4 : {details.v4} Litres - {parseFloat(details.v4*10)} % Full</p>
				
				<div className='progress'>
				  <div className='progress-bar'
				       role='progressbar'
				       aria-valuenow='70'
				       aria-valuemin='0'
				       aria-valuemax='100'
				       style={{width: '%'}}>
				    <span className='sr-only'>{parseFloat(details.v4*10)} % Complete</span>
 				 </div>
				</div>

				<p>Vat 5 : {details.v5} Litres - {parseFloat(details.v5*10)} % Full</p>
				
				<div className='progress'>
				  <div className='progress-bar'
				       role='progressbar'
				       aria-valuenow='70'
				       aria-valuemin='0'
				       aria-valuemax='100'
				       style={{width: '20%'}}>
				    <span className='sr-only'>{parseFloat(details.v5*10)} %Complete</span>
 				 </div>
				</div>
				
				<p>Unopened Boxes of sprinkles : {details.sprinkles}</p>

				<div className="alert alert-info">
  					<h3> Total Litres : { 
					parseFloat(details.v1)+ 
					parseFloat(details.v2 + 
				    parseFloat(details.v3)+ 
				    parseFloat(details.v4)+
				    parseFloat(details.v5)
				    )}</h3>
				</div>
				

			</li>	
		)
	}
})

//create a form to add a truck which can be accessed from anywhere
//<addTruckForm>

var AddTruckForm = React.createClass({

	createTruck : function(event){

		//1. Stop the form from submitting

		event.preventDefault();

		//2.Take the data from the form and create an object

		var truck = {

			trucknumber: this.refs.trucknumber.value,
			region: this.refs.region.value,
			v1: this.refs.v1.value,
			v2: this.refs.v2.value,
			v3: this.refs.v3.value,
			v4: this.refs.v3.value,
			v5: this.refs.v3.value,
			sprinkles: this.refs.sprinkles.value
		}

		//3.Add the truck to the app state.

		this.props.addTruck(truck);

		//reset the form after submit

		this.refs.TruckForm.reset();

		console.log(trucks);
	},

	render: function(){

		return (
		<div className="container">
		<h3><i className="fa fa-plus" aria-hidden="true"></i> Add a new truck</h3>
		<form className="form-inline" ref="TruckForm" onSubmit={this.createTruck}>
		 <div className="form-group">
            <div className="form-group">
                <label className="sr-only">Truck Number</label>
                <input className="form-control" ref="trucknumber" placeholder = "Truck Number" />
            </div>&nbsp;
            <div className="form-group">
                <label className="sr-only">Field 2</label>
                <select className="form-control" ref="region">
				  <option value = "Auckland">Auckland</option>
			      <option value = "Northland">Northland</option>
				  <option value = "BOP">BOP</option>
				  <option value = "Palmerston North">Palmerston North</option>
				</select>
            </div>&nbsp;
            <div className="form-group">
                <label className="sr-only">Litres in Vat1</label>
                <input className="form-control" type="text" ref="v1" placeholder = "Vat 1 Total Litres" />
            </div>&nbsp;

             <div className="form-group">
                <label className="sr-only">Litres in Vat2</label>
                <input className="form-control" type="text" ref="v2" placeholder = "Vat 2 Total Litres" />
            </div>&nbsp;

            <div className="form-group">
                <label className="sr-only">Litres in Vat3</label>
                <input className="form-control" type="text" ref="v3" placeholder = "Vat 3 Total Litres" />
            </div>&nbsp;

            <div className="form-group">
                <label className="sr-only">Litres in Vat4</label>
                <input className="form-control" type="text" ref="v4" placeholder = "Vat 4 Total Litres" />
            </div>&nbsp;

            <div className="form-group">
                <label className="sr-only">Litres in Vat5</label>
                <input className="form-control" type="text" ref="v5" placeholder = "Vat 5 Total Litres" />
            </div>&nbsp;

            <div className="form-group">
                <label className="sr-only">Number of sprinkles</label>
                <input className="form-control" type="text" ref="sprinkles" placeholder = "Number of Sprinkes" />
            </div>&nbsp;

            <button type="Submit" className="btn btn-primary">Add New</button>&nbsp;
            </div>
        </form>
       
        </div>

	

		)
		
	}
});


//header component

var Header = React.createClass({

	render : function(){

		console.log(this.props);

		return(

			<header className="top">
			<h3><i className="fa fa-database fa-2x"></i> Inventory</h3>
			</header>

		)
	}
});


//inventory component

var Inventory = React.createClass({

	renderInventory : function (key){

		var linkState = this.props.linkState;

		return(

			<div className="to-do" key={key}>
                <label>Truck #</label>
				<input type="text" className="form-control" placeholder = "Truck #" valueLink={linkState('trucks.'+key+'.trucknumber')}/>
				<label>Number of boxes of Unopened sprinkles #</label>
				<input type="text" className="form-control"valueLink={linkState('trucks.'+key+'.sprinkles')}/>
				 <label>Region #</label>
				<select valueLink className="form-control" valueLink={linkState('trucks.'+key+'.region')}>
					 <option value = "Auckland">Auckland</option>
					 <option value = "Northland">Northland</option>
					 <option value = "BOP">BOP</option>
					 <option value = "Palmerston North">Palmerston North</option>
					</select>
					<label>Total Litres in Vat 1 #</label>
				<input type="text" className="form-control" valueLink={linkState('trucks.'+key+'.v1')}/>
				<label>Total Litres in Vat 2 #</label>
				<input type="text" className="form-control" valueLink={linkState('trucks.'+key+'.v2')}/>
				<label>Total Litres in Vat 3 #</label>
				<input type="text" className="form-control" valueLink={linkState('trucks.'+key+'.v3')}/>
				<label>Total Litres in Vat 4 #</label>
				<input type="text" className="form-control" valueLink={linkState('trucks.'+key+'.v4')}/>
				<label>Total Litres in Vat 5 #</label>
				<input type="text" className="form-control" valueLink={linkState('trucks.'+key+'.v5')}/>
				<hr/>

				<button className="btn-danger" onClick = {this.props.removeTruck.bind(null, key)}> Remove Truck </button>
			</div>

			)

	},

	render : function(){

		return(



			<div className="container">
				<h2>Edit existing trucks</h2>

				{Object.keys(this.props.trucks).map(this.renderInventory)}

				<AddTruckForm {...this.props}/>

				<button className = "btn-success" onClick={this.props.loadSamples}>Load Sample trucks</button>

			</div>
		)
	}
});


/* User dashboard component */


var userName = React.createClass({

//populate userName with a push state on the url

mixins : [History],	

goToUserDashboard : function(event){

	event.preventDefault();
	//console.log('Submited the form');

	//get the data from the input - go from <userName/> to <app/>
	//reference the input anywhere inside of the component

	var userId = this.refs.userId.value;

    //change the URL without having to use hashes. Page does not need to be refreshed.

	this.history.pushState(null, '/sales-rep/' + userId);

	//console.log(userId);


},

//rendering HTML
	render : function(){
		return(

	<div class="container">
	<form className="form-inline" role="form" onSubmit={this.goToUserDashboard}>
	<h2 class="form-signin-heading">Please sign in</h2>
     <div className="form-group">
       <label for="inputPassword" class="sr-only">username</label>
       <input type="text" ref="userId" class="form-control" placeholder="username" required/>
     </div>

     <button type="Submit" className="btn btn-primary">Login</button>&nbsp;
	</form>

    </div>




		)
	}

});

//not found component

var NotFound = React.createClass({

	render: function(){

		return <h1> 404 - Sorry, These are not the droids you are looking for!
		(Page doesn't exist)</h1>
	}
});

//routing for components
//pass in the history for the routing
var routes = (
  <Router history={createBrowserHistory()}>
    <Route path="/" component={userName}/>
    <Route path="/sales-rep/:userId" component={App}/>
    <Route path="*" component={NotFound}/>
  </Router>
)

//mount it to the page on page load and put in in the main div

ReactDOM.render(routes, document.querySelector('#main') );



 
