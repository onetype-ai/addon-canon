// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.ast', (ast) =>
{
    ast.Item({
        id: 'errors',
        description: 'Only onetype.Error may be thrown, it carries a code, a message with :placeholder: tokens and the data that fills them.',
        check: (tree, walk, report) =>
        {
            const framework = (flung) =>
            {
                return !!flung
                    && flung.type === 'CallExpression'
                    && flung.callee.type === 'MemberExpression'
                    && flung.callee.object.name === 'onetype'
                    && flung.callee.property.name === 'Error';
            };

            walk((node) =>
            {
                if(node.type === 'NewExpression' && node.callee.name === 'Error')
                {
                    report(
                        node.loc.start.line,
                        'New Error found, the canon throws onetype.Error(404, \'Thing :name: is missing.\', { name }).'
                    );
                }

                if(node.type === 'ThrowStatement' && !framework(node.argument))
                {
                    report(
                        node.loc.start.line,
                        'Only onetype.Error may be thrown, like onetype.Error(404, \'Thing :name: is missing.\', { name }).'
                    );
                }
            });
        }
    });
});
