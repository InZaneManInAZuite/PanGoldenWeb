## StartUp

// Before starting 
// Make sure that .NET 8.0 and node.js are installed in windows
// for tsc to work in a new device, open PowerShell as administrator and set:
// Set-ExecutionPolicy -ExecutionPolicy RemoteSigned
// Install SQL Server Developer, server name = (local)

// Currently no Identity Framework for User Authentication/Authorization, Time Constraint


// Make frontend and backend directories
mkdir backend
mkdir frontend

// Setup empty backend
cd backend
dotnet new webapi -controllers -f net8.0
dotnet add package xunit
dotnet add package Microsoft.EntityFrameworkCore.InMemory --version 8.0
dotnet add package Microsoft.EntityFrameworkCore.Relational
dotnet add package Microsoft.Data.SqlClient
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet tool install --global dotnet-ef
mkdir Data
mkdir Models
mkdir Repositories
mkdir Services

// Setup empty frontend
cd ../frontend
npm init -y
npm install react
npm install react-dom
npm install -g typescript
tsc --init
mkdir public
mkdir src 
mkdir build

// Fill up public directory
cd public
echo $null > index.html

// Fill up source directory
cd ../src
mkdir Components
mkdir Contexts
mkdir Hooks
mkdir Models
mkdir Services
echo $null > index.tsx
echo $null > App.tsx






## Dotnet Commands

dotnet help
dotnet --list-sdks
dotnet new <console/webapi> net<version>         -----Really Useful-----
    -controllers
    -f
dotnet list package
    --include-transitive
    --outdated
    --inclide-prerelease
dotnet add package <package>
    --version <version>
dotnet restore
dotnet remove package <package>
dotnet build
dotnet run

dotnet ef migrations add InitialCreate --context <ClassContext>
dotnet ef database update --context <ClassContext>

## Node.js Commands

npm --help
npm init
    -y
npm install <package(node-fetch)>
npm view <package>
npm list
    --depth=<depth>
npm update <package name>@<latest/version>
npm outdated
npm audit
    fix
    --force
npm uninstall
npm prune
npm run <action>
    npm start 
    npm test
node <file.js>

## Typescript Commands

tsc
    -noImplicitAny
    -noOmitOnError
    -target <target("ES2015")>
tsc --init
