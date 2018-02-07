# Confluence CLI


## Installation

    sudo curl -L https://github.com/justmiles/confluence-cli/releases/download/v1.0.0/confluence-cli-1.0.0-linux -o /usr/bin/confluence
    
    sudo chmod +x /usr/bin/confluence


## Usage

    Usage: confluence [options]
      
      Options:

      -V, --version              output the version number
      -u, --username [username]  Confluence username. Can also be read from env variable CONFLUENCE_USERNAME
      -p, --password [password]  Confluence password. Can also be read from env variable CONFLUENCE_PASSWORD
      -h, --host [host]          Confluence host. eg mycompany.atlassian.com
      -n, --port [port]          Confluence port
      -c, --context [context]    Confluence context
      -t, --title [title]        Page title to update. Defaults to file name
      -k, --key [key]            Confluence key for page
      --no-ssl                   Do not use SSL when connecting to Confluence
      -f, --file [file]          Markdown File
      -h, --help                 output usage information
        
## Example

    confluence \
      --username justmiles \
      --password password \
      --host mycompany.atlassian.net \
      --key PLAT \
      --title "Application Readme" \
      --file ~/application/README.md

