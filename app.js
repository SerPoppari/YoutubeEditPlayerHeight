let playerTheater = null;
let videoParent = null;
let video = null;
let chat = false;
let lastURL = "";
let fullscreen = false;
let mutationObserver = new MutationObserver(function(mutations) {
	if (!fullscreen && videoParent.getAttribute('aria-label').includes("Fullscreen"))
	{
		fullscreen = true;
		window.dispatchEvent(new Event('resize'));
	}
	else if (fullscreen && !videoParent.getAttribute('aria-label').includes("Fullscreen"))
	{
		fullscreen = false;
		window.dispatchEvent(new Event('resize'));
	}
});

browser.runtime.onMessage.addListener((request) => {
	if (window.location.href.toString().includes("://www.youtube.com/watch"))
	{
		if (lastURL != window.location.href)
		{
			lastURL = window.location.href;
			chat = false;
			fullscreen = false;
			waitForElementsToDisplay(function() {
				playerTheater = document.getElementById("player-theater-container");
				videoParent = document.getElementById("movie_player");
				mutationObserver.observe(videoParent, {
					attributes: true
				});
				video = videoParent.firstChild.firstChild;
				playerTheater.style.setProperty('height', '100vh', 'important');
				window.dispatchEvent(new Event('resize'));
				waitForChatToDisplay(function() {
					chat = true;
					window.dispatchEvent(new Event('resize'));
				});
				window.scrollTo(0, 0);
			});
		}
	}
	else
	{
		playerTheater = null;
		video = null;
		chat = false;
	}
})

window.onresize = function(event) {
	if (video != null)
	{
		let trueWidth = window.innerWidth;
		if (chat)
		{
			trueWidth -= 400;
		}
		let trueHeight = window.innerHeight;
		if (fullscreen)
		{
			playerTheater.style.setProperty('max-height', '100vh', 'important');
		}
		else
		{
			playerTheater.style.setProperty('max-height', 'calc(100vh - 56px)', 'important');
			trueHeight -= 56;
		}
		if (trueHeight * (video.videoWidth / video.videoHeight) <= trueWidth)
		{
			video.style.setProperty('max-height', trueHeight.toString() + 'px', 'important');
			video.style.setProperty('max-width', (trueHeight * (video.videoWidth / video.videoHeight)).toString() + 'px', 'important');
		}
		else
		{
			video.style.setProperty('max-height', (trueWidth * (video.videoHeight / video.videoWidth)).toString() + 'px', 'important');
			video.style.setProperty('max-width', trueWidth.toString() + 'px', 'important');
		}
	}
};

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

function waitForChatToDisplay(callback) {
  (function loopSearch() {
    if (document.getElementById("chat") != null) {
      callback();
      return;
    }
    else {
      setTimeout(function() { loopSearch(); }, 1000);
    }
  })();
}