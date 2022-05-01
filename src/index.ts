import { isFree, selectFreePort } from './infrastructure'

console.log('isFree(3000)', isFree(3000))
console.log('selectFreePort', selectFreePort({ checkTcp: false, portFrom: 10000, portTo: 10010 }))
