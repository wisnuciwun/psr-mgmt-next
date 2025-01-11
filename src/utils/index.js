import toSentenceCase from "./toSentenceCase"
import groupBy from "./groupBy"

class utility {
     constructor() {
          this.toSentenceCase = (value) => {
               return toSentenceCase(value)
          }
          this.groupBy = (value, key) => {
               return groupBy(value, key)
          }
     }
     
}

export const utils = new utility()