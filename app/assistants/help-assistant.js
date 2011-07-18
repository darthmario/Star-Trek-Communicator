function HelpAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
}

HelpAssistant.prototype.activateContactForm = function(){
	this.nameModel.disabled = false;
	this.emailModel.disabled = false;
	this.commentModel.disabled = false;
	this.controller.modelChanged(this.nameModel, this);
	this.controller.modelChanged(this.emailModel, this);
	this.controller.modelChanged(this.commentModel, this);
}

HelpAssistant.prototype.makeAnAlert = function(messagePass){
	this.buttonModel.buttonLabel = "Submit Comment";
	this.controller.modelChanged(this.buttonModel, this);
	this.controller.get('formSubmitButton').mojo.deactivate();
	this.controller.showAlertDialog({ 
		title: "Hi!",
		message: messagePass,
	    choices:[{label: "OK", value:"", type:'dismiss'}]
	});
}

HelpAssistant.prototype.cleanThenSend = function(){
	this.buttonModel.buttonLabel = "Sending...";
	this.controller.modelChanged(this.buttonModel, this);
	this.controller.get('formSubmitButton').mojo.activate();
	var namevalue= this.controller.get('nameField').mojo.getValue();
	var emailvalue= this.controller.get('emailField').mojo.getValue();
	var commentvalue= this.controller.get('commentField').mojo.getValue();
	var erroritems = new Array();
	var alertmessage = "In order for me to recieve your message, you must include a valid ";
	if((namevalue=="") || (!this.validateName(namevalue))){
		erroritems.push("name");
	} else {
		namevalue = this.stripHTML(namevalue);
	}
	if(!this.validateEmail(emailvalue)){
		erroritems.push("email address");
	}
	if(commentvalue.length<2){
		erroritems.push("comment");
	} else {
		commentvalue = this.stripHTML(commentvalue);
	}
	if(erroritems.length>0){
		this.makeAnAlert("errors count="+erroritems.length);
		for(i=0;i<erroritems.length; i++){
			if(i <(erroritems.length-1)){
				if(i==(erroritems.length-2)){
					alertmessage += erroritems[i]+" ";
				} else {
					alertmessage += erroritems[i]+", ";
				}
			} else {
				if(i==0){
					alertmessage += erroritems[i]+".";
				} else {
					alertmessage += "and "+erroritems[i]+".";
				}
			}
		}
		this.makeAnAlert(alertmessage);
		return;
	}
	
	var mypostrequest=new XMLHttpRequest();
	var t = this;
	mypostrequest.onreadystatechange=function(){
		if (mypostrequest.readyState==4){
			if (mypostrequest.status==200 || window.location.href.indexOf("http")==-1){
				t.makeAnAlert("Your message has been sent. Thanks!");
			} else{
				t.makeAnAlert("An error has occured making the request");
			}
		}
	}
	var namevalue=encodeURIComponent(namevalue);
	var emailvalue=encodeURIComponent(emailvalue);
	var commentvalue=encodeURIComponent(commentvalue);
	var parameters="name="+namevalue+"&email="+emailvalue+"&comment="+commentvalue;
	mypostrequest.open("POST", "http://www.worldofnate.com/email_form.php", true);
	mypostrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	mypostrequest.send(parameters);
}

HelpAssistant.prototype.validateEmail = function(email) {
	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	if(reg.test(email) == false) {
		return false;
	} else {
		return true;
	}
}

HelpAssistant.prototype.validateName = function(name) {
	var reg = /^[A-Za-z .'-]+$/;
	if(reg.test(name) == false) {
		return false;
	} else {
		return true;
	}
}

// Strip HTML Tags (form) script- By JavaScriptKit.com (http://www.javascriptkit.com)

HelpAssistant.prototype.stripHTML = function(cleaned){
	cleaned = cleaned.replace(/<\/?[a-z][a-z0-9]*[^<>]*>/ig, "");
	return cleaned;
}

HelpAssistant.prototype.setup = function() {
	/* this function is for setup tasks that have to happen when the scene is first created */
	this.controller.document.body.style.backgroundColor = "#75a1c6";
	this.controller.enableFullScreenMode(true);
	this.controller.get("cloudBG").style.backgroundPosition = " -6000px";
	this.controller.get("logo").style.webkitTransform = "scale(1)";
	this.controller.get("logo").style.left = "0.1em"
	this.controller.get("logo").style.top = "-0.2em"
	this.controller.get("thanksBox").style.webkitTransform = "scale(1)";
	/* use Mojo.View.render to render view templates and add them to the scene, if needed */
	
	/* setup widgets here */
	this.nameModel = { value: "", disabled: true };
	this.emailModel = { value: "", disabled: true };
	this.commentModel = { value: "", disabled: true };
  this.buttonModel = { buttonLabel : "Submit Comment" }
  this.controller.setupWidget("formSubmitButton", this.attributes = { type : Mojo.Widget.activityButton }, this.buttonModel);
 	this.controller.setupWidget('nameField', this.attributes = { textFieldName: 'fullname', hintText: 'Your Name' }, this.nameModel);   	 
	this.controller.setupWidget('emailField', this.attributes = { textFieldName: 'email', hintText: 'Your Email'}, this.emailModel);   	 
	this.controller.setupWidget('commentField', this.attributes = { textFieldName: 'comment', hintText: 'Your Comment', multiline: true }, this.commentModel); 
	//formSubmitButton
	
	/* add event handlers to listen to events from widgets */
	Mojo.Event.listen(this.controller.get("contactForm"), Mojo.Event.tap, this.activateContactForm.bindAsEventListener(this));
	Mojo.Event.listen(this.controller.get("formSubmitButton"), Mojo.Event.tap, this.cleanThenSend.bindAsEventListener(this)); 
};

HelpAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
};

HelpAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
};

HelpAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
};
