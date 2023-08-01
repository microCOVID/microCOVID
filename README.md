![CI](https://github.com/microcovid/microcovid/workflows/CI/badge.svg?branch=main)
[![Netlify Status](https://api.netlify.com/api/v1/badges/bb98f6c2-daea-4b6f-8fbe-8eb74ee0c539/deploy-status)](https://app.netlify.com/sites/microcov/deploys)
[![Translate on Weblate](https://hosted.weblate.org/widgets/microcovid/-/microcovid/svg-badge.svg)](https://hosted.weblate.org/engage/microcovid/)


![](https://www.microcovid.org/logo192.png)

# microCOVID.org

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



## Prevalence updates

1. Install `venv` to be able to run prevalence updates
    ```sh
    $ python3 -m venv .venv
    $ source .venv/bin/activate
    $ pip install -r requirements-manual.txt
    ```
1. Install the [GitHub CLI](https://cli.github.com/) to be able to using the `gh` command with the `prevalence_helper.sh` script
    ```sh
    # using homebrew (see GitHub page for alternate install methods)
    $ brew install gh
    ```
1. Get a [COVIDActNow.org API key from here](https://apidocs.covidactnow.org/). (If you're on the microCOVID team, you can ask for our existing API key.)
1. Then configure your API key as such:
    ```sh
    $ cp .secure-keys.template .secure-keys
    # Add your API key to the line in .secure-keys that is listed as CAN_API_KEY
    ```
1. Run a prevalence update. Pick one of the three following examples:
    ```sh
    # Run the prevalence update on the auto-prevalence-update branch
    $ yarn prevalence
    # Run the prevalence update, commit changes, and submit auto-merge pull request
    $ yarn prevalence -c
    # Run the prevalence update without switching branches (useful when testing changes on a feature branch)
    $ yarn prevalence -b
    # Specify the COVIDActNow.org API key
    $ yarn prevalence -k 111aaa222bbb
    # Specify where your virtualenv lives (defaults to `.venv`)
    $ yarn prevalence -v .venv-custom
    ```


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

## Validating model changes
One of the tests generates `computed_scenarios.json`, a json of inputs and
outputs for various situations. Use
[`model_comparison.ipynb`](model_comparison.ipynb) to compare the model behavior
before and after model changes.


## Updating Community Infection Values
### Updating Slider Labels
To update the prevalance slider Labels shown in the community infection Slider component, you can change the property values `prevalance_slider_label_1, prevalance_slider_label_2, prevalance_slider_label_3, prevalance_slider_label_4, prevalance_slider_label_5, prevalance_slider_label_6`  located in `/src/locals/en.json`.
### Updating Slider Values
You can add 4 values to the slider. To modify these values, you can update the property values `prevalance_slider_value_min, prevalance_slider_value_2, prevalance_slider_value_3, prevalance_slider_value_max`  located in `/src/locals/en.json`.
**Please note that values are in multiples of 100. So a value set at 0.8 will correspond to 80 infections. Another example: a value of 7.5 will correspond to 750 infections.**