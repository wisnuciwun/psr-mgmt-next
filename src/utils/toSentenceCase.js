// export default String.prototype.toCamelCase = function() {
//      return this.replace(/^([A-Z])|\s(\w)/g, function(match, p1, p2, offset) {
//          if (p2) return p2.toUpperCase();
//          return p1.toLowerCase();        
//      });
//  };

export default function toSentenceCase(txt = '') {
     return txt.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
 };