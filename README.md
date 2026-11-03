# marine-licensing-prototype

A GOV.UK Prototype Kit prototype for the Marine Management Organisation (MMO) marine licensing service. It covers exemptions, low complexity marine licences, consultation, the public register and sample plans. It's used for design exploration, user testing and team discussion, not production.

## Running it

```
npm install
npm run dev
```

Then open http://localhost:3000. The index page links to every journey, including links that open pre-filled applications.

## Where to start

- [`CLAUDE.md`](CLAUDE.md) – how the prototype fits together, the current sections, prototype tools, branches and working conventions. The same guide is in [`AGENTS.md`](AGENTS.md) for Codex and in [`.cursor/rules/prototype-rules.mdc`](.cursor/rules/prototype-rules.mdc) for Cursor.
- [`docs/`](docs/README.md) – guides to routing, versions, content style and how individual features were built.
- `/about-the-prototype` in the running prototype – user journeys, limitations and iteration notes.

## Branches

`main` auto-deploys to the team Heroku URL, so work on a branch and merge by pull request.
