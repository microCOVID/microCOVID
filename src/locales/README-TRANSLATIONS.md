# **DO NOT EDIT THE TRANSLATION FILES DIRECTLY!**

# Localization process

Localization throughout the codebase is based on [i18next](https://www.i18next.com/) and [react-i18next](https://react.i18next.com/).

Translations are handled through Weblate. The project is accessible at https://hosted.weblate.org/projects/microcovid/microcovid/
The only file you should edit here directly is `en.json`. **Do not edit any other translation files directly.** Editing any translations will in most cases break the integration with Weblate.

Changes in `en.json` kick off a process at Weblate that allows translators to translate the new strings or follow up changes. Edits on Weblate are propagated back to the repository through [pull requests](https://github.com/microcovid/microcovid/pulls/weblate). If you'd like to contribute to the translations, register on Weblate and enter translations/suggestions there.

# Rules of thumb

Here are a few ground rules you should follow to make sure the translations remain maintainable:

- Add all user visible strings as i18next tokens and not as literal strings.
- Try to follow a reasonable hierarchy in translation keys and make sure it describes the intent well.
- Keep the original translation key for minor changes. Use a new translation key if the meaning changes so much that keeping the original text would be misleading in translations.
- If you plan to make large, sweeping changes in the interface that would add, remove or change a large number of texts, please coordinate with the team to minimize conflicts with ongoing translation efforts and ensure that a reasonable subset of translations are ready before the change goes live.

If you use VS Code [i18n-ally](https://github.com/antfu/i18n-ally) is a fantastic tool to make working with translations painless.

# Current status

[![Weblate status](https://hosted.weblate.org/widgets/microcovid/-/microcovid/multi-auto.svg)](https://hosted.weblate.org/engage/microcovid/)
