import {
    isFree,
    isFreeTcp,
    isFreeUdp,
    randomFreePort,
    randomFreeTcpPort,
    randomFreeUdpPort,
    selectFreePort,
    selectFromGivenPort
} from './index'

describe('port-selector', () => {
    test('isFree', () => {
        expect(isFree(62342)).toEqual(true)
        expect(() => isFree(12.2)).toThrow(new Error('port must be integer'))
        expect(() => isFree(-1)).toThrow(new Error('port must be range 0 to 65535'))
        expect(() => isFree(65536)).toThrow(new Error('port must be range 0 to 65535'))
    })

    test('isFreeTcp', () => {
        expect(isFreeTcp(62342)).toEqual(true)
        expect(() => isFreeTcp(12.2)).toThrow(new Error('port must be integer'))
        expect(() => isFreeTcp(-1)).toThrow(new Error('port must be range 0 to 65535'))
        expect(() => isFreeTcp(65536)).toThrow(new Error('port must be range 0 to 65535'))
    })

    test('isFreeUdp', () => {
        expect(isFreeUdp(62342)).toEqual(true)
        expect(() => isFreeUdp(12.2)).toThrow(new Error('port must be integer'))
        expect(() => isFreeUdp(-1)).toThrow(new Error('port must be range 0 to 65535'))
        expect(() => isFreeUdp(65536)).toThrow(new Error('port must be range 0 to 65535'))
    })

    test('randomFreePort', () => {
        expect(randomFreePort()).toBeGreaterThan(0)
        expect(randomFreePort()).toBeLessThan(65535)
    })

    test('randomFreeTcpPort', () => {
        expect(randomFreeTcpPort()).toBeGreaterThan(0)
        expect(randomFreeTcpPort()).toBeLessThan(65535)
    })

    test('randomFreeUdpPort', () => {
        expect(randomFreeUdpPort()).toBeGreaterThan(0)
        expect(randomFreeUdpPort()).toBeLessThan(65535)
    })

    test('selectFreePort', () => {
        expect(selectFreePort()).toBeGreaterThan(0)
        expect(selectFreePort()).toBeLessThan(65535)
        // why use anonymous function? https://stackoverflow.com/questions/46042613/how-to-test-the-type-of-a-thrown-exception-in-jest#:~:text=the%20anonymous%20function%20is%20required%20because%20expect(x).toThrow()%20requires%20x%20to%20be%20a%20reference%20to%20a%20function%20that%20throws.%20If%20you%20instead%20pass%20expect(x()).toThrow()%2C%20JavaScript%20will%20resolve%20x()%2C%20which%20would%20likely%20cause%20the%20error%20immediately%2C%20and%20most%20likely%20fail%20your%20test
        expect(() => selectFreePort({ portTo: 12.2 })).toThrow(new Error('port must be integer'))
        expect(() => selectFreePort({ portTo: -1 })).toThrow(new Error('port must be range 0 to 65535'))
        expect(() => selectFreePort({ portTo: 65536 })).toThrow(new Error('port must be range 0 to 65535'))
        expect(() => selectFreePort({ portFrom: 20000, portTo: 10000 })).toThrow(
            new Error('portTo must be bigger than portFrom')
        )
        expect(() => selectFreePort({ portFrom: 65535 })).toThrow(new Error('portFrom must be less than 65535'))
        expect(() => selectFreePort({ portTo: 0 })).toThrow(new Error('portTo must be greater than 0'))
    })

    test('selectFromGivenPort', () => {
        expect(() => selectFromGivenPort(12.2)).toThrow(new Error('port must be integer'))
        expect(() => selectFromGivenPort(-1)).toThrow(new Error('port must be range 0 to 65535'))
        expect(() => selectFromGivenPort(65536)).toThrow(new Error('port must be range 0 to 65535'))
        expect(selectFromGivenPort(3000)).toBeGreaterThanOrEqual(3000)
    })
})
