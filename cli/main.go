package main

import (
	"fmt"
	"log"
	"os"
	"os/exec"
)

func runCommand(name string, args ...string) {
	cmd := exec.Command(name, args...)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	cmd.Stdin = os.Stdin

	err := cmd.Run()
	if err != nil {
		log.Fatalf("Command failed: %s %v\nError: %v", name, args, err)
	}
}

func main() {
	if len(os.Args) < 2 {
		fmt.Println("Usage: deployx <command>\nTry 'deployx --help' for more information.")
		return
	}

	switch os.Args[1] {
	case "init":
		if len(os.Args) < 3 {
			fmt.Println("Usage: deployx init <git-repo-url>")
			return
		}
		gitURL := os.Args[2]
		fmt.Println("🔧 Starting DeployX Git init workflow...")

		runCommand("git", "init")
		runCommand("git", "remote", "add", "origin", gitURL)
		runCommand("git", "add", ".")
		runCommand("git", "commit", "-m", "DeployX live deploy")
		runCommand("git", "branch", "-M", "main")
		runCommand("git", "push", "-u", "origin", "main")

		fmt.Println("✅ Deployment pushed to:", gitURL)

	case "push":
		fmt.Println("🔧 Starting DeployX Git push workflow...")
		runCommand("git", "add", ".")
		runCommand("git", "commit", "-m", "DeployX live deploy")
		runCommand("git", "push", "--force")

	case "--help", "-h", "help":
		fmt.Println(`DeployX - Simple Git Deployment Tool

Usage:
  deployx init <git-repo-url>   Initialize a git repo and push to remote
  deployx push                  Commit and push latest changes to remote

Example:
  deployx init https://github.com/your/repo.git
  deployx push
`)
	default:
		fmt.Println("Unknown command:", os.Args[1])
		fmt.Println("Run 'deployx --help' for usage.")
	}
}
