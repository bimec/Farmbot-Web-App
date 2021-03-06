# Translation summary

_This summary was automatically generated by running the language helper._

Auto-sort and generate translation file contents using:

```bash
node public/app-resources/languages/_helper.js en
```

Where `en` is your language code.

Translation file format can be checked using:

```bash
npm run translation-check
```

_Note: If using Docker, add `sudo docker-compose run web` before the commands.
For example, `sudo docker-compose run web npm run translation-check`._

See the [README](https://github.com/FarmBot/Farmbot-Web-App#translating-the-web-app-into-your-language) for contribution instructions.

Total number of phrases identified by the language helper for translation: __1605__

|Language|Percent translated|Translated|Untranslated|Other Translations|
|:---:|---:|---:|---:|---:|
|da|6%|92|1513|230|
|de|21%|335|1270|396|
|es|96%|1539|66|380|
|fr|52%|839|766|421|
|it|11%|178|1427|330|
|nl|4%|72|1533|302|
|pt|4%|62|1543|322|
|ru|30%|484|1121|360|
|th|0%|0|1605|0|
|zh|5%|79|1526|302|

**Percent translated** refers to the percent of phrases identified by the
language helper that have been translated. Additional phrases not identified
by the language helper may exist in the Web App.


**Untranslated** includes phrases not yet translated or phrases that do not
need translation. Phrases that are identical before and after translation
can be moved to `translated` to indicate translation status to the language
helper.

**Other Translations** include translated phrases that do not match any of
the phrases identified by the language helper. These are usually phrases
not identified by the language helper or phrases that have been changed
or removed from the Web App.
