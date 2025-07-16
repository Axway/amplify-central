---
title: Develop and compile
linkTitle: Develop and compile
draft: false
weight: 40
---

The MuleSoft AnyPoint agent repository delivers only Docker containers, if it is desired to run an agent outside of a Docker container the agents may be compiled for a specific OS (`GOOS`) and architecture (`GOARCH`).

Agents running outside of the delivered docker containers are considered to be in a development state and do not receive the same level of support as the delivered Docker containers.

### Building

1. Install golang, a version the same or newer of that defined in the `go.mod` file
2. Fork/Clone this git repository locally `git clone git@github.com:Axway/agents-mulesoft.git`
3. Run the following commands changing the OS and Architecture as necessary

Discovery

```bash
CGO_ENABLED=0  GOOS=linux GOARCH=amd64  make build-discovery
```

Traceability

```bash
CGO_ENABLED=0  GOOS=linux GOARCH=amd64  make build-traceability
```

The [Go Docs](https://pkg.go.dev/internal/platform) may be referenced for supported values in those variables.