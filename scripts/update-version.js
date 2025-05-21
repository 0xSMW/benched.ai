#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'
import process from 'node:process'

const packageJsonPath = path.resolve(process.cwd(), 'package.json')

function getCurrentDateVersion() {
  const now = new Date()
  const year = now.getFullYear()
  const month = (now.getMonth() + 1).toString().padStart(2, '0')
  const day = now.getDate().toString().padStart(2, '0')
  return `${year}.${month}${day}`
}

try {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
  const currentVersion = packageJson.version || '0.0.0'
  const versionParts = currentVersion.split('.')
  
  const newDateVersion = getCurrentDateVersion()
  let newBuildNumber = 0
  let newRevisionNumber = 0

  // Expected format: YYYY.MMDD.BUILD or YYYY.MMDD.BUILD.REVISION
  const currentDatePart = versionParts.slice(0, 2).join('.') // YYYY.MMDD

  if (currentDatePart === newDateVersion) {
    newBuildNumber = Number.parseInt(versionParts[2] || '0', 10)
    // If it's the same date and same build number, increment revision, otherwise reset revision to 0
    if (versionParts.length === 4) { // Has a revision
        newRevisionNumber = Number.parseInt(versionParts[3] || '0', 10) + 1
    } else { // No revision, so this is the first build of the day, or a new build number
        newRevisionNumber = 0 // Start revision at 0 for a new build of the day or if it's a new build number.
    }
    // If it's a new day, build number should be 0 and revision 0
  } else {
    newBuildNumber = 0
    newRevisionNumber = 0
  }
  
  // If the date changed, or if the date is the same but we are on a new build of the day, reset revision to 0
  // The current logic sets newBuildNumber if currentDatePart !== newDateVersion
  // We also need to handle if it's the same day, but the user *manually* bumped the build (e.g. from 0.0 to 1.0)
  // The current script would make it 1.1 instead of 1.0.
  // Let's simplify: if the date is the same, increment the last part. If no last part, add .0
  // If the date is different, it's newDateVersion.0

  if (currentDatePart === newDateVersion) {
    if (versionParts.length === 4) { // YYYY.MMDD.BUILD.REVISION
      newBuildNumber = Number.parseInt(versionParts[2], 10)
      newRevisionNumber = Number.parseInt(versionParts[3], 10) + 1
      packageJson.version = `${newDateVersion}.${newBuildNumber}.${newRevisionNumber}`
    } else if (versionParts.length === 3) { // YYYY.MMDD.BUILD
      newBuildNumber = Number.parseInt(versionParts[2], 10) + 1 // This was the original bug source, as it assumed this was always build
      packageJson.version = `${newDateVersion}.${newBuildNumber}`
    } else { // Fallback for malformed or initial version
      packageJson.version = `${newDateVersion}.0`
    }
  } else {
    // New day, reset to .0
    packageJson.version = `${newDateVersion}.0`
  }

  fs.writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`)
  console.log(`Version updated to ${packageJson.version}`)
  
  // Stage the package.json file
  execSync('git add package.json')
  console.log('package.json staged for commit.')

} catch (error) {
  console.error('Error updating version:', error)
  process.exit(1)
}