// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import canon from '#canon/back/addon.js';

canon.structure.Fn('assert.name', function(call, name, report, { owner, base })
{
    this.declared = () =>
    {
        return call.arguments
            .filter((argument) => argument.type === 'ObjectExpression')
            .flatMap((argument) => argument.properties)
            .find((property) =>
            {
                return !!property.key
                    && property.key.name === 'addon';
            });
    };

    this.asset = (declared) =>
    {
        if(name.value !== base)
        {
            report(name.loc.start.line, 'Registered as ' + name.value + ' but the file is ' + base + '.js, the names match.');
        }

        if(declared && declared.value.value !== name.value)
        {
            report(declared.loc.start.line, 'The addon field says ' + declared.value.value + ' but the asset is ' + name.value + '.');
        }
    };

    this.owner = (declared, expected) =>
    {
        if(!declared)
        {
            report(call.loc.start.line, 'The addon field is missing, it names ' + expected + '.');
        }
        else if(declared.value.value !== expected)
        {
            report(declared.loc.start.line, 'The addon field says ' + declared.value.value + ' but the name belongs to ' + expected + '.');
        }

        if(expected.split('.').pop() !== owner.split('.').pop())
        {
            report(name.loc.start.line, 'Registered under ' + name.value + ' but the file belongs to the ' + owner + ' addon, rename it or move the file.');
        }
    };

    const declared = this.declared();

    if(call.callee.property.name === 'AssetsRegister')
    {
        return this.asset(declared);
    }

    if(!name.value.endsWith('.' + base))
    {
        return report(
            name.loc.start.line,
            'Registered as ' + name.value + ' but the file is ' + base + '.js, the name ends with .' + base + ' or the file moves.'
        );
    }

    this.owner(declared, name.value.slice(0, -(base.length + 1)));
});
