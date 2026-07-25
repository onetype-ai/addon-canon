// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('tests.back', (tests) =>
{
    tests.Item({
        id: 'canon:back/reads',
        addon: 'canon',
        description: 'The linter reads the raw lines and the tree layer reads the parsed syntax, each catching what only it can see.',
        callback: function({ assert })
        {
            this.linter = onetype.AddonGet('canon.linter');
            this.ast = onetype.AddonGet('canon.ast');
            this.banner = '// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>,'
                + ' co-authored by Stefan Pakic, onetype.ai';

            this.lint = (body) =>
            {
                const source = this.banner + '\n\n' + body;

                return this.linter.Fn('assert.violations', source, 'probe.js').map((entry) => entry.rule);
            };

            this.syntax = (body) =>
            {
                const source = this.banner + '\n\n' + body;
                const tree = this.ast.Fn('get.tree', source);

                return this.ast.Fn('assert.violations', tree, 'probe.js').map((entry) => entry.rule);
            };

            this.formatting = () =>
            {
                assert.match(this.lint('const a = 1;\n\nfunction run() {\n    return a;\n}\n').join(','), 'allman',
                    'a brace on the same line breaks allman');
                assert.match(this.lint('const a = 1;\n\tconst b = 2;\n').join(','), 'indent',
                    'a tab breaks the indent');
                assert.match(this.lint('const a = 1;   \n').join(','), 'spacing',
                    'trailing space breaks the spacing');
                assert.match(this.lint('const a = 1;\r\n').join(','), 'endings',
                    'a carriage return breaks the endings');
            };

            this.quiet = () =>
            {
                const clean = this.lint('const value = 1;\n');

                assert.equal(clean.length, 0, 'a line the canon writes reports nothing');
            };

            this.syntaxes = () =>
            {
                assert.match(this.syntax('var a = 1;\n').join(','), 'declarations',
                    'var is not a declaration the canon writes');
                assert.match(this.syntax('const a = 1;\n\nthrow new Error(\'raw\');\n').join(','), 'errors',
                    'a raw Error is not the error the canon throws');
                assert.match(this.syntax('const ab = 1;\n').join(','), 'names',
                    'a two letter name is shorter than the canon starts at');
            };

            this.parsed = () =>
            {
                const tree = this.ast.Fn('get.tree', this.banner + '\n\nconst value = 1;\n');

                assert.truthy(tree, 'a file that parses answers a tree');
                assert.truthy(Array.isArray(tree.comments), 'and the comments ride on it');
                assert.equal(tree.comments.length, 1, 'the banner being the one comment here');
            };

            this.formatting();
            this.quiet();
            this.syntaxes();
            this.parsed();
        }
    });
});
