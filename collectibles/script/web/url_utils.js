//
//Copyright (c) 2010 Human Engines Inc. All rights reserved.
//
//Redistribution and use in source and binary forms, with or without
//modification, are permitted provided that the following conditions are
//met:
//
//   * Redistributions of source code must retain the above copyright
//notice, this list of conditions and the following disclaimer.
//
//   * Redistributions in binary form must reproduce the above
//copyright notice, this list of conditions and the following disclaimer
//in the documentation and/or other materials provided with the
//distribution.
//
//THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
//"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
//LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
//A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
//OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
//SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
//DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
//THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
//(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
//OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//


//Parse window URL for variables
function urlParam(name) {
	var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if (!results) { return 0; }
	return results[1] || 0;
}

//Shorten URL code
function shortenURL(longURL) {
// set up default options
  var defaults = {
    version:    '2.0.1',
    login:      'humanengines',
    apiKey:     'R_909ee310e09db4e8837a3109b81bf984',
    history:    '0',
    longUrl:    longURL
  };

  // Build the URL to query
  var daurl = "http://api.bit.ly/shorten?"
    +"version="+defaults.version
    +"&longUrl="+defaults.longUrl
    +"&login="+defaults.login
    +"&apiKey="+defaults.apiKey
    +"&history="+defaults.history
    +"&format=json&callback=?";

    // Utilize the bit.ly API
    jQuery.getJSON(daurl, function(data){

    	// Make a good use of short URL
/*
			console.log(data.results[defaults.longUrl].shortUrl);
*/
			set_short_url_val(data.results[defaults.longUrl].shortUrl);

    });
}

function set_url_vals() {
	var longURL = jQuery("#long-link").val();
	shortenURL(longURL);
}

function set_short_url_val(url) {
	jQuery("#bitly").val(url);
}
