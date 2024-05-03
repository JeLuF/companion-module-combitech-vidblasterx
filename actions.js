"use strict";

module.exports = function (self) {
	self.setActionDefinitions({
		auto: {
			name: 'Switcher: Auto',
			options: [],
			callback: async (event) => {
				console.log("auto")
				self.apiwrite('PGM 1, auto')
			}
		},
		take: {
			name: 'Switcher: Take',
			options: [],
			callback: async (event) => {
				console.log("take")
				self.apiwrite('PGM 1, take')
			}
		},
		program: {
			name: 'Switcher: Program',
			options: [
				{
					id: 'source',
					type: 'textinput',
					label: 'Source',					
				}
			],
			callback: async (event) => {
				console.log('program'),
				self.apiwrite('PGM 1, select, ' + event.options.source)
			}
		},
		preview: {
			name: 'Switcher: Preview',
			options: [
				{
					id: 'source',
					type: 'textinput',
					label: 'Source',					
				}
			],
			callback: async (event) => {
				console.log('preview'),
				self.apiwrite('PVW 1, select, ' + event.options.source)
			}
		},		
	})
}
