waitForVideoElementToDisplay(function(){
	waitForVideoHeightAndWidth(function(){
		const videoDiv = document.getElementById("movie_player");
		const vidHeight = videoDiv.firstChild.firstChild.videoHeight;
		const vidWidth = videoDiv.firstChild.firstChild.videoWidth;
		const root = document.documentElement;
		root.style.setProperty('--widthMultiplier', vidWidth / vidHeight);
		root.style.setProperty('--heightMultiplier', vidHeight / vidWidth);
		window.scrollTo(0, 0);
	});
});

function waitForVideoElementToDisplay(callback) {
  (function loopSearch() {
    if (document.getElementById("movie_player") != null) {
      callback();
      return;
    }
    else {
      setTimeout(function() { loopSearch(); }, 1000);
    }
  })();
}

function waitForVideoHeightAndWidth(callback) {
  (function loopSearch() {
    if (document.getElementById("movie_player").firstChild.firstChild.videoHeight != 0) {
      callback();
      return;
    }
    else {
      setTimeout(function() { loopSearch(); }, 1000);
    }
  })();
}