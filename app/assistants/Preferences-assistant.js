function PreferencesAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
		additional parameters (after the scene name) that were passed to pushScene. The reference
		to the scene controller (this.controller) has not be established yet, so any initialization
		that needs the scene controller should be done in the setup function below. */
}

PreferencesAssistant.prototype.audioButtonPush = function(event){
	var eventTarget = event.target.id;
	var targetName = "";
	var targetKind = "";
	var character = 0;
	
	//test for character
	if(eventTarget.indexOf("uhura") != -1){
		targetName = "Uhura";
		character = 1;
	}
	
	//test for type
	if (character == 1){
		if(eventTarget.indexOf("hello") != -1){
			targetKind = "hello";
		}
		if(eventTarget.indexOf("positive") != -1){
			targetKind = "positive";
		}
		if(eventTarget.indexOf("negative") != -1){
			targetKind = "negative";
		}
	}
	
	//test for clip target
	if((targetKind == "positive") || (targetKind == "negative")){
		//do some splits
	}
	

	Mojo.Log.info("Button pressed was ",targetName,"type is ",targetKind); 	
}


PreferencesAssistant.prototype.drawer1PressHandler = function(event){
	this.department1Drawer.mojo.toggleState();
}

PreferencesAssistant.prototype.drawer2PressHandler = function(event){
	this.department2Drawer.mojo.toggleState();
}
PreferencesAssistant.prototype.drawer3PressHandler = function(event){
	this.department3Drawer.mojo.toggleState();
}
PreferencesAssistant.prototype.uhuraPressHandler = function(event){
	this.uhuraAudioDrawer.mojo.toggleState();
}
PreferencesAssistant.prototype.chekovPressHandler = function(event){
	this.chekovAudioDrawer.mojo.toggleState();
}

PreferencesAssistant.prototype.toggleChange = function(event){
	var eventTarget = event.target.id;
	
}


PreferencesAssistant.prototype.setup = function() {
	this.controller.enableFullScreenMode(true);
	//these are the models for the toggle widgets
	//get info from the cookie
	this.stComcookie = new Mojo.Model.Cookie('stCom');
	this.stComPrefs = this.stComcookie.get();
	if(this.stComPrefs) {
		this.titleToggleModel = {value: this.stComPrefs.titleToggle};
		this.uhuraToggleModel = {value: this.stComPrefs.uhuraToggle};
		this.chekovToggleModel = {value: this.stComPrefs.chekovToggle};
		this.pikeToggleModel = {value: this.stComPrefs.pikeToggle};
		this.guardianToggleModel = {value: this.stComPrefs.guardianToggle};
		this.suluToggleModel = {value: this.stComPrefs.suluToggle};
		this.scottyToggleModel = {value: this.stComPrefs.scottyToggle};
		this.nomadToggleModel = {value: this.stComPrefs.nomadToggle};
		this.zephramToggleModel = {value: this.stComPrefs.zephramToggle};
		this.bonesToggleModel = {value: this.stComPrefs.bonesToggle};
		this.spockToggleModel = {value: this.stComPrefs.spockToggle};
		this.computerToggleModel = {value: this.stComPrefs.computerToggle};
		this.sarekToggleModel = {value: this.stComPrefs.sarekToggle};
		this.chapelToggleModel = {value: this.stComPrefs.chapelToggle};	
	} else {
		//In this case, the cookie doesn't exist
		this.titleToggleModel = {value: true};
		this.uhuraToggleModel = {value: true};
		this.chekovToggleModel = {value: true};
		this.pikeToggleModel = {value: true};
		this.guardianToggleModel = {value: true};
		this.suluToggleModel = {value: true};
		this.scottyToggleModel = {value: true};
		this.nomadToggleModel = {value: true};
		this.zephramToggleModel = {value: true};
		this.bonesToggleModel = {value: true};
		this.spockToggleModel = {value: true};
		this.computerToggleModel = {value: true};
		this.sarekToggleModel = {value: true};
		this.chapelToggleModel = {value: true};	
		this.stComcookie = new Mojo.Model.Cookie('stCom');
		this.stComcookie.put({
			titleToggle:false,
			uhuraToggle:false,
			chekovToggle:false,
			pikeToggle:false,
			guardianToggle:false,
			suluToggle:false,
			scottyToggle:false,
			nomadToggle:false,
			zephramToggle:false,
			bonesToggle:false,
			spockToggle:false,
			computerToggle:false,
			sarekToggle:false,
			chapelToggle:false	
		})
	}

	/* this function is for setup tasks that have to happen when the scene is first created */
	this.department1 = this.controller.get("department1");
	this.department2 = this.controller.get("department2");
	this.department3 = this.controller.get("department3");
	this.department1Drawer = this.controller.get('department1Drawer');
	this.department2Drawer = this.controller.get('department2Drawer');
	this.department3Drawer = this.controller.get('department3Drawer');
	this.drawer1PressHandler = this.drawer1PressHandler.bind(this);
	this.drawer2PressHandler = this.drawer2PressHandler.bind(this);
	this.drawer3PressHandler = this.drawer3PressHandler.bind(this);
	this.toggleChange = this.toggleChange.bindAsEventListener(this);

	
	//character drawers
	this.uhura = this.controller.get('uhura');
	this.uhuraPressHandler = this.uhuraPressHandler.bind(this);
	this.uhuraAudioDrawer = this.controller.get('uhuraAudioDrawer');
	this.chekov = this.controller.get('chekov');
	this.chekovPressHandler = this.chekovPressHandler.bind(this);
	this.chekovAudioDrawer = this.controller.get('chekovAudioDrawer');

	/* use Mojo.View.render to render view templates and add them to the scene, if needed */

	/* setup widgets here */
	this.controller.setupWidget("titleAudioToggle", this.attributes = {trueLabel: "On", falseLabel: "Off"}, this.titleToggleModel); 
	this.controller.setupWidget("uhuraAudioToggle", this.attributes = {trueLabel: "On", falseLabel: "Off"}, this.uhuraToggleModel); 
	this.controller.setupWidget("chekovAudioToggle", this.attributes = {trueLabel: "On", falseLabel: "Off"}, this.chekovToggleModel); 
	this.controller.setupWidget("pikeAudioToggle", this.attributes = {trueLabel: "On", falseLabel: "Off"}, this.pikeToggleModel); 
	this.controller.setupWidget("guardianAudioToggle", this.attributes = {trueLabel: "On", falseLabel: "Off"}, this.guardianToggleModel); 
	this.controller.setupWidget("suluAudioToggle", this.attributes = {trueLabel: "On", falseLabel: "Off"}, this.suluToggleModel); 
	this.controller.setupWidget("scottyAudioToggle", this.attributes = {trueLabel: "On", falseLabel: "Off"}, this.scottyToggleModel); 
	this.controller.setupWidget("nomadAudioToggle", this.attributes = {trueLabel: "On", falseLabel: "Off"}, this.nomadToggleModel); 
	this.controller.setupWidget("zephramAudioToggle", this.attributes = {trueLabel: "On", falseLabel: "Off"}, this.zephramToggleModel); 
	this.controller.setupWidget("bonesAudioToggle", this.attributes = {trueLabel: "On", falseLabel: "Off"}, this.bonesToggleModel); 
	this.controller.setupWidget("spockAudioToggle", this.attributes = {trueLabel: "On", falseLabel: "Off"}, this.spockToggleModel); 
	this.controller.setupWidget("computerAudioToggle", this.attributes = {trueLabel: "On", falseLabel: "Off"}, this.computerToggleModel); 
	this.controller.setupWidget("sarekAudioToggle", this.attributes = {trueLabel: "On", falseLabel: "Off"}, this.sarekToggleModel); 
	this.controller.setupWidget("chapelAudioToggle", this.attributes = {trueLabel: "On", falseLabel: "Off"}, this.chapelToggleModel); 
	this.controller.setupWidget("department1Drawer",this.attributes = {unstyled: false}, this.model = {open: false}); 
	this.controller.setupWidget("department2Drawer",this.attributes = {unstyled: false}, this.model = {open: false}); 
	this.controller.setupWidget("department3Drawer",this.attributes = {unstyled: false}, this.model = {open: false}); 
	this.controller.setupWidget("uhuraAudioDrawer",this.attributes = {unstyled: false}, this.model = {open: false}); 
	this.controller.setupWidget("chekovAudioDrawer",this.attributes = {unstyled: false}, this.model = {open: false}); 
	
	Mojo.Event.listen(this.controller.get("titleAudioToggle"), Mojo.Event.propertyChange, this.toggleChange);
	Mojo.Event.listen(this.controller.get("uhuraAudioToggle"), Mojo.Event.propertyChange, this.toggleChange);
	Mojo.Event.listen(this.controller.get("chekovAudioToggle"), Mojo.Event.propertyChange, this.toggleChange);
	Mojo.Event.listen(this.controller.get("pikeAudioToggle"), Mojo.Event.propertyChange, this.toggleChange);
	Mojo.Event.listen(this.controller.get("guardianAudioToggle"), Mojo.Event.propertyChange,this.toggleChange);
	Mojo.Event.listen(this.controller.get("suluAudioToggle"), Mojo.Event.propertyChange, this.toggleChange);
	Mojo.Event.listen(this.controller.get("scottyAudioToggle"), Mojo.Event.propertyChange, this.toggleChange);
	Mojo.Event.listen(this.controller.get("nomadAudioToggle"), Mojo.Event.propertyChange, this.toggleChange);
	Mojo.Event.listen(this.controller.get("zephramAudioToggle"), Mojo.Event.propertyChange, this.toggleChange);
	Mojo.Event.listen(this.controller.get("bonesAudioToggle"), Mojo.Event.propertyChange, this.toggleChange);
	Mojo.Event.listen(this.controller.get("spockAudioToggle"), Mojo.Event.propertyChange, this.toggleChange);
	Mojo.Event.listen(this.controller.get("computerAudioToggle"), Mojo.Event.propertyChange, this.toggleChange);
	Mojo.Event.listen(this.controller.get("sarekAudioToggle"), Mojo.Event.propertyChange, this.toggleChange);
	Mojo.Event.listen(this.controller.get("chapelAudioToggle"), Mojo.Event.propertyChange, this.toggleChange);

	
	//buttons
	//uhura
	
	//dynamically create buttons
	//we'll start with uhura_positive"
  this.controller.setupWidget("uhura_hello", this.attributes = {}, this.model = {label : "1", disabled: false});
  this.controller.setupWidget("uhura_negative_1", this.attributes = {}, this.model = {label : "1", disabled: false});

	
	/* add event handlers to listen to events from widgets */
	Mojo.Event.listen(this.department1, Mojo.Event.tap, this.drawer1PressHandler);
	Mojo.Event.listen(this.department2, Mojo.Event.tap, this.drawer2PressHandler);
	Mojo.Event.listen(this.department3, Mojo.Event.tap, this.drawer3PressHandler);
	Mojo.Event.listen(this.uhura, Mojo.Event.tap, this.uhuraPressHandler);
	Mojo.Event.listen(this.chekov, Mojo.Event.tap, this.chekovPressHandler);
	
	//uhura buttons
	Mojo.Event.listen(this.controller.get("uhura_hello"), Mojo.Event.tap, this.audioButtonPush.bindAsEventListener(this)); 
	Mojo.Event.listen(this.controller.get("uhura_negative_1"), Mojo.Event.tap, this.audioButtonPush.bindAsEventListener(this)); 

};

PreferencesAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
		example, key handlers that are observing the document */
};

PreferencesAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
		this scene is popped or another scene is pushed on top */
	Mojo.Event.stopListening(this.department1, Mojo.Event.tap, this.drawer1PressHandler);
	Mojo.Event.stopListening(this.department2, Mojo.Event.tap, this.drawer2PressHandler);
	Mojo.Event.stopListening(this.department3, Mojo.Event.tap, this.drawer3PressHandler);
	Mojo.Event.stopListening(this.uhura, Mojo.Event.tap, this.uhuraPressHandler);
	Mojo.Event.stopListening(this.chekov, Mojo.Event.tap, this.chekovPressHandler);
	
	//When the scene is deactivated, write the theme information to the cookie

};

PreferencesAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
		a result of being popped off the scene stack */
};
