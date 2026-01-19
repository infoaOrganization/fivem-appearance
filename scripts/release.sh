#!/bin/sh

set -e

cd "$(dirname "$0")/.."

cleanup() {
  rm -rf tmp
}
trap 'cleanup' EXIT

################################################################################
# common functions
################################################################################

prepare_publish() {
  branch=$1
  git clone --single-branch --branch "$branch" https://github.com/infoaOrganization/fivem-appearance.git tmp || (
    git init tmp &&
    git -C tmp remote add origin https://github.com/infoaOrganization/fivem-appearance.git &&
    git -C tmp checkout -b "$branch"
  )
  find tmp -type f | grep -v ^tmp/\\.git | xargs rm -f
  find tmp -type d | grep -v ^tmp/\\.git | grep -v ^tmp\$ | xargs rm -rf
}

finalize_publish() {
  branch=$1
  message=$2

  git -C tmp add .
  git -C tmp commit -m "$message"
  git -C tmp push origin "$branch"
  cleanup
}

################################################################################
# release
################################################################################

prepare_publish release
npm run build
rm -rf release
node release.js
# for f in release/fivem-appearance/* release/fivem-appearance/.*; do
for f in release/fivem-appearance/*; do
  case "$(basename "$f")" in
    .|..) continue ;;
  esac
  cp -r "$f" tmp/
done
finalize_publish release "${1:-release $(date +%Y-%m-%d)}"
