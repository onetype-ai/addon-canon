# Canon

Canon is the law of the OneType codebase, written as code. It reads a file and answers whether that file obeys the conventions the framework is built on: how it is formatted, what the syntax may do, where the registration lives, which shape the file takes, and whether anything reaches it at all. Every rule is a registered item with an id and a description, so the law is a registry you can list, not a config file you have to trust.

- Package: `@onetype/addon-canon`, slug `onetype/addon/canon`
- Depends on: nothing. Supports: `onetype/addon/commands` (the `canon:rules` endpoint registers when commands is present).
- Sides: `back/` only

## Check a file

```js
import canon from '@onetype/addon-canon';

const violations = canon.violations('/path/to/back/functions/get.user.js');
```

Every violation is a plain object, ready to print or to feed a build:

```js
{
    rule: 'methods',
    file: '/path/to/back/functions/get.user.js',
    line: 12,
    message: 'The function runs 34 lines of its own, the canon stops at fifteen. …'
}
```

An empty array means the file obeys. The function reads the file itself, so nothing needs loading first. A `.json` file is checked against the manifest patterns and returns early; a `.js` file that does not parse reports one `parse` violation and stops there, since no tree means no further answer.

## Check a package

```js
canon.Item({
    id: 'box',
    addon: 'box',
    path: {
        back: '/path/to/box/back',
        front: '/path/to/box/front'
    }
});
```

Registering the package walks it and registers every sub addon under `addons/` as its own entry, so `box.files` and `box.images` become `box.files` and `box.images` without a second call. From there:

- `canon.tree.violations(root)` walks the folder and reports every file that lives somewhere the tree does not allow, plus the pairs a file demands.
- `canon.reach.violations(root)` follows `back/load.js` through every import and reports files nothing reaches (`dead`) and imports that resolve to nothing (`stale`).

Those three are the whole public surface: `canon.violations` for one file, `canon.tree.violations` and `canon.reach.violations` for a package. The layers underneath answer through `Fn('assert.violations', …)`, which the root calls for you.

## The six layers

Canon is one addon with six sub addons, each answering a different question about the same file.

| Layer | Reads | Asks |
| --- | --- | --- |
| `canon.linter` | raw lines | Is it formatted the way the canon writes? |
| `canon.ast` | the parsed tree | Does the syntax do only what the canon allows? |
| `canon.structure` | the path against the tree | Does the registration live where its name says? |
| `canon.patterns` | the tree against a template | Does the file take the exact shape its kind takes? |
| `canon.tree` | the folder | May a file live on this path at all? |
| `canon.reach` | the import graph | Does anything reach this file? |

`canon.placements` is the table the structure layer reads: it maps a registration method to the folder that method belongs in.

## The rules

Fourteen text rules read the raw lines: `empty`, `banner`, `allman`, `objects`, `spacing`, `json`, `endings`, `invisible`, `indent`, `branches`, `statements`, `width` (160 characters), `height` (160 lines), `breathing`.

Twenty-one tree rules read the parsed code: `arrows`, `comments`, `defines`, `declarations`, `globals`, `quotes`, `depth` (two levels), `exports`, `names` (three letters), `errors`, `catches`, `execution`, `modules`, `equality`, `ternary`, `params` (four), `methods` (fifteen own lines), `steps`, `fallbacks`, `aliases`, `arguments`.

Eight path rules read the file against its place: `placement`, `register`, `functions.name`, `functions.flat`, `items`, `naming`, `functions.verb`, `functions.home`.

Thirteen patterns hold a file to its template, twenty-seven tree items name every path a package may hold, and two reach rules close the graph.

### Two rules that read together

`methods` says a function tells its story in fifteen lines of its own. A named step costs nothing against that count, so a long function shortens by naming its parts in place, never by moving the work to another file:

```js
canon.Fn('do.something', function(input)
{
    this.parse = () =>
    {
        // …
    };

    this.render = () =>
    {
        // …
    };

    return this.render(this.parse(input));
});
```

`steps` says those steps stand at the top, above the work that calls them, so a reader meets the parts before the story. It also says the step goes on `this` wherever the caller hands over a receiver, and falls back to `const` only where there is none — an arrow has no `this` of its own.

`height` is the opposite case: a file over 160 lines does not shorten by naming more steps, it wants a part moved into its own file.

## List the law

With `@onetype/addon-commands` present, canon registers `canon:rules`:

```
GET /api/canon/rules
```

It returns every rule, pattern, placement and tree path grouped by the layer that enforces it, each with its id and description. The law describes itself; nothing about it is hidden in the implementation.

## Canon runs on canon

Canon holds itself to every rule it enforces, and it passes: 142 files, zero violations. A rule that its own author cannot live under is a rule that gets switched off, so the check is part of the design, not a claim.

## Guarantees

- A rule is an item, so the set is inspectable, extendable and describable at runtime.
- A violation names the rule, the file, the line and what to do about it — the message is the fix, not a code.
- Checking never executes the file it reads: canon parses, it does not run.
