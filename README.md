# Task-Scheduler-CLI
CLI program to schedule tasks on the basis of their priority .

# Usage: 
./task help                  # show usage
./task add 2 "hello world"   # Add a new item with priority 2 and text "hello world" to the list of tasks
./task ls                    # Show incomplete priority list items sorted by priority in ascending order
./task del NUMBER            # Delete the incomplete item with the given priority number
./task done NUMBER           # Mark the incomplete item with the given priority number as completed
./task report                # Stastiscs
