function CommunicateAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
}

CommunicateAssistant.prototype.onFlick = function(event){
	if(((event.velocity.y>500)||(event.velocity.y<-500)) && (this.pitchTimeout==0)){
		this.grillOpenClose();
	}
}

CommunicateAssistant.prototype.onSlider = function(data){
	if(data.key == "slider") {
		if((data.state == 'up') && (this.transmitting == 0)) {
			this.grillOpenClose();
		} else if((data.state == 'down') && (this.transmitting == 1)) {
			this.grillOpenClose();					
		}
	}
}

CommunicateAssistant.prototype.grillOpenClose = function() {
	if (this.transmitting == 1) {
		this.transmitting = 0;
		this.backgroundCommand.style.backgroundColor = "#BC9C1B";
		this.backgroundOperations.style.backgroundColor = "#9A2525";
		this.backgroundScience.style.backgroundColor = "#166C9A";
		this.antennaGrill.style.webkitTransform = "scaley(1)";
		clearInterval(this.spinTimer);
		this.effectsAudio.src = Mojo.appPath + "/audio/communicator/endTalking.mp3";
		this.effectsAudio.load();
		this.effectsAudio.play();
		this.controller.stageController.setWindowProperties({blockScreenTimeout: false});
	} else if (this.transmitting == 0) {
		this.transmitting = 1;
		this.controller.stageController.setWindowProperties({blockScreenTimeout: true});
		var spinSelect = (190*(Math.floor(Math.random()*3)))-2;
		this.signalSpinner.style.backgroundPosition = "-13px -"+spinSelect+"px";
		this.antennaGrill.style.webkitTransform = "scaley(0)";
	  	this.spinSpinner();
		this.spinTimer = this.communicateHolder.setInterval(this.spinSpinner.bind(this), 3000);
 		this.effectsAudio.src = Mojo.appPath + "/audio/communicator/startTalking.mp3";
		this.effectsAudio.load();
		this.effectsAudio.play();
	}
}

CommunicateAssistant.prototype.handleShakeStart = function(event){
	this.pitchStart = 0;
	this.pitchCurrent = 0;
	this.pitchLast = 0;
	if (this.pitchTimeout == 0) {
		Mojo.Event.listen(this.documentHolder, 'shaking', this.shakingHandler);
	}
}

CommunicateAssistant.prototype.handleShaking = function(event){
	this.pitchLast = event.magnitude;
	if(this.pitchLast > this.pitchCurrent){
		this.pitchCurrent = this.pitchLast;
	}
}

CommunicateAssistant.prototype.setPitchTimeout = function(){
	this.pitchTimeout = 0;
}

CommunicateAssistant.prototype.handleShakeEnd = function(event){
	Mojo.Event.stopListening(this.documentHolder, 'shaking', this.shakingHandler)
	this.pitchDiff = this.pitchCurrent;
	if((this.pitchDiff>2.5) && (this.pitchTimeout==0)){
		this.grillOpenClose();
		this.pitchTimeout = 2;
		this.pitchTimer = this.communicateHolder.setTimeout(this.setPitchTimeout.bind(this), 2000);
	}
}

CommunicateAssistant.prototype.spinSpinner = function() {
	this.rotation +=9;
	this.signalSpinner.style.webkitTransform = "rotate("+this.rotation+"deg)";
}

CommunicateAssistant.prototype.buttonPress = function(event){
	if (this.transmitting == 1) {
		if(this.pitchTimeout==0){
			this.pitchTimeout = 2;
			this.pitchTimer = this.communicateHolder.setTimeout(this.setPitchTimeout.bind(this), 2000);
		}
		if ((event.target.id == "buttonCommand") || (event.target.id == "buttonOperations") || (event.target.id == "buttonScience")) {
			this.greeted = 0;
			this.backgroundCommand.style.backgroundColor = "#BC9C1B";
			this.backgroundOperations.style.backgroundColor = "#9A2525";
			this.backgroundScience.style.backgroundColor = "#166C9A";
			if(event.target.id == "buttonCommand"){
				this.backgroundCommand.style.backgroundColor = "#ffcf17";				
			} else if (event.target.id == "buttonOperations") {
				this.backgroundOperations.style.backgroundColor = "#ec1412";
			} else {
				this.backgroundScience.style.backgroundColor = "#009df0";
			}
			var randomNumber = Math.floor(Math.random() * buttonArray.length);
			while(randomNumber == this.lastButton){
				randomNumber = Math.floor(Math.random() * (buttonArray.length));				
			}
			this.buttonAudio.src = Mojo.appPath + buttonArray[randomNumber];
			this.buttonAudio.load();
			this.buttonAudio.play();
			this.lastButton = randomNumber;
			this.character = Math.floor(Math.random() * (characters[event.target.id].length)); 
			this.department = event.target.id;
			if(this.department == this.lastDepartment){
				while(this.character == this.lastCharacter){
					this.character = Math.floor(Math.random() * (characters[event.target.id].length)); 
				}		
			}
			this.lastCharacter = this.character;
			this.lastDepartment = this.department;
		}
		if ((event.target.id == "buttonNegative")|| (event.target.id == "buttonPositive")) {
			var lastMessage = this.message;
			if (this.greeted == 0){
				this.message = "hello";
				this.greeted = 1;
			} else if (event.target.id == "buttonNegative"){
				this.message = "negative";			
			} else {
				this.message = "positive";			
			}
			var characterNumber = characters[this.department][this.character][this.message].length;
			var sayingNumber = Math.floor(Math.random() * (characterNumber));
			if((this.message!="hello")&&(this.message==lastMessage)){
				while(sayingNumber == this.lastSaying){
					sayingNumber = Math.floor(Math.random() * (characterNumber));
				}
			}
			this.lastSaying = sayingNumber;
			var talkName = "/audio/characters/"+this.department+"/"+this.character+"/"+this.message+""+characters[this.department][this.character][this.message][sayingNumber];
			//Mojo.Controller.getAppController().showBanner("asd "+talkName,{source: 'notification'});
			this.effectsAudio.pause();
			this.effectsAudio.src = Mojo.appPath + talkName;
			this.effectsAudio.load();
			this.effectsAudio.play();

		}
	}
}

CommunicateAssistant.prototype.setup = function() {
	/* this function is for setup tasks that have to happen when the scene is first created */
	this.controller.enableFullScreenMode(true);
	this.titleScreen = this.controller.stageController.assistant;
	this.controller.document.body.style.backgroundColor = "#000000";
	this.controller.stageController.setWindowProperties({fastAccelerometer: true});

	//variables
	this.transmitting = 0;
	this.pitchTimeout = 0;
	this.pitchStart = 0;
	this.pitchLast = 0;
	this.pitchCurrent = 0;
	this.pitchDiff = 0;
	this.rotation = 0;
	this.greeted = 0;
	this.lastButton = 0;
	this.lastDepartment = "none";
	this.lastCharacter = 0;
	this.message = "none";
	this.lastSaying = 0;
	this.character = 0;
	this.department = "";
	
	//item references
	this.communicateHolder = this.controller.window;
	this.documentHolder = this.controller.document;
	this.antennaGrill = this.controller.get("antennaGrill");
	this.backgroundScience = this.controller.get("backgroundScience");
	this.backgroundOperations = this.controller.get("backgroundOperations");
	this.backgroundCommand = this.controller.get("backgroundCommand");
	this.signalSpinner = this.controller.get("signalSpinner");
	
	//button references
	this.buttonScience = this.controller.get("buttonScience");
	this.buttonOperations = this.controller.get("buttonOperations");
	this.buttonCommand = this.controller.get("buttonCommand");
	this.buttonNegative = this.controller.get("buttonNegative");
	this.buttonPositive = this.controller.get("buttonPositive");

	//function references
	this.flickHandler = this.onFlick.bind(this);
	this.slideHandler = this.onSlider.bind(this);
	this.shakeStartHandler = this.handleShakeStart.bind(this);
	this.shakeEndHandler = this.handleShakeEnd.bind(this);
	this.shakingHandler = this.handleShaking.bind(this);
	this.buttonPressHandler = this.buttonPress.bind(this);
	
	//autio setup
	this.buttonAudio = this.titleScreen.controller.get("buttonAudio");
	this.effectsAudio = this.titleScreen.controller.get("effectsAudio");
	this.buttonAudio.src = Mojo.appPath + "/audio/buttons/button1.mp3";
	this.effectsAudio.src = Mojo.appPath + "/audio/buttons/button1.mp3";
	this.buttonAudio.load();
	this.effectsAudio.load();
};

CommunicateAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
 	Mojo.Event.listen(this.communicateHolder, Mojo.Event.flick, this.flickHandler);
	this.sliderStateSubscribtion = new Mojo.Service.Request('palm://com.palm.keys/switches', {
		method: 'status', parameters: {subscribe: true},
		onSuccess: this.onSlider.bind(this)
	});		
	Mojo.Event.listen(this.documentHolder, 'shakestart', this.shakeStartHandler);
 	Mojo.Event.listen(this.documentHolder, 'shakeend', this.shakeEndHandler); 	
	Mojo.Event.listen(this.buttonCommand, "mousedown", this.buttonPressHandler);
	Mojo.Event.listen(this.buttonOperations, "mousedown", this.buttonPressHandler);
	Mojo.Event.listen(this.buttonScience, "mousedown", this.buttonPressHandler);
	Mojo.Event.listen(this.buttonNegative, "mousedown", this.buttonPressHandler);
	Mojo.Event.listen(this.buttonPositive, "mousedown", this.buttonPressHandler);
};

CommunicateAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
	Mojo.Event.stopListening(this.communicateHolder, Mojo.Event.flick, this.flickHandler);
	this.sliderStateSubscribtion.cancel(); // Kills the subscription
	Mojo.Event.stopListening(this.documentHolder, 'shakestart', this.shakeStartHandler);
 	Mojo.Event.stopListening(this.documentHolder, 'shakeend', this.shakeEndHandler);  
	Mojo.Event.stopListening(this.buttonCommand, "mousedown", this.buttonPressHandler);
	Mojo.Event.stopListening(this.buttonOperations, "mousedown", this.buttonPressHandler);
	Mojo.Event.stopListening(this.buttonScience, "mousedown", this.buttonPressHandler);
	Mojo.Event.stopListening(this.buttonNegative, "mousedown", this.buttonPressHandler);
	Mojo.Event.stopListening(this.buttonPositive, "mousedown", this.buttonPressHandler);
};

CommunicateAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
};
