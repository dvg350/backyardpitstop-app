# Backyard Pitstop

Backyard Pitstop is a BBQ progressive web app with a Recipe Builder, a Cook Calculator, and a Grill Finder. Recipes come from a local recipe bank in the app. There are no accounts, and the app does not collect personal data.

## Hosting

The site is served on GitHub Pages at [https://app.backyardpitstop.com](https://app.backyardpitstop.com).

## Android

PWABuilder wraps the site as a Trusted Web Activity for Google Play. The package name is `com.backyardpitstop.app`.

Any new Android App Bundle (AAB) has to be signed with the existing PWABuilder keystore. That keystore is kept offline and is not in this repo.
