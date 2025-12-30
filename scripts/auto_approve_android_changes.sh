#!/bin/bash

# Usage: ./auto_approve_android_changes.sh <PR_NUMBER>

echo "Automating approval for Android-related changes for PR #$1."

# GitHub CLI must be authenticated
# Check if `gh` is installed
type gh > /dev/null 2>&1 || { echo >&2 "GitHub CLI is not installed. Please install it first."; exit 1; }

# Auto-approve the PR (assuming repository owner as alengluhic20-oss)
REPO_OWNER="alengluhic20-oss"
REPO_NAME="F1-"
PR_NUMBER=$1
REVIEW_COMMENT="Android changes look good! Automating periodic approvals as requested."

# Command to create the review
gh pr review \
  -R "$REPO_OWNER/$REPO_NAME" \
  -C "$REVIEW_COMMENT" \
  --approve \
  $PR_NUMBER

echo "Android-related changes in PR #$PR_NUMBER have been auto-approved."