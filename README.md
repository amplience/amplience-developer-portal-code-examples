# Amplience Developer Portal Code Examples

## Introduction

Repository contains all code sandbox examples for different frameworks used in [Amplience Developer Portal](https://github.com/amplience/amplience-developer-portal) tabbed component. There is an [Amplience code sandbox team space](https://codesandbox.io/dashboard/home?workspace=b99be381-caea-46d9-a375-4761b3fc5157) where each example in separate folder can be [imported](https://codesandbox.io/s/github) as a template and will remain in sync with the main branch. 

The path that needs to be added to the content will be `github/amplience/amplience-developer-portal-code-examples/tree/<branch>/<path-to-example>` and will be available on `https://codesandbox.io/s/github/amplience/amplience-developer-portal-code-examples/tree/<branch>/<path-to-example>` 

## Setting up content types and content type schemas with DC CLI

All the [content types](https://amplience.com/docs/integration/workingwithcontenttypes.html) and [content types schemas](https://amplience.com/docs/integration/contenttypes.html#content-type-schemas) used to create the content managed pages live in the `./content` directory; directions for getting started, configuration, installation and syncing using the DC command line tool can be found below.

Further information regarding the set-up and use of the DC-CLI tool can be found [here](https://amplience.com/docs/development/cli-tool-examples.html).

### Getting started

To install the package run:

```
npm install -g @amplience/dc-cli
```

### Configuration

DC Management API credentials are needed along with the hub Id which can be found in the DC App settings menu under properties.

```
dc-cli configure --clientId <your-client-id> --clientSecret <your-client-secret> --hubId <your-hub-id>
```

### Installation

To install or update content type schemas and their metadata, which sets them to be validated at a slot/content/partial type, run the following command:

```
dc-cli content-type-schema import ./content/content-type-schemas
```

To install the content types run

```
dc-cli content-type import ./content/content-types
```

**Please note**: There are two content type properties, `repositories` and `visualisations` that are likely be different per hub and environment.

By default the above command will assign the content type to a repository named `content` as specificed in the JSON. You can update the repository for all `./content/content-types` by using find and replace or append the flag `--skipAssign` which will ignore setting the repository. This can then be set in the UI or via the DC CLI.

### Syncing

Once a content type schema has been updated, it has to be synced with its content type for the update to be reflected by running the following comand:

```
dc-cli content-type sync <id>
```

If the content type id is unknown it can be quickly found by getting the updated content type schema's `$id` property URI value and running the following command:

```
dc-cli content-type list | grep <uri>
```

To sync all after making many changes the example command below uses [jq](https://stedolan.github.io/jq/) to collect the ids that contain `https://developer-portal.com/` in the contentTypeUri and sync each one

```
 dc-cli content-type list --json | jq -c '.[] | select(.contentTypeUri | contains("https://developer-portal.com/"))' | jq '.id' | while read line; do dc-cli content-type sync $line; done
```
