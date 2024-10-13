import { usefulAttr } from "../../artifact/artis-mark.js"

export default function ({ attr, weapon, artis, rule, def }) {
  let title = []
  let particularAttr = JSON.parse(JSON.stringify(usefulAttr['钟离']))
  if (weapon.name === '西风长枪') {
    title.push('西风枪')
    particularAttr.cpct = 100
    particularAttr.dmg = 50
    particularAttr.recharge = 80
  }
  if (attr.cpct * 2 + attr.cdmg > 240) {
    title.push('战斗')
    particularAttr.hp = 80
    particularAttr.atk = 75
    particularAttr.cpct = 100
    particularAttr.cdmg = 100
    particularAttr.dmg = 100
    particularAttr.recharge = 30
  }
  if (artis.is('绝缘4')) {
    title.push('绝缘4')
    particularAttr.dmg = 80
    particularAttr.recharge = 80
  }
  if (title.length > 0) {
    return rule(`钟离-${title.join('')}`, particularAttr)
  }
  return def(usefulAttr['钟离'])
}
