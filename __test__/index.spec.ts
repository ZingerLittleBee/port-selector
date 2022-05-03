import {
    isFree,
    isFreeTcp,
    isFreeUdp,
    randomFreePort,
    randomFreeTcpPort,
    randomFreeUdpPort,
    selectFreePort,
    selectFromGivenPort
} from '../index'

describe('port-selector', () => {
    test('isFree', () => {
        expect(isFree(62342)).toEqual(true)
    })

    test('isFreeTcp', () => {
        expect(isFreeTcp(62342)).toEqual(true)
    })

    test('isFreeUdp', () => {
        expect(isFreeUdp(62342)).toEqual(true)
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

    test('selectFromGivenPort', () => {
        expect(selectFromGivenPort(3000)).toBeGreaterThanOrEqual(3000)
    })

    test('selectFreePort', () => {
        expect(selectFreePort()).toBeGreaterThan(0)
        expect(selectFreePort()).toBeLessThan(65535)
        expect(
            selectFreePort({ checkTcp: false, checkUdp: false, portFrom: 60000, portTo: 65535, maxRandomTimes: 100 })
        ).toBeNull()
        expect(
            selectFreePort({ checkTcp: true, checkUdp: false, portFrom: 60000, portTo: 65535, maxRandomTimes: 100 })
        ).toBeGreaterThanOrEqual(60000)
    })
})
