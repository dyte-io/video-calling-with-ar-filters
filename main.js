import icons from './icons.json';

const init = async () => {
  const {
    VITE_API_BASE,
    VITE_MEETING_ID,
    VITE_AUTH_HEADER,
    VITE_DEEP_AR_TOKEN
  } = import.meta.env;


  // Add a participant
  // NOTE: this API should ideally be called in your app's backend.
  const ID = genID();
  const response = await fetch(`${VITE_API_BASE}/v2/meetings/${VITE_MEETING_ID}/participants`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Basic ${VITE_AUTH_HEADER}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_specific_id: ID,
      name: ID,
      preset_name: 'group_call_host',
    }),
  });

  if (!response.ok) return;
  const { data } = await response.json();


  // Initialize Dyte Meeting
  const meeting = await DyteClient.init({
    authToken: data.token,
    defaults: {
      audio: false,
      video: false,
    },
  });
  meeting.joinRoom();
  passMeetingProp(meeting);

  // Initialize Deep AR
  const filters = [
    "./effects/lion",
    "./effects/flowers",
    "./effects/dalmatian",
    "./effects/background_segmentation",
    "./effects/background_blur",
    "./effects/aviators",
  ];

  const deepARCanvas = document.createElement("canvas");
  deepARCanvas.width = 680;
  deepARCanvas.height = 480;
  const deepAR = await deepar.initialize({
    licenseKey: VITE_DEEP_AR_TOKEN,
    canvas: deepARCanvas,
    effect: filters[0],
    additionalOptions: {
      cameraConfig: {
        disableDefaultCamera: true,
      },
    },
  });

  let count = 0;
  let filterIndex = 0;

  const AddFilter = document.getElementById("arFilter");
  const SwitchFilter = document.getElementById("switchFilter");
  AddFilter.icon = icons.addFilter;
  SwitchFilter.icon = icons.switchFilter;

  AddFilter.addEventListener("click", toggleAR);
  SwitchFilter.addEventListener("click", filterChangeHandler);


  function toggleAR() {
    count++;

    if (count % 2 == 0) {
      AddFilter.label = 'Add Filter'
      meeting.self.removeVideoMiddleware(AddTheme);
    } else {
      AddFilter.label = 'Remove Filter'
      meeting.self.addVideoMiddleware(AddTheme);
    }
  }

  async function AddTheme() {
    let lastProcessedImage = null;
    const intermediatoryCanvas = document.createElement("canvas");
    intermediatoryCanvas.width = 640;
    intermediatoryCanvas.height = 480;
    const intermediatoryCanvasCtx = intermediatoryCanvas.getContext("2d");

    return async (canvas, ctx) => {
      intermediatoryCanvasCtx.drawImage(canvas, 0, 0);
      if (lastProcessedImage) {
        ctx.drawImage(
          lastProcessedImage, 0, 0,
          lastProcessedImage.width,
          lastProcessedImage.height, 0, 0,
          canvas.width, canvas.height
        );
      }
      await deepAR.processImage(intermediatoryCanvas);
      const image = new Image();
      image.id = "picture";
      image.src = await deepAR.takeScreenshot();
      lastProcessedImage = image;
    };
  }

  async function filterChangeHandler() {
    filterIndex = (filterIndex + 1) % filters.length;
    await deepAR.switchEffect(filters[filterIndex]);
  }
};

init();

function passMeetingProp(meeting) {
  const els = document.getElementsByClassName('dyte');
  for (const el of els) {
    el.meeting = meeting;
  }
  document.getElementById('loader').style.display = 'none';
  document.getElementById('app').style.display = 'flex';
}

function genID() {
  const ID = Math.random().toString(36).substring(2,7);
  return ID;
}

// Manage Sidebar States
document.body.addEventListener('dyteStateUpdate', ({ detail }) => {
  document.querySelector('dyte-sidebar').style.display = detail.activeSidebar ? 'flex' : 'none';

  document.querySelector('dyte-sidebar').states = { sidebar: detail.activeSidebar ? detail.sidebar : 'none' };
});
