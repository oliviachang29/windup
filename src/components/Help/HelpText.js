let HelpText = {
  addingANewProgram () {
    return `
1. Open menu\n
2. Tap ‘New program’. If you have already added one before, you need to share this app with a friend to unlock unlimited programs.\n
3. In the screen that opens up, tap ‘Import Music’\n
4. Select the file storage app where your music is located. File storage apps include iCloud Drive, Google Drive, Dropbox, Box, and Microsoft OneDrive. Note: you may need to tap ‘More’ and enable the location where your music is stored.\n
5. You can now select an audio file with your program music (.aac, .mp3, .mp4, .wav, and all other audio types) from any file storage apps on your phone. Once you select a file, a message will appear saying ‘✓ Music imported successfully.’\n
6. Tap ‘Program level or type’. Enter whatever you want. For example: ‘Pre-Juvenile Technical’\n
7. Tap ‘Name of music or artist’. Enter whatever you want. For example: ‘Avatar’\n
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
This action cannot be undone.
1. From the home menu, swipe left on the program you would like to delete\n
2. Tap 'Delete'\n
3. When asked ‘Are you sure you want to delete this program?’, tap ‘Delete’
    `
  },
  inAFileStorageApp () {
    return `
(iCloud Drive, Google Drive, Dropbox, Box, or Microsoft OneDrive)\n
You’re good to go! You can now import your music. Follow the instructions in “Adding a new program” to get started.`
  },
  somewhereElse () {
    return `
1. Find the Share icon. It looks like an upwards arrow inside a box.\n
2. Tap "Import to Windup". P.S. - If you don't see it, you might need to scroll to the right and tap "More". Then, enable Windup from that screen.\n
3. The file will be copied over to Windup, and the New Program screen will apear.\n
4. You’re good to go! Follow the instructions in “Adding a new program” to finish importing.
    `
  },
  onAComputerOrCD () {
    return `
1. If your music is on a CD, put the CD in a computer with a CD Drive (with a place to put CDs).\n
2. Using your computer, upload your file to a file storage app (iCloud Drive, Google Drive, Dropbox, Box, or Microsoft OneDrive). We recommend Google Drive.\n
3. If this file storage app is not already downloaded on your phone, download it from the App Store on your phone.\n
4. You’re good to go! You can now import your music. Follow the instructions in “Adding a new program” to get started.
    `
  }
}

module.exports = HelpText
