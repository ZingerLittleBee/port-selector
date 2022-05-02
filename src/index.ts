import {
    Selector,
    _isFree,
    _isFreeTcp,
    _isFreeUdp,
    _randomFreePort,
    _randomFreeTcpPort,
    _randomFreeUdpPort,
    _selectFreePort,
    _selectFromGivenPort
} from './infrastructure'

const portRangeValidation = (port: number) => {
    if (port < 0 || port > 65535) throw new Error('port must be range 0 to 65535')
}

const isInteger = (port: number) => {
    if (!Number.isInteger(port)) throw new Error('port must be integer')
}

const portValidationChain = (port: number) => {
    isInteger(port)
    portRangeValidation(port)
}

const portCustomRangeValidation = (from?: number, to?: number) => {
    from && portValidationChain(from)
    to && portValidationChain(to)
    if ((from || from === 0) && to) if (from >= to) throw new Error('portTo must be bigger than portFrom')
    if (to === 0) throw new Error('portTo must be greater than 0')
    if (from === 65535) throw new Error('portFrom must be less than 65535')
}

export const isFree = (port: number) => {
    portValidationChain(port)
    return _isFree(port)
}

export const isFreeTcp = (port: number) => {
    portValidationChain(port)
    return _isFreeTcp(port)
}

export const isFreeUdp = (port: number) => {
    portValidationChain(port)
    return _isFreeUdp(port)
}

export const randomFreePort = () => {
    return _randomFreePort()
}

export const randomFreeTcpPort = () => _randomFreeTcpPort()

export const randomFreeUdpPort = () => _randomFreeUdpPort()

export const selectFromGivenPort = (starterPort: number) => {
    portValidationChain(starterPort)
    return _selectFromGivenPort(starterPort)
}

export const selectFreePort = (selector?: Selector) => {
    if (selector) {
        portCustomRangeValidation(selector.portFrom, selector.portTo)
        return _selectFreePort(selector)
    } else {
        return _selectFreePort()
    }
}
