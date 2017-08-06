let Utils = {
  secondsToTime (seconds) {
    var secNum = parseInt(seconds, 10) // don't forget the second param
    var hours = Math.floor(secNum / 3600)
    var minutes = Math.floor((secNum - (hours * 3600)) / 60)
    var newSeconds = secNum - (hours * 3600) - (minutes * 60)

    if (newSeconds < 10) { newSeconds = '0' + newSeconds }
    return minutes + ':' + newSeconds
  }
}

module.exports = Utils
