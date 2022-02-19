## Hints for Applications Using Nest JS

## Running the app
* `make init` Run app in dev mode
* `make down` Stop app
* `make lint` Run api linters
* `make lint-fix` Run api linters with `fix` mode
* `make tests` Run all tests
* `make test-unit` Run unit tests
* `make test-e2e` Run e2e tests
* `USER_ID=${UID} make api-permissions` Set owner files by user id.
* `TYPE=<schematic type> NAME=<schematic name> PARAMS=<schematic params> api-generate-schematic` Generate nest schematic
  * `TYPE=module NAME="auth"" api-generate-schematic` Generate auth module
  * `TYPE=class NAME="product/product.model" PARAMS="--no-spec" make api-generate-schematic` Generate product class without tests
  * `TYPE=controller NAME=auth PARAMS="--no-spec" make api-generate-schematic` Generate auth controller without tests
  * `TYPE=service NAME=product PARAMS="--no-spec" make api-generate-schematic` Generate product service without tests 

## Helpful links
* [Docs][101] Official docs.
* [Starter project][102] Nest framework TypeScript starter.
* [Cli commands][103] Usage
* [Request decorators][104]
* [Providers][105] With DI. [Injection scopes][106]

## Helpful packages
* Validate dto (work together):
  * [class-transformer][301]
  * [class-validator][302]
* [passport js][303] Passport is authentication middleware for Node.js
* [fs-extra][304] Adds file system methods that aren't included in the native fs module
* [app-root-path][305] This simple module helps you access your application's root path from anywhere in the application without resorting to relative paths like require("../../path")
* [date-fns][306] Modern JavaScript date utility library
* [multer][307] Work with images
* [sharp][308] The typical use case for this high speed Node.js module is to convert large images in common formats to smaller, web-friendly JPEG, PNG, WebP, GIF and AVIF images of varying dimensions
* [telegraf js][309] Modern Telegram Bot API framework for Node.js

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
[105]: https://docs.nestjs.com/providers
[106]: https://docs.nestjs.com/fundamentals/injection-scopes

[201]: https://docs.nestjs.com/cli/usages#nest-new
[202]: https://docs.nestjs.com/cli/usages#nest-generate
[203]: https://docs.nestjs.com/cli/usages#nest-build
[204]: https://docs.nestjs.com/cli/usages#nest-start
[205]: https://docs.nestjs.com/cli/usages#nest-add
[206]: https://docs.nestjs.com/cli/usages#nest-update
[207]: https://docs.nestjs.com/cli/usages#nest-info

[301]: https://github.com/typestack/class-transformer
[302]: https://github.com/typestack/class-validator
[303]: https://www.passportjs.org/
[304]: https://www.npmjs.com/package//fs-extra
[305]: https://www.npmjs.com/package/app-root-path
[306]: https://date-fns.org
[307]: https://github.com/expressjs/multer
[308]: https://sharp.pixelplumbing.com
[309]: https://www.npmjs.com/package/telegraf
