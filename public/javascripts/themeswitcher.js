
//the button toggles the css file. the app remembers the last chosen settings and reloads the app with the last file loaded instead of the default 

// toggles css files. saves value of either day or night to localstorage
function changeCss() {
	if($( "#switch" ).prop( "checked")) {
		localStorage.setItem("loadout", "dark")
		localStorage.setItem("bootstrap", "dark")
        	//document.getElementById("bootstrap-theme").href = "/stylesheets/bootstrap-dark.min.css";
        	$('head').append('<link rel="stylesheet" type="text/css" href="/stylesheets/dark.css">');
        //color = 'default';
	}
	else{
		localStorage.setItem("loadout", "light")
		localStorage.setItem("bootstrap", "light")
        	$('link[rel=stylesheet][href*="dark.css"]').remove();
        	//document.getElementById("bootstrap-theme").href = "/stylesheets/bootstrap-light.min.css";
        //color = 'light';
	}
}

//called when site launched or browser refreshed.
// $( document ).ready( loadStyle );
 loadStyle = function loadStyle() {
	var stylePreference = localStorage.getItem("loadout");
	if(stylePreference) {
		if(stylePreference === "dark") {
            		//document.getElementById("bootstrap-theme").href = "/stylesheets/bootstrap-dark.min.css";
            		$('head').append('<link rel="stylesheet" type="text/css" href="/stylesheets/dark.css">')
			//Check the switch button is set correctly
			$( "#switch" ).prop( "checked", true );
			//color = 'dark';
		}
		else {
			//Check the switch button is set correctly
			$("#switch").prop( "checked", false );
            		//document.getElementById("bootstrap-theme").href = "/stylesheets/bootstrap-light.min.css";
            		$('head').append('<link rel="stylesheet" type="text/css" href="/stylesheets/light.css">');
            	//color = 'default';
		}
	//Incase there's no localStorage draws the dark (changed from light on 20122020) graph	
	} else {
		$("#switch").prop("checked", true);
        	$('head').append('<link rel="stylesheet" type="text/css" href="/stylesheets/dark.css">');
        //color = 'dark';
	}
};


//loads a screen to cover the changing of themes and accidental blinding
$(window).on('load', function () {
	$("#coverScreen").hide();
	loadStyle();
});
