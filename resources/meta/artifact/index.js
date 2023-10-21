import { Data, Meta } from '#miao'
import lodash from 'lodash'
import calc from './calc.js'
import * as metaData from './meta.js'
import { usefulAttr } from './artis-mark.js'

let artiSetMap = {}
let artiMap = {}

let setMeta = Meta.create('gs', 'artiSet')
let artiMeta = Meta.create('gs', 'arti')

let artis = Data.readJSON('resources/meta/artifact/data.json', 'miao')

lodash.forEach(artis, (ds) => {
  let artiSet = {
    name: ds.name,
    effect: ds.effect,
    sets: {}
  }
  artiSetMap[ds.name] = artiSet
  setMeta.addDataItem(ds.name, artiSet)

  lodash.forEach(ds.sets, (as, idx) => {
    if (as.name) {
      let tmp = {
        set: ds.name,
        name: as.name,
        idx
      }
      artiMap[as.name] = tmp
      artiSet.sets[idx] = as.name
      artiMeta.addDataItem(as.name, tmp)
    }
  })
})

export { artiMap, artiSetMap, calc }
export * from './meta.js'

setMeta.addAbbr(metaData.abbr)
setMeta.addAlias(metaData.aliasCfg)
artiMeta.addMeta({
  ...Data.getData(metaData, 'mainAttr,subAttr,attrMap,attrNameMap,mainIdMap,attrIdMap'),
  artiBuffs: calc,
  usefulAttr
})

setMeta.addMeta({
  artiBuffs: calc
})

