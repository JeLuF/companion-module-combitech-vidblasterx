"use strict";

const { combineRgb } = require('@companion-module/base')

module.exports = async function (self) {
	const black = combineRgb(0, 0, 0)
    const white = combineRgb(255, 255, 255)
    const red = combineRgb(255, 0, 0)
    const gray = combineRgb(64, 64, 64)

	self.setFeedbackDefinitions({
		Program: {
			name: 'Current Program Source',
			type: 'boolean',
			defaultStyle: {
				bgcolor: red,
				color: black,
			},
			options: [{
				type: 'textinput',
				label: 'Source',
				id: 'source',
			}],
			callback: async (feedback) => {
				return self.state['program'].toUpperCase() == feedback.options.source.toUpperCase()
			}
		},
		Preview: {
			name: 'Current Preview Source',
			type: 'boolean',
			defaultStyle: {
				bgcolor: red,
				color: black,
			},
			options: [{
				type: 'textinput',
				label: 'Source',
				id: 'source',
			}],
			callback: async (feedback) => {
				return self.state['preview'].toUpperCase() == feedback.options.source.toUpperCase()
			}
		}
	})
}
