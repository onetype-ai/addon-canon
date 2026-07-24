// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.ast', (ast) =>
{
    ast.Item({
        id: 'quotes',
        description: 'Strings wear single quotes. Double quotes serve a string holding an apostrophe, backticks a substitution or a multiline body.',
        check: (tree, walk, report) =>
        {
            walk((node) =>
            {
                if(node.type === 'Literal' && typeof node.value === 'string' && node.raw && node.raw[0] === '"' && !node.value.includes("'"))
                {
                    report(node.loc.start.line, 'Double quoted string, the canon wears single quotes.');
                }

                if(node.type === 'TemplateLiteral' && !node.expressions.length && !node.quasis[0].value.raw.includes('\n'))
                {
                    report(node.loc.start.line, 'Backticks without a substitution, the canon wears single quotes.');
                }
            });
        }
    });
});
