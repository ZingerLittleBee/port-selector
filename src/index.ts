const portSelector: {
    isFree: (port: number) => boolean
} = require('../index.node')

console.log(portSelector.isFree(8000))
