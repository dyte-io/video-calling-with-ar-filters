const init = async () => {
  const meeting = await DyteClient.init({
    authToken:
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdJZCI6ImRkZjU3YzBmLTFkM2UtNDdmZS1iNmE1LWEwNmM3NDIwMTVhMCIsIm1lZXRpbmdJZCI6ImJiYmJmZTNlLWEyYjYtNGMzNy05ZTIzLWNmYzkzMWM1Y2E3OSIsInBhcnRpY2lwYW50SWQiOiJhYWFlNWY5Mi1mZmYwLTQ2MzItOTdiNy0xOWQ2ZDVmOTE1NTgiLCJwcmVzZXRJZCI6IjM4NzI3NWEwLTBmZTgtNDAyOC05ZDkwLTNhNWYxOTc1M2ZiZCIsImlhdCI6MTY4MDY0MzIwMSwiZXhwIjoxNjg5MjgzMjAxfQ.mmspLJ64kpmKnJGLKKQmQsYBV1r0PdjKRwwUM0UgirkODlqPp2hDb3Ip3MHf7Uy_OdUqeaxbBAwiUzHJZvJ54M2i9RrGqCdaWploG1BbKUiM_A0SHC7OjmO_rrU9M529gAaQla7o9HWP-EBFQfLybO_5Ml6Y9oAcj6P4p-CZtKHnUGynyeV8UKzrR0tIouIDNzoiaEXrkVEz4ryL9BhklZ4Y3CQ701PC-PREF_MrcXSNjep934aXGD-sZ706T5GaW9N21IrslFqSdq8rasJ4CJsClQsaPMpqf6uToV-V2H1EM9Q0hN_WinNc6P_1H3jq5WBBqxGwrruvwGGGqxvhrg",
    defaults: {
      audio: true,
      video: true,
    },
  });

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
