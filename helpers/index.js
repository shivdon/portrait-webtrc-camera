export const gettingMedia = async () => {
  let media;
  let supports = navigator.mediaDevices.getSupportedConstraints();
  if (
    !supports["width"] ||
    !supports["height"] ||
    !supports["frameRate"] ||
    !supports["facingMode"]
  ) {
    // We're missing needed properties, so handle that error.

    console.log("hello");
  } else {
    let constraints = {
      video: true,
      width: 1280,
      height: 720,
      aspectRatio: 1.777777778,
      frameRate: { max: 60, min: 10 },
      facingMode: { exact: "environment" },
    };
    try {
      media = await navigator.mediaDevices.getUserMedia(constraints);
      console.log(
        supports,
        media.getVideoTracks(),
        media.getVideoTracks()[0].getCapabilities(),
        media.getVideoTracks()[0].getConstraints(),
        media.getVideoTracks()[0].getSettings()
      );
    } catch (err) {
      console.log(err);
    }
  }
  media
    .getVideoTracks()[0]
    .applyConstraints({
      width: media.getVideoTracks()[0].getCapabilities().width,
      height: media.getVideoTracks()[0].getCapabilities().height,
    });
  return media;
};
