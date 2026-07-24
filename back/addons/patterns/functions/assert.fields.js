// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import canon from '#canon/back/addon.js';

canon.patterns.Fn('assert.fields', function(properties, define, report)
{
    this.kind = (property, field) =>
    {
        const shape = this.Fn('get.kind', property.value);

        if(!field.type || !shape || field.type.split('|').includes(shape))
        {
            return;
        }

        const name = this.Fn('get.name', property);

        report(property.value.loc.start.line, 'Field ' + name + ' holds ' + shape + ' but the canon defines ' + field.type + '.');
    };

    this.known = () =>
    {
        for(const property of properties)
        {
            const name = this.Fn('get.name', property);

            if(!canonical.includes(name))
            {
                report(property.loc.start.line, 'Field ' + name + ' is not in the canon, it goes.');

                continue;
            }

            this.kind(property, define[name]);
        }
    };

    this.required = () =>
    {
        const line = properties[0] ? properties[0].loc.start.line : 1;

        for(const name of canonical)
        {
            if(define[name].required && !names.includes(name))
            {
                report(line, 'Field ' + name + ' is required, it is missing. The canon orders the fields ' + canonical.join(', ') + '.');
            }
        }
    };

    this.order = () =>
    {
        const expected = canonical.filter((name) => names.includes(name));
        const actual = names.filter((name) => canonical.includes(name));

        if(expected.join() !== actual.join())
        {
            report(properties[0].loc.start.line, 'Fields read ' + actual.join(', ') + ' but the canon orders them ' + expected.join(', ') + '.');
        }
    };

    const canonical = Object.keys(define);
    const names = properties.map((property) => this.Fn('get.name', property));

    this.known();
    this.required();
    this.order();
});
