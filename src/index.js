import {jobberman} from './jobberman'

let args = process.argv.slice(2)
let page = args.length && Number.isInteger(parseInt(args[0])) ? args[0]: 1


jobberman(page).catch(err => console.log(err));



