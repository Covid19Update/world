// Get the URL parameter (i.e. region)
var $_GET = {};

if (document.location.toString().indexOf('?') !== -1) {
	var query = document.location
				   .toString()
				   // Get the query string
				   .replace(/^.*?\?/, '')
				   // Remove any existing hash string
				   .replace(/#.*$/, '')
				   .split('&');
	for(var i=0, l=query.length; i<l; i++) {
	   var aux = decodeURIComponent(query[i]).split('=');
	   $_GET[aux[0]] = aux[1];
	}
}

var loc = $_GET['in'];

// Show worldwide data by default
if (typeof(loc) === "undefined") {
	loc = "Worldwide";
}

// Put the data onto the page
function fill_data(date, cases, deaths, recovered) {
	document.getElementById("date").textContent = date.toUpperCase();
	document.getElementById("confirmed").textContent = cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	document.getElementById("deaths").textContent = deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	document.getElementById("recovered").textContent = recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
	  
// Wait for document load
$(document).ready(function(){
	
	// Date format options
	var date_options = { year: 'numeric', month: 'short', day: 'numeric' };
	// Get the URL parameter (i.e. region)// Get the URL parameter (i.e. region)
var $_GET = {};

if (document.location.toString().indexOf('?') !== -1) {
	var query = document.location
				   .toString()
				   // Get the query string
				   .replace(/^.*?\?/, '')
				   // Remove any existing hash string
				   .replace(/#.*$/, '')
				   .split('&');
	for(var i=0, l=query.length; i<l; i++) {
	   var aux = decodeURIComponent(query[i]).split('=');
	   $_GET[aux[0]] = aux[1];
	}
}

var loc = $_GET['in'];

// Show worldwide data by default
if (typeof(loc) === "undefined") {
	loc = "Worldwide";
}

// Put the data onto the page
function fill_data(date, cases, deaths, recovered) {
	document.getElementById("date").textContent = date.toUpperCase();
	document.getElementById("confirmed").textContent = cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	document.getElementById("deaths").textContent = deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        document.getElementById("recovered").textContent = recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
	  
// Wait for document load
$(document).ready(function(){
	
	// Date format options
	var date_options = { year: 'numeric', month: 'short', day: 'numeric' };
	
	// Set the region/location text
	document.getElementById("region").textContent = loc.toUpperCase();
	
	// Fetch country data from Rodrigo Pombo & Johns Hopkins CSSE
	fetch('https://pomber.github.io/covid19/timeseries.json')
	  .then(response => response.json())
	  .then(data => {
		  
		// List of countries
		var countries = [];
		
		for (n = 0; n < Object.keys(data).length; n++) {
			countries.push(Object.keys(data)[n]);
		}
		 
		// Handle the worldwide region
		if (loc === "Worldwide") {
			
			var total_date;
			var total_confirmed = 0;
			var total_deaths = 0;
			var total_recovered = 0;
			for (n = 0; n < Object.keys(data).length; n++) {
				var subtotal_confirmed = 0;
				var subtotal_deaths = 0;
				var subtotal_recovered =0;
				Object.values(data)[n].forEach(({ date, confirmed, recovered, deaths }) =>
					{
						total_date = date;
						subtotal_confirmed = confirmed;
						subtotal_deaths = deaths;
					        subtotal_recovered = recovered;
					}
				)
				// Count up cases and deaths
				total_confirmed += subtotal_confirmed;
				total_deaths += subtotal_deaths;
				total_recovered += subtotal_recovered;
			}
			
			//Data
			fill_data(
				new Date(total_date).toLocaleDateString("en-US", date_options), 
				total_confirmed,
				total_deaths,
				total_recovered
			);

		// Handle a country region
		} else if (countries.includes(loc)) {
			
			data[loc].forEach(({ date, confirmed, recovered, deaths }) =>
				{
					
					// Display data
					if (loc === "US") {
						document.getElementById("region").textContent = "UNITED STATES";
					}
	
					// Data
					fill_data(
						new Date(date).toLocaleDateString("en-US", date_options), 
						confirmed,
						deaths,
						recovered
					);
					
				})
			
		// Handle state & county regions
		} else {
			
			// Flag for determined undefined region/location
			var locFlag = false;
			
			// Fetch & check county data from NY Times
			JSC.fetch('https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv')
			  .then(response => response.text())
			  .then(data => {
				  
				 let countyData = JSC.csv2Json(data, ",");
				  
				 countyData.forEach(({ date, county, state, fips, cases, deaths }) => 
						{
							
							if (loc === (county + ", " + state)) {
								locFlag = true;
								// Data
								fill_data(
									new Date(date).toLocaleDateString("en-US", date_options), 
									cases,
									deaths
								);
							}
						
						})
				  
			  });
			  
			// Fetch & check state data from NY Times
			JSC.fetch('https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv')
			  .then(response => response.text())
			  .then(data => {
				  
					  let stateData = JSC.csv2Json(data, ",");
				  
					  stateData.forEach(({ date, state, fips, cases, deaths }) => 
						{
						
							if (loc === state) {
								locFlag = true;
								// Data
								fill_data(
									new Date(date).toLocaleDateString("en-US", date_options), 
									cases,
									deaths,
								);
							}
						
						})
						
			  });
			  
			if (!locFlag) {
				fill_data(new Date().toLocaleDateString("en-US", date_options), "Unreported", "Unreported")
			}
			
		}
		
	});
	  
});
var $_GET = {};

if (document.location.toString().indexOf('?') !== -1) {
	var query = document.location
				   .toString()
				   // Get the query string
				   .replace(/^.*?\?/, '')
				   // Remove any existing hash string
				   .replace(/#.*$/, '')
				   .split('&');
	for(var i=0, l=query.length; i<l; i++) {
	   var aux = decodeURIComponent(query[i]).split('=');
	   $_GET[aux[0]] = aux[1];
	}
}

var loc = $_GET['in'];

// Show worldwide data by default
if (typeof(loc) === "undefined") {
	loc = "Worldwide";
}

// Put the data onto the page
function fill_data(date, cases, deaths, recovered) {
	document.getElementById("date").textContent = date.toUpperCase();
	document.getElementById("confirmed").textContent = cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	document.getElementById("deaths").textContent = deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	document.getElementById("recovered").textContent = recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
	  
// Wait for document load
$(document).ready(function(){
	
	// Date format options
	var date_options = { year: 'numeric', month: 'short', day: 'numeric' };
	
	// Set the region/location text
	document.getElementById("region").textContent = loc.toUpperCase();
	
	// Fetch country data from Rodrigo Pombo & Johns Hopkins CSSE
	fetch('https://pomber.github.io/covid19/timeseries.json')
	  .then(response => response.json())
	  .then(data => {
		  
		// List of countries
		var countries = [];
		
		for (n = 0; n < Object.keys(data).length; n++) {
			countries.push(Object.keys(data)[n]);
		}
		 
		// Handle the worldwide region
		if (loc === "Worldwide") {
			
			var total_date;
			var total_confirmed = 0;
			var total_deaths = 0;
			var total_recovered = 0;
			for (n = 0; n < Object.keys(data).length; n++) {
				var subtotal_confirmed = 0;
				var subtotal_deaths = 0;
				var subtotal_recovered = 0;
				Object.values(data)[n].forEach(({ date, confirmed, recovered, deaths }) =>
					{
						total_date = date;
						subtotal_confirmed = confirmed;
						subtotal_deaths = deaths;
					        subtotal_recovered = recovered;
					}
				)
				// Count up cases and deaths
				total_confirmed += subtotal_confirmed;
				total_deaths += subtotal_deaths;
				total_recovered += subtotal_recovered;
			}
			
			//Data
			fill_data(
				new Date(total_date).toLocaleDateString("en-US", date_options), 
				total_confirmed,
				total_deaths,
				total_recovered
			);

		// Handle a country region
		} else if (countries.includes(loc)) {
			
			data[loc].forEach(({ date, confirmed, recovered, deaths }) =>
				{
					
					// Display data
					if (loc === "US") {
						document.getElementById("region").textContent = "UNITED STATES";
					}
	
					// Data
					fill_data(
						new Date(date).toLocaleDateString("en-US", date_options), 
						confirmed,
						deaths,
						recovered
					);
					
				})
			
		// Handle state & county regions
		} else {
			
			// Flag for determined undefined region/location
			var locFlag = false;
			
			// Fetch & check county data from NY Times
			JSC.fetch('https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv')
			  .then(response => response.text())
			  .then(data => {
				  
				 let countyData = JSC.csv2Json(data, ",");
				  
				 countyData.forEach(({ date, county, state, fips, cases, deaths }) => 
						{
							
							if (loc === (county + ", " + state)) {
								locFlag = true;
								// Data
								fill_data(
									new Date(date).toLocaleDateString("en-US", date_options), 
									cases,
									deaths
								);
							}
						
						})
				  
			  });
			  
			// Fetch & check state data from NY Times
			JSC.fetch('https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv')
			  .then(response => response.text())
			  .then(data => {
				  
					  let stateData = JSC.csv2Json(data, ",");
				  
					  stateData.forEach(({ date, state, fips, cases, deaths }) => 
						{
						
							if (loc === state) {
								locFlag = true;
								// Data
								fill_data(
									new Date(date).toLocaleDateString("en-US", date_options), 
									cases,
									deaths
								);
							}
						
						})
						
			  });
			  
			if (!locFlag) {
				fill_data(new Date().toLocaleDateString("en-US", date_options), "Unreported", "Unreported")
			}
			
		}
		
	});
	  
});
	// Set the region/location text
	document.getElementById("region").textContent = loc.toUpperCase();
	
	// Fetch country data from Rodrigo Pombo & Johns Hopkins CSSE
	fetch('https://pomber.github.io/covid19/timeseries.json')
	  .then(response => response.json())
	  .then(data => {
		  
		// List of countries
		var countries = [];
		
		for (n = 0; n < Object.keys(data).length; n++) {
			countries.push(Object.keys(data)[n]);
		}
		 
		// Handle the worldwide region
		if (loc === "Worldwide") {
			
			var total_date;
			var total_confirmed = 0;
			var total_deaths = 0;
			var total_recovered =0;
			for (n = 0; n < Object.keys(data).length; n++) {
				var subtotal_confirmed = 0;
				var subtotal_deaths = 0;
				var subtotal_recovered =0;
				Object.values(data)[n].forEach(({ date, confirmed, recovered, deaths }) =>
					{
						total_date = date;
						subtotal_confirmed = confirmed;
						subtotal_deaths = deaths;
					        subtotal_recovered = recovered;
					}
				)
				// Count up cases and deaths
				total_confirmed += subtotal_confirmed;
				total_deaths += subtotal_deaths;
				total_recovered += subtotal_recovered;
			}
			
			//Data
			fill_data(
				new Date(total_date).toLocaleDateString("en-US", date_options), 
				total_confirmed,
				total_deaths
			);

		// Handle a country region
		} else if (countries.includes(loc)) {
			
			data[loc].forEach(({ date, confirmed, recovered, deaths }) =>
				{
					
					// Display data
					if (loc === "US") {
						document.getElementById("region").textContent = "UNITED STATES";
					}
	
					// Data
					fill_data(
						new Date(date).toLocaleDateString("en-US", date_options), 
						confirmed,
						deaths,
						recovered
					);
					
				})
			
		// Handle state & county regions
		} else {
			
			// Flag for determined undefined region/location
			var locFlag = false;
			
			// Fetch & check county data from NY Times
			JSC.fetch('https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv')
			  .then(response => response.text())
			  .then(data => {
				  
				 let countyData = JSC.csv2Json(data, ",");
				  
				 countyData.forEach(({ date, county, state, fips, cases, deaths }) => 
						{
							
							if (loc === (county + ", " + state)) {
								locFlag = true;
								// Data
								fill_data(
									new Date(date).toLocaleDateString("en-US", date_options), 
									cases,
									deaths
								);
							}
						
						})
				  
			  });
			  
			// Fetch & check state data from NY Times
			JSC.fetch('https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv')
			  .then(response => response.text())
			  .then(data => {
				  
					  let stateData = JSC.csv2Json(data, ",");
				  
					  stateData.forEach(({ date, state, fips, cases, deaths }) => 
						{
						
							if (loc === state) {
								locFlag = true;
								// Data
								fill_data(
									new Date(date).toLocaleDateString("en-US", date_options), 
									cases,
									deaths
								);
							}
						
						})
						
			  });
			  
			if (!locFlag) {
				fill_data(new Date().toLocaleDateString("en-US", date_options), "Unreported", "Unreported")
			}
			
		}
		
	});
	  
});
