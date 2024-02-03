#!/bin/bash

# Set the default command
command_to_run="npm run start"

# Process command line arguments
while getopts ":ct" opt; do
  case $opt in
    c)
      # If -c is provided, change the command to "npm run dev"
      command_to_run="npm run start-cache"
      ;;
    t)
      # If -t is provided, change the command to "npm run start-tunnel"
      command_to_run="npm run start-tunnel"
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      exit 1
      ;;
  esac
done

# Change directory to the "app" folder
cd ./driver

# Run the selected command
$command_to_run
