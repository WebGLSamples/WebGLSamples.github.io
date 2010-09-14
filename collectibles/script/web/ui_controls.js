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

jQuery(document).ready(function() {
			//Start webgl
			//start();
		
	document.body.onselectstart = function() { return false; }
	
	//Listen for click events on model images
    jQuery('#loadingMenu img').click(function() { set_model_to(this) });
	preload();
	
	function set_model_to(model) {
		var model_el = model;
		
		//TODO: pass selection to API
/*
		console.log("Model chosen: " + model.id);
*/
		
		setActiveModel(model.id);
		
		//Set initial state
		set_initial_canvas_state();
	}
	
	//Flag to determine if model select/loading screen is shown or not
	var show_model_select = true;
	
	var modelToLoad = urlParam("model");
	if(modelToLoad)
	{
	    show_model_select = false;
	}
	
	
	//Set initial state
	if (show_model_select) {
		jQuery("#pageContainer").addClass("dim");
		jQuery("#loadingMenu").removeClass("hide");
	} else {
		set_initial_canvas_state();
	}
	
	function set_menu_state() {
		//Hide palettes and menus
		jQuery('#tools').addClass("hide");
		jQuery('#decals').addClass("hide");
		jQuery('#assets').addClass("hide");
		jQuery('#colorPalette').addClass("hide");
		jQuery('#pageContainer').addClass("dim");
		jQuery('#controlArea').addClass("hide");
		jQuery('#controlArea').removeClass("show");
	}
	
	function set_initial_state() {
		set_menu_state();
		jQuery('#loadingMenu').removeClass("hide");
		jQuery('#loadingMenu').addClass("popupMenu");
		jQuery('#optionsMenu').addClass("hide");
		
	}
	
	function set_initial_canvas_state() {
		//Hide popups
		jQuery('#loadingMenu').addClass("hide");
		jQuery('#optionsMenu').addClass("hide");
		jQuery('#pageContainer').removeClass("dim");
		
		
		//Show tools and menus
		toggleEraserTool('#tools');
		jQuery('#tools').removeClass("hide");
		jQuery('#tools').addClass("slide-enter-left");	
		//Show canvas
		//jQuery('#controlArea').removeClass("hide");
		//jQuery('#controlArea').addClass("show");

			//Start webgl
			//start();
		

		//After .5 seconds
		window.setTimeout(function() {
			jQuery('#tools').removeClass("hide");
			jQuery('#tools').addClass("slide-enter-left");
		}, 200);
		
		window.setTimeout(function() {
			jQuery('#colorPalette').removeClass("hide");
			jQuery('#colorPalette').addClass("slide-enter-left");
			jQuery('#assets').removeClass("hide");
			jQuery('#assets').addClass("slide-enter-right");
		}, 500);

		// After 1 second 
		window.setTimeout(function() {
			jQuery("#decals").addClass("transparent");			
			jQuery("#decals").removeClass("hide");
			jQuery("#decals").addClass("fall-enter");				
			
			//Set asset state
			set_assets_menu_to('body');
		}, 1000);
		
		//After 2 seconds
		window.setTimeout(function() {
/*
			console.log(jQuery('#controlArea'));
*/
			jQuery("#decals li").removeClass("fall-enter");
			start();
		}, 2000);

		window.setTimeout(function() {
			jQuery("#controlArea").addClass("transparent");			
			jQuery("#controlArea").removeClass("hide");
			jQuery("#controlArea").addClass("canvas-enter");
		}, 2300);				
	};

	// make tool palettes draggable
	jQuery("#tools").draggable({handle: 'h3', containment: '#pageContainer'});
	jQuery("#colorPalette").draggable({handle: 'h3', containment: '#pageContainer'});
	
	
	//Handle click event for tools
	function set_tool_to(tool, cursorClass) {
		var tool_el = jQuery(tool);
		var name = tool.className;
		var canvas = jQuery('#canvas');
		
		//reset selected tool
		reset_selections(tool_el.parent());
		//set selected tool
		//tool_el.addClass('selected');
		
		//set cursor
		canvas.removeClass('target pointer move resize');
		canvas.addClass(cursorClass);
		
		if (name != "options") {
			//TODO: pass selection to API
/*
			console.log("Tool changed to: " + name);
*/
			
			apiUseToolSelected(name);
		} else {
			set_menu_state();
			jQuery("#long-link").val(createModelURL());
			// set_url_vals();
			jQuery('#optionsMenu').removeClass("hide");
			jQuery('#optionsMenu').addClass("popupMenu");
		}
		

	}
	
	function reset_selections(el) {
		var el = jQuery(el);
		el.children().each(function(index) {
			if (jQuery(this).hasClass('selected')) {
				jQuery(this).removeClass('selected');
			}
		});
	}
	
	// Listen for click events on tools
	jQuery('li.stamp').click(function() { set_tool_to(this, 'target'); });
	jQuery('li.move').click(function() { set_tool_to(this, 'move'); });
	jQuery('li.shader').click(function() { set_tool_to(this, 'target'); });
	jQuery('li.undo').click(function() { set_tool_to(this, 'pointer'); });
	jQuery('li.fill').click(function() { set_tool_to(this, 'target'); });
	jQuery('li.zoom').click(function() { set_tool_to(this, 'move'); });
	jQuery('li.options').click(function() { set_tool_to(this, 'pointer'); });
	jQuery('li.doll1').click(function() { set_tool_to(this, 'pickMale'); });
	jQuery('li.doll2').click(function() { set_tool_to(this, 'pickFemale'); });
	jQuery('li.cameraReset').click(function() { set_tool_to(this, 'reset'); });
	
	//Set assets menu
	function set_assets_menu_to(name) {
		var item_el = jQuery("#"+name+"Assets");
		var item_list = jQuery("#"+name+"Assets ul");
		var container = jQuery("#assets");
		
		//clear menu selections
		reset_selections('#assets');
		container.children(".jcarousel-skin-patterns").each(function() {
			jQuery('img').addClass("fade-in");
		});
		
		//set menu styles
		item_el.addClass('selected');
			
		//display assets menu as carousel
		if (!item_list.hasClass('jcarousel-list')) {
			item_list.jcarousel({ 
						vertical: true,
						scroll: 4,
						wrap: 'circular'
			});
		};
		
	}
	
	
	//Handle click event for menu items
	function set_menu_to(item, cursorClass) {
		var item_el = jQuery(item);
		var name = item.id;

		if (!item_el.hasClass('selected')) {

			//reset selected tool
			reset_selections(item_el.parent());
			
			//set selected tool
			item_el.addClass('selected');
			
			//toggle eraser tool
/*
			console.log(name=='sticker');
*/
			toggleEraserTool(name);
			
			//pass selection to API
			apiSelectIntent(name);
/*
			console.log("Menu item changed to: " + name);
*/
		
			//Load assets menu
			set_assets_menu_to(name);
		}

	}
	
	function toggleEraserTool(menu) {
		var sticker = jQuery("#decals #sticker");
		var tool = jQuery("#tools .undo");
		var blank = jQuery("#tools .blank");
		var menu_item = menu;
		
/*
		console.log("eraser: " + tool.hasClass('selected'));
*/
		if (menu=="sticker") {
			tool.removeClass("hide");
			blank.removeClass("show");
			tool.addClass("show");
			blank.addClass("hide");
		} else {
			tool.addClass("hide");
			blank.addClass("show");
			tool.removeClass("show");
			blank.removeClass("hide");
		}
	}
	
	function showColorPicker(){
		if(jQuery('#colorPalette').hasClass('hide')) {
			jQuery('#colorPalette').removeClass("hide");
		}
	}
	
	// Listen for click events on menu items
	jQuery('li#body').click(function() { set_menu_to(this); showColorPicker();});
	jQuery('li#eye').click(function() { set_menu_to(this); showColorPicker();});
	jQuery('li#hair').click(function() { set_menu_to(this); showColorPicker();});
	jQuery('li#shirt').click(function() { set_menu_to(this); showColorPicker();});
	jQuery('li#pants').click(function() { set_menu_to(this); showColorPicker();});
	jQuery('li#sticker').click(function() { set_menu_to(this); jQuery('#colorPalette').addClass("fade-out");jQuery('#colorPalette').addClass("hide");});
	
	function set_asset_to(el) {
		var asset_sel = el;
		var asset_el = jQuery(el);
		var id = el.id
		
		//reset selected asset
		reset_selections(asset_el.parent());
		asset_el.addClass('selected');
		
/*
		console.log("ASSET: " + typeof(asset_el));
*/
		
		//pass selection to API
		apiPushMaterial(id);
/*
		console.log("Assets selected: " + id);
*/
		
	}
	
	// Listen for click events on asset items
	jQuery('#assets ul li').click(function() { set_asset_to(this); });
	
	function restart_app() {
		// set_initial_state();
		location.reload(true);
	}
	
	function set_quality(el) {
		var quality = el;
		
		//Pass selection API
		apiSetGraphicsQuality(quality);
/*
		console.log("Quality set to: " + quality);
*/
		
		set_initial_canvas_state();
					
		jQuery('#controlArea').removeClass("hide");
		jQuery('#controlArea').addClass("show");
}
	
	//Listen for click events on options items
	jQuery('#optionsMenu #restart').click(function() { restart_app(); });
	jQuery('#optionsMenu a').click(function() { set_quality(this.id); });
	jQuery('#optionsMenu #close').click(function() { jQuery('#controlArea').removeClass("hide"); set_initial_canvas_state(); });
	
});
