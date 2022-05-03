Language : 🇺🇸 English | [🇨🇳 简体中文](https://github.com/ZingerLittleBee/port-selector/blob/main/README.zh-CN.md)

<h1 align="center">port-selector</h1>
<div align="center">
    
[![NPM Version](https://img.shields.io/npm/v/port-selector)](https://www.npmjs.com/package/port-selector)
[![NPM Downloads](https://img.shields.io/npm/dt/port-selector)](https://www.npmjs.com/package/port-selector)
![Bundle Size](https://img.shields.io/bundlephobia/minzip/port-selector)

</div>
<div align="center">
    
[![GitHub Actions CI](https://img.shields.io/github/workflow/status/ZingerLittleBee/port-selector/Test%20CI)](https://github.com/ZingerLittleBee/port-selector/actions)
![License](https://img.shields.io/github/license/ZingerLittleBee/port-selector)
    
</div>

## Overview

`port-selector` is a cross-platform NodeJS library implemented in Rust. It mainly provides port availability checking and filtering ports based on filter conditions.

## Install
```bash
npm install port-selector
# or
yarn add port-selector
# or
pnpm i port-selector
```

```ts
import {
    Selector,
    isFree,
    isFreeTcp,
    isFreeUdp,
    randomFreePort,
    randomFreeTcpPort,
    randomFreeUdpPort,
    selectFreePort,
    selectFromGivenPort
} from 'port-selector'
```

## Goods
[isFree](#isfree) · [isFreeTcp](#isfreetcp) · [isFreeUdp](#isfreeudp) · [randomFreePort](#randomfreeport) · [randomFreeTcpPort](#randomfreetcpport) · [randomFreeUdpPort](#randomfreeudpport) · [selectFromGivenPort](#selectfromgivenport) · [selectFreePort](#selectfreeport)


## Documentation

### `isFree`
Check whether the port is not used on TCP and UDP
```ts
function isFree(port: number): boolean
```

### `isFreeTcp`
Check whether the port is not used on TCP
```ts
function isFreeTcp(port: number): boolean
```

### `isFreeUdp`
Check whether the port is not used on UDP
```ts
function isFreeUdp(port: number): boolean
```

### `randomFreePort`
The system randomly assigns available TCP and UDP ports
```ts
function randomFreePort(): number
```

### `randomFreeTcpPort`
The system randomly assigns available TCP ports
```ts
function randomFreeTcpPort(): number
```

### `randomFreeUdpPort`
The system randomly assigns available UDP ports
```ts
function randomFreeUdpPort(): number
```

### `selectFromGivenPort`
Check from `starterPort` and return the first available port

Return if `starterPort` is available; Otherwise `starterPort += starterPort` until the port is available
```ts
function selectFromGivenPort(starterPort: number): number
```

### `selectFreePort`
Gets a matching port based on the `Selector` parameter constraint
```ts
function selectFreePort(selector?: Selector): number
```

```ts
export type Selector = {
    // Check whether the port is available on TCP.
    // The default value is true.
    checkTcp?: boolean
    // Check whether the port is available on UDP.
    // The default value is true.
    checkUdp?: boolean
    // Set the generated port range, starting value
    // The default value is 0.
    portFrom?: number
    // Set the generated port range, end value
    // The default value is 65535.
    portTo?: number
    // Maximum number of random times. Default value: 100
    // If no available port number is found within the maximum random number of loops, None is returned
    maxRandomTimes?: number
}
```

## Thanks
[napi-rs](https://github.com/napi-rs/napi-rs)
