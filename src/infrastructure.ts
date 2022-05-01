type Selector = {
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

const {
    isFree,
    isFreeTcp,
    isFreeUdp,
    randomFreePort,
    randomFreeTcpPort,
    randomFreeUdpPort,
    selectFromGivenPort,
    selectFreePort
}: PortSelectorInRust = require('../index.node')

export {
    isFree,
    isFreeTcp,
    isFreeUdp,
    randomFreePort,
    randomFreeTcpPort,
    randomFreeUdpPort,
    selectFromGivenPort,
    selectFreePort
}
