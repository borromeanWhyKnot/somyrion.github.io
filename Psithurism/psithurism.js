// ==UserScript==
// @name         Psithurism.user.js
// @namespace    http://tampermonkey.net/
// @version      0.1.0
// @description  Hotkeys for the N-Day Potato Alliance, based on NSBreeze++
// @author       Somyrion
// @match        https://www.nationstates.net/*
// @updateURL    https://github.com/Somyrion/somyrion.github.io/raw/master/Psithurism/psithurism.js
// @require      https://code.jquery.com/jquery-3.5.1.min.js
// @grant        none
// ==/UserScript==

/* Keybinds:
* = repeated several times for full action

[N] Reload the page to get a [n]ew page (mostly kept so R/Ders aren't confused)
[<] Go back
[P*] Convert production to nukes or shields based on specialty
[W] Convert production to nukes (nuclear weapons)
[S] Convert production to shields
[Spacebar*] Your nukes page (×1), your faction page (×2)
[M*] View and shield incoming nukes
[K*] Perform targetting procedure (from other faction page, choose nation and target it)
[L*] Launch nukes that are targetted

*/

/* global $ */

var facID = "12"; // update when N-Day starts!
(function() {
	var shifted = false;
	var controlled = false;
	var alternated = false;
	$(document).keydown(function(f) {
		shifted = f.shiftKey;
        controlled = f.ctrlKey;
		alternated = f.altKey;
		// Stops the spacebar from scrolling when jumping to the reports page
		if (f.keyCode == 32 && f.target == document.body) {
			f.preventDefault();
			f.stopPropagation();
		}
	});
	// This is the main keymapping function of the script
	$(document).keyup(function(e) {
		// Psithurism will not activate while you are using the Shift, Ctrl, ot Alt keys
        if (shifted || controlled || alternated){
			return;
        }
		else {
			if ($("input,textarea").is(":focus")){
			// Psithurism will not activate if you are typing in a text field
				return;
			}	
			// Go Back (<)
			else if (e.keyCode == 188){
				window.history.back();
			}
			// Refresh (N)
			else if (e.keyCode == 78){
				window.location.reload();
			}
			// Convert Production (P, P)
			else if (e.keyCode == 80) {
				if (window.location.href.indexOf("view=production") > -1) {
					if ($('span.fancylike')[0].indexOf("Military") > -1) {
						$('.button[name="convertproduction"][value^="nukes"]').first().trigger('click');
					}
					else if ($('span.fancylike')[0].indexOf("Strategic") > -1) {
						$('.button[name="convertproduction"][value^="shield"]').first().trigger('click');
					}
					else if ($('span.fancylike')[0].indexOf("Economic") > -1) {
						$('.button[name="convertproduction"][value^="shield"]').first().trigger('click');
					}
				}
				else {
					window.location.href = "https://www.nationstates.net/page=nukes/view=production";
				}
			}
			// Convert Production to Nukes (W, W)
			else if (e.keyCode == 87) {
				if (window.location.href.indexOf("view=production") > -1) {
					$('.button[name="convertproduction"][value^="nukes"]').first().trigger('click');
				}
				else {
					window.location.href = "https://www.nationstates.net/page=nukes/view=production";
				}
			}
			// Convert Production to Shields (S, S)
			else if (e.keyCode == 83) {
				if (window.location.href.indexOf("view=production") > -1) {
					$('.button[name="convertproduction"][value^="shield"]').first().trigger('click');
				}
				else {
					window.location.href = "https://www.nationstates.net/page=nukes/view=production";
				}
			}
			// Your Nukes, Your Faction (Spacebar, Spacebar)
			else if (e.keyCode == 32 && e.target == document.body) {
				if (window.location.href.indexOf("page=nukes") > -1) {
					$('.factionname')[0].click();
				}
				else {
					window.location.href = "https://www.nationstates.net/page=nukes";
				}
			}
			// View and Shield Incoming (M, M)
			else if (e.keyCode == 77) {
				// if we're on the incoming nukes page
				if (window.location.href.indexOf("fid="+facID+"/view=incoming") > -1) {
					// shield the first incoming set in the list
					if ($('buttons to shield incoming nukes, all of them (presumably a class)').length > 0) {
						$('buttons to shield incoming nukes, all of them (presumably a class)')[0].click();
						// any additional code if there's a captcha/additional choice?
					} 
					// reload the page to check for new incoming nukes
					else {
						window.location.reload();
					}
				}
				// if we're not on the incoming nukes page
				else {
					window.location.href = "https://www.nationstates.net/page=faction/fid="+facID+"/view=incoming";
				}
			}
			// Perform Targetting (K, K, K, K)
			else if (e.keyCode == 75) {
				// if not on the faction's list by nukes already, go to it
				if (window.location.href.indexOf("page=faction") > -1 && window.location.href.indexOf("fid="+facID) <= -1 && window.location.href.indexOf("view=nukes") <= -1) {
					$('a[title="Nukes"]').click();
				}
				// if on the faction's page by nukes, choose the non-fully-irradiated nation with the most nukes
				else if (window.location.href.indexOf("page=faction") > -1 && window.location.href.indexOf("fid="+facID) <= -1 && window.location.href.indexOf("view=nukes") > -1) {
					// not completed yet!
				}
				// if on the nation page, select the targetting button
				// if on the targetting page, calculate the appropriate number of nukes to target
			}
			// Launch Nukes (L, L, L)
		} //End of Else keylist
	}); // End of Keyup Function(e)
})(); //End of Main function