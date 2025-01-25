import uitoolkit from './@zoom/videosdk-ui-toolkit/index.js'

console.log("script loaded.");

var sessionContainer = document.getElementById('sessionContainer')
var authEndpoint = 'https://8d4d-47-149-34-213.ngrok-free.app'
var config = {
    videoSDKJWT: '',
    sessionName: 'bootsdevo',
    userName: 'MikeMike',
    sessionPasscode: 'abc123',
    features: ['preview', 'video', 'audio', 'settings', 'users', 'chat', 'share', 'feedback', 'ltt', 'crc', 'pstn', 'recording', 'livestream'],
    options: { init: {}, audio: {}, video: {}, share: {}},
    virtualBackground: {
       allowVirtualBackground: true,
       allowVirtualBackgroundUpload: true,
       virtualBackgrounds: ['https://images.unsplash.com/photo-1715490187538-30a365fa05bd?q=80&w=1945&auto=format&fit=crop']
    }
};
var role = 1

window.getVideoSDKJWT = getVideoSDKJWT

function getVideoSDKJWT() {
    document.getElementById('join-flow').style.display = 'none'

    console.log("Getting api endpoint!");

    fetch(authEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            sessionName:  config.sessionName,
            role: role,
        })
    }).then((response) => {
        return response.json()
    }).then((data) => {
        if(data.signature) {
            console.log("Data Signature VIDEO SDK JWT: ", data.signature);
            config.videoSDKJWT = data.signature
            joinSession()
        } else {
            console.log(data)
        }
    }).catch((error) => {
        console.log(error)
    })
}

function joinSession() {
    console.log("Joining Session with: ", sessionContainer, config);

    uitoolkit.joinSession(sessionContainer, config)

    uitoolkit.onSessionClosed(sessionClosed)
}

var sessionClosed = (() => {
    console.log('session closed')
    uitoolkit.closeSession(sessionContainer)

    document.getElementById('join-flow').style.display = 'block'
})