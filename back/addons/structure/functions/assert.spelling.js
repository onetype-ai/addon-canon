// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import canon from '#canon/back/addon.js';

canon.structure.Fn('assert.spelling', function(items, report, { nest, name, owner })
{
    this.names = () =>
    {
        const base = nest.length ? nest.join('/') + '/' + name : name;
        const named = base.replace(/^[0-9]+\./, '');

        return {
            expected: owner.replaceAll('.', ':') + ':' + named.replaceAll('.', ':'),
            dotted: owner + '.' + named,
            named: named,
            tagged: named.replaceAll('.', '-')
        };
    };

    this.id = () =>
    {
        return items[0].arguments[0].properties.find((property) =>
        {
            return !!property.key
                && property.key.name === 'id';
        });
    };

    const names = this.names();
    const spelt = names.expected + ', ' + names.dotted + ' or ' + names.named + '.';
    const id = this.id();

    if(!id)
    {
        return report(items[0].loc.start.line, 'The id field is missing, this file spells ' + spelt);
    }

    if(id.value.type === 'Literal' && !Object.values(names).includes(id.value.value))
    {
        report(id.loc.start.line, 'The id reads ' + id.value.value + ' but this file spells ' + spelt);
    }
});
