let playerTheater = null;
let video = null;
let chat = false;
let vidHeight = -1;
let vidWidth = -1;
let inWatch = false;

browser.runtime.onMessage.addListener((request) => {
	if (window.location.href.toString().includes("://www.youtube.com/watch"))
	{
		inWatch = true;
		waitForElementsToDisplay(function() {
			playerTheater = document.getElementById("player-theater-container");
			video = document.getElementById("movie_player").firstChild.firstChild;
			vidHeight = video.videoHeight;
			vidWidth = video.videoWidth;
			playerTheater.style.setProperty('max-height', 'calc(100vh - 56px)', 'important');
			playerTheater.style.setProperty('height', '100vh', 'important');
			window.dispatchEvent(new Event('resize'));
			window.scrollTo(0, 0);
			waitForChatToDisplay(function() {
				chat = true;
				window.dispatchEvent(new Event('resize'));
			});
		});
	}
	else
	{
		inWatch = false;
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
		if ((window.innerHeight - 56) * (video.videoWidth / video.videoHeight) <= trueWidth)
		{
			video.style.setProperty('max-height', (window.innerHeight - 56).toString() + 'px', 'important');
			video.style.setProperty('max-width', ((window.innerHeight - 56) * (vidWidth / vidHeight)).toString() + 'px', 'important');
		}
		else
		{
			video.style.setProperty('max-height', (trueWidth * (vidHeight / vidWidth)).toString() + 'px', 'important');
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