/**
 * @author Angel Losada
 */// Reusable Activity/Loading screen for Titanium 
 
//var actScreen = (function() {


	//
	// Public methods stored in api
	//
	//Empty constructor (for now)
	function activityScreen() {}
		//var api = {};

	activityScreen.show = function(message){
		createControls();
		if (message) {indicator.message = message;}
		else {indicator.message = 'Cargando...';}
		view1.show();
		view2.show();
		indicator.show();
	};

	activityScreen.hide = function(){
		createControls();
		view1.hide();
		view2.hide();
		indicator.hide();
	};

//	return api;
//}());

	//
	// Private methods and vars
	//

	var isControlsCreated = false;
	var view1, view2, indicator;

	function createControls(){
		if (isControlsCreated) {return;}

		view1 = Ti.UI.createView({
			height:'100%',
			width:'100%',
			backgroundColor:'#000',
			opacity:0.5,
			zIndex:8
		});
		view1.hide();
		Ti.UI.currentWindow.add(view1);

		view2 = Ti.UI.createView({
			height:'100%',
			width:'100%',
			zIndex:9
		});
		view2.hide();
		Ti.UI.currentWindow.add(view2);

		indicator = Titanium.UI.createActivityIndicator({
			style:Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
			font:{fontFamily:'Arial', fontSize:18, fontWeight:'bold'},
			color:'#fff',
			message:'Loading...',
			height:'100%',
			width:'auto'
		});
		view2.add(indicator);

		isControlsCreated = true;
	}