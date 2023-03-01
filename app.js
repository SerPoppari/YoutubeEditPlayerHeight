let playerTheater = null;
let videoParent = null;
let lastURL = "";

let mutationObserver = new MutationObserver(function(mutations) {
	if (!fullscreen && videoParent.getAttribute('aria-label').includes("Fullscreen"))
	{
		fullscreen = true;
		playerTheater.style.setProperty('max-height', '100vh', 'important');
	}
	else if (fullscreen && !videoParent.getAttribute('aria-label').includes("Fullscreen"))
	{
		fullscreen = false;
		playerTheater.style.setProperty('max-height', 'calc(100vh - 56px)', 'important');
	}
});

browser.runtime.onMessage.addListener((request) => {
	if (window.location.href.toString().includes("://www.youtube.com/watch"))
	{
		if (lastURL != window.location.href)
		{
			lastURL = window.location.href;
			fullscreen = false;
			waitForElementsToDisplay(function() {
				playerTheater = document.getElementById("player-theater-container");
				videoParent = document.getElementById("movie_player");
				playerTheater.style.setProperty('max-height', 'calc(100vh - 56px)', 'important');
				window.dispatchEvent(new Event('resize'));
				mutationObserver.observe(videoParent, {
					attributes: true
				});
			});
		}
	}
})

function waitForElementsToDisplay(callback) {
  (function loopSearch() {
    if (document.getElementById("player-theater-container") != null
	&& document.getElementById("movie_player") != null) {
      callback();
      return;
    }
    else {
      setTimeout(function() { loopSearch(); }, 1000);
    }
  })();
}