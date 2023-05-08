const init = async () => {
  const meeting = await DyteClient.init({
    authToken: "",
    defaults: {
      audio: true,
      video: true,
    },
  });

  const btn = document.getElementById("arFilter");

  var count = 0;

  async function RetroTheme() {
    let lastProcessedImage = null;
    const intermediatoryCanvas = document.createElement("canvas");
    intermediatoryCanvas.width = 640;
    intermediatoryCanvas.height = 480;
    const intermediatoryCanvasCtx = intermediatoryCanvas.getContext("2d");

    const deepARCanvas = document.createElement("canvas");
    deepARCanvas.width = 680;
    deepARCanvas.height = 480;

    const Filter = ["./effects/lion"];

    const deepAR = await deepar.initialize({
      licenseKey: "",
      canvas: deepARCanvas,
      effect: Filter,
      additionalOptions: {
        cameraConfig: {
          disableDefaultCamera: true,
        },
      },
    });

    let filterIndex = 0;
    const filters = [
      "./effects/lion",
      "./effects/flowers",
      "./effects/dalmatian",
      "./effects/background_segmentation",
      "./effects/background_blur",
      "./effects/aviators",
    ];
    const changeFilterButton = document.getElementById("switchFilter");

    changeFilterButton.addEventListener("click", filterChangeHandler);

    async function filterChangeHandler() {
      filterIndex = (filterIndex + 1) % filters.length;
      await deepAR.switchEffect(filters[filterIndex]);
    }

    return async (canvas, ctx) => {
      intermediatoryCanvasCtx.drawImage(canvas, 0, 0);
      if (lastProcessedImage) {
        ctx.drawImage(
          lastProcessedImage,
          0,
          0,
          lastProcessedImage.width,
          lastProcessedImage.height,
          0,
          0,
          canvas.width,
          canvas.height
        );
      }
      // await deepAR.processImage(intermediatoryCanvas);
      // await deepAR.processImage(intermediatoryCanvas);
      await deepAR.processImage(intermediatoryCanvas);
      const image = new Image();
      image.id = "pic";
      image.src = await deepAR.takeScreenshot();
      lastProcessedImage = image;
    };
  }

  btn.addEventListener("click", myFunction);

  function myFunction() {
    count++;

    if (count % 2 == 0) {
      meeting.self.removeVideoMiddleware(RetroTheme);
    } else {
      meeting.self.addVideoMiddleware(RetroTheme);
    }
  }

  const dyteLeaveButton = document.getElementById("dyteLeaveButton");
  const dyteEndedScreen = document.getElementById("dyteEndedScreen");
  const dyteMeeting = document.getElementById("dyteMeeting");

  dyteLeaveButton.addEventListener("click", myFunction2);

  function myFunction2() {
    meeting.leaveRoom();

    dyteEndedScreen.style.display = "block";
    dyteMeeting.style.display = "none";
  }

  document.getElementById("meetingTitle").meeting = meeting;
  document.getElementById("dyteGrid").meeting = meeting;
  document.getElementById("dyteControlbar").meeting = meeting;
  document.getElementById("dyteMicToggle").meeting = meeting;
  document.getElementById("dyteCameraToggle").meeting = meeting;
  document.getElementById("dyteSettingsToggle").meeting = meeting;
  document.getElementById("arFilter").meeting = meeting;
  document.getElementById("dyteLeaveButton").meeting = meeting;
  document.getElementById("dyteEndedScreen").meeting = meeting;
};

init();
