let Utils = {
  secondsToTime (seconds) {
    var secNum = parseInt(seconds, 10) // don't forget the second param
    var hours = Math.floor(secNum / 3600)
    var minutes = Math.floor((secNum - (hours * 3600)) / 60)
    var newSeconds = secNum - (hours * 3600) - (minutes * 60)

    if (newSeconds < 10) { newSeconds = '0' + newSeconds }
    return minutes + ':' + newSeconds
  },

  move (array, fromIndex, toIndex) {
    return array.splice(toIndex, 0, array.splice(fromIndex, 1)[0])
  },

  findProgram (program, programList) {
    return programList.find((item) => item.title.toLowerCase() === program.title.toLowerCase())
  }

}

module.exports = Utils
