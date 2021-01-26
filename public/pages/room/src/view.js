class View {
  contructor() {}

  createVideoElement({ muted = true, src, srcObject }) {
    const video = document.createElement("video");
    video.muted = muted;

    if (src) {
      console.log("config for src");
      video.src = src;
      video.controls = true;
      video.loop = true;
      Util.sleep(200).then(() => video.play());
    }

    if (srcObject) {
      console.log("config for stream", srcObject);
      video.srcObject = srcObject;
      video.addEventListener("loadmetadata", () => video.play());
    }
    return video;
  }

  renderVideo({
    userId,
    stream = null,
    url = null,
    isCurrentId = false,
    muted = true,
  }) {
    const video = this.createVideoElement({
      muted,
      src: url,
      srcObject: stream,
    });

    this.appendToHTMLTree(userId, video, isCurrentId);
  }

  appendToHTMLTree(userId, video, isCurrentId) {
    console.log("Append novo video");
    const div = document.createElement("div");

    div.id = userId;
    div.classList.add("wrapper");
    div.append(video);

    const div2 = document.createElement("div");
    div2.innerText = isCurrentId ? "" : userId;
    div.append(div2);

    const videoGrid = document.getElementById("video-grid");
    videoGrid.append(div);
  }

  setParticipants(count) {
    const myself = 1;
    const participants = document.getElementById("participants");
    participants.innerHTML = count + myself;
  }
}
