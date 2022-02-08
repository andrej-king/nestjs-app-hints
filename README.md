## Hints for Applications Using Nest JS

## Running the app
* `make init` Run app in dev mode
* `make down` Stop app
* `make lint` Run api linters
* `make lint-fix` Run api linters with `fix` mode
* `USER_ID=${UID} make api-permissions` Set owner files by user id.
* `TYPE=<schematic type> NAME=<schematic name> PARAMS=<schematic params> api-generate-schematic` Generate nest schematic
  * `TYPE=module NAME="auth"" api-generate-schematic` Generate auth module
  * `TYPE=class NAME="product/product.model" PARAMS="--no-spec" make api-generate-schematic` Generate product class without tests
  * `TYPE=controller NAME=auth PARAMS="--no-spec" make api-generate-schematic` Generate auth controller without tests

## Helpful links
* [Docs][101] Official docs.
* [Starter project][102] Nest framework TypeScript starter.
* [Cli commands][103] Usage
* [Request decorators][104]

## Nest helpful commands
* `nest new <name>`[Creates][201] a new (standard mode) Nest project
* `nest generate <schematic> <name> [options]` [Generates][202] and/or modifies files based on a schematic
* `nest build <name> [options]` [Compiles an application][203] or workspace into an output folder
* `nest start <name> [options]` [Compiles and runs][204] an application (or default project in a workspace)
* `nest add <name> [options]` [Imports a library][205] that has been packaged as a nest library, running its install schematic
* `nest update` [Updates][206] `@nestjs` dependencies in the `package.json"dependencies"` list to their `@latest` version
* `nest info` [Displays information][207] about installed nest packages and other helpful system info

[101]: https://docs.nestjs.com/
[102]: https://github.com/nestjs/typescript-starter
[103]: https://docs.nestjs.com/cli/usages
[104]: https://docs.nestjs.com/controllers#request-object

[201]: https://docs.nestjs.com/cli/usages#nest-new
[202]: https://docs.nestjs.com/cli/usages#nest-generate
[203]: https://docs.nestjs.com/cli/usages#nest-build
[204]: https://docs.nestjs.com/cli/usages#nest-start
[205]: https://docs.nestjs.com/cli/usages#nest-add
[206]: https://docs.nestjs.com/cli/usages#nest-update
[207]: https://docs.nestjs.com/cli/usages#nest-info
