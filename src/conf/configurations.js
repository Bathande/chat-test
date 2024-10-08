const ccpConfig =  {
    ccpUrl: 'https://bathannntuman.my.connect.aws/ccp-v2',
    loginUrl:'',           // REQUIRED
    loginPopup: true,               // optional, defaults to `true`
    loginPopupAutoClose: true,      // optional, defaults to `false`
    loginOptions: {                 // optional, if provided opens login in new window
      autoClose: true,              // optional, defaults to `false`
      height: 600,                  // optional, defaults to 578
      width: 400,                   // optional, defaults to 433
      top: 0,                       // optional, defaults to 0
      left: 0                       // optional, defaults to 0
    },
    region: "us-east-1",         // REQUIRED for `CHAT`, optional otherwise
    softphone: {                    // optional, defaults below apply if not provided
      allowFramedSoftphone: true,   // optional, defaults to false
      disableRingtone: false,       // optional, defaults to false
      ringtoneUrl: "./ringtone.mp3",// optional, defaults to CCP’s default ringtone if a falsy value is set
      disableEchoCancellation: false// optional, defaults to false
    },
    pageOptions: { //optional
      enableAudioDeviceSettings: true, //optional, defaults to 'false'
      enablePhoneTypeSettings: true //optional, defaults to 'true' 
    },
    shouldAddNamespaceToLogs: false, //optional, defaults to 'false'
    ccpAckTimeout: 5000, //optional, defaults to 3000 (ms)
    ccpSynTimeout: 3000, //optional, defaults to 1000 (ms)
    ccpLoadTimeout: 10000 //optional, defaults to 5000 (ms)
   }

   export {
    ccpConfig
   }
