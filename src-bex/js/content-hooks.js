const
  iFrame = document.createElement('iframe')

const activateIframe = () => {
  Object.assign(iFrame.style, {
    display: 'block',
    position: 'fixed',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    border: '0',
    zIndex: '9999999', // Make sure it's on top
    overflow: 'visible',
    width: '100%',
    height: '100%'
  })
}

/**
 * Reset the iFrame to it's default height e.g The height of the top bar.
 */
const inactivateIframe = () => {
  Object.assign(iFrame.style, {
    display: 'none'
  })
}

iFrame.id = 'bex-app-iframe'
iFrame.style.display = 'none'

;(function () {
  // When the page loads, insert our browser extension app.
  iFrame.src = chrome.runtime.getURL('www/index.html')
  document.body.prepend(iFrame)
})()

export default function attachContentHooks (bridge) {
  bridge.on('gb.translator.activate', event => {
    activateIframe()

    bridge.send('gb.translator.interact', {
      source: window.getSelection().toString()
    })
  })

  bridge.on('gb.translator.inactivate', event => {
    inactivateIframe()
  })
}
