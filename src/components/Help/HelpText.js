let HelpText = {
  addingANewProgram () {
    return `
1. Open menu.\n
2. Tap ‘New program’. If you have already added one before, you need to share this app with a friend to unlock unlimited programs.\n
3. Select the location where your music file is stored. \n
  A) If it's in iCloud Drive, tap "In the Files app".\n
  B) If it's in a different file storage app, tap "In a file storage app".\n
  C) Otherwise, tap "Somewhere else".\n
4. If you chose iCloud Drive, a new screen will appear, and you can now select an audio file with your program music (.mp3, .mp4, .wav, and all other audio types). Once you select a file, a message will appear saying ‘✓ Music imported successfully.’\n
If you chose a different file storage app or somewhere else, follow the instructions that appear. \n
6. Tap ‘Program level or type’. Enter whatever you want. For example: 'Senior Long'\n
7. Tap ‘Name of music or artist’. Enter whatever you want. For example: ‘Mao's Last Dancer’\n
8. Once everything is filled out and you have imported music, tap the ‘Save’ button to add your new program
    `
  },
  editingAProgram () {
    return `
1. From the home menu, swipe left on the program you would like to edit.\n
2. Tap ‘Edit’
    `
  },
  deletingAProgram () {
    return `
Warning! This action cannot be undone.\n
1. From the home menu, swipe left on the program you would like to delete.\n
2. Tap 'Delete'.\n
3. When asked ‘Are you sure you want to delete this program?’, tap ‘Delete’.
    `
  },
  onAComputerOrCD () {
    return `
1. If your music is on a CD, put the CD in a computer with a CD Drive (with a place to put CDs).\n
2. Using your computer, send your file to your phone. Emailing or texting the file to your phone may be easiest. \n
3. Follow the instructions above, in "On Your Phone", to import the music into your phone.
    `
  }
}

module.exports = HelpText
