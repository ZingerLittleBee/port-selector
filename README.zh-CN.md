Language : [🇺🇸 English](https://github.com/ZingerLittleBee/port-selector/blob/main/README.md) | 🇨🇳 简体中文


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
`port-selector` 是一个底层由 Rust 实现的跨平台 NodeJS 库, 主要提供端口可用性检查和根据条件筛选端口的功能.

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
检查端口在 tcp && udp 上是否未使用
```ts
function isFree(port: number): boolean
```

### `isFreeTcp`
检查端口在 tcp 上是否未使用
```ts
function isFreeTcp(port: number): boolean
```

### `isFreeUdp`
检查端口在 udp 上是否未使用
```ts
function isFreeUdp(port: number): boolean
```

### `randomFreePort`
由系统随机分配可用 tcp && udp 端口
```ts
function randomFreePort(): number
```

### `randomFreeTcpPort`
由系统随机分配可用 tcp 端口
```ts
function randomFreeTcpPort(): number
```

### `randomFreeUdpPort`
由系统随机分配可用 udp 端口
```ts
function randomFreeUdpPort(): number
```

### `selectFromGivenPort`
从 `starterPort` 开始检查, 返回第一个可用端口

如果 `starterPort` 可用, 则返回; 否则 `starterPort += starterPort`, 直到端口可用
```ts
function selectFromGivenPort(starterPort: number): number
```

### `selectFreePort`
根据 `Selector` 参数约束获取一个满足条件的端口
```ts
function selectFreePort(selector?: Selector): number
```

```ts
export type Selector = {
    // 是否检查端口在 tcp 上可用, 默认值 true
    checkTcp?: boolean
    // 是否检查端口在 udp 上可用, 默认值 true
    checkUdp?: boolean
    // 设置生成的端口范围, 起始值
    // 默认值: 0
    portFrom?: number
    // 设置生成的端口范围, 结束值
    // 默认值: 65535
    portTo?: number
    // 最大随机次数, 默认值 100
    // 如果在最大随机次数的循环之内都没有找到可用端口号, 则返回 None
    maxRandomTimes?: number
}
```
## Thanks
[napi-rs](https://github.com/napi-rs/napi-rs)
