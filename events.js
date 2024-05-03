"use strict";

var receiveEventBacklog = ''
var receiveCommandBacklog = ''

// state machine state, see docs/statemachine
var state = 'New'
var result = []

function processCommandEvents(self, receivebuffer) {
    receiveCommandBacklog += receivebuffer
    let n = receiveCommandBacklog.indexOf('\n')
    console.log(receiveCommandBacklog, n)
    while (~n) {
        var line = receiveCommandBacklog.substring(0, n).trim()
        switch (state) {
            case 'New':
                if (line == '200 Welcome') {
                    state = 'Clean'
                } else {
                    self.log('error', 'ERROR ERROR ERROR ERROR ERROR')
                    self.log('error','Unexpected message: '+ line)
                }
                break
            case 'Clean':
                if (line == '200 Ok') {
                    state='OK'
                } else if (line.slice(0,4) == '400-') {
                    state='Error 1'
                    result.push(line)
                } else {
                    self.log('error', 'ERROR ERROR ERROR ERROR ERROR')
                    self.log('error','Unexpected message: '+ line)
                }
                break
            case 'OK':
                if (line == '.') { // End of response
                    console.log('Message completed', result)
                    result = []
                    state = 'Clean'
                } else {
                    result.push(line)
                }
                break
            case 'Error 1':
                if (line.slice(0,4) == '400 ') {
                    result.push(line)
                    console.log("Failed", result)
                    result = []
                }
        }
        console.log('Line processed. State: '+ state + ', line: '+ line)
        receiveCommandBacklog = receiveCommandBacklog.substring(n + 1)
        n = receiveCommandBacklog.indexOf('\n')
    }
}


function processEventstreamEvents(self, receivebuffer) {
    receiveEventBacklog += receivebuffer
    let n = receiveEventBacklog.indexOf('\n')
    while (~n) {
        // get the first line from the backlog and split it by comma
        var lineparts = receiveEventBacklog.substring(0, n).split(',').map(e=>e.trim())
        if (lineparts[0] != 'ontally') {
            console.log('LINE: '+JSON.stringify(lineparts))
        }
        if (lineparts[0] == 'onselected'){
            if (lineparts[1] == 'PGM 1') {
                self.state['program'] = lineparts[2]
            } else if (lineparts[1] == 'PVW 1') {
                self.state['preview'] = lineparts[2]
            }
            self.setVariableValues(self.state)
            self.checkFeedbacks()
        }
        receiveEventBacklog = receiveEventBacklog.substring(n + 1)
        n = receiveEventBacklog.indexOf('\n')
    }
}

module.exports = {processCommandEvents, processEventstreamEvents}