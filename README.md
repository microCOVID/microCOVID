![CI](https://github.com/microcovid/microcovid/workflows/CI/badge.svg?branch=main)
[![Netlify Status](https://api.netlify.com/api/v1/badges/bb98f6c2-daea-4b6f-8fbe-8eb74ee0c539/deploy-status)](https://app.netlify.com/sites/microcov/deploys)
[![Translate on Weblate](https://hosted.weblate.org/widgets/microcovid/-/microcovid/svg-badge.svg)](https://hosted.weblate.org/engage/microcovid/)


# microcovid.org

## Local Development

Requirements:

- Node.js 12
- Yarn

(See `.tool-versions` for specific and up-to-date versions).

1. Install local depenendences
    ```sh
    $ yarn install
    ```
1. Start local **server**
    ```sh
    $ yarn start
    ```
1. Open http://localhost:3000

## Linting

We use `eslint` to standardize our style across files. To check your files with the linter, run:

```sh
$ yarn lint
```

If you see warnings, you can attempt to auto-correct them with:

```sh
$ yarn fix
```

If there are errors it can't fix, please fix them manually before committing.
