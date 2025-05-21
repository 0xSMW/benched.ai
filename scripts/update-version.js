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
  const [currentYearMonthDay, currentBuild] = currentVersion.split('.')
  
  const newDateVersion = getCurrentDateVersion()
  let newBuildNumber = 0

  if (currentYearMonthDay === newDateVersion) {
    newBuildNumber = Number.parseInt(currentBuild || '0', 10) + 1
  }

  packageJson.version = `${newDateVersion}.${newBuildNumber}`

  fs.writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`)
  console.log(`Version updated to ${packageJson.version}`)
  
  // Stage the package.json file
  execSync('git add package.json')
  console.log('package.json staged for commit.')

} catch (error) {
  console.error('Error updating version:', error)
  process.exit(1)
}