// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import { readFileSync } from 'fs';
import canon from '#canon/back/addon.js';

canon.Fn('assert.violations', function(file)
{
    this.placed = () =>
    {
        const anchor = file.search(/\/(?:back|front)\//);
        const path = anchor === -1 ? null : file.slice(anchor + 1);

        if(!path || this.tree.Fn('is.allowed', path))
        {
            return [];
        }

        return [{
            rule: 'tree',
            file,
            line: 1,
            message: 'Nothing lives on ' + this.tree.Fn('get.folded', path) + ', the file moves or a tree item allows it.'
        }];
    };

    this.parsed = (source, violations) =>
    {
        try
        {
            return this.ast.Fn('get.tree', source);
        }
        catch(error)
        {
            violations.push({
                rule: 'parse',
                file,
                line: error.loc ? error.loc.line : 0,
                message: 'The file does not parse: ' + error.message
            });

            return null;
        }
    };

    this.code = (violations) =>
    {
        const source = readFileSync(file, 'utf8');

        violations.push(...this.linter.Fn('assert.violations', source, file));

        const tree = this.parsed(source, violations);

        if(!tree)
        {
            return;
        }

        violations.push(
            ...this.ast.Fn('assert.violations', tree, file),
            ...this.patterns.Fn('assert.violations', tree, file),
            ...this.structure.Fn('assert.violations', tree, file)
        );
    };

    const violations = this.placed();

    if(file.endsWith('.json'))
    {
        violations.push(...this.patterns.Fn('assert.manifests', file));

        return violations;
    }

    this.code(violations);

    return violations;
});
