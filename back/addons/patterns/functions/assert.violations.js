// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import canon from '#canon/back/addon.js';

canon.patterns.Fn('assert.violations', function(tree, file)
{
    this.claimants = () =>
    {
        const items = Object.values(this.Items());

        const claiming = items.filter((item) =>
        {
            const claims = item.Get('claims');

            return claims ? file.includes(claims) : false;
        });

        return claiming.length ? claiming : items;
    };

    this.imports = (item, report) =>
    {
        const imports = tree.body.filter((node) => node.type === 'ImportDeclaration');

        if(!item.Get('imports') && imports.length)
        {
            report(imports[0].loc.start.line, 'No imports here, the file stands alone on the global onetype.');
        }
    };

    this.diverged = (item, result, report) =>
    {
        const why = result.captures.miss ? ' It diverges where ' + result.captures.miss + '.' : '';
        const shown = item.Get('example') ? '\n\nlike:\n' + item.Get('example').trim() : '';

        report(1, 'The file does not follow the ' + item.Get('id') + ' pattern, it reads exactly:\n' + item.Get('pattern').trim() + why + shown);
    };

    this.named = (captures, report) =>
    {
        if(!('file' in captures))
        {
            return;
        }

        const name = file.split('/').pop();

        if(captures.file !== name.replace(/\.js$/, ''))
        {
            report(1, 'The name reads ' + captures.file + ' but the file is ' + name + ', the name is the file name.');
        }
    };

    this.extras = (item, result, report) =>
    {
        if(Object.keys(item.Get('fields')).length && result.captures.fields)
        {
            this.Fn('assert.fields', result.captures.fields, item.Get('fields'), report);
        }

        if(item.Get('assert') && result.captures.fields)
        {
            return item.Get('assert')({ file, tree, fields: result.captures.fields });
        }

        return [];
    };

    this.item = (item, report) =>
    {
        this.imports(item, report);

        const result = this.Fn('assert.match', item.Get('pattern'), tree);

        if(!result.ok)
        {
            this.diverged(item, result, report);

            return [];
        }

        this.named(result.captures, report);

        return this.extras(item, result, report);
    };

    const violations = [];

    for(const item of this.claimants())
    {
        if(!new RegExp(item.Get('match')).test(file))
        {
            continue;
        }

        const report = (line, message) =>
        {
            violations.push({ rule: item.Get('id'), file, line, message });
        };

        violations.push(...this.item(item, report));
    }

    return violations;
});
