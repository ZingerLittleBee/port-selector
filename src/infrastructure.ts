export type Selector = {
    checkTcp?: boolean
    checkUdp?: boolean
    portFrom?: number
    portTo?: number
    maxRandomTimes?: number
}

type PortSelectorInRust = {
    isFree: (port: number) => boolean
    isFreeTcp: (port: number) => boolean
    isFreeUdp: (port: number) => boolean
    randomFreePort: () => number
    randomFreeTcpPort: () => number
    randomFreeUdpPort: () => number
    selectFromGivenPort: (starter: number) => number
    selectFreePort: (select?: Selector) => number
}

export const {
    isFree: _isFree,
    isFreeTcp: _isFreeTcp,
    isFreeUdp: _isFreeUdp,
    randomFreePort: _randomFreePort,
    randomFreeTcpPort: _randomFreeTcpPort,
    randomFreeUdpPort: _randomFreeUdpPort,
    selectFromGivenPort: _selectFromGivenPort,
    selectFreePort: _selectFreePort
}: PortSelectorInRust = require('../index.node')
