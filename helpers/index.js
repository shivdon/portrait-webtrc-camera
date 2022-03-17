export const gettingMedia = async () => {
  let media;
  let supports = navigator.mediaDevices.getSupportedConstraints();
  const devices = await navigator.mediaDevices.enumerateDevices();
  console.log(devices);
  const filteredDevices = devices.filter(
    (device) => device.kind === "videoinput"
  );
  const deviceInfo =
    filteredDevices.length > 1 ? filteredDevices[1] : filteredDevices[0];
  console.log(deviceInfo);
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
      video: {
        height: { min: 400,  max: 4320 },
        width: { min: 640,  max: 7680 },
//         aspectRatio: { exact: 1.777777778 },
        frameRate: { max: 30, min: 10 },
        facingMode: { ideal: "environment" },
      },
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
  media.getVideoTracks()[0].applyConstraints({
    width: media.getVideoTracks()[0].getCapabilities().width.max,
    height: media.getVideoTracks()[0].getCapabilities().height.max,
  });

  console.log(media.getVideoTracks()[0].getSettings());
  return media;
};
